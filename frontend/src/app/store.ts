/**
 * Redux Toolkit store configuration
 */
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonAPI } from "../services/pokemon";
import { pokemonMovesAPI } from "../services/pokemonMoves";
import { trainerAPI } from "../services/trainer";

export const store = configureStore({
    reducer: {
        [pokemonAPI.reducerPath]: pokemonAPI.reducer, 
        [pokemonMovesAPI.reducerPath]: pokemonMovesAPI.reducer,
        [trainerAPI.reducerPath]: trainerAPI.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(pokemonAPI.middleware)
            .concat(pokemonMovesAPI.middleware)
            .concat(trainerAPI.middleware),
});

setupListeners(store.dispatch);
