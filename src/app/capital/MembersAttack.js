"use client";
import React from "react";

const MembersAttack = ({ members }) => {
  return (
    <div className="space-y-2 p-4 flex flex-col items-center justify-center mt-4 w-full">
      <h2 className="mb-4 text-lg font-bold">Membros que atacaram:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 items-center">
        {members.map((member) => (
          <div
            key={member.tag} // Utiliza a propriedade 'tag' como chave única para o div
            className="border rounded-xl border-2 p-4 m-2 flex justify-center items-center flex-col"
          >
            <li className="flex space-x-2 flex-row">
              <p>{member.name}</p> <p className="text-gray-500">({member.tag})</p>
            </li>
            <li>
              ataques: {member.attacks}/{member.attackLimit + member.bonusAttackLimit}
            </li>
            <li>
              recursos adquiridos: {member.capitalResourcesLooted}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MembersAttack;
