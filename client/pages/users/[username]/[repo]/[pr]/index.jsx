import { getSession } from 'next-auth/react';
import { useContractRead } from 'wagmi';
import { useEffect, useState } from 'react';
import fetchApi from '../../../../../lib/github/fetchApi';
import Profile from '../../../../../src/components/contract';
import { abi, contractaddress } from '../../../../../src/constants';
import MintNFT from '../../../../../src/components/mintnft';
import ClaimNFT from '../../../../../src/components/claimnft';

function PR({ username, repo, prNo, prInfo, isOwner, shouldClaim }) {
	const [tokenId, setTokenId] = useState(null);
	const { refetch } = useContractRead({
		args: [String(prInfo.id)],
		addressOrName: contractaddress,
		contractInterface: abi,
		functionName: 'getTokenId',
	});

	useEffect(() => {
		refetch(String(prInfo.id)).then((data) => {
			setTokenId(parseInt(data.data[0]._hex, 16));
		});
	}, []);

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
					{prInfo.title}
					<span className='mx-10 font-light underline'>#{prNo}</span>
				</p>
				<div className='w-100 flex justify-end'>
					{isOwner && prInfo.merged && (
						<MintNFT
							username={username}
							repo={repo}
							prNo={prNo}
							pr={String(prInfo.id)}
						/>
					)}
					{shouldClaim && !!tokenId && <ClaimNFT tokenId={tokenId} />}
				</div>
			</span>

			<p className='py-5 text-4xl font-semibold'>
				We from Contrity, Appreciates you for Contribution at Repository{' '}
				{prInfo.head.repo.full_name}.
			</p>
			<p className='py-5 text-4xl font-semibold'>
				And, For your these helpful contributions towards Open-source Community,
				We have made a Customised NFT relating your Pull Request.
			</p>
		</main>
	);
}

export const getServerSideProps = async (context) => {
	const prNo = context.params.pr;
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
	const prInfo = await fetchApi(
		`https://api.github.com/repos/${username}/${repo}/pulls/${prNo}`,
		token
	);
	return {
		props: {
			username,
			repo,
			prNo,
			prInfo,
			isOwner: currentUser === username,
			shouldClaim: prInfo.merged && prInfo.merged_by.login === currentUser,
		},
	};
};

export default PR;
