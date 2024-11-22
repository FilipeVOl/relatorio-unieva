import React, { useEffect, useState } from "react";
import Usuarios, { StateType } from "../services/Usuarios";

type DataKey = "aluno" | "curso";

interface OptionValues {
  name: string;
  discipline: string;
}
interface TableProps {
  filteredName?: string;
  filteredDiscipline?: string;
  optionValues: OptionValues;
  tableRef: React.RefObject<HTMLTableElement>;
}

const Table: React.FC<TableProps> = ({
  filteredName = "",
  filteredDiscipline = "",
  optionValues,
  tableRef,
}) => {

  const initialState: StateType = {
    page: 0,
    size: 0,
    total_records: 0,
    total_pages: 0,
    data: []
  };

  const [data, setData] = useState<StateType>(initialState);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageGroup, setPageGroup] = useState(0); // New state for page group
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setPageGroup(Math.floor((pageNumber - 1) / 5)); // Update pageGroup based on the selected page
    Usuarios(setData, setTotalItems, pageNumber); // Fetch data for the selected page
  };

  useEffect(() => {
    Usuarios(setData, setTotalItems, page); // Fetch data for the initial page
    console.log(totalItems);
  }, [page]);

  const getFilteredData = () => {
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
    ];

    let i = 0;
    while (i < filters.length) {
      const { key, value, option } = filters[i];
      if (value) {
        switch (option) {
          case "dontcontainname":
          case "dontcontaindisc":
            filteredData = filteredData.filter(
              (aluno) => !aluno[key].toLowerCase().includes(value.toLowerCase())
            );
            break;
          case "containname":
          case "containdisc":
            filteredData = filteredData.filter((aluno) =>
              aluno[key].toLowerCase().includes(value.toLowerCase())
            );
            break;
          case "equaltoname":
          case "equaltodisc":
            filteredData = filteredData.filter(
              (aluno) => aluno[key].toLowerCase() === value.toLowerCase()
            );
            break;
          case "startswithname":
          case "startswithdisc":
            filteredData = filteredData.filter((aluno) =>
              aluno[key].toLowerCase().startsWith(value.toLowerCase())
            );
            break;
          case "endswithname":
          case "endswithdisc":
            filteredData = filteredData.filter((aluno) =>
              aluno[key].toLowerCase().endsWith(value.toLowerCase())
            );
            break;
        }
      }
      i++;
    }
 
    return filteredData
  };

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
              {getFilteredData().map((aluno) => (
                <tr
                  key={aluno.aluno_id}
                  className="odd:bg-white even:bg-gray-200 text-black items-center text-center break-words"
                >
                  <td className="w-10">{aluno.aluno_id}</td>
                  <td className="w-32">{aluno.usuario}</td>
                  <td className="w-64">{aluno.aluno}</td>
                  <td className="w-96">{aluno.curso}</td>
                  <td className="w-20">{aluno.primeira_etapa}</td>
                  <td className="w-20">{aluno.segunda_etapa}</td>
                  <td className="w-20">{aluno.prova_presencial}</td>
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
            {totalPages > (pageGroup + 1) * 5 && (
              <button onClick={() => handlePageChange((pageGroup + 1) * 5 + 1)}>Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
