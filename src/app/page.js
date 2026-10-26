import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Homepage = () => {
	return (
		<div className="mx-auto flex max-w-[1240px] flex-col gap-[var(--outer)]">
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
