import axios from 'axios';

export const remote = axios.create();

//https://pokeapi.co/api/v2/pokemon/

export interface PokemonListResponseType {
	count: number;
	next: string;
	results: {
		name: string;
		url: string;
	}[];
}

export const fetchPokemonsAPI = async (nextUrl?: string) => {
	const requesetUrl = nextUrl ? nextUrl : 'https://pokeapi.co/api/v2/pokemon/';
	const response = await remote.get<PokemonListResponseType>(requesetUrl);

	return response.data;
};

interface PokemonDetailResponseType {
	id: number;
	weight: number;
	height: number;
	name: string;
	types: {
		type: {
			name: string;
		};
	}[];
	sprites: {
		front_default: string;
		other: {
			dream_world: {
				front_default: string;
			};
			'official-artwork': {
				front_default: string;
			};
		};
	};
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
}

interface PokemonSpeciesResponssType {
	color: {
		name: string;
	};
	names: {
		name: string;
		language: {
			name: string;
		};
	}[];
}

export interface PokemonDetailType {
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
}

export const fetchPokemonDetailAPI = async (
	name: string
): Promise<PokemonDetailType> => {
	const pokomonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
	const pokomonSpecieslUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

	const response = await remote.get<PokemonDetailResponseType>(
		pokomonDetailUrl
	);
	const speciesResponss = await remote.get<PokemonSpeciesResponssType>(
		pokomonSpecieslUrl
	);
	const detail = response.data;
	const species = speciesResponss.data;

	return {
		id: detail.id,
		name: detail.name,
		koreaName:
			species.names.find((item) => {
				return item.language.name === 'ko';
			})?.name ?? detail.name,
		color: species.color.name,
		height: detail.height / 10,
		weight: detail.weight / 10,
		types: detail.types.map((item) => item.type.name),
		image: {
			frontDefault: detail.sprites.front_default,
			dreamWorldFront: detail.sprites.other.dream_world.front_default,
			officalArtworkFront:
				detail.sprites.other['official-artwork'].front_default,
		},
		baseStats: detail.stats.map((item) => {
			return {
				name: item.stat.name,
				value: item.base_stat,
			};
		}),
	};
};
