/* Planner views share the existing task records; monthly events are stored once. */
S.monthlyEvents = Array.isArray(S.monthlyEvents) ? S.monthlyEvents : [];
S.ui.collapsedWeekDays = S.ui.collapsedWeekDays || {};
if (S.ui.view === 'week') S.ui.weekOff = 0;
const plannerTasks = date => S.tasks.filter(t => t.date === date && !t.block)
  .sort((a, b) => (a.start ?? 99) - (b.start ?? 99) || a.title.localeCompare(b.title));
const plannerEvents = date => S.monthlyEvents.filter(e => e.date === date)
  .sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99') || a.title.localeCompare(b.title));
const plannerTime = t => t.start == null ? '' : h2t(t.start);
const plannerDate = d => parseISO(d).toLocaleDateString('en-GB', { weekday: 'long', month: 'short', day: 'numeric' });
const plannerTaskRow = t => `<div class="task-row ${t.done ? 'done' : ''}">
  <button type="button" class="check" data-plan="toggle-task" data-id="${esc(t.id)}" aria-pressed="${!!t.done}" aria-label="Mark ${esc(t.title)} ${t.done ? 'incomplete' : 'complete'}">${CHECK_SVG}</button>
  <button type="button" class="min-w-0 flex-1 text-left" data-plan="edit-task" data-id="${esc(t.id)}"><span class="t-title">${t.start == null ? '' : `<span class="num text-accent mr-2">${esc(plannerTime(t))}</span>`}${esc(t.title)}</span>${t.description ? `<span class="meta block mt-1">${esc(t.description)}</span>` : ''}</button>
  <button type="button" class="icon-btn danger hover-show" data-plan="delete-task" data-id="${esc(t.id)}" aria-label="Delete ${esc(t.title)}"><span class="task-bin-icon" aria-hidden="true"></span></button>
</div>`;
const plannerEventRow = e => `<div class="task-row" style="background:var(--accent-soft)">
  <span class="text-accent" aria-hidden="true">${ic('calendar-days', 'w-4 h-4')}</span>
  <button type="button" class="min-w-0 flex-1 text-left" data-plan="edit-event" data-id="${esc(e.id)}"><span class="t-title">${e.time ? `<span class="num text-accent mr-2">${esc(e.time)}</span>` : ''}${esc(e.title)}</span>${e.description ? `<span class="meta block mt-1">${esc(e.description)}</span>` : ''}</button>
  <button type="button" class="icon-btn danger hover-show" data-plan="delete-event" data-id="${esc(e.id)}" aria-label="Delete ${esc(e.title)}"><span class="task-bin-icon" aria-hidden="true"></span></button>
</div>`;

function plannerEditTask(date, id) {
  const t = id ? S.tasks.find(x => x.id === id) : null;
  if (id && !t) return;
  openModal({ title: t ? 'Edit task' : 'Add task', body: `<div class="grid gap-3">
    <div><label class="label" for="plan-title">Title *</label><input id="plan-title" class="input" required value="${esc(t?.title || '')}"></div>
    <div class="grid grid-cols-2 gap-3"><div><label class="label" for="plan-date">Date</label><input id="plan-date" class="input" type="date" value="${esc(t?.date || date)}"></div><div><label class="label" for="plan-time">Time (optional)</label><input id="plan-time" class="input" type="time" value="${esc(t ? plannerTime(t) : '')}"></div></div>
    <div><label class="label" for="plan-tag">Category</label><select id="plan-tag" class="select">${Object.keys(TAGS).map(tag => `<option value="${esc(tag)}" ${tag === (t?.tag || 'Uncategorized') ? 'selected' : ''}>${esc(tag)}</option>`).join('')}</select></div>
    <div><label class="label" for="plan-desc">Description (optional)</label><textarea id="plan-desc" class="textarea" rows="3">${esc(t?.description || '')}</textarea></div>
  </div>`, onSave: () => {
    const title = $('#plan-title').value.trim();
    if (!title) { $('#plan-title').focus(); toast('Give the task a title', { icon: 'info' }); return; }
    const taskDate = $('#plan-date').value || date;
    const fields = { title, date: taskDate, start: t2h($('#plan-time').value), description: $('#plan-desc').value.trim(), tag: $('#plan-tag').value };
    if (t) Object.assign(t, fields); else S.tasks.push({ id: uid(), ...fields, dur: 30, done: false, focus: false });
    closeModal(); commit();
  } });
}
function plannerEditEvent(date, id) {
  const e = id ? S.monthlyEvents.find(x => x.id === id) : null;
  if (id && !e) return;
  openModal({ title: e ? 'Edit event' : 'Add event', body: `<div class="grid gap-3">
    <div><label class="label" for="event-title">Title *</label><input id="event-title" class="input" required value="${esc(e?.title || '')}"></div>
    <div class="grid grid-cols-2 gap-3"><div><label class="label" for="event-date">Date</label><input id="event-date" class="input" type="date" value="${esc(e?.date || date)}"></div><div><label class="label" for="event-time">Time (optional)</label><input id="event-time" class="input" type="time" value="${esc(e?.time || '')}"></div></div>
    <div><label class="label" for="event-desc">Description (optional)</label><textarea id="event-desc" class="textarea" rows="3">${esc(e?.description || '')}</textarea></div>
  </div>`, onSave: () => {
    const title = $('#event-title').value.trim();
    if (!title) { $('#event-title').focus(); toast('Give the event a title', { icon: 'info' }); return; }
    const fields = { title, date: $('#event-date').value || date, time: $('#event-time').value, description: $('#event-desc').value.trim() };
    if (e) Object.assign(e, fields); else S.monthlyEvents.push({ id: uid(), ...fields });
    S.ui.calMonth = fields.date.slice(0, 7); S.ui.calDay = fields.date;
    closeModal(); commit();
  } });
}

VIEWS.week = { html() {
  const today = todayISO(), start = addDays(weekStart(today), (S.ui.weekOff || 0) * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  return `${header('Weekly planner', `${dShort(start)} – ${dShort(days[6])}`, `<div class="flex flex-wrap gap-2"><button class="btn" data-plan="week-prev">Previous Week</button><button class="btn" data-plan="week-today">Today</button><button class="btn" data-plan="week-next">Next Week</button></div>`)}
  <div class="grid gap-3 mt-5 md:grid-cols-2 xl:grid-cols-4">
    ${days.map(d => { const collapsed = !!S.ui.collapsedWeekDays[d]; return `<section class="glass p-4 min-w-0" ${d === today ? 'style="box-shadow:0 0 0 1.5px var(--accent),var(--shadow)"' : ''}>
      <div class="flex items-center justify-between gap-2 mb-3"><div class="flex items-center gap-2 min-w-0"><button class="day-collapse" data-act="wk-toggle-day" data-d="${d}" aria-expanded="${!collapsed}" aria-label="${collapsed ? 'Show' : 'Hide'} tasks for ${plannerDate(d)}"><span aria-hidden="true">${collapsed ? '▸' : '▾'}</span></button><h2 class="h2 ${d === today ? 'text-accent' : ''}">${plannerDate(d)}</h2></div><button class="btn btn-sm" data-plan="add-task" data-date="${d}">${ic('plus')}Add</button></div>
      ${collapsed ? '' : `${plannerEvents(d).map(plannerEventRow).join('')}
      ${plannerTasks(d).map(plannerTaskRow).join('') || (plannerEvents(d).length ? '' : '<p class="meta py-3">Nothing planned.</p>')}`}
      <button class="btn btn-sm mt-3" data-plan="add-task" data-date="${d}">${ic('plus')}Add task</button>
    </section>`; }).join('')}
  </div>`;
} };

VIEWS.today = { html() {
  const date = todayISO(), tasks = plannerTasks(date), events = plannerEvents(date);
  const completed = tasks.filter(t => t.done).length, remaining = tasks.length - completed;
  const pct = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  return `${header('Today', plannerDate(date), `<button class="btn btn-accent" data-plan="add-task" data-date="${date}">${ic('plus')}Add task</button>`)}
    <section class="glass p-5 mt-5"><div class="flex justify-between gap-3 mb-2"><span class="font-semibold">${completed} of ${tasks.length} tasks completed</span><span class="meta num">${pct}%</span></div><div class="bar" role="progressbar" aria-label="Today's task completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="bar-fill" style="width:${pct}%;height:6px;background:var(--accent)"></div></div>
      <div class="flex gap-5 mt-3 meta"><span>Completed: ${completed}</span><span>Remaining: ${remaining}</span></div></section>
    <section class="glass p-3 mt-4">${[...events.map(e => ({ kind: 'event', item: e, time: e.time || '99:99' })), ...tasks.map(t => ({ kind: 'task', item: t, time: plannerTime(t) || '99:99' }))]
      .sort((a, b) => a.time.localeCompare(b.time)).map(x => x.kind === 'event' ? plannerEventRow(x.item) : plannerTaskRow(x.item)).join('') || '<p class="meta p-4">Nothing planned for today.</p>'}</section>`;
} };

VIEWS.calendar = { html() {
  const [year, month] = S.ui.calMonth.split('-').map(Number), first = new Date(year, month - 1, 1);
  const start = iso(new Date(year, month - 1, 1 - (first.getDay() + 6) % 7));
  const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i));
  const selected = S.ui.calDay, today = todayISO();
  return `${header('Monthly planner', dMonth(S.ui.calMonth + '-01'), `<div class="flex gap-2"><button class="btn" data-plan="month-prev">Previous Month</button><button class="btn" data-plan="month-today">Today</button><button class="btn" data-plan="month-next">Next Month</button></div>`)}
    <div class="grid gap-5 mt-5 lg:grid-cols-[minmax(0,1fr)_320px] items-start"><section class="glass p-3 min-w-0">
      <div class="cal-grid">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => `<span class="eyebrow text-center py-2">${d}</span>`).join('')}</div>
      <div class="cal-grid">${cells.map(d => { const events = plannerEvents(d), tasks = plannerTasks(d);
        const items = [...events.map(e => ({ title: e.title, event: true })), ...tasks.map(t => ({ title: t.title, done: t.done }))];
        return `<button class="cal-cell ${d === selected ? 'sel' : ''} ${d.slice(0, 7) !== S.ui.calMonth ? 'out' : ''}" data-plan="select-date" data-date="${d}" aria-label="${plannerDate(d)}, ${events.length} events and ${tasks.length} tasks"><span class="font-semibold num ${d === today ? 'text-accent' : ''}">${+d.slice(8)}</span><span class="cal-evs flex flex-col gap-0.5 w-full min-w-0">${items.slice(0, 3).map(item => `<span class="cal-ev ${item.event ? 'c-personal' : 'c-work'}" ${item.done ? 'style="opacity:.5;text-decoration:line-through"' : ''}>${item.event ? '📅 ' : ''}${esc(item.title)}</span>`).join('')}${items.length > 3 ? `<span class="meta">+${items.length - 3} more</span>` : ''}</span></button>`; }).join('')}</div>
    </section><aside class="glass p-4"><p class="eyebrow">${plannerDate(selected)}</p><h2 class="h2 mt-2">Important events</h2>
      <div class="mt-3">${plannerEvents(selected).map(plannerEventRow).join('') || '<p class="meta py-3">No events on this date.</p>'}</div>
      <button class="btn btn-accent mt-3" data-plan="add-event" data-date="${selected}">${ic('plus')}Add event</button>
      <div class="mt-5 pt-4 border-t" style="border-color:var(--line)"><h2 class="h2">Weekly planner tasks</h2>
        <div class="mt-3">${plannerTasks(selected).map(plannerTaskRow).join('') || '<p class="meta py-3">No tasks on this date.</p>'}</div>
        <button class="btn btn-sm mt-3" data-plan="add-task" data-date="${selected}">${ic('plus')}Add task</button>
      </div>
    </aside></div>`;
} };

document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-plan]'); if (!el) return;
  const a = el.dataset.plan, date = el.dataset.date;
  if (a === 'week-prev') S.ui.weekOff--, commit();
  else if (a === 'week-next') S.ui.weekOff++, commit();
  else if (a === 'week-today') S.ui.weekOff = 0, commit();
  else if (a === 'month-prev' || a === 'month-next') { const [y, m] = S.ui.calMonth.split('-').map(Number); S.ui.calMonth = iso(new Date(y, m - 1 + (a === 'month-next' ? 1 : -1), 1)).slice(0, 7); S.ui.calDay = S.ui.calMonth + '-01'; commit(); }
  else if (a === 'month-today') { S.ui.calMonth = todayISO().slice(0, 7); S.ui.calDay = todayISO(); commit(); }
  else if (a === 'select-date') { S.ui.calDay = date; if (date.slice(0, 7) !== S.ui.calMonth) S.ui.calMonth = date.slice(0, 7); commit(); }
  else if (a === 'add-task' || a === 'edit-task') plannerEditTask(date || todayISO(), el.dataset.id);
  else if (a === 'add-event' || a === 'edit-event') plannerEditEvent(date || S.ui.calDay, el.dataset.id);
  else if (a === 'toggle-task') { const t = S.tasks.find(x => x.id === el.dataset.id); if (t) { t.done = !t.done; commit(); } }
  else if (a === 'delete-task') { const i = S.tasks.findIndex(x => x.id === el.dataset.id); if (i >= 0) confirmModal('Delete task?', `“${esc(S.tasks[i].title)}” will be removed.`, 'Delete task', () => { S.tasks.splice(i, 1); commit(); }); }
  else if (a === 'delete-event') { const i = S.monthlyEvents.findIndex(x => x.id === el.dataset.id); if (i >= 0) confirmModal('Delete event?', `“${esc(S.monthlyEvents[i].title)}” will be removed.`, 'Delete event', () => { S.monthlyEvents.splice(i, 1); commit(); }); }
});
