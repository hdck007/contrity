import React from 'react';
import { Text } from 'react-konva';

function SHAText({ text, width, height, count }) {
	return (
		<>
			{new Array(count).fill(0).map((_, i) => (
				<Text
					key={i + text}
					fontFamily='Poppins'
					strokeWidth={1}
					stroke={`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
						Math.random() * 255
					})`}
					x={Math.random() * width * 0.4}
					y={Math.random() * height}
					fontSize={width / 33}
					text={text}
				/>
			))}
		</>
	);
}

export default SHAText;
