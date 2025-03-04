import React from 'react';
import Tooltip from '@mui/material/Tooltip'
import { useGetAllTrainersQuery } from '../services/trainer';
import { Trainer } from '../types/Trainer';
import { useGetAllPokemonForSpecifiedTrainerQuery } from '../services/pokemon';
import { Pokemon } from '../types/Pokemon';
import { useGetPokemonMovesQuery } from '../services/pokemonMoves';

const PokemonRow: React.FC<{pokemon: Pokemon; trainer: Trainer}> = ({pokemon, trainer}) => {
    const {data, error, isLoading: isPokemonMovesLoading} = useGetPokemonMovesQuery(pokemon._id);

    // If the pokemon has no moves, then disable the dropdown and show "No moves available."
    // Otherwise if there are moves, show all the options in the dropdown.
    const moveOptions = data?.allPokemonMoves?.length 
        ? data.allPokemonMoves.map((move) => (
            <option key={move._id} value={move.name}>{move.name}</option>))
        : <option key="nomoves" disabled>No Moves Available</option>;
        
    // We also need to resolve the scenarios where loading is happening and when an error occurs.
    // If we don't do this then if loading or an error occurs, then the dropdown could break or be empty.
    // So, if there is loading or error, put the corresponding message
    const moves = (isPokemonMovesLoading) ? (<span>Loading moves...</span>)
            : (error ? <span>Error Loading</span> : (
                <select>
                    <option value="">Show Moves</option>
                    {moveOptions}
                </select>));
    
    return (
        <tr>
            <td>{trainer.name}</td>
            <td>{pokemon.name}</td>
            <td>
                <Tooltip title={pokemon._id}>
                    <span>{`...${pokemon._id.slice(-5)}`}</span>
                </Tooltip>
            </td>
            <td>
                {moves}
            </td>
        </tr>
    );
    
};

const TrainerRow: React.FC<{trainer: Trainer}> = ({trainer}) => {
    const {data, error, isLoading: isPokemonLoading} = useGetAllPokemonForSpecifiedTrainerQuery(trainer._id);

    if(isPokemonLoading){
        return <tr><td colSpan={4}>Loading Pokemon for {trainer.name}...</td></tr>;
    }
    if (error) {
        return <tr><td colSpan={4}>Error Loading Pokemon for {trainer.name}</td></tr>;
    }

    if (!data?.allPokemonsWithSpecifiedTrainer || data.allPokemonsWithSpecifiedTrainer.length === 0) {
        return null;
    }

    const pokemonMoveRows = data?.allPokemonsWithSpecifiedTrainer?.map((pokemon) => (
        <PokemonRow key={pokemon._id} pokemon={pokemon} trainer={trainer}/>
    ));

    return <>{pokemonMoveRows}</>;
};

export const TrainerPokemonTable: React.FC = () => {
    const { data, error, isLoading: isLoadingTrainers } = useGetAllTrainersQuery();

    if (isLoadingTrainers) {
        return <p>Loading Trainers...</p>;
    }
    if (error) {
        return <p>Error Loading Trainers</p>;
    }

    const trainerPokemonRows = data?.allTrainers?.length 
        ? data?.allTrainers?.map((trainer) => (
            <TrainerRow key={trainer._id} trainer={trainer} />))
        : (<tr><td colSpan = {4}> No Data Available. Add Trainers with Pokemons First.</td></tr>);
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Trainer Name</th>
                    <th>Pokemon Name</th>
                    <th>Pokemon ID</th>
                    <th>Pokemon Moves</th>
                </tr>
            </thead>
            <tbody>
                {trainerPokemonRows}
            </tbody>
        </table>
    );
};