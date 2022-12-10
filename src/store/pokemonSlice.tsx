import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchPokemonsAPI,
	PokemonListResponseType,
} from '../Service/PokemonService';
import type { PayloadAction } from '@reduxjs/toolkit';

export const fetchPokemons = createAsyncThunk(
	'pokemon/fetchPokemonsAPI',
	async (nextUrl?: string) => {
		const response = await fetchPokemonsAPI(nextUrl);
		return response;
	}
);

interface PokemonsState {
	pokemons: PokemonListResponseType;
}

const initialState = {
	pokemons: {
		count: 0,
		next: '',
		results: [],
	},
} as PokemonsState;

export const pokemonsSlice = createSlice({
	name: 'pokemons',
	initialState,
	reducers: {},
	extraReducers: (builer) => {
		builer.addCase(
			fetchPokemons.fulfilled,
			(state, action: PayloadAction<PokemonListResponseType>) => {
				if (state.pokemons.results.length > 0) {
					state.pokemons = {
						...action.payload,
						results: [...state.pokemons.results, ...action.payload.results],
					};
				} else {
					state.pokemons = action.payload;
				}
			}
		);
	},
});
