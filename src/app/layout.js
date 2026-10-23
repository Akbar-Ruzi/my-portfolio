import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "800"], variable: "--nf-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--nf-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--nf-mono" });

export const metadata = {
	title: "Wolf.dev · Akbar Ruzi",
	description: "Akbar Ruzi, front-end and AI developer.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
