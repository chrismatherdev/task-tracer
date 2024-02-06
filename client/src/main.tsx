import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import '@mantine/core/styles.css';
import { AuthContextProvider } from './context/auth.tsx';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <MantineProvider defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
