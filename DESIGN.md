# Mizan design system

## Direction

The sign-in experience is a calm planning desk: indexed paper planes and a well-used ledger make an abstract promise—organising life—feel physical. It is deliberate, grounded, and quietly optimistic; it avoids neon spectacle, translucent dashboard cards, and generic startup gradients.

The motion follows paper being placed on a desk: three typographic planes enter once, settle quickly, then remain readable. The three background planes offer subtle pointer parallax only on the story side. With reduced motion enabled, the final static composition is shown.

## Login tokens

The login inherits the planner's active theme tokens (`--bg`, `--side`, `--ink`, `--mute`, `--field`, and `--accent`). The palette below describes the earlier concept and is superseded by the active app theme.

| Role | Value |
| --- | --- |
| Ink | `#17201f` |
| Paper | `#f7f5ef` |
| Paper shadow | `#e5e1d7` |
| Moss field | `#3d5b50` |
| Clay action | `#b84c2e` |
| Clay hover | `#923718` |
| Rule | `#b6b7aa` |
| Quiet text | `#57615d` |
| Form control height | `49px` |
| Action height | `50px` |
| Motion entrance | `850ms cubic-bezier(.17,.82,.25,1)` |

## Responsive behavior

The desktop surface is an asymmetric story/form composition. At 860px and below, the story becomes a compact top panel and the form follows in normal document flow. At 480px and below, the supporting story note is removed but the heading and 3D paper planes remain.
