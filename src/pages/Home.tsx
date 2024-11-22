import React, { useState, useRef } from "react";
import Table from "../components/Table";
import Select from "../assets/select.svg";
import { exportToExcel } from "../utils/exportToExcel"; // Import the utility function

const Home = () => {
  interface OptionValues {
    name: string;
    discipline: string;
  }

  const [filteredName, setFilterName] = useState("");
  const [filteredDiscipline, setFilterDiscipline] = useState("");
  const [optionValues, setOptionValues] = useState<OptionValues>({
    name: "dontcontainname",
    discipline: "dontcontaindisc",
  });

  const tableRef = useRef<HTMLTableElement>(null);

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
                  setOptionValues({ ...optionValues, name: e.target.value })
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
                  setOptionValues({ ...optionValues, discipline: e.target.value })
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
        </div>
      <button
        className="border rounded-lg bg-[#1F2B51] text-white font-bold px-8 h-12 self-end"
        onClick={() => exportToExcel(tableRef)}
      >
        Exportar
      </button>

      </div>
      <Table
        filteredName={filteredName}
        filteredDiscipline={filteredDiscipline}
        optionValues={optionValues}
        tableRef={tableRef}
      />
      </div>
    </div>
  );
};

export default Home;
