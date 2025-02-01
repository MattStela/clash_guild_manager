"use client";
import React, { useState } from "react";
import DetailsPreparation from "./DetailsPreparation";
import DetailsWarEnded from "./DetailsWarEnded";
import DetailsInWar from "./DetailsInWar";
import DetailsNotinWar from "./DetailsNotInWar";

// Função para buscar a guerra atual
const fetchCurrentWar = async (clanTag, setCurrentWar, setError) => {
  if (!clanTag) {
    setError("O clanTag está indefinido.");
    return;
  }

  const url = `http://localhost:4000/clashofclans/${encodeURIComponent(
    clanTag.replace("#", "")
  )}/currentwar`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setCurrentWar(data);
  } catch (error) {
    setError(error.message);
  }
};

const War = () => {
  const [clanTag, setClanTag] = useState("#2J8JP9RJR"); // ID padrão do clã
  const [currentWar, setCurrentWar] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchWar = () => {
    setError(null);
    setCurrentWar(null);
    fetchCurrentWar(clanTag, setCurrentWar, setError);
  };

  return (
    <div className="container mx-auto p-4  flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center  w-[600px] p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-black text-center mb-6">
          Guerra Atual
        </h1>
        <div className="mb-6 flex justify-center items-center flex-col">
          <label className="block text-white mb-2" htmlFor="clanTag">
            Insira o ID do Clã
          </label>
          <input
            className="text-black font-bold text-lg px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            id="clanTag"
            type="text"
            value={clanTag}
            onChange={(e) => setClanTag(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          onClick={handleFetchWar}
        >
          Buscar Guerra Atual
        </button>
        <div className="w-full">
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg mt-4">
              <h2 className="text-xl font-bold">Erro</h2>
              <p className="mt-2">Mensagem: {error}</p>
            </div>
          )}
          {currentWar ? (
            currentWar.state === "preparation" ? (
              <DetailsPreparation currentWar={currentWar} />
            ) : currentWar.state === "warEnded" ? (
              <DetailsWarEnded currentWar={currentWar} />
            ) : currentWar.state === "notInWar" ? (
              <DetailsNotinWar currentWar={currentWar} />
            ) : currentWar.state === "inWar" ? (
              <DetailsInWar currentWar={currentWar} />
            ) : null
          ) : !error ? (
            ""
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default War;
