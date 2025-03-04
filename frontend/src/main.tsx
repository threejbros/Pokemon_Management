import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
// import App from './App.js';

// For now
import { TrainerPokemonTable } from './components/trainerPokemonTable';
import { TrainersTable } from './components/trainersTable';
import { PokemonTable } from './components/pokemonTable';

const container = document.getElementById('content');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <PokemonTable />
            </Provider>
        </React.StrictMode>
    );
}
else {
    throw new Error (
        "Root element with id 'content' not found in document."
    );
}

