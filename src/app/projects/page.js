import Navbar from "@/components/navbar/Navbar";
import PageHeader from "@/components/shared/PageHeader";
import Projects from "@/components/projects/Projects";
import Footer from "@/components/footer/Footer";

export const metadata = {
	title: "Projects · Magic Gourd",
};

const ProjectsPage = () => {
	return (
		<div className="page mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
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
