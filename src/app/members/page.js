"use client";
import React, { useState } from "react";

export default function Members() {
  const [clanTag, setClanTag] = useState("#2J8JP9RJR");
  const [members, setMembers] = useState(null);
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    const cleanedTag = clanTag.startsWith("#") ? clanTag.slice(1) : clanTag;
    const url = `http://localhost:4000/clashofclans/${encodeURIComponent(
      cleanedTag
    )}/members`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMembers(data.items);
    } catch (error) {
      setError(error.message);
    }
  };

  const sortedMembers = (members || [])
    .sort((a, b) => a.name.localeCompare(b.name))  // Ordena por nome primeiro
    .sort((a, b) => {
      const roleOrder = ["leader", "coLeader", "admin", "member"];
      return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
    });

  return (
    <div className="my-10 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-lg font-bold">Lista dos Membros do Clã</h1>
      <br />
      <div className="flex flex-col items-center space-y-2">
        <input
          className="h-8 rounded-full px-3 text-black font-bold bg-white"
          value={clanTag}
          onChange={(e) => setClanTag(e.target.value)}
        />
        <button
          onClick={fetchMembers}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Buscar Membros do Clã
        </button>
      </div>
      <br />
      {error && <div className="text-red-500 mt-4">Erro: {error}</div>}
      {members && (
        <div className="w-full flex flex-col justify-center items-center">
          {sortedMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center my-4 border p-4 rounded shadow-lg w-3/4"
            >
              <h2 className="text-xl font-bold text-blue-500">{member.name}</h2>
              <img width={75} src={member.league.iconUrls.small} alt={`${member.name} badge`} />
              <p>
                <span className="text-gray-500">Tag:</span> {member.tag}
              </p>
              <p>
                <span className="text-gray-500">CV:</span> {member.townHallLevel}
              </p>
              <p>
                <span className="text-gray-500">Nível:</span> {member.expLevel}
              </p>
              <p>
                <span className="text-gray-500">Posição no Clã:</span> {member.role}
              </p>
              <p>
                <span className="text-gray-500">Trofeus:</span> {member.trophies}
              </p>
              <p>
                <span className="text-gray-500">Tropas doadas:</span> {member.donations}
              </p>
              <p>
                <span className="text-gray-500">Tropas recebidas:</span> {member.donationsReceived}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
