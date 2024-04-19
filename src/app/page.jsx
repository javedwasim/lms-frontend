'use client';

import { Container } from 'react-bootstrap';
import Header from '@/components/Auth/Header';

import '@/styles/Dashboard.css';
import '@/styles/home.css';

import Sidebar from '@/components/Home/Sidebar';
import Dashboard from '@/components/Home/Dashboard';
import Footer from '@/components/Auth/Footer';

export default function Homepage() {
	return (
		<div>
			<Header />
			<Container fluid>
				<div className='box-card'>
					<Sidebar />
					<Dashboard />
				</div>
			</Container>
		</div>
	);
}
