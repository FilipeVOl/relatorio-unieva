import React, { useState } from "react";
import Table from "../components/Table";
import Select from "../assets/select.svg";

const Home = () => {
  const [filteredName, setFilterName] = useState("");
  const [filteredDiscipline, setFilterDiscipline] = useState("");

  console.log("Filtered Name:", filteredName);
  console.log("Filtered Discipline:", filteredDiscipline);

  return (
    <div className="flex items-center justify-center h-[90%] flex-col lg:gap-4 gap-8">
      <div className="flex flex-col md:flex-row w-[90%] md:w-[50%]  justify-between gap-4 md:gap-32">
        <div className="relative flex w-full flex-col">
          <label className="indent-1">Filtrar por nome</label>
          <div className="relative w-full flex flex-row gap-2">
            <div className="relative w-full">
              <select className="custom-select appearance-none indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4">
                <option value="">Não Contém</option>
                <option value="">Contém</option>
                <option value="">É igual a</option>
                <option value="">Começa com</option>
                <option value="">Termina Com</option>
                <option value="">Está em branco</option>
                <option value="">Não está em branco</option>
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
            className="indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4" />
          </div>
        </div>
        <div className="relative flex w-full flex-col">
          <label className="indent-1">Filtrar por disciplina</label>
          <div className="relative w-full flex flex-row gap-2">
            <div className="relative w-full">
              <select className="custom-select appearance-none indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4">
                <option value="">Não Contém</option>
                <option value="">Contém</option>
                <option value="">É igual a</option>
                <option value="">Começa com</option>
                <option value="">Termina Com</option>
                <option value="">Está em branco</option>
                <option value="">Não está em branco</option>
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
            className="indent-2 border border-[#ced4da] leading-6 h-10 active:border-2 rounded-lg w-full pr-10 pl-4" />
          </div>
        </div>
      </div>
      <Table filteredName={filteredName} filteredDiscipline={filteredDiscipline} />
    </div>
  );
};

export default Home;
