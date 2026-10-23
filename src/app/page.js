// Temporary skeleton: each placeholder is replaced by its real component in Steps 4–10 of the plan
const sections = [
	{ id: "about", title: "About", bg: "bg-cream" },
	{ id: "experience", title: "Experience", bg: "bg-cream" },
	{ id: "work", title: "Selected work", bg: "bg-panel" },
	{ id: "contact", title: "Contact", bg: "bg-panel" },
];

const Homepage = () => {
	return (
		<div className="mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
			{/* NAVBAR + HERO (Steps 4–5) */}
			<div id="top" className="card-section rounded-[20px] bg-cream py-12">
				<h1 className="text-[clamp(40px,7vw,76px)] font-extrabold">Wolf.dev</h1>
			</div>
			<main className="flex flex-col gap-[var(--outer)]">
				{sections.map((section) => (
					<section key={section.id} id={section.id} className={`card-section rounded-[20px] py-14 ${section.bg}`}>
						<h2 className="text-[clamp(28px,4vw,38px)]">{section.title}</h2>
					</section>
				))}
			</main>
			{/* FOOTER (Step 10) */}
		</div>
	);
};

export default Homepage;
