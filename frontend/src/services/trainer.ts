import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import type { Trainer } from '../types/Trainer';

export const trainerAPI = createApi({
    reducerPath: 'trainerAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api'}),
    tagTypes: ['allTrainers'],
    endpoints: (builder) => ({
        getAllTrainers: builder.query<{allTrainers: Trainer[], count: number}, void>({
            query: () => '/trainers',
            providesTags: ['allTrainers']
        }),
        createNewTrainer: builder.mutation<Trainer, Trainer>({
            query: (trainer) => ({
                url: '/trainers',
                method: 'POST',
                body: trainer
            })
        }),
        getSingleTrainer: builder.query<Trainer, string>({
            query: (trainer_id) => `/trainers/${trainer_id}`,
        }),
        editTrainer: builder.mutation<string, {trainer_id: string; updatedTrainer: Trainer}>({
            query: ({trainer_id, updatedTrainer}) => ({
                url: `/trainers/${trainer_id}`,
                method: 'PATCH',
                body: updatedTrainer
            })
        }),
        removeTrainer: builder.mutation<string, string>({
            query: (trainer_id) => ({
                url: `/trainers/${trainer_id}`,
                method: 'DELETE'
            }), 
            invalidatesTags: ['allTrainers']
        }),
        getTrainerForSpecificPokemon: builder.query<{trainer: Trainer; msg: string}, string>({
            query: (pokemon_id) => `/trainers/pokemon/${pokemon_id}`,
            transformResponse: (response: any, meta: FetchBaseQueryMeta | undefined , arg: string) => {
                if (meta?.response?.status === 404) {
                  return { trainer: null, msg: `Pokemon with ID ${arg} not found or has no trainer assigned in TrainerPokemon table.` };
                }
                return response;
            }
        })
    }),
});

export const {
    useGetAllTrainersQuery,
    useCreateNewTrainerMutation,
    useGetSingleTrainerQuery,
    useEditTrainerMutation,
    useRemoveTrainerMutation, 
    useGetTrainerForSpecificPokemonQuery
} = trainerAPI;