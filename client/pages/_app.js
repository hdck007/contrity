import { WagmiConfig } from 'wagmi';
import '../styles/global.css';
import PropTypes from 'prop-types';
// import { useEffect } from 'react';
import client from '../lib/wagmi/chain-config';
// import getWalletInstance from '../lib/arcana/authprovider';

function MyApp({ Component, pageProps }) {

	// useEffect(async () => {
	// 	const provider = await getWalletInstance();
	// 	console.log(provider)
	// }, [])

	return (
		<WagmiConfig client={client}>
			<Component {...pageProps} />
		</WagmiConfig>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
