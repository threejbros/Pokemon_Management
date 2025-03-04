import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PokemonMoves } from '../types/PokemonMoves'

// Export to integrate this API into Redux store
export const pokemonMovesAPI = createApi({
    reducerPath: 'pokemonMovesAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/moves' }),
    endpoints: (builder) => ({
        getPokemonMoves: builder.query<{allPokemonMoves: PokemonMoves[], count: number}, string>({
            query: (pokemon_id) => `/pokemon/${pokemon_id}`
        }),
        addNewMoveForPokemon: builder.mutation<{newMove: PokemonMoves, msg: string}, {pokemon_id: string, move_name: string}>({
            query: ({pokemon_id, move_name}) => ({
                url: `/pokemon/${pokemon_id}`,
                method: 'POST',
                body: {move_name}
            })
        }),
        editMove: builder.mutation<string, {move_id: string, updatedMove: PokemonMoves}>({
            query: ({move_id, updatedMove}) => ({
                url: `/${move_id}`,
                method: 'PATCH',
                body: updatedMove
            })
        }),
        deleteMove: builder.mutation<string, string>({
            query: (move_id) => ({
                url: `/${move_id}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetPokemonMovesQuery,
    useAddNewMoveForPokemonMutation,
    useEditMoveMutation,
    useDeleteMoveMutation
} = pokemonMovesAPI;