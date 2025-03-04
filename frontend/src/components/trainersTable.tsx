import React from 'react';
import { useGetAllTrainersQuery, useRemoveTrainerMutation } from '../services/trainer';
import { Trainer } from '../types/Trainer';
import { useGetAllPokemonForSpecifiedTrainerQuery, useRemovePokemonMutation } from '../services/pokemon';


const TrainerRow: React.FC<{trainer: Trainer}> = ({trainer}) => {
    const {data, error, isLoading: isPokemonLoading} = useGetAllPokemonForSpecifiedTrainerQuery(trainer._id);

    const [deleteTrainer] = useRemoveTrainerMutation();
    const [deletePokemon] = useRemovePokemonMutation();
    
    if(isPokemonLoading) {
        return <tr><td colSpan={5}>Loading Pokemon for {trainer.name}...</td></tr>
    }
    if (error) {
        return <tr><td colSpan={5}>Error Loading Pokemon for {trainer.name}</td></tr>
    }

    // If the trainer has no pokemons, then disable the dropdown and show "No Pokemons trained"
    // Otherwise, if the trainer has pokemons, show all the pokemons in the dropdown.
    const pokemonOptions = data?.allPokemonsWithSpecifiedTrainer?.length
        ? data.allPokemonsWithSpecifiedTrainer
            .filter((pokemon) => pokemon !== null && pokemon !== undefined) 
            .map((pokemon) => (<option key={pokemon._id} value={pokemon.name}>{pokemon.name}</option>))
        : <option key="noPokemon" disabled>No Pokemon Trained</option>;

    // We also need to resolve the scenario where loading is happening and when an error occurs.
    // If we don't do this then if loading or an error occurs, then the dropdown could break or be empty.
    // So, if there is loading or error, put the corresponding message. 
    const pokemonDropdownList = (isPokemonLoading) ? (<span>Loading Pokemon...</span>) 
            : (error ? <span>Error Loading</span> : (
                <select>
                    <option value="">Show Pokemon</option>
                    {pokemonOptions}
                </select>
    ));

    const handleDelete = async() => {
        try {
            // First, delete the trainer
            await deleteTrainer(trainer._id).unwrap();
            console.log(`Deleted Trainer with ID ${trainer._id}`);
            // Next, delete all instances of pokemon assiciation with this trainer
            if (data?.allPokemonsWithSpecifiedTrainer && data.allPokemonsWithSpecifiedTrainer.length) {
                await Promise.all(
                    data.allPokemonsWithSpecifiedTrainer
                        .filter((pokemon) => pokemon !== null && pokemon !== undefined) 
                        .map((pokemon) => deletePokemon(pokemon._id).unwrap())
                );
                console.log(`Deleted all Pokemon associated with Trainer ID ${trainer._id}`);
            }
        }
        catch (err) {
            console.log('Error: failed to delete Trainer: ', err);
        }
    };

    return (
        <tr>
            <td>{trainer.name}</td>
            <td>{data?.count}</td>
            <td>{pokemonDropdownList}</td>
            <td><button type="button">Add Pokemon</button></td>
            <td><button type="button" onClick={handleDelete}>X</button></td>
        </tr>
    )
};

export const TrainersTable: React.FC = () => {
    const {data, error, isLoading: isLoadingTrainers } = useGetAllTrainersQuery();

    if(isLoadingTrainers) {
        return <p>Loading Trainers...</p>;
    }
    if (error) {
        return <p>Error Loading Trainers</p>;
    }

    const trainerPokemonRows = data?.allTrainers
        .filter((trainer) => trainer !== null && trainer !== undefined) 
        .map((trainer) => (<TrainerRow key={trainer._id} trainer={trainer} />
    ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Trainer Name</th>
                    <th># of Pokemons</th>
                    <th>Pokemon List</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {trainerPokemonRows}
            </tbody>
        </table>
    );
};