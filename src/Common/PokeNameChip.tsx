import React from 'react';
import styled from '@emotion/styled';
import { renderNumber } from './RenderNumber';

interface PokemonChipProps {
	color: string;
	name: string;
	id: number;
}

const PokeNameChip = (props: PokemonChipProps) => {
	return (
		<Chip>
			<Number color={props.color}>{renderNumber(props.id)}</Number>
			<Text>{props.name}</Text>
		</Chip>
	);
};

const Chip = styled.div`
	display: flex;
	align-content: center;
	/* padding: 4px; */
	border: 1px solid #c0c0c0;
	border-radius: 16px;
	font-size: 16px;
	font-weight: bold;
	box-shadow: 0.5px 0 0.5px 0 #c0c0c0;
`;

const Number = styled.label<{ color: string }>`
	display: flex;
	align-items: center;
	padding: 4px 6px;
	background-color: ${(props) => props.color};
	border-radius: 16px;
`;

const Text = styled.label`
	display: flex;
	align-items: center;
	margin: 0 8px 0 5px;
`;

export default PokeNameChip;
