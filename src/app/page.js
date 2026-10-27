import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

const Homepage = () => {
	return (
		<div className="page mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
			<Navbar />
			<Hero />
			<main className="flex flex-col gap-[var(--outer)]">
				<About />
				<Experience preview />
				<Projects preview />
				<Contact />
			</main>
			<Footer />
		</div>
	);
};

export default Homepage;
