import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './pages/App.js';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'

const container = document.getElementById('content');
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>
        </BrowserRouter>
    );
}
else {
    throw new Error (
        "Root element with id 'content' not found in document."
    );
}

