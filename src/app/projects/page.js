import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export const metadata = {
	title: "Projects · Akbar Ruzi",
};

const ProjectsPage = () => {
	return (
		<div className="mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
			<Navbar />
			<PageHeader
				back="/#work"
				title="All Projects"
				intro="Everything I've built, from front-end interfaces to full-stack apps and applied AI projects."
			/>
			<main className="flex flex-col gap-[var(--outer)]">
				<Projects />
			</main>
			<Footer />
		</div>
	);
};

export default ProjectsPage;
