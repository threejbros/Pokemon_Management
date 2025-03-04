import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { TrainerPokemonTable } from '../components/trainerPokemonTable';
import { PokemonTable } from '../components/pokemonTable';
import { TrainersTable } from '../components/trainersTable';

export default function Contents() {
    const NotFound = () => <h1>Page Not Found</h1>

    return (
        <Routes>
            <Route path="/home" element={<TrainerPokemonTable/>} />
            {/* <Route path="/edit/:id" element={<EmployeeEdit/>} /> */}
            <Route path="/trainers" element={<TrainersTable/>} />
            <Route path="/pokemons" element={<PokemonTable/>} />
            <Route path="/" element={<Navigate replace to="/home"/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        
    )
}