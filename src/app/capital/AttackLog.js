"use client";
import React from "react";
import { TbSword } from "react-icons/tb";
import { MdOutlineStar } from "react-icons/md";
import Image from "next/image";

const Attacklog = ({ attackLog }) => {
  if (!attackLog || !Array.isArray(attackLog)) {
    return <p>Nenhum log de ataque disponível</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="m-4 text-lg font-bold">Logs de Ataques</h2>
      <div className="grid grid-cols-2">
        {attackLog.map((attack) => (
          <div
            key={attack.defender.tag} // Utiliza a propriedade 'tag' como chave única para o div
            className="border rounded-xl border-2 p-4 m-2 flex justify-center items-center flex-col"
          >
            <p>{attack.defender.name}</p>
            <p>{attack.defender.tag}</p>
            <p>Contagem de Ataques: {attack.attackCount}</p>
            <p>
              Distritos Destruídos: {attack.districtsDestroyed}/
              {attack.districtCount}
            </p>
            <br />

            {attack.districts &&
              attack.districts.map((district, index) => (
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
            <img src={attack.defender.badgeUrls.medium} alt="Badge" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attacklog;
