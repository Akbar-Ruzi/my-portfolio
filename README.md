# Magic Gourd Portfolio

Akbar Ruzi's personal portfolio: a single-page site with Hero, About, Experience, What I've Built (projects) and Contact sections. It is built with Next.js and exported as a static site.

## Tech stack

- [Next.js](https://nextjs.org) 15 (App Router, static export) and React 19, in plain JavaScript
- [Tailwind CSS](https://tailwindcss.com) 4, plus custom styles in `src/app/globals.css`
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with Bricolage Grotesque, Instrument Sans and JetBrains Mono
- [EmailJS](https://www.emailjs.com) (`@emailjs/browser`) for the contact form

## Getting started

```bash
npm install
cp .env.example .env              # then fill in the EmailJS ids (see "Contact form setup")
# create src/data/experience/experiences.js (see "Experience data")
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

| Script | What it does |
|---|---|
| `npm run dev` | Starts the dev server (Turbopack) with hot reload. |
| `npm run lint` | Runs ESLint. |
| `npm run build` | Builds the static site into `out/`. Stop `npm run dev` first, because both write to `.next`. |
| `npm run start` | Not used: with `output: 'export'`, serve `out/` with any static server instead. |

## Project structure

```
src/
  app/          layout.js (fonts, metadata), page.js (puts the sections together), globals.css
  components/   one folder per section (navbar/, hero/, about/, experience/, projects/, contact/, footer/),
                plus shared/ for pieces used by more than one section (Tags, MoreLink, PageHeader, Dialog, ...)
  data/         the content each section renders, in the same section folders (hero/heroData.js, projects/projects.js, ...)
  utils/        small helper functions (withBold.jsx, gourdSounds.js)
```

Most text changes happen in `src/data/`, not in the components.

## Experience data (`src/data/experience/experiences.js`)

The Experience timeline reads from `src/data/experience/experiences.js`. That file holds personal career details, so it is listed in `.gitignore` and is **not** in this repository.

After cloning, create `src/data/experience/experiences.js` yourself, or `npm run dev` / `npm run build` will fail with "Module not found: Can't resolve '@/data/experience/experiences'". Start from this mock data:

```js
// Experience timeline, newest first (rendered by components/experience/Experience.jsx).
// Each entry has either `bullets` (a list) or `summary` (one paragraph).
// Wrap words in **double asterisks** to show them in bold.
// dot: timeline dot color; the design cycles green, orange, yellow.
// tags: tech chips shown under the role (optional).
const experiences = [
  {
    id: "acme",
    org: "Acme Corp",
    when: "01/2024 – Present",
    role: "Front-End Developer",
    dot: "#29695C",
    bullets: [
      "Built a customer dashboard with React, TypeScript, and Tailwind CSS.",
      "Cut page load time by 40% with code splitting and lazy loading.",
      "Wrote unit tests with Jest and reviewed pull requests for a team of four.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Jest"],
  },
  {
    id: "earlier",
    org: "Earlier roles",
    when: "06/2020 – 12/2023",
    role: "Web Developer",
    dot: "#E8643A",
    summary:
      "**Example Studio and Sample Labs:** responsive marketing sites with HTML, CSS, and JavaScript, plus REST API integrations.",
  },
];

export default experiences;
```

Fields:

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique, stable string, used as the React key. |
| `org` | yes | Company or organization, shown on the left of the timeline. |
| `when` | yes | Date range shown under `org`, e.g. `09/2019 – 08/2022`. |
| `role` | yes | Job title, shown above the description. |
| `dot` | yes | Color of the timeline dot (any CSS color). |
| `bullets` | one of these two | Array of strings, shown as a bullet list. |
| `summary` | one of these two | One paragraph, for entries that combine several short roles. |
| `tags` | no | Array of strings, shown as tech chips under the description. |

The home page shows the first 4 entries with a "View full experience" button; `/experience` shows all of them.

## Contact form setup (EmailJS)

The contact form (`src/components/contact/Contact.jsx`) sends messages with [EmailJS](https://www.emailjs.com) through the `@emailjs/browser` package, so no backend is needed. It reads three ids from environment variables. Without them, the form shows its error message instead of sending.

1. **Account:** sign up at [emailjs.com](https://www.emailjs.com) and open the [dashboard](https://dashboard.emailjs.com).
2. **Service ID:** go to **Email Services** → **Add New Service**, pick your provider (e.g. Gmail), connect the inbox that should receive messages, and click **Create Service**. Copy its **Service ID**.
3. **Template ID:** go to **Email Templates** → **Create New Template**. The variable names must match the form's field names exactly:
   - **Subject:** `{{subject}}`
   - **Content:**
     ```
     From: {{user_email}}
     Subject: {{subject}}

     {{user_message}}
     ```
   - **To Email:** your own address
   - **Reply To:** `{{user_email}}`

   Save, then copy the **Template ID** from the template's **Settings** tab.
4. **Public Key:** go to **Account** → **General** and copy the **Public Key**.
5. **`.env`:** copy `.env.example` to `.env` in the project root and replace the placeholders:
   ```bash
   NEXT_PUBLIC_SERVICE_ID=your_service_id
   NEXT_PUBLIC_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_PUBLIC_KEY=your_public_key
   ```
   Restart `npm run dev` afterwards, because Next.js only reads `.env` at startup. `.env` is gitignored, so never commit real values.

**Deploying:** `.env` is not uploaded, so add the same three variables in your host's environment settings (e.g. Vercel → Project → Settings → Environment Variables) and redeploy. Optionally, restrict the key to your domain under **Account** → **Security** in EmailJS.

## Deploying

`next.config.mjs` sets `output: 'export'`, so `npm run build` creates a fully static site in `out/` that any static host can serve (Vercel, Netlify, GitHub Pages, ...).

Before building on a host:

- Add the three `NEXT_PUBLIC_` EmailJS variables in the host's settings. They are inlined at build time, so rebuild after changing them.
- Provide `src/data/experience/experiences.js`. It is gitignored, so a build from the repository alone fails without it.
