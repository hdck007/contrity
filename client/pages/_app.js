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
				document.body.innerHTML = '<h1>Not available for mobile devices 😢<h1>';
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
