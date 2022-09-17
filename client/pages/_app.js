import { WagmiConfig } from 'wagmi';
import '../styles/global.css';
import PropTypes from 'prop-types';
// import { useEffect } from 'react';
import client from '../lib/wagmi/chain-config';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {

	// useEffect(async () => {
	// 	const provider = await getWalletInstance();
	// 	console.log(provider)
	// }, [])

	return (
		<SessionProvider session={pageProps.session}>
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
