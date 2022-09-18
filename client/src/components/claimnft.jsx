import { usePrepareContractWrite, useAccount, useContractWrite } from 'wagmi';
import { abi, contractaddress } from '../constants';

export default function ClaimNFT({ tokenId }) {
	const { config } = usePrepareContractWrite({
		args: [tokenId],
		addressOrName: contractaddress,
		contractInterface: abi,
		functionName: 'claim',
	});
	const { isLoading, write } = useContractWrite(config);
	const { isDisconnected } = useAccount();

	return (
		<div>
			<button
				className='btn btn-secondary mx-5 hover:bg-purple-400'
				type='button'
				disabled={!write || isDisconnected}
				onClick={() => write?.(tokenId)}
			>
				Claim Nft
			</button>
			{isLoading && <div>Check Wallet</div>}
		</div>
	);
}