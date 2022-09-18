import { WagmiConfig } from 'wagmi';
import '../styles/global.css';
import PropTypes from 'prop-types';
// import { useEffect } from 'react';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import client from '../lib/wagmi/chain-config';

function MyApp({ Component, pageProps }) {

	// display not available for mobile devices
	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 768) {
				const style = document.createElement('style');
				style.innerHTML = `
					body{
						min-height: 100vh;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					`;
				document.querySelector('head').appendChild(style);
				document.body.innerHTML = '<h1>Currently not available for mobile devices 😢<h1>';
				document.body.style.fontSize = '2rem';
				document.body.style.textAlign = 'center';
			}
		}
	}, []);

	return (
		<SessionProvider session={pageProps.session} refetchInterval={0}>
			<WagmiConfig client={client}>
				<Component {...pageProps} />
			</WagmiConfig>
		</SessionProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
