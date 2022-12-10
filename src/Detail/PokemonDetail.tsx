import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { BaseAbilityTable, StatsTable } from './PokemonTable';
import MarkChip from '../Common/MarkChip';
import { useParams } from 'react-router-dom';
import { PokeImageSkeleton } from '../Common/PokeImageSkeleton';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchPokemonsDetail } from '../store/pokemonDetailSlice';

const PokemonDetail = () => {
	let { name } = useParams();
	const dispatch = useAppDispatch();
	const { pokemonDetails } = useSelector(
		(state: RootState) => state.pokemonDetail
	);
	const pokemon = name ? pokemonDetails[name] : null;
	const imageType = useSelector((state: RootState) => state.imageType.type);

	useEffect(() => {
		if (!name) {
			return;
		}
		dispatch(fetchPokemonsDetail(name));
	}, [dispatch, name]);

	if (!name || !pokemon) {
		return (
			<Container>
				<ImgContainer>
					<PokeImageSkeleton />
				</ImgContainer>
				<Devider />
				<Footer>
					<MarkChip />
				</Footer>
			</Container>
		);
	}

	return (
		<Container>
			<ImgContainer>
				<Img src={pokemon.image[imageType]} alt={pokemon?.koreaName} />
			</ImgContainer>
			<Devider />
			<Body>
				<TableTitle>기본 정보</TableTitle>
				<BaseAbilityTable info={pokemon} />
				<TableTitle>능력치</TableTitle>
				<StatsTable info={pokemon} />
			</Body>
			<Footer>
				<MarkChip />
			</Footer>
		</Container>
	);
};

const Container = styled.section`
	margin: 16px 32px;
	border: 1px solid #c0c0c0;
	border-radius: 16px;
	box-shadow: 1px 1px 1px 1px #c0c0c0;
`;

const ImgContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 32px 0;
	min-height: 350px;
`;

const Img = styled.img`
	width: 350px;
	height: 350px;
`;

const Devider = styled.hr`
	margin: 32px;
	border-style: none;
	border-bottom: 1px dotted #d3d3d3;
`;

const Body = styled.section`
	margin: 0 32px;
`;

const TableTitle = styled.h2`
	font-size: 20px;
	font-weight: bold;
	margin: 20px 0;
`;

const Footer = styled.section`
	display: flex;
	flex-direction: row;
	margin: 32px 16px 16px;
`;
export default PokemonDetail;
