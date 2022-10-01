/* eslint-disable no-nested-ternary */
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import fetchApi from '../../../lib/github/fetchApi';
import BackButton from '../../../src/components/backbutton';

const ArrowElement = (
	<div className='px-3 h-100 flex card-actions items-center justify-center transition duration-150 ease-out hover:ease-in'>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'
			className='w-10 h-10'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
			/>
		</svg>
	</div>
);

function PRs({ username, prs }) {
	return (
		<>
			<Head>
				<title>{username}'s PRs</title>
			</Head>
			<main className='mx-20 my-4'>
				<BackButton />
				<p className='my-20 text-4xl text-primary-content font-semibold'>
					{username}'s PRs
				</p>
				{prs.map((pr) => (
					<div className='my-3 card border-2 lg:card-side bg-base-100 cursor-pointer hover:bg-purple-400 hover:text-white'>
						<div className='flex card-body flex-row'>
							<h2 className='card-title'>{pr.title}</h2>
							{pr.state === 'open' ? (
								<div className='m-3 p-4 h-100 flex align-center badge badge-outline text-md font-semibold '>
									{pr.state}
								</div>
							) : pr.merged_at ? (
								<div className='m-3 p-4 h-100 flex align-center badge badge-outline text-md font-semibold '>
									merged
								</div>
							) : (
								<div className='m-3 p-4 h-100 flex align-center badge badge-outline text-md font-semibold '>
									{pr.state}
								</div>
							)}
						</div>
						{ArrowElement}
					</div>
				))}
			</main>
		</>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;
	const session = await getSession(context);
	if (!session?.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const token = session?.accessToken;
	const prs = await fetchApi(
		`https://api.github.com/repos/${params.username}/${params.pr[0]}/pulls?state=all`,
		token
	);
	return {
		props: {
			username: params.username,
			prs,
		},
	};
};

export default PRs;
