import React, { useEffect, useState } from 'react';
import PokeCard from './PokeCard';
import styled from '@emotion/styled';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useAppDispatch } from '../store';
import { fetchPokemons } from '../store/pokemonSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PokeCardList = () => {
	const dispatch = useAppDispatch();
	const { pokemons } = useSelector((state: RootState) => state.pokemons);

	useEffect(() => {
		dispatch(fetchPokemons());
	}, [dispatch]);

	const [inifiniteRef] = useInfiniteScroll({
		loading: false,
		hasNextPage: pokemons.next !== '',
		onLoadMore: async () => {
			dispatch(fetchPokemons(pokemons.next));
		},
		disabled: false,
		rootMargin: '0px 0px 400px 0px',
	});

	return (
		<>
			<List>
				{pokemons.results.map((pokemon, idx) => (
					<PokeCard key={`${pokemon.name}_${idx}`} name={pokemon.name} />
				))}
			</List>
			{/* <div ref={inifiniteRef}>
				<Loading>Loading...</Loading>
			</div> */}
		</>
	);
};

const Loading = styled.div`
	display: flex;
	justify-content: center;
`;

const List = styled.ul`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	gap: 20px;
	list-style: none;
	margin-bottom: 32px;
`;

export default PokeCardList;
