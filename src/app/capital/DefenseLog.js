"use client";
import React from "react";
import { TbSword } from "react-icons/tb";
import { MdOutlineStar } from "react-icons/md";
import Image from "next/image";

const Attacklog = ({ defenseLog }) => {
  if (!defenseLog || !Array.isArray(defenseLog)) {
    return <p>Nenhum log de ataque disponível</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="m-4 text-lg font-bold">Logs de Defesas</h2>
      <div className="grid grid-cols-2">
        {defenseLog.map((defense) => (
          <div
            key={defense.attacker.tag} // Utiliza a propriedade 'tag' como chave única para o div
            className="border rounded-xl border-2 p-4 m-2 flex justify-center items-center flex-col"
          >
            <p>{defense.attacker.name}</p>
            <p>{defense.attacker.tag}</p>
            <p>Contagem de Ataques: {defense.attackCount}</p>
            <p>
              Distritos Destruídos: {defense.districtsDestroyed}/
              {defense.districtCount}
            </p>
            <br />

            {defense.districts &&
              defense.districts.map((district, index) => (
                <div
                  key={index}
                  className="my-2 flex justify-center items-center w-full flex-col"
                >
                  <div className="flex flex-row space-x-2 justify-center items-center text-xs">
                    <div className="flex flex-row justify-center items-center">
                      {district.attackCount}{" "}
                      <TbSword className="text-red-500" />
                    </div>
                    <div className="flex flex-row justify-center items-center">
                      {district.totalLooted}{" "}
                      <Image
                        src="/medal.jpg"
                        width={20}
                        height={20}
                        alt="medal"
                      />
                    </div>
                  </div>
                  <div className="text-xs">
                    {district.name}
                  </div>
                  {district.attacks &&
                    district.attacks.map((atk, atkIndex) => (
                      <div
                        className="flex flex-row justify-center items-center"
                        key={atkIndex}
                      >
                        {atk.destructionPercent}% - {atk.stars}
                        <MdOutlineStar className="text-yellow-500" /> - {atk.attacker.name}
                      </div>
                    ))}
                </div>
              ))}
            <img src={defense.attacker.badgeUrls.medium} alt="Badge" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attacklog;
