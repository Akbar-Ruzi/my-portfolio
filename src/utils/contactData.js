// Contact section copy (rendered by components/Contact.jsx)
const contactData = {
	label: "Contact",
	title: "Let's build something together.",
	desc: "Open to front-end and AI roles and freelance projects. Send me a message and I'll reply by email.",
	form: {
		title: "Send me a message",
		desc: "I'll reply to the email you enter below.",
		note: "Your email is only used to reply to you.",
		// send button label, and its label while the message is sending
		button: { idle: "Send message", sending: "Sending…" },
		// shown under a field when it fails validation
		errors: {
			user_email: "Enter a valid email so I can reply.",
			subject: "Add a short subject.",
			user_message: "Write a message before sending.",
		},
		// shown in the status line under the send button
		status: {
			sending: "Sending…",
			sent: "Thanks! Your message was sent. I'll reply by email.",
			failed: "Your message didn't send. Please try again in a moment.",
		},
	},
};
export default contactData;
