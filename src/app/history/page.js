"use client";
import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function History() {
  const [clanTag, setClanTag] = useState("#2J8JP9RJR");
  const [warLog, setWarLog] = useState(null);
  const [error, setError] = useState(null);

  const fetchWarLog = async () => {
    const cleanedTag = clanTag.startsWith("#") ? clanTag.slice(1) : clanTag;
    const url = `http://localhost:4000/clashofclans/${encodeURIComponent(cleanedTag)}/warlog`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWarLog(data.items);
    } catch (error) {
      setError(error.message);
    }
  };

  const data = {
    labels: warLog ? warLog.map(war => formatDate(war.endTime)) : [],
    datasets: [
      {
        label: 'Estrelas do Clã',
        data: warLog ? warLog.map(war => war.clan.stars) : [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        borderWidth: 1
      },
      {
        label: 'Estrelas do Oponente',
        data: warLog ? warLog.map(war => war.opponent.stars) : [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        borderWidth: 1
      },
      {
        label: 'Percentual de Destruição do Clã(%)',
        data: warLog ? warLog.map(war => war.clan.destructionPercentage) : [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        borderWidth: 1
      },
      {
        label: 'Percentual de Destruição do Oponente(%)',
        data: warLog ? warLog.map(war => war.opponent.destructionPercentage) : [],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        borderWidth: 1
      }
    ]
  };

  function formatDate(dateString) {
    if (!dateString) return "Data inválida";

    // Extrair partes da data e hora do formato ISO 8601
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = dateString.slice(9, 11); // Ignorando o "T"
    const minutes = dateString.slice(11, 13);
    const seconds = dateString.slice(13, 15);

    // Criar um objeto Date usando as partes extraídas
    const date = new Date(`${year}-${month}-${day}T${hour}:${minutes}:${seconds}Z`);
    if (isNaN(date.getTime())) return "Data inválida";

    // Converter a data para o horário de Brasília (UTC-3)
    const brtOffset = -3;
    date.setHours(date.getUTCHours() + brtOffset);

    const formattedDay = date.getDate().toString().padStart(2, "0");
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0"); // Janeiro é 0!
    const formattedYear = date.getFullYear();
    const formattedHours = date.getHours().toString().padStart(2, "0");
    const formattedMinutes = date.getMinutes().toString().padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${formattedYear} - ${formattedHours}:${formattedMinutes}`;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        reverse: true,  
      },
      y: {
        beginAtZero: true,
      },
    },  
  };

  return (
    <div className="my-10 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-lg font-bold">História de Guerra</h1>
      <br />
      <div className="flex flex-col items-center space-y-2">
        <p className="text-gray-400">Insira o ID do Clã:</p>
        <input
          className="h-8 rounded-full px-3 text-black font-bold bg-white"
          value={clanTag}
          onChange={(e) => setClanTag(e.target.value)}
        />
        <button
          onClick={fetchWarLog}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          buscar
        </button>
      </div>
      <br />
      {error && <div className="text-red-500 mt-4">Erro: {error}</div>}
      {warLog && (
        <div className="w-full flex flex-col justify-center items-center">
          {warLog.map((war, index) => (
            <div key={index} className="my-4">
              <h2 className={`text-xl font-bold ${war.result === "win" ? "text-green-500" : "text-red-500"}`}>
                {war.result === "win" ? "Vitória" : "Derrota"}
              </h2>
              <p>
                <span className="text-gray-500">Data de Término:</span> {formatDate(war.endTime)}
              </p>
              <p>
                <span className="text-gray-500">Tamanho da Equipe:</span> {war.teamSize}
              </p>
              <p>
                <span className="text-gray-500">Ataques por Membro:</span> {war.attacksPerMember}
              </p>
              <p>
                <span className="text-gray-500">Clan:</span> {war.clan.name} ({war.clan.tag})
              </p>
              <p>
                <span className="text-gray-500">Nível do Clan:</span> {war.clan.clanLevel}
              </p>
              <p>
                <span className="text-gray-500">Estrelas:</span> {war.clan.stars}
              </p>
              <p>
                <span className="text-gray-500">Percentual de Destruição:</span> {war.clan.destructionPercentage}%
              </p>
              <p>
                <span className="text-gray-500">Oponente:</span> {war.opponent.name} ({war.opponent.tag})
              </p>
              <p>
                <span className="text-gray-500">Estrelas do Oponente:</span> {war.opponent.stars}
              </p>
              <p>
                <span className="text-gray-500">Percentual de Destruição do Oponente:</span> {war.opponent.destructionPercentage.toFixed(2)}%
              </p>
            </div>
          ))}
          <div className="w-full flex justify-center items-center h-[400px]">
            <Line data={data} options={options}/>
          </div>
        </div>
      )}
    </div>
  );
}
