'use client';

import { FormEvent, useState } from 'react';

type FormErrors = {
  email?: string;
  password?: string;
};

export default function Home() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    const nextErrors: FormErrors = {};

    if (!email) nextErrors.email = 'Email address is required.';
    if (!password) nextErrors.password = 'Password is required.';

    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <main className="welcome-shell">
      <section className="welcome-card" aria-labelledby="mizan-title">
        <p className="eyebrow">Mizan</p>
        <h1 id="mizan-title">Plan the next true thing.</h1>
        <p className="intro">A calmer planner is taking shape, one reliable part at a time.</p>

        <form noValidate onSubmit={handleSubmit} aria-describedby="migration-notice">
          <label htmlFor="email">Email address</label>
          <input aria-describedby={errors.email ? 'email-error' : undefined} id="email" name="email" type="email" autoComplete="email" />
          {errors.email && <p className="field-error" id="email-error" role="alert">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input aria-describedby={errors.password ? 'password-error' : undefined} id="password" name="password" type="password" autoComplete="current-password" />
          {errors.password && <p className="field-error" id="password-error" role="alert">{errors.password}</p>}

          <button type="submit">Continue</button>
        </form>

        {submitted && <p className="success" role="status">Thanks. Secure sign-in will be connected in a later milestone.</p>}
        <p className="migration-notice" id="migration-notice">This preview does not create a session or change planner data. Your standalone legacy planner and its browser data remain available during the migration.</p>
      </section>
    </main>
  );
}
