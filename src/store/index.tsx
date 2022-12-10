import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { imageTypeReducer } from './imageTypeSlice';
import { pokemonsDetailSlice } from './pokemonDetailSlice';
import { pokemonsSlice } from './pokemonSlice';

export const store = configureStore({
	reducer: {
		imageType: imageTypeReducer,
		pokemons: pokemonsSlice.reducer,
		pokemonDetail: pokemonsDetailSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
