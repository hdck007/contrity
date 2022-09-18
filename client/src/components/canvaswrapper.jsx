/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Reponame from './reponame';
import SHAText from './shatext';
import addCommentProvider from '../../lib/github/addCommenttoPr';

const widthObj = Object.freeze({
	dp: {
		width: 200,
		height: 200,
	},
	poster: {
		width: 500,
		height: 500,
	},
	banner: {
		width: 600,
		height: 200,
	},
});

function CanvasWrapper({
	write,
	isDisconnected,
	pr,
	setIsOpen,
	username,
	repo,
	prNumber,
}) {
	const [processing, setProcessing] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();
	if (!session?.user) {
		router.push('/');
	}
	const [githubDetails, setGithubDetails] = useState(null);
	const stageRef = useRef(null);
	const [config] = useState({
		reponame: true,
		sha: true,
		dp: true,
		size: 'poster',
	});
	const pullUrl = `https://api.github.com/repos/${username}/${repo}/pulls/${prNumber}`;

	useEffect(() => {
		fetch(pullUrl)
			.then((response) => response.json())
			.then((data) => {
				setGithubDetails(data);
			});
	}, []);

	function dataURLtoBlob(dataurl) {
		const arr = dataurl.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	const handleExport = async () => {
		setProcessing(true);
		const blob = dataURLtoBlob(stageRef.current.content.firstChild.toDataURL());
		const formData = new FormData();
		formData.append('file', blob);
		const response = await fetch('https://api.nft.storage/upload', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization:
					`Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_KEY}`,
			},
		}).then((data) => data.json());
		try {
			await addCommentProvider(
				`https://api.github.com/repos/${username}/${repo}/issues/${prNumber}/comments`,
				session?.accessToken,
				`Hey @${githubDetails.head.user.login} a special gift for you here: ${window.location.origin}}`
			);
			write({
				recklesslySetUnpreparedArgs: [
					`https://${response.value.cid}.ipfs.nftstorage.link/blob`,
					pr,
				],
			});
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	const { width } = widthObj[config.size];
	const { height } = widthObj[config.size];
	
	const image = new window.Image();
	const ownerImage = new window.Image();
	if (githubDetails) {
		image.src = githubDetails.user.avatar_url;
		image.width = height * 0.2;
		image.height = height * 0.2;
		ownerImage.src = githubDetails.base.repo.owner.avatar_url;
		ownerImage.width = width;
		ownerImage.height = height;
	} else {
		image.src = '';
		ownerImage.src = '';
	}
	image.crossOrigin = '';
	ownerImage.crossOrigin = '';

	const handleMint = async () => {
		await handleExport();
		setIsOpen(false);
		setProcessing(false);
	};

	return (
		<>
			<Stage
				ref={stageRef}
				className='border-blue-400 border-2'
				width={width}
				height={height}
			>
				<Layer>
					<Image opacity={0.2} image={ownerImage} />
					{githubDetails && (
						<SHAText
							text={githubDetails.base.sha}
							width={width}
							height={height}
							count={10}
						/>
					)}
					{githubDetails && (
						<Reponame
							count={10}
							width={width}
							height={height}
							reponame={githubDetails.base.repo.name}
						/>
					)}
					<Text
						draggable
						fontFamily='Poppins'
						strokeWidth={3}
						stroke='red'
						x={width * 0.05}
						y={height * 0.9}
						fontSize={width / 10}
						text={githubDetails?.title || ''}
					/>
					<Image
						draggable
						x={Math.random() * width * 0.8}
						y={Math.random() * height * 0.8}
						image={image}
					/>
				</Layer>
			</Stage>
			<div>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button
					className='btn btn-primary mx-5 hover:bg-purple-400'
					type='button'
					disabled={!write || isDisconnected}
					onClick={handleMint}
				>
					Mint
				</button>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button
					className='btn btn-ghost mx-5'
					type='button'
					disabled={!write || isDisconnected}
					onClick={() => setIsOpen(false)}
				>
					Close
				</button>
				{processing && (
					<p
						style={{
							width: '200px',
							paddingLeft: '20px',
							marginTop: '20px',
						}}
						className='text-black left-0 p-2 text-xl bold'
					>
						Please wait while we process your request. This may take a
						while......
					</p>
				)}
			</div>
		</>
	);
}

export default CanvasWrapper;
