import { createSlice } from "@reduxjs/toolkit";

export const pokemonReducer = createSlice({
  name: "pokemonReducer",
  initialState: {
    pokemons: [],
  },
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
  },
});

export const { setPokemons } = pokemonReducer.actions;

export default pokemonReducer.reducer;
