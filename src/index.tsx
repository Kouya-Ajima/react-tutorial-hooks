/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Square from './Square';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Square />
    </React.StrictMode>
);
