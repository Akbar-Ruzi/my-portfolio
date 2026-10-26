import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// variable font with the optical-size axis (opsz), as in the new design: big headings get the condensed
// display cut automatically (font-optical-sizing: auto); next/font only allows axes on the variable font
const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--nf-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--nf-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--nf-mono" });

export const metadata = {
	title: "Magic Gourd · Akbar Ruzi",
	description: "Akbar Ruzi, software engineer: front-end, full-stack and applied AI.",
	// Stop iOS Safari from turning addresses/numbers (e.g. a city or phone number) into links
	formatDetection: { telephone: false, address: false, email: false, date: false },
};

export default function RootLayout({ children }) {
	return (
		// suppressHydrationWarning: some browsers (e.g. Chrome on iPhone) add attributes to <html> before
		// React loads; this ignores attribute differences on this one tag only, not on its children
		<html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
			<body>{children}</body>
		</html>
	);
}
