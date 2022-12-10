import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { POKEMON_IMGAE_TYPE } from '../Constants';

export type PokempnImageKeyType =
	typeof POKEMON_IMGAE_TYPE[keyof typeof POKEMON_IMGAE_TYPE];

export interface ImageTypeState {
	type: PokempnImageKeyType;
}

const initialState: ImageTypeState = {
	type: POKEMON_IMGAE_TYPE.FRONT_DEFAULT,
};

export const imageTypeSlice = createSlice({
	name: 'imageType',
	initialState,
	reducers: {
		chageImageType: (state, action: PayloadAction<ImageTypeState>) => {
			state.type = action.payload.type;
		},
	},
});

export const { chageImageType } = imageTypeSlice.actions;

export const imageTypeReducer = imageTypeSlice.reducer;
