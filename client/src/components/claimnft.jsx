import {
	usePrepareContractWrite,
	useAccount,
	useContractWrite,
	useContractRead,
} from 'wagmi';
import { useEffect, useState } from 'react';
import { abi, contractaddress } from '../constants';

export default function ClaimNFT({ tokenId }) {
	const { address } = useAccount();
	const [unrendered, setUnrendered] = useState(true);
	const { config } = usePrepareContractWrite({
		args: [tokenId],
		addressOrName: contractaddress,
		contractInterface: abi,
		functionName: 'claim',
	});
	const { isLoading, write } = useContractWrite(config);
	const { isDisconnected } = useAccount();
	const { refetch } = useContractRead({
		args: [tokenId],
		addressOrName: contractaddress,
		contractInterface: abi,
		functionName: 'ownerOf',
	});

	useEffect(() => {
		refetch().then((data) => {
			if (data?.data) {
				setUnrendered(data.data === address);
			}
		});
	}, [refetch]);

	if(unrendered){
		return null;
	}

	return (
		<div>
			<button
				className='btn btn-success ml-5 hover:bg-purple-400'
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
