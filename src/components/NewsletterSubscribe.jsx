import { useState } from "react";
import { subscribeToNewsletter } from "../services/newsletterService";

const NewsletterSubscribe = () => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("loading");
		setMessage("");

		try {
			await subscribeToNewsletter(email);
			setStatus("success");
			setMessage("You're subscribed! Watch your inbox for newsletters, job offers, and career training updates.");
			setEmail("");
		} catch (error) {
			setStatus("error");
			setMessage(error.message || "Something went wrong. Please try again.");
		}
	};

	return (
		<div>
			<h4 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent mb-3">
				Stay in the Loop
			</h4>
			<p className="text-gray-300 text-sm mb-4 max-w-md">
				Subscribe to get our newsletter, curated job offers, and career training tips straight to your inbox.
			</p>
			<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
				<label htmlFor="newsletter-email" className="sr-only">
					Email address
				</label>
				<input
					id="newsletter-email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="you@example.com"
					required
					className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
				/>
				<button
					type="submit"
					disabled={status === "loading"}
					className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-primary-500/25 whitespace-nowrap"
				>
					{status === "loading" ? "Subscribing..." : "Subscribe"}
				</button>
			</form>
			{message && (
				<p
					className={`mt-3 text-sm ${
						status === "success" ? "text-green-400" : "text-red-400"
					}`}
					role="status"
				>
					{message}
				</p>
			)}
		</div>
	);
};

export default NewsletterSubscribe;
