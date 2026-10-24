This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Experience data (`src/utils/experiences.js`)

The Experience timeline reads from `src/utils/experiences.js`. That file holds personal career details, so it is listed in `.gitignore` and is **not** in this repository.

After cloning, create `src/utils/experiences.js` yourself, or `npm run dev` / `npm run build` will fail with "Module not found: Can't resolve '@/utils/experiences'". Start from this mock data:

```js
// Experience timeline, newest first (rendered by components/Experience.jsx).
// Each entry has either `bullets` (a list) or `summary` (one paragraph).
// Wrap words in **double asterisks** to show them in bold.
// dot: timeline dot color; the design cycles green, orange, yellow.
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
