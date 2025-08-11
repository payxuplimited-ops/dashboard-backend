// start-backend.js
import { register } from 'ts-node';
import { pathToFileURL } from 'node:url';

register({
  esm: true,
  project: './tsconfig.json', // Ajusta si usas otro tsconfig
});

import('./backend/src/index.ts');
