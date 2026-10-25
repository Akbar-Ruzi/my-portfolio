import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export const metadata = {
	title: "Projects · Akbar Ruzi",
};

const ProjectsPage = () => {
	return (
		<div className="mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
			<Navbar />
			<main className="flex flex-col gap-[var(--outer)]">
				<Projects />
			</main>
			<Footer />
		</div>
	);
};

export default ProjectsPage;
