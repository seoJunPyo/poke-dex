import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PokeNameChip from '../Common/PokeNameChip';
import MarkChip from '../Common/MarkChip';
import { useNavigate } from 'react-router-dom';
import { PokeImageSkeleton } from '../Common/PokeImageSkeleton';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchPokemonsDetail } from '../store/pokemonDetailSlice';

interface PokeCardProps {
	name: string;
}

const PokeCard = (props: PokeCardProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const imageType = useSelector((state: RootState) => state.imageType.type);
	const { pokemonDetails } = useSelector(
		(state: RootState) => state.pokemonDetail
	);
	const [ref, { entry }] = useIntersectionObserver();
	const isVisible = entry && entry.isIntersecting;

	const pokemon = pokemonDetails[props.name];

	useEffect(() => {
		if (!isVisible) {
			return;
		}
		dispatch(fetchPokemonsDetail(props.name));
	}, [dispatch, props.name, isVisible]);

	if (!pokemon) {
		return (
			<Item ref={ref}>
				<Header>
					<PokeNameChip name={'?'} color={'#ffca09'} id={0} />
				</Header>
				<Body>
					<PokeImageSkeleton />
				</Body>
				<Footer>
					<MarkChip />
				</Footer>
			</Item>
		);
	}

	const handleClick = () => {
		navigate(`/pokemon/${pokemon.name}`);
	};

	return (
		<Item onClick={handleClick} ref={ref}>
			<Header>
				<PokeNameChip
					name={pokemon.koreaName}
					id={pokemon.id}
					color={pokemon.color}
				/>
			</Header>
			<Body>
				<Image src={pokemon.image[imageType]} alt={pokemon.name} />
			</Body>
			<Footer>
				<MarkChip />
			</Footer>
		</Item>
	);
};

const Item = styled.li`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 250px;
	height: 300px;
	padding: 12px 10px;
	border: 1px solid #c0c0c0;
	border-radius: 8px;
	box-shadow: 1px 1px 3px 1px #c0c0c0;
	cursor: pointer;

	&:hover {
		transform: scale(0.95);
		transition: transform 0.3s;
	}
`;

const Header = styled.section`
	display: flex;
`;

const Body = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 8px 0;
`;

const Image = styled.img`
	width: 180px;
	height: 180px;
`;

const Footer = styled.section`
	display: flex;
	flex-direction: row;
`;

export default PokeCard;
