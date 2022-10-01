import { getSession } from 'next-auth/react';
import { useContractRead } from 'wagmi';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import fetchApi from '../../../../../lib/github/fetchApi';
import Profile from '../../../../../src/components/contract';
import { abi, contractaddress } from '../../../../../src/constants';
import BackButton from '../../../../../src/components/backbutton';

const MintNFT = dynamic(() => import('../../../../../src/components/mintnft'), {
	ssr: false,
});
const ClaimNFT = dynamic(
	() => import('../../../../../src/components/claimnft'),
	{
		ssr: false,
	}
);

function NftImage({ tokenId }) {
	const [imageUrl, setImageUrl] = useState(null);
	const { refetch } = useContractRead({
		args: [tokenId],
		addressOrName: contractaddress,
		contractInterface: abi,
		functionName: 'tokenURI',
	});

	useEffect(() => {
		refetch(tokenId).then((data) => {
			if (data?.data) {
				setImageUrl(data.data);
			}
		});
	}, []);

	if (imageUrl) {
		return <img src={imageUrl} alt='NFT' />;
	}

	return <h3 className='text-xl'>The nft preview is loading here......</h3>;
}

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
			if (data?.data) {
				setTokenId(parseInt(data.data[0]._hex, 16));
			}
		});
	}, []);

	return (
		<main className='mx-20 my-4'>
			<div className='absolute right-10 bottom-10'>
				<Profile />
			</div>
			<BackButton />
			<span className='flex justify-between items-center'>
				<p className='my-20 text-4xl text-primary-content font-semibold'>
					<a
						target='_blank'
						className='hover:underline hover:text-blue-400'
						href={prInfo.html_url}
						rel='noreferrer'
					>
						{prInfo.title}
					</a>
					<span className='mx-10 font-light underline'>#{prNo}</span>
				</p>
				<div className='w-100 flex justify-end'>
					{isOwner && tokenId !== null && !tokenId && (
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
			{shouldClaim && (
				<p className='text-xl'>
					We appreciate you for contribution at repository{' '}
					<span className='text-secondary'>{prInfo.head.repo.full_name}</span>.
				</p>
			)}
			{shouldClaim && !!tokenId && (
				<p className='text-xl'>
					And, for your helpful contributions towards the community, We have
					made a customised NFT relating your pull request below. if you are the
					contributor you can claim it.
				</p>
			)}
			{!!tokenId && !shouldClaim && (
				<p className='text-xl'>
					We have made a customised NFT relating your pull request below. if you
					are the contributor you can claim it.
				</p>
			)}
			{!!tokenId && <NftImage tokenId={tokenId} />}
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
			shouldClaim: prInfo.merged && prInfo.user.login === currentUser,
		},
	};
};

export default PR;
