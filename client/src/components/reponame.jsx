import React from 'react';
import { Text } from 'react-konva';

function Reponame({ reponame, width, height, count }) {
	return (
		<>
			{new Array(count).fill(0).map((_, i) => (
				<Text
					draggable
					key={i + reponame}
					rotation={90}
					fontFamily='Roboto'
					strokeWidth={1}
					stroke={`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
						Math.random() * 255
					})`}
					x={Math.random() * width}
					y={Math.random() * height * 0.8}
					fontSize={width / 33}
					text={reponame}
				/>
			))}
		</>
	);
}

export default Reponame;
