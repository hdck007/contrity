import { chain, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';

const { chains, provider, webSocketProvider } = configureChains(
	[chain.polygonMumbai],
	[
		jsonRpcProvider({
			rpc: () => ({
				http: "https://rpc-mumbai.maticvigil.com",
			}),
		}),
		publicProvider(),
	]
);

const client = createClient({
	autoConnect: true,
	provider,
	webSocketProvider,
	connectors: [
		new InjectedConnector({
			chains,
			options: {
				name: 'Injected',
				shimDisconnect: true,
			},
		}),
	],
});

export default client;
