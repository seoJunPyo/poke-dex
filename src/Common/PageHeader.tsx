import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { POKEMON_IMGAE_TYPE } from '../Constants';
import type { RootState } from '../store/index';
import { useSelector } from 'react-redux';
import { chageImageType, PokempnImageKeyType } from '../store/imageTypeSlice';
import { useAppDispatch } from '../store';

const PageHeader = () => {
	const type = useSelector((state: RootState) => state.imageType.type);
	const dispatch = useAppDispatch();

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(
			chageImageType({
				type: e.target.value as PokempnImageKeyType,
			})
		);
	};

	return (
		<Header>
			<Title>
				<Link to="/">Pokémon</Link>
			</Title>
			<Select value={type} onChange={handleChange}>
				<option value={POKEMON_IMGAE_TYPE.OFFICAIL_ARTWORK}>Official</option>
				<option value={POKEMON_IMGAE_TYPE.DREAM_WORLD}>DreamWorld</option>
				<option value={POKEMON_IMGAE_TYPE.FRONT_DEFAULT}>FrontDefault</option>
			</Select>
		</Header>
	);
};

const Header = styled.nav`
	display: flex;
	padding: 16px 32px;
	margin-bottom: 16px;
	border-bottom: 1px solid #c0c0c0;
`;

const Title = styled.h1`
	color: #ffca09;
	text-shadow: -1px 0 blue, 0 2px blue, 1px 0 blue, 0 -1px blue;
	font-size: 32px;
	font-weight: bold;
`;

const Select = styled.select`
	display: flex;
	margin-left: auto;
	padding: 8px 12px;
	border-radius: 8px;
`;
export default PageHeader;
