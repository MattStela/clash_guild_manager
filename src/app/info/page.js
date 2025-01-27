"use client";
import React, { useState } from "react";
import PlayerAchievements from "./PlayerAchievements";


export default function Info() {
  const [playerTag, setPlayerTag] = useState("#YV29LYGJ2");
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    const cleanedTag = playerTag.startsWith("#") ? playerTag.slice(1) : playerTag;
    const url = `http://localhost:4000/clashofclans/players/${cleanedTag}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPlayerData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      setPlayerData(null); // Clear any previous player data
    }
  };

  return (
    <div className="py-10 min-h-screen flex flex-col justify-center items-center w-full space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <input
          type="text"
          placeholder="Digite algo..."
          className="h-8 rounded-full px-3 text-black bg-white"
          value={playerTag}
          onChange={(e) => setPlayerTag(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Enviar
        </button>
      </div>
      {error && <div className="text-red-500 mt-4">Erro: {error}</div>}
      {playerData && (
        <>
          <PlayerAchievements playerData={playerData} />
         
        </>
      )}
    </div>
  );
}
