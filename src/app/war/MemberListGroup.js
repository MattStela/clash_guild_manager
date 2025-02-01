"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import MemberDetails from "./MemberDetails";

// Função para calcular o total de estrelas
const calculateTotalStars = (attacks) => {
  return attacks.reduce((total, attack) => total + attack.stars, 0);
};

// Componente para exibir a lista de membros
const MemberGroupList = ({ currentWar, members }) => {
  // Verificação para garantir que members esteja definido e seja um array
  if (!Array.isArray(members)) {
    return <div>Membros indefinidos ou não são uma lista válida</div>;
  }

  const sortedMembers = members.sort((a, b) => a.mapPosition - b.mapPosition);

  const noAttacks = sortedMembers.filter(
    (member) => !member.attacks || member.attacks.length === 0
  );
  const oneAttack = sortedMembers.filter(
    (member) => member.attacks && member.attacks.length === 1
  );
  const twoAttacks = sortedMembers.filter(
    (member) => member.attacks && member.attacks.length === 2
  );

  return (
    <div>
      {sortedMembers.map((member, index) => (
        <div
          key={index}
          className="border border-gray-500 border-4 rounded-xl text-xs flex flex-col justify-center items-center p-2 pt-4 my-4"
        >
          <div className="flex space-x-2 flex-row">
            <p>
              {member.mapPosition}. {member.name}
            </p>
          </div>
          <p className="text-gray-400">
            CV{member.townhallLevel} - {member.tag}
          </p>

          {currentWar.state === "warEnded" && <MemberDetails member={member} />}

          {currentWar.state === "preparation" && ""}

          {currentWar.state === "inWar" && <MemberDetails member={member} />}
        </div>
      ))}
      <div className="my-4">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold">Resumo de Ataques</h2>
          <div className="flex flex-col justify-center items-center w-full space-y-4 mt-4">
            <div className="flex flex-col justify-center items-center w-full">
              <h3 className="text-gray-400 font-bold">Sem Ataques</h3>
              {noAttacks.map((member, index) => (
                <p key={index}>{member.name}</p>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <h3 className="text-gray-400 font-bold">Um Ataque</h3>
              {oneAttack.map((member, index) => (
                <p
                  className="flex flex-row justify-center items-center"
                  key={index}
                >
                  {member.name} ({calculateTotalStars(member.attacks)}{" "}
                  <FaStar className="text-yellow-500 h-2" />)
                </p>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <h3 className="text-gray-400 font-bold">Dois Ataques</h3>
              {twoAttacks.map((member, index) => (
                <p
                  className="flex flex-row justify-center items-center"
                  key={index}
                >
                  {member.name} ({calculateTotalStars(member.attacks)}{" "}
                  <FaStar className="text-yellow-500 h-2" />)
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberGroupList;
