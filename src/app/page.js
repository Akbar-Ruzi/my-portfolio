import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

// Temporary skeleton: each placeholder is replaced by its real component in Steps 9–10 of the plan
const sections = [
	{ id: "contact", title: "Contact", bg: "bg-panel" },
];

const Homepage = () => {
	return (
		<div className="mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
			<Navbar />
			<Hero />
			<main className="flex flex-col gap-[var(--outer)]">
				<About />
				<Experience />
				<Projects />
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
