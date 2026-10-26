// Code shown on the hero gourd's screen (components/HeroGourd.jsx), one snippet per tech chip.
// Each line is a list of [text, color] parts; [] is an empty line. Leading spaces indent the line.
// Colors: k keyword, f function, s string, t plain text, c comment
export const codeColors = { k: "#8FB0FF", f: "#C9A2FF", s: "#F5B072", t: "#E6ECF7", c: "#6E7D96" };

const gourdSnippets = {
	AI: { // shown first, and again after the gourd closes
		file: "assistant.ts",
		lines: [
			[["// AI summary for a project", "c"]],
			[["import", "k"], [" { generate } ", "t"], ["from", "k"], [" \"./ai\"", "s"], [";", "t"]],
			[],
			[["export async function", "k"], [" summarize", "f"], ["(p) {", "t"]],
			[["  const", "k"], [" prompt = ", "t"], ["`Summarize ${p.name}`", "s"], [";", "t"]],
			[["  return", "k"], [" generate", "f"], ["(prompt);", "t"]],
			[["}", "t"]],
		],
	},
	Python: {
		file: "db.py",
		lines: [
			[["# Load projects from PostgreSQL", "c"]],
			[["def", "k"], [" get_projects", "f"], ["(db):", "t"]],
			[["    rows = db.", "t"], ["fetch", "f"], ["(", "t"]],
			[["        \"SELECT id, name, live\"", "s"]],
			[["        \" FROM projects\"", "s"], [")", "t"]],
			[["    return", "k"], [" [", "t"], ["dict", "f"], ["(r) ", "t"], ["for", "k"], [" r ", "t"], ["in", "k"], [" rows]", "t"]],
		],
	},
	FastAPI: {
		file: "main.py",
		lines: [
			[["from", "k"], [" fastapi ", "t"], ["import", "k"], [" FastAPI", "t"]],
			[["app = ", "t"], ["FastAPI", "f"], ["()", "t"]],
			[],
			[["@app.get", "f"], ["(", "t"], ["\"/api/projects\"", "s"], [")", "t"]],
			[["async def", "k"], [" projects", "f"], ["():", "t"]],
			[["    return", "k"], [" cached_projects", "f"], ["(db)", "t"]],
		],
	},
	React: {
		file: "Projects.tsx",
		lines: [
			[["export function", "k"], [" Projects", "f"], ["() {", "t"]],
			[["  const", "k"], [" p = ", "t"], ["useFetch", "f"], ["<Project[]>(", "t"]],
			[["    \"/api/projects\"", "s"], [");", "t"]],
			[["  return", "k"], [" <ul>{p.", "t"], ["map", "f"], ["(x =>", "t"]],
			[["    <li key={x.id}>{x.name}</li>)}", "t"]],
			[["  </ul>;", "t"]],
			[["}", "t"]],
		],
	},
	TypeScript: {
		file: "types.ts",
		lines: [
			[["// Shape of /api/projects data", "c"]],
			[["type", "k"], [" Project = {", "t"]],
			[["  id: ", "t"], ["number", "k"], [";", "t"]],
			[["  name: ", "t"], ["string", "k"], [";", "t"]],
			[["  live: ", "t"], ["boolean", "k"], [";", "t"]],
			[["};", "t"]],
		],
	},
	PostgreSQL: {
		file: "schema.sql",
		lines: [
			[["-- Where the projects live", "c"]],
			[["CREATE TABLE", "k"], [" projects (", "t"]],
			[["  id ", "t"], ["SERIAL PRIMARY KEY", "k"], [",", "t"]],
			[["  name ", "t"], ["TEXT NOT NULL", "k"], [",", "t"]],
			[["  live ", "t"], ["BOOLEAN DEFAULT TRUE", "k"]],
			[[");", "t"]],
		],
	},
	Redis: {
		file: "cache.py",
		lines: [
			[["def", "k"], [" cached_projects", "f"], ["(db):", "t"]],
			[["    hit = r.", "t"], ["get", "f"], ["(", "t"], ["\"projects\"", "s"], [")", "t"]],
			[["    if", "k"], [" hit: ", "t"], ["return", "k"], [" json.", "t"], ["loads", "f"], ["(hit)", "t"]],
			[["    d = ", "t"], ["get_projects", "f"], ["(db)", "t"]],
			[["    r.", "t"], ["set", "f"], ["(", "t"], ["\"projects\"", "s"], [", json.", "t"], ["dumps", "f"], ["(d),", "t"]],
			[["          ex=60)", "t"]],
			[["    return", "k"], [" d", "t"]],
		],
	},
};
export default gourdSnippets;
