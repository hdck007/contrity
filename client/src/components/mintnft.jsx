import { useContractWrite, useAccount } from 'wagmi';
import Modal from 'react-modal';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { abi, contractaddress } from '../constants';
// dynamically import CanvasWrapper only on client side
const CanvasWrapper = dynamic(() => import('./canvaswrapper'), {
	ssr: false,
});

export default function MintNFT({ pr, prNo, repo, username }) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const { isDisconnected } = useAccount();
	const { isLoading, write } = useContractWrite({
		mode: 'recklesslyUnprepared',
		args: ["", pr],
		addressOrName: contractaddress,
		contractInterface: abi,
		functionName: 'safeMint',
	});

	return (
		<div>
			<button
				className='btn btn-primary mx-5 hover:bg-purple-400'
				type='button'
				disabled={isDisconnected}
				onClick={() => setIsOpen(true)}
			>
				Mint
			</button>
			{isLoading && <div>Check Wallet</div>}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setIsOpen(false)}
				contentLabel='Example Modal'
			>
				<div className='display flex justify-center items-center w-full h-full'>
					<CanvasWrapper
						write={write}
						isDisconnected={isDisconnected}
						pr={pr}
						prNumber={prNo}
						repo={repo}
						username={username}
						setIsOpen={setIsOpen}
					/>
				</div>
			</Modal>
		</div>
	);
}
