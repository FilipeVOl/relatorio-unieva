import React, { useState, useRef } from "react";
import Table, { getFilteredData } from "../components/Table";
import Select from "../assets/select.svg";
import { exportToExcel } from "../utils/exportToExcel"; // Import the utility function
import { useUsuarios } from "../context/UsuariosContext"; // Import the context

const Home = () => {
  type OptionValues = {
    name: "dontcontainname" | "containname" | "equaltoname" | "startswithname" | "endswithname";
    discipline: "dontcontaindisc" | "containdisc" | "equaltodisc" | "startswithdisc" | "endswithdisc";
    user: "dontcontainuser" | "containuser" | "equaltouser" | "startswithuser" | "endswithuser";
  };

  const [filteredName, setFilterName] = useState("");
  const [filteredDiscipline, setFilterDiscipline] = useState("");
  const [filteredUsers, setFilteredUsers] = useState("");
  const [optionValues, setOptionValues] = useState<OptionValues>({
    name: "dontcontainname",
    discipline: "dontcontaindisc",
    user: "dontcontainuser",
  });

  const tableRef = useRef<HTMLTableElement>(null);
  const { data } = useUsuarios(); // Get the data from context

  const handleExport = () => {
    const filteredData = getFilteredData(data, filteredName, filteredDiscipline, optionValues, filteredUsers);
    const dataToExport = filteredName || filteredDiscipline || filteredUsers ? filteredData : data.data;
    exportToExcel(dataToExport);
  };

  return (
    <div className="flex items-center h-[90%] flex-col">
      <div className="flex flex-col h-full justify-center w-[90%] gap-8 lg:gap-4">
      <div className="flex flex-row w-full gap-8 justify-items-stretch justify-between">
        <div className="container-for-filters flex flex-row gap-8">
        <div className="name-filter relative flex w-auto flex-col">
          <label className="indent-1">Filtrar por nome</label>
          <div className="relative w-full flex flex-row gap-2">
            <div className="relative w-full">
              <select
                value={optionValues.name}
                onChange={(e) =>
                  setOptionValues({ ...optionValues, name: e.target.value as OptionValues['name'] })
                }
                className="custom-select appearance-none indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4"
              >
                <option value="dontcontainname">Não Contém</option>
                <option value="containname">Contém</option>
                <option value="equaltoname">É igual a</option>
                <option value="startswithname">Começa com</option>
                <option value="endswithname">Termina Com</option>
              </select>
              <img
                src={Select}
                alt="search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 pointer-events-none"
              />
            </div>
            <input
              type="text"
              onChange={(e) => setFilterName(e.target.value)}
              className="indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4"
            />
          </div>
        </div>
        <div className="discipline-filter relative flex w-auto flex-col">
          <label className="indent-1">Filtrar por disciplina</label>
          <div className="relative w-full flex flex-row gap-2">
            <div className="relative w-full">
              <select
                value={optionValues.discipline}
                onChange={(e) =>
                  setOptionValues({ ...optionValues, discipline: e.target.value as OptionValues['discipline'] })
                }
                className="custom-select appearance-none indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4"
              >
                <option value="dontcontaindisc">Não Contém</option>
                <option value="containdisc">Contém</option>
                <option value="equaltodisc">É igual a</option>
                <option value="startswithdisc">Começa com</option>
                <option value="endswithdisc">Termina Com</option>
              </select>
              <img
                src={Select}
                alt="search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 pointer-events-none"
              />
            </div>
            <input
              type="text"
              onChange={(e) => setFilterDiscipline(e.target.value)}
              className="indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4"
            />
          </div>
        </div>

        <div className="discipline-filter relative flex w-auto flex-col">
          <label className="indent-1">Filtrar por usuário</label>
          <div className="relative w-full flex flex-row gap-2">
            <div className="relative w-full">
              <select
                value={optionValues.user}
                onChange={(e) =>
                  setOptionValues({ ...optionValues, user: e.target.value as OptionValues['user'] })
                }
                className="custom-select appearance-none indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4"
              >
                <option value="dontcontainuser">Não Contém</option>
                <option value="containuser">Contém</option>
                <option value="equaltouser">É igual a</option>
                <option value="startswithuser">Começa com</option>
                <option value="endswithuser">Termina Com</option>
              </select>
              <img
                src={Select}
                alt="search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 pointer-events-none"
              />
            </div>
            <input
              type="text"
              onChange={(e) => setFilteredUsers(e.target.value)}
              className="indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4"
            />
          </div>
        </div>
        </div>
      <button
        className="border rounded-lg bg-[#1F2B51] text-white font-bold px-8 h-12 self-end"
        onClick={handleExport}
      >
        Exportar
      </button>

      </div>
      <Table
        filteredName={filteredName}
        filteredDiscipline={filteredDiscipline}
        filteredUsers={filteredUsers}
        optionValues={optionValues}
        tableRef={tableRef}
      />
      </div>
    </div>
  );
};

export default Home;
