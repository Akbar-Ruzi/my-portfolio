// "What I've Built" cards (rendered by components/projects/Projects.jsx), in display order.
// kind: small label above the title. tags: tech chips.
// desc: keep it to about 3 lines on the card (~170 characters).
// demo / code: links; leave "" when there is none (the button then opens a "not ready yet" dialog).
const projects = [
	{
		id: "talent-pipeline-tracker",
		kind: "Full-stack app",
		title: "Talent Pipeline Tracker",
		desc: "A recruitment dashboard that replaced a shared spreadsheet: search and filter candidates, update their stage, and manage interview notes, with every API response validated.",
		tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
		demo: "",
		// repo (not public yet): https://github.com/Akbar-Ruzi/ai-engineering-company-project-monorepo/tree/feature/talent-pipeline-tracker/uis/talent-pipeline-tracker
		code: "",
	},
	{
		id: "voice-command-api",
		kind: "AI-powered app",
		title: "Voice Command API",
		desc: "A FastAPI service that turns speech into actions: Whisper transcribes the audio and an LLM converts it into a structured API call on a task list. I built the backend.",
		tags: ["Python", "FastAPI", "LLM", "Whisper", "Groq", "Pydantic"],
		demo: "",
		// repo (not public yet): https://github.com/Akbar-Rouzi/voice-command-api
		code: "",
	},
	{
		id: "healthcore-public-website",
		kind: "Public website",
		title: "HealthCore Public Website",
		desc: "A bilingual (English/Spanish) healthcare website with a filterable clinic directory and a validated enquiry form, scoring 91 to 100 in every Lighthouse category.",
		tags: ["HTML5", "Tailwind CSS", "JavaScript", "i18n", "SEO", "Accessibility"],
		demo: "",
		// repo (not public yet): https://github.com/Akbar-Rouzi/healthcore-public-website/tree/main/uis/website
		code: "",
	},
	{
		id: "event-hub",
		kind: "Full-stack app",
		title: "Event Hub",
		desc: "An event creation and booking app with responsive listing pages, NextAuth sign-in, and MongoDB storage for events and bookings.",
		tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NextAuth", "MongoDB"],
		// TODO: find the repo URL (none saved yet)
		demo: "",
		code: "",
	},
	{
		id: "wanderlust-explorer",
		kind: "Front-end app",
		title: "Wanderlust Explorer",
		desc: "A travel discovery app with 100 curated experiences: search and filters synced to the URL, a detail page for each one, and favorites that persist across sessions.",
		tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
		demo: "",
		// repo (not public yet): https://github.com/4GeeksAcademy/Akbar-Rouzi-nextjs-wanderlust-explorer
		code: "",
	},
];

export default projects;
