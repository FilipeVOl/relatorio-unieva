import React, { useEffect, useState, useContext } from "react";
import { useUsuarios } from "../context/UsuariosContext";
import { StateType } from '../services/Usuarios';

type DataKey = "aluno" | "curso" | "usuario";

type OptionValues = {
  name: "dontcontainname" | "containname" | "equaltoname" | "startswithname" | "endswithname";
  discipline: "dontcontaindisc" | "containdisc" | "equaltodisc" | "startswithdisc" | "endswithdisc";
  user: "dontcontainuser" | "containuser" | "equaltouser" | "startswithuser" | "endswithuser";
};

interface TableProps {
  filteredName?: string;
  filteredDiscipline?: string;
  filteredUsers?: string;
  optionValues: OptionValues;
  tableRef: React.RefObject<HTMLTableElement>;
}

export const getFilteredData = (data: any, filteredName: string, filteredDiscipline: string | number, optionValues: OptionValues, filteredUsers: string | number) => {
  let filteredData = data.data;
  const filters = [
    { key: "aluno" as DataKey, 
      value: filteredName, 
      option: optionValues.name },
    {
      key: "curso" as DataKey,
      value: filteredDiscipline,
      option: optionValues.discipline,
    },
    {
      key: "usuario" as DataKey,
      value: filteredUsers,
      option: optionValues.user,
    },
  ];


  let i = 0;
  while (i < filters.length) {
    const { key, value, option } = filters[i];

    if (value) {
      switch (option) {
        case "dontcontainname":
        case "dontcontaindisc":
        case "dontcontainuser":
          filteredData = filteredData.filter(
            (aluno: StateType['data'][number]) => typeof value === 'string' && !(aluno[key] as string).toLowerCase().includes(value.toLowerCase())
          );
          break;
        case "containname":
        case "containdisc":
        case "containuser":
          filteredData = filteredData.filter((aluno: StateType['data'][number]) =>
            typeof value === 'string' && (aluno[key] as string).toLowerCase().includes(value.toLowerCase())
          );
          break;
        case "equaltoname":
        case "equaltodisc":
        case "equaltouser":
          filteredData = filteredData.filter(
            (aluno: StateType['data'][number]) => typeof value === 'string' && (aluno[key] as string).toLowerCase() === value.toLowerCase()
          );
          break;
        case "startswithname":
        case "startswithdisc":
        case "startswithuser":
          filteredData = filteredData.filter((aluno: StateType['data'][number]) =>
            typeof value === 'string' && (aluno[key] as string).toLowerCase().startsWith(value.toLowerCase())
          );
          break;
        case "endswithname":
        case "endswithdisc":
        case "endswithuser":
          filteredData = filteredData.filter((aluno: StateType['data'][number]) =>
            typeof value === 'string' && (aluno[key] as string).toLowerCase().endsWith(value.toLowerCase())
          );
          break;
      }
    }
    i++;
  }

  filteredData = filteredData.filter(
    (value: any, index: number, self: any) =>
      index === self.findIndex((aluno: any) => aluno.aluno_id === value.aluno_id)
  );

  let expandedData: any[] = [];
  filteredData.forEach((aluno: any) => {
    const disciplinas = data.data.filter((d: any) => d.aluno_id === aluno.aluno_id);
    disciplinas.forEach((disciplina: any, index: number) => {
      expandedData.push({ ...aluno, curso: disciplina.curso, unique_id: `${aluno.aluno_id}-${index}` });
    });
  });

  if (filteredDiscipline && optionValues.discipline !== "dontcontaindisc") {
    expandedData = expandedData.filter(aluno => 
      typeof filteredDiscipline === 'string' && aluno.curso.toLowerCase().includes(filteredDiscipline.toLowerCase())
    );
  } else if (filteredDiscipline && optionValues.discipline === "dontcontaindisc") {
    expandedData = expandedData.filter(aluno => 
      typeof filteredDiscipline === 'string' && !aluno.curso.toLowerCase().includes(filteredDiscipline.toLowerCase())
    );
  }

  return expandedData;
};

const Table: React.FC<TableProps> = ({
  filteredName = "",
  filteredDiscipline = "",
  filteredUsers = "",
  optionValues,
  tableRef,
}) => {
  const { data, setData, totalPages, setTotalPages } = useUsuarios();
  const [page, setPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0); // New state for page group
  const itemsPerPage = 15;

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setPageGroup(Math.floor((pageNumber - 1) / 5)); // Update pageGroup based on the selected page
  };

  const getPaginatedData = () => {
    const filteredData = getFilteredData(data, filteredName, filteredDiscipline, optionValues, filteredUsers);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const hasNextGroupData = () => {
    const filteredData = getFilteredData(data, filteredName, filteredDiscipline, optionValues, filteredUsers);
    const startIndex = (pageGroup + 1) * 5 * itemsPerPage;
    return startIndex < filteredData.length;
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('usuarios');
    if (cachedData) {
      const data = JSON.parse(cachedData);
      setData(data);
      setTotalPages(Math.ceil(getFilteredData(data, filteredName, filteredDiscipline, optionValues, filteredUsers).length / itemsPerPage));
    }
  }, [setData, setTotalPages, filteredName, filteredDiscipline, optionValues]);

  useEffect(() => {
    setPage(1);
    setPageGroup(0);
  }, [filteredName, filteredDiscipline, optionValues]);


  return (
    <div className="overflow-auto xl:min-h-[40%] w-full bg-[#D9D9D9] text-white font-bold rounded-lg">
      <div className="w-full overflow-x-auto">
        <div className="bg-[#1F2B51] text-center w-full flex-shrink-0">
          Semestre: 2024/2
          <table ref={tableRef} className="w-full table-fixed min-w-[600px] ">
            <thead className="bg-[#1F2B51] h-12">
              <tr className="w-full">
                <th className="w-10">ID</th>
                <th className="w-32">Usuário</th>
                <th className="w-64">Nome completo</th>
                <th className="w-96">Disciplina</th>
                <th className="w-20">1° Etapa (%)</th>
                <th className="w-20">2° Etapa (%)</th>
                <th className="w-20">Prova Presencial</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((aluno) => (
                <tr
                  key={aluno.unique_id}
                  className="odd:bg-white even:bg-gray-200 text-black items-center text-center break-words"
                >
                  <td className="">{aluno.aluno_id}</td>
                  <td className="">{aluno.usuario}</td>
                  <td className="">{aluno.aluno}</td>
                  <td className="">{aluno.curso}</td>
                  <td className="">{aluno.primeira_etapa}</td>
                  <td className="">{aluno.segunda_etapa}</td>
                  <td className="">{aluno.prova_presencial}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center gap-8">
            {pageGroup > 0 && (
              <button onClick={() => handlePageChange(pageGroup * 5)}>Previous</button>
            )}
            {Array.from({ length: Math.min(5, totalPages - pageGroup * 5) }, (_, index) => {
              const pageNumber = pageGroup * 5 + index + 1;
              return (
                <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                  {pageNumber}
                </button>
              );
            })}
            {totalPages > (pageGroup + 1) * 5 && hasNextGroupData() && (
              <button onClick={() => handlePageChange((pageGroup + 1) * 5 + 1)}>Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
