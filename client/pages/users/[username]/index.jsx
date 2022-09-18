import Link from 'next/link';
import React from 'react';
import { getSession ,signOut} from 'next-auth/react';
import fetchApi from '../../../lib/github/fetchApi';

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

function Repos({ username, repos }) {
	return (
		<main className='mx-20 my-4'>
			<div className='flex flex-row justify-between'>
				<p className='my-20 text-4xl font-semibold'>{`${username}'s`} Repos</p>
				<span className='flex items-center'>
					<button
						onClick={() => signOut()}
						type='button'
						className='hover:bg-purple-400 btn btn-ghost h-100'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6 mx-2'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
							/>
						</svg>
						Sign Out
					</button>
				</span>
			</div>

			{repos.map((repo) => (
				<>
					<Link href={`/users/${username}/${repo.name}`} type='button'>
						<div className='my-3 card shadow-2xl border-2 lg:card-side bg-base-100 w-full cursor-pointer hover:bg-purple-400 hover:text-white'>
							<div className='card-body flex flex-row justify-between items-center'>
								<h2 className='card-title'>{repo.name}</h2>
								{ArrowElement}
							</div>
						</div>
					</Link>
					<br />
				</>
			))}
		</main>
	);
}

export const getServerSideProps = async (context) => {
	const { username } = context.params;
	const session = await getSession(context);
  if(!session?.user){
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
	const token = session?.accessToken;
	const repos = await fetchApi(
		`https://api.github.com/users/${username}/repos`,
		token
	);
	return {
		props: {
			username,
			repos,
		},
	};
};

export default Repos;
