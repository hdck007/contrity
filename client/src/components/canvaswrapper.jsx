import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import Reponame from './reponame';
import SHAText from './shatext';

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
		const blob = dataURLtoBlob(stageRef.current.content.firstChild.toDataURL());
		const formData = new FormData();
		formData.append('file', blob);
		const response = await fetch('https://api.nft.storage/upload', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNGMDRBMDUyZjcyMzhDRjkzNkIwYTY4ZkUyZDYwZTZFNGNhRDdENUUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTQwOTMwOTAwOSwibmFtZSI6Im15bmFtZSJ9.QWRhy2ePwIkyDPyFBKhFAmFgAQJ4HmHCVbiUu9Q-sHc',
			},
		}).then((data) => data.json());
		write({
      recklesslySetUnpreparedArgs: [`https://${response.value.cid}.ipfs.nftstorage.link/blob`, pr],
    });
	};

	const { width } = widthObj[config.size];
	const { height } = widthObj[config.size];

	const image = new window.Image();
	const ownerImage = new window.Image();
	if (githubDetails) {
		image.src = githubDetails.head.user.avatar_url;
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
				<button
					className='btn btn-primary mx-5 hover:bg-purple-400'
					type='button'
					disabled={!write || isDisconnected}
					onClick={handleMint}
				>
					Mint
				</button>
				<br />
				<br />
				<br />
				<button
					className='btn btn-ghost mx-5'
					type='button'
					disabled={!write || isDisconnected}
					onClick={() => setIsOpen(false)}
				>
					Close
				</button>
			</div>
		</>
	);
}

export default CanvasWrapper;
