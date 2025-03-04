import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../types/Pokemon';

export const pokemonAPI = createApi({
    reducerPath: 'pokemonAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/pokemons'}),
    endpoints: (builder) => ({
        getAllIndividualPokemons: builder.query<{allPokemons: Pokemon[], count: number}, void>({
            query: () => '',
        }),
        createNewPokemon: builder.mutation<Pokemon, Pokemon>({
            query: (pokemon) => ({
                url: '',
                method: 'POST', 
                body: pokemon
            })
        }),
        getSinglePokemon: builder.query<Pokemon, string>({
            query: (pokemon_id) => `/${pokemon_id}`
        }),
        editPokemon: builder.mutation<string, {pokemon_id: string, updatedPokemon: Pokemon}>({
            query: ({pokemon_id, updatedPokemon}) => ({
                url: `/${pokemon_id}`,
                method: 'PATCH', 
                body: updatedPokemon
            })
        }),
        removePokemon: builder.mutation<string, string>({
            query: (pokemon_id) => ({
                url: `/${pokemon_id}`,
                method: 'DELETE'
            })
        }),
        getAllPokemonForSpecifiedTrainer: builder.query<{allPokemonsWithSpecifiedTrainer: Pokemon[], count: number}, string>({
            query: (trainer_id) => `/trainers/${trainer_id}`
        }),
        addPokemonForTrainer: builder.mutation<{newPokemonForTrainer: Pokemon, msg: string}, {trainer_id: string, pokemon_id: string}>({
            query: ({trainer_id, pokemon_id}) => ({
                url: `/trainers/${trainer_id}`,
                method: 'POST',
                body: {pokemon_id}
            })
        })
    })
});

export const {
    useGetAllIndividualPokemonsQuery,
    useCreateNewPokemonMutation,
    useGetSinglePokemonQuery,
    useEditPokemonMutation,
    useRemovePokemonMutation,
    useGetAllPokemonForSpecifiedTrainerQuery,
    useAddPokemonForTrainerMutation
} = pokemonAPI;