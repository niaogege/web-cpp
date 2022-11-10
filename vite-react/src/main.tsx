import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import fib from 'virtual:fib';
// main.tsx
import env from 'virtual:env';
console.log(env, 'ENV');
console.log(fib(10), 'FIB');
console.log(import.meta, 'Meat');
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
