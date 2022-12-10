import React from 'react';
import styled from '@emotion/styled';

const MarkChip = () => {
	return (
		<Chip>
			<Text>Pokémon</Text>
		</Chip>
	);
};

const Chip = styled.div`
	display: flex;
	align-content: center;
	margin: 0 0 0 auto;
	border: 1px solid #c0c0c0;
	border-radius: 16px;
	font-weight: bold;
	box-shadow: 0.5px 0 0.5px 0 #c0c0c0;
`;

const Text = styled.label`
	padding: 2px 8px;
	font-size: 14px;
`;
export default MarkChip;
