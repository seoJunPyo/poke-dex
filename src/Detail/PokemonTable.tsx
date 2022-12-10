import React from 'react';
import styled from '@emotion/styled';
import { PokemonDetailType } from '../Service/PokemonService';
import { renderNumber } from '../Common/RenderNumber';

interface InfoType {
	info: {
		id: number;
		weight: number;
		height: number;
		name: string;
		koreaName: string;
		color: string;
		types: string[];
		image: {
			frontDefault: string;
			dreamWorldFront: string;
			officalArtworkFront: string;
		};
		baseStats: {
			name: string;
			value: number;
		}[];
	};
}

export const BaseAbilityTable = (props: InfoType) => {
	return (
		<Table>
			<tbody>
				<Tr>
					<Th>번호</Th>
					<Td>{renderNumber(props.info.id)}</Td>
				</Tr>
				<Tr>
					<Th>이름</Th>
					<Td>{`${props.info.koreaName}(${props.info.name})`}</Td>
				</Tr>
				<Tr>
					<Th>타입</Th>
					<Td>{props.info.types.toString()}</Td>
				</Tr>
				<Tr>
					<Th>키</Th>
					<Td>{props.info.height} m</Td>
				</Tr>
				<Tr>
					<Th>타입</Th>
					<Td>{props.info.weight} kg</Td>
				</Tr>
			</tbody>
		</Table>
	);
};

export const StatsTable = (props: InfoType) => {
	return (
		<Table>
			<tbody>
				{props.info.baseStats.map((stat) => (
					<Tr key={stat.name}>
						<Th>{stat.name}</Th>
						<Td>{stat.value}</Td>
					</Tr>
				))}
			</tbody>
		</Table>
	);
};

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	margin: 0 auto 16px;

	th,
	td {
		padding: 6px 12px;
	}
`;

const Tr = styled.tr`
	border: 1px solid #f0f0f0;
	border-width: 1px 0;
`;

const Th = styled.th`
	width: 1px;
	white-space: nowrap;
	text-align: left;
	font-weight: normal;
	color: #a0a0a0;
	font-size: 14px;
`;

const Td = styled.td`
	font-size: 14px;
`;
