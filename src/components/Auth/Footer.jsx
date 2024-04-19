'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const CHAT_EXCLUDED_PATHS = ['/mock-test/quiz', '/quiz'];

const CHAT_EXCLUDED_REGEX = [
	/questions\/(\d+)\/instructions/,
	/mock-test\/(\d+)\/category\/(\d+)\/instructions\/(\d+)/,
];

function Footer() {
	const pathname = usePathname();

	useEffect(() => {
		const scriptElement = document.querySelector(
			'script[src="https://static.widget.trengo.eu/embed.js"]'
		);
		const trengoWidget = document.querySelector('#trengo-web-widget');

		window.Trengo = window.Trengo || {};
		window.Trengo.key = process.env.NEXT_PUBLIC_TRENGO_KEY;
		function addTrengo() {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = 'https://static.widget.trengo.eu/embed.js';
			document.getElementsByTagName('head')[0].appendChild(script);
		}

		console.log(pathname);

		if (
			CHAT_EXCLUDED_PATHS.includes(pathname) ||
			CHAT_EXCLUDED_REGEX.some((regex) => regex.test(pathname))
		) {
			if (scriptElement && trengoWidget) {
				trengoWidget.remove();
				scriptElement.remove();
			}
		} else {
			if (!scriptElement) {
				addTrengo();
			}
		}
	}, [pathname]);

	return null;
}

export default Footer;
