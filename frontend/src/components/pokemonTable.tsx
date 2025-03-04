import React from 'react';
import Tooltip from '@mui/material/Tooltip'
import { useGetAllIndividualPokemonsQuery, useRemovePokemonMutation } from '../services/pokemon';
import { Pokemon } from '../types/Pokemon';
import { useGetTrainerForSpecificPokemonQuery } from '../services/trainer';
import { useDeleteMoveMutation, useGetPokemonMovesQuery } from '../services/pokemonMoves';

const PokemonRowWithMoves: React.FC<{pokemon: Pokemon; trainerName: string}> = ({pokemon, trainerName}) => {
    // Now, we need to get the pokemon moves.
    const {data: movesData, error: movesError, isLoading: isPokemonMovesLoading} = useGetPokemonMovesQuery(pokemon._id);

    const [deletePokemon] = useRemovePokemonMutation();
    const [deleteMove] = useDeleteMoveMutation();
    

    // If the pokemon has no moves, then disable the dropdown and show "No moves available."
    // Otherwise if there are moves, show all the options in the dropdown.
    const moveOptions = movesData?.allPokemonMoves?.length
        ? movesData?.allPokemonMoves
           .filter((move) => move !== null && move !== undefined) 
           .map((move) => (<option key={move._id} value={move.name}>{move.name}</option>))
        : <option key="nomoves" disabled>No Moves Available</option>;
    // We also need to resolve the scenarios where loading is happening and when an error occurs.
    // If we don't do this then if loading or an error occurs, then the dropdown could break or be empty.
    // So, if there is loading or error, put the corresponding message
    const moves = (isPokemonMovesLoading) ? (<span>Loading moves...</span>)
            : (movesError ? <span>Error Loading</span> : (
                <select>
                    <option value="">Show Moves</option>
                    {moveOptions}
                </select>));

    
    const handleDelete = async () => {
        try {
            // First delete the pokemon
            await deletePokemon(pokemon._id).unwrap();
            console.log(`Deleted Pokemon with ID ${pokemon._id}`);
            // Next, delete all moves related to that pokemon 
            if(movesData?.allPokemonMoves && movesData.allPokemonMoves.length) {
                await Promise.all(
                    movesData.allPokemonMoves
                        .filter((moves) => moves !== null && moves !== undefined)
                        .map((move) => deleteMove(move._id))
                );
                console.log(`Deleted all Moves associated with Pokemon ID ${pokemon._id}`);
            }
        }
        catch (err) {
            console.log('Error: failed to delete Pokemon: ', err);
        }
    };
     
     return (
         <tr>
             <td>{pokemon.name}</td>
             <td>{trainerName}</td>
             <td>                
                 <Tooltip title={pokemon._id}>
                     <span>{`...${pokemon._id.slice(-5)}`}</span>
                 </Tooltip>
             </td>
             <td>{movesData?.count}</td>
             <td>{moves}</td>
             <td><button type="button">Add Move</button></td>
             <td><button type="button" onClick={handleDelete}>X</button></td>
         </tr>
     );
};

const PokemonRow: React.FC<{pokemon: Pokemon}> = ({pokemon}) => {
    const {data: trainerData, error: trainerError, isLoading: isLoadingTrainer} = useGetTrainerForSpecificPokemonQuery(pokemon._id);
    if (isLoadingTrainer) {
        return <tr><td colSpan={7}>Loading Trainer for {pokemon.name}...</td></tr>;
    }
    if (trainerError) {
        return <tr><td colSpan={7}>Error Loading Trainer for {pokemon.name}.</td></tr>
    }

    // if the pokemon has no trainer, then trainerName is "". otherwise, it's the trainer's name
    const trainerName = trainerData?.trainer ? trainerData.trainer.name : "";

    return <PokemonRowWithMoves key={pokemon._id} pokemon={pokemon} trainerName={trainerName}/>;
};

export const PokemonTable: React.FC = () => {
    const {data, error, isLoading: isLoadingPokemon} = useGetAllIndividualPokemonsQuery();

    if (isLoadingPokemon) {
        return <p>Loading Pokemons...</p>;
    }
    if (error) {
        return <p>Error Loading Pokemons</p>;
    }

    const pokemonRows = data?.allPokemons?.length
        ? data?.allPokemons
            .filter((pokemon) => pokemon !== null && pokemon !== undefined)
            .map((pokemon) => (<PokemonRow key={pokemon._id} pokemon={pokemon} />))
        : (<tr><td colSpan={7}>No Pokemons Available. Create Pokemons First.</td></tr>)

    return (
        <table>
            <thead>
                <tr>
                    <th>Pokemon Name</th>
                    <th>Trainer Name</th>
                    <th>Pokemon ID</th>
                    <th># of Moves</th>
                    <th>Moves</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {pokemonRows}
            </tbody>
        </table>
    );
};