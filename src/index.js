import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/AuthApp'; // Asegúrate de que la ruta sea correcta

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

