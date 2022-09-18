import fetchApi from '../../../../../lib/github/fetchApi';

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

function PR({ username, repo, pr_no, pr_info }) {
	return (
		<main className='mx-20 my-4'>
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
					<button
						type='button'
						className='btn btn-ghost mx-5 hover:bg-purple-400'
					>
						Claim NFT
					</button>
					<button
						type='button'
						className='btn btn-ghost mx-5 hover:bg-purple-400'
					>
						Mint NFT
					</button>
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
	const pr_info = await fetchApi(
		`https://api.github.com/repos/${username}/${repo}/pulls/${pr_no}`
	);
	return {
		props: {
			username,
			repo,
			pr_no,
			pr_info,
		},
	};
};

export default PR;
