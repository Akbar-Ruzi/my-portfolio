import Navbar from "@/components/navbar/Navbar";
import PageHeader from "@/components/shared/PageHeader";
import Experience from "@/components/experience/Experience";
import Footer from "@/components/footer/Footer";

export const metadata = {
	title: "Experience · Magic Gourd",
};

const ExperiencePage = () => {
	return (
		<div className="page mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
			<Navbar />
			<PageHeader
				back="/#experience"
				title="Experience"
				intro="7+ years building web applications, from enterprise front ends to full-stack products, now growing into AI application development."
			/>
			<main className="flex flex-col gap-[var(--outer)]">
				<Experience />
			</main>
			<Footer />
		</div>
	);
};

export default ExperiencePage;
