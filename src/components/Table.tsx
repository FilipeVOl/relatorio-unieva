import React from "react";

const Table = ({ filteredName = "", filteredDiscipline = "" }) => {
  const data = [
    {
      id: 1,
      user: "000000000000",
      name: "Juscelino Kubitschek",
      discipline: "AAAAAAAAAAAAAAAAAAAAAAAAAA",
      grade1: "100%",
      grade2: "50%",
      grade3: "",
    },
    {
      id: 2,
      user: "000000000000",
      name: "Jorginho Jorjão",
      discipline: "e",
      grade1: "100%",
      grade2: "50%",
      grade3: "",
    },
    {
      id: 3,
      user: "000000000000",
      name: "Dioguinho Dieguelson",
      discipline: "AAAAAAAAAAAAAAAAAAAAAAAAAA",
      grade1: "100%",
      grade2: "50%",
      grade3: "",
    },
  ];

  console.log("Filtered Name in Table:", filteredName);
  console.log("Filtered Discipline in Table:", filteredDiscipline);

  const filterData = () => {
    return data.filter((aluno) => {
      const nameMatch = aluno.name.toLowerCase().includes(filteredName.toLowerCase());
      const disciplineMatch = aluno.discipline.toLowerCase().includes(filteredDiscipline.toLowerCase());
      console.log(`Name Match: ${nameMatch}, Discipline Match: ${disciplineMatch}`);
      return nameMatch && disciplineMatch;
    });
  };

  return (
    <div className="overflow-auto h-[70%] w-[90%] bg-[#D9D9D9] text-white font-bold rounded-lg">
      <div className="w-full overflow-x-auto">
        <div className="bg-[#1F2B51] text-center w-full flex-shrink-0">Semestre: 2024/2
        <table className="w-full table-fixed min-w-[600px] ">
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
            {filterData().map((aluno, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-200 text-black items-center text-center"
              >
                <td className="w-10">{index + 1}</td>
                <td className="w-32">{aluno.user}</td>
                <td className="w-64">{aluno.name}</td>
                <td className="w-96">{aluno.discipline}</td>
                <td className="w-20">{aluno.grade1}</td>
                <td className="w-20">{aluno.grade2}</td>
                <td className="w-20">{aluno.grade3}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
