import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { ThemeProvider, SearchProvider } from './components';
import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
        <Router>
            <StateContextProvider>
                <ThemeProvider initialTheme="dark">
                    <SearchProvider>
                        <App />
                    </SearchProvider>
                </ThemeProvider>
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)