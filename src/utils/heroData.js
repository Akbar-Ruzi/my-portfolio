// Hero copy (rendered by components/Hero.jsx)
const heroData = {
	roles: ["Front-End", "Full-Stack", "Applied AI"], // shown in the hero badge, separated by ·
	greeting: "Hey There,",
	name: "Akbar",
	desc: "I build fast, polished front ends with JavaScript, React and TypeScript, and add AI-powered features with Python and FastAPI when a project needs it.",
	watermark: "UI → AI Application Engineer", // faint text behind the hero text, always on one line
	primary: { url: "#contact", title: "Hire Me" },
	secondary: { url: "#work", title: "See my work" },
	gourdButton: { open: "What's inside? Open me", close: "Back into the gourd" }, // button on the hero gourd (components/HeroGourd.jsx)
	caravan: ["Magic gourds for sale!", "Dreams come true inside!"], // the elder's speech bubble takes turns (components/Caravan.jsx)
};
export default heroData;
