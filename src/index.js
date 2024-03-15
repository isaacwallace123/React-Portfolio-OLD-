import React from 'react';
import AuthorizedProvider from './Utils/Authorized';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack'
import { App } from './App';

import './Assets/Index.css';

createRoot(document.getElementById('root')).render(
  <SnackbarProvider autoHideDuration={3000} maxSnack={3} variant='info'>
    <AuthorizedProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthorizedProvider>
  </SnackbarProvider>
)