# Joy & Daniel Wedding Invitation

A responsive React + Vite wedding invitation website for Joy & Daniel.

## Included

- Animated hero section
- Smooth scrolling and hover transitions
- Live countdown to **November 7, 2026 at 4:00 PM (WAT / Lagos)**
- Wedding details and venue
- Google Maps directions button
- WhatsApp RSVP button
- Dress-code colour palette
- Supplied wedding invitation and logo assets
- Responsive mobile design
- `prefers-reduced-motion` accessibility support

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## Build for Netlify

```bash
npm install
npm run build
```

The production files are generated in:

```text
dist/
```

### Netlify settings

If Netlify asks for build settings:

- Build command: `npm run build`
- Publish directory: `dist`

Because this is a simple Vite single-page site, no server is required.

## Where to make common corrections

Open `src/main.jsx` to change:

- Names
- Date/time
- Venue/address
- RSVP phone numbers
- Google Maps URL
- WhatsApp RSVP message
- Invitation wording

Open `src/styles.css` to change:

- Colours
- Fonts
- Spacing
- Animations
- Mobile layout
- Button styles

Replace:

```text
src/assets/logo.jpg
src/assets/invitation.jpg
```

if you want to use different artwork.

## Important

The countdown uses:

```text
2026-11-07T16:00:00+01:00
```

which is 4:00 PM West Africa Time (Lagos).
