"use client";
import React, { useState } from "react";
import axios from "axios";
import MembersAttack from "./MembersAttack"; // Importe o novo componente
import Attacklog from "./AttackLog";
import DefenseLog from "./DefenseLog";
import Image from "next/image";

export default function Capital() {
  const [capitalRaidSeasons, setCapitalRaidSeasons] = useState(null);
  const [error, setError] = useState(null);
  const [clanId, setClanId] = useState("2J8JP9RJR"); // ID inicial

  const fetchCapitalRaidSeasons = async (id) => {
    try {
      console.log("Fetching capital raid seasons data...");

      // Adiciona '#' ao ID, se necessário
      const formattedId = id.startsWith("#") ? id.substring(1) : id;

      const response = await axios.get(
        `http://localhost:4000/clashofclans/${formattedId}/capitalraidseasons`
      );
      console.log("Response received:", response.data);
      setCapitalRaidSeasons(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching capital raid seasons:", error.message);
      setError(error.message);
      setCapitalRaidSeasons(null);
    }
  };

  const handleInputChange = (e) => {
    setClanId(e.target.value);
  };

  const handleButtonClick = () => {
    fetchCapitalRaidSeasons(clanId);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1>Capital</h1>

      <div className="flex flex-col justify-center items-center space-y-4 mt-4 p-4 rounded-lg shadow-md">
        <input
          type="text"
          value={clanId}
          onChange={handleInputChange}
          placeholder="Enter Clan ID"
          className="text-black border p-2 rounded-3xl px-4"
        />
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white p-2 rounded-3xl px-4"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      {capitalRaidSeasons ? (
        <div className="mt-4 p-4 rounded-lg shadow-md w-full max-w-4xl">
          {capitalRaidSeasons.items && capitalRaidSeasons.items.length > 0 ? (
            <div className="border flex flex-col justify-center items-center p-4 border-4 rounded-3xl border-gray-600">
              <p>Estado: {capitalRaidSeasons.items[0].state}</p>
              <p>Começo: {capitalRaidSeasons.items[0].startTime}</p>
              <p>Fim: {capitalRaidSeasons.items[0].startTime}</p>
              <div className="flex flex-row items-center justify-center">
                <p>Loot: {capitalRaidSeasons.items[0].capitalTotalLoot}</p>
                <Image src="/medal.jpg" width={20} height={20} alt="medal" />
              </div>
              <p>
                Raids concluídas: {capitalRaidSeasons.items[0].raidsCompleted}
              </p>
              <p>
                Total de Ataques: {capitalRaidSeasons.items[0].totalAttacks}
              </p>
              <p>
                Distritos inimigos destruídos:{" "}
                {capitalRaidSeasons.items[0].enemyDistrictsDestroyed}
              </p>
              <MembersAttack members={capitalRaidSeasons.items[0].members} />
              <Attacklog attackLog={capitalRaidSeasons.items[0].attackLog} />
              <DefenseLog defenseLog={capitalRaidSeasons.items[0].defenseLog} />
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">{!error && "Loading..."}</p>
      )}
    </div>
  );
}
