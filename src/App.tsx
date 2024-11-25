import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { UsuariosProvider } from './context/UsuariosContext';

const App: React.FC = () => {
  return (
    <UsuariosProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UsuariosProvider>
  );
};

export default App;
