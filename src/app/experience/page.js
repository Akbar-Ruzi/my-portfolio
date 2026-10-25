import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export const metadata = {
	title: "Experience · Akbar Ruzi",
};

const ExperiencePage = () => {
	return (
		<div className="mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
			<Navbar />
			<main className="flex flex-col gap-[var(--outer)]">
				<Experience />
			</main>
			<Footer />
		</div>
	);
};

export default ExperiencePage;
