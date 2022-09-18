import { getSession } from 'next-auth/react';
import {
	useConnect,
	useContractRead,
	useAccount,
	useContractWrite,
	usePrepareContractWrite,
} from 'wagmi';
import { useEffect, useState } from 'react';
import fetchApi from '../../../../../lib/github/fetchApi';
import Profile from '../../../../../src/components/contract';
import contractAbi from '../../../../../artifacts/contracts/Contri.sol/Contri.json';

const contractAdress = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1';

function MintNFT({ pr }) {
	const { config } = usePrepareContractWrite({
		args: ['150', pr],
		addressOrName: contractAdress,
		contractInterface: contractAbi.abi,
		functionName: 'safeMint',
	});
	const { isDisconnected } = useAccount();
	const { data, isLoading, isSuccess, write } = useContractWrite(config);

	console.log(data);

	return (
		<div>
			<button
				className='btn btn-primary mx-5 hover:bg-purple-400'
				type='button'
				disabled={!write || isDisconnected}
				onClick={() => write?.('150', pr)}
			>
				Mint
			</button>
			{isLoading && <div>Check Wallet</div>}
			{/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
		</div>
	);
}

function ClaimNFT({ tokenId }) {
	const { config } = usePrepareContractWrite({
		args: [tokenId],
		addressOrName: contractAdress,
		contractInterface: contractAbi.abi,
		functionName: 'claim',
	});
	const { isDisconnected } = useAccount();
	const { isLoading, write } = useContractWrite(config);

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
			{/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
		</div>
	);
}

function PR({ username, repo, pr_no, pr_info, isOwner, shouldClaim }) {
	const [tokenId, setTokenId] = useState(null);
	const { refetch } = useContractRead({
		args: [String(pr_info.id)],
		addressOrName: contractAdress,
		contractInterface: contractAbi.abi,
		functionName: 'getTokenId',
	});

	useEffect(() => {
		refetch(String(pr_info.id)).then((data) => {
			console.log(data);
			setTokenId(parseInt(data.data[0]._hex, 16));
		});
	}, []);

	console.log({ tokenId });

	return (
		<main className='mx-20 my-4'>
			<div className='absolute right-10 bottom-10'>
				<Profile />
			</div>
			<span className='w-fit p-3 flex gap-2 cursor-pointer rounded-xl hover:bg-purple-400'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='w-6 h-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
					/>
				</svg>
				<p>Back</p>
			</span>
			<span className='flex justify-between items-center'>
				<p className='my-20 text-4xl font-semibold'>
					{pr_info.title}
					<span className='mx-10 font-light underline'>#{pr_no}</span>
				</p>
				<div className='w-100 flex justify-end'>
					{isOwner && <MintNFT pr={String(pr_info.id)} />}
					{shouldClaim && !!tokenId && (
						<ClaimNFT tokenId={tokenId} />
					)}
				</div>
			</span>

			<p className='py-5 text-4xl font-semibold'>
				We from Contrity, Appreciates you for Contribution at Repository{' '}
				{pr_info.head.repo.full_name}.
			</p>
			<p className='py-5 text-4xl font-semibold'>
				And, For your these helpful contributions towards Open-source Community,
				We have made a Customised NFT relating your Pull Request.
			</p>
		</main>
	);
}

export const getServerSideProps = async (context) => {
	const pr_no = context.params.pr;
	const { repo } = context.params;
	const { username } = context.params;
	const session = await getSession(context);
	const currentUser = session?.username;
	if (!session?.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const token = session?.accessToken;
	const pr_info = await fetchApi(
		`https://api.github.com/repos/${username}/${repo}/pulls/${pr_no}`,
		token
	);
	return {
		props: {
			username,
			repo,
			pr_no,
			pr_info,
			isOwner: currentUser === username,
			shouldClaim: pr_info.merged && pr_info.merged_by.login === currentUser,
		},
	};
};

export default PR;
