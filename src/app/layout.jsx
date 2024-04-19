import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import './globals.css';
import { NavbarProvider } from '@/context/navbar';
import { QuizProvider } from '@/context/quiz';
import Footer from '@/components/Auth/Footer';

export const metadata = {
	title: 'Medic Mind LMS',
	description: 'Medic Mind LMS',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				{/* Commented because it overrides Bootstrap styling */}
				{/* <script src="https://cdn.tailwindcss.com"></script> */}
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/icon?family=Material+Icons'
				/>
			</head>
			<body>
				<NavbarProvider>
					<QuizProvider>{children}</QuizProvider>
				</NavbarProvider>
				<Footer />
			</body>
		</html>
	);
}
