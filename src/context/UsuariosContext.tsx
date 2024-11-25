import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StateType } from '../services/Usuarios';

interface UsuariosContextType {
  data: StateType;
  setData: React.Dispatch<React.SetStateAction<StateType>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const UsuariosContext = createContext<UsuariosContextType | undefined>(undefined);

export const UsuariosProvider: React.FC = ({ children }) => {
  const initialState: StateType = {
    page: 0,
    size: 0,
    total_records: 0,
    total_pages: 0,
    data: []
  };

  const [data, setData] = useState<StateType>(initialState);
  const [totalPages, setTotalPages] = useState<number>(0);

  return (
    <UsuariosContext.Provider value={{ data, setData, totalPages, setTotalPages }}>
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);
  if (context === undefined) {
    throw new Error('useUsuarios must be used within a UsuariosProvider');
  }
  return context;
};