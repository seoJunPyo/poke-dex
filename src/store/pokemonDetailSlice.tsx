import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchPokemonDetailAPI,
	PokemonDetailType,
} from '../Service/PokemonService';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const fetchPokemonsDetail = createAsyncThunk(
	'pokemon/fetchPokemonsDetail',
	async (name: string) => {
		const response = await fetchPokemonDetailAPI(name);
		return response;
	},
	{
		condition: (name, { getState }) => {
			const { pokemonDetail } = getState() as RootState;
			const pokmon = pokemonDetail.pokemonDetails[name];
			return !pokmon;
		},
	}
);

interface PokemonsDetailState {
	pokemonDetails: Record<string, PokemonDetailType>;
}

const initialState = {
	pokemonDetails: {},
} as PokemonsDetailState;

export const pokemonsDetailSlice = createSlice({
	name: 'pokemonsDetail',
	initialState,
	reducers: {},
	extraReducers: (builer) => {
		builer.addCase(
			fetchPokemonsDetail.fulfilled,
			(state, action: PayloadAction<PokemonDetailType>) => {
				state.pokemonDetails = {
					...state.pokemonDetails,
					[action.payload.name]: action.payload,
				};
			}
		);
	},
});
