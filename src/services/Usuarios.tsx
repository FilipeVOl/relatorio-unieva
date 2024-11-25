import React from 'react'
import axios from 'axios';
import DataKey from '../components/Table';

export type StateType = {
    page: number;
    size: number;
    total_records: number;
    total_pages: number;
    data: Array<{
      aluno_id: string;
      usuario: string;
      aluno: string;
      semestre: string;
      curso: string;
      primeira_etapa: string;
      segunda_etapa: string;
      prova_presencial: string | null;
    }>;
  };
  

const Usuarios = async (
  setData: React.Dispatch<React.SetStateAction<StateType>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>,
  page: number,
) => {
  try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/data`, {
        params: {
          page: page,
          size: 1000 // Set size to a large number to receive all users
        },
      });

      setData(data);
      setTotalPages(data.total_pages);
  } catch (e) {
    throw new Error("Erro ao buscar os dados");
  }
};

export default Usuarios