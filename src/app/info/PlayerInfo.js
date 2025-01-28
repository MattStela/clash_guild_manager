import React from "react";
import Image from "next/image";

export default function PlayerInfo({ playerData }) {
  return (
    <div className="mt-4 border p-4 rounded shadow-lg">
      <div className="mb-4 flex flex-row items-center justify-center space-x-2">
      <Image
          src={playerData.clan.badgeUrls.large}
          width={50}
          height={50}
          alt="tag do clã"
          title={`${playerData.role} do ${playerData.clan.name}`}
        />
        <div className="flex flex-col justify-center items-center">
          <div className="text-[0.6rem] flex justify-center items-center">
            <p className="">
              <span>Nv.</span> {playerData.expLevel}
            </p>
            <p>&nbsp;- CV</p> {playerData.townHallLevel}
          </div>
          <h2 className="text-xl font-bold text-blue-500">{playerData.name}</h2>
          <div className="text-[0.6rem]">
            <p>{playerData.tag}</p>
          </div>
        </div>
        
        <Image
          src={playerData.league.iconUrls.medium}
          width={50}
          height={50}
          alt="tag do clã"
          title={playerData.league.name}
        />
      </div>

      <p>
        <span className="text-gray-500">Troféus:</span> {playerData.trophies}
      </p>
      <p>
        <span className="text-gray-500">Melhores troféus:</span> {playerData.bestTrophies}
      </p>
      <p>
        <span className="text-gray-500">Estrelas em guerras:</span> {playerData.warStars}
      </p>
      <div className="bg-white h-[1px] my-4 w-full"></div>
      <p>
        <span className="text-gray-500">Nível da base do construtor:</span> {playerData.builderHallLevel}
      </p>
      <p>
        <span className="text-gray-500">Troféus da base do construtor:</span> {playerData.builderBaseTrophies}
      </p>
      <p>
        <span className="text-gray-500">Melhores Troféus da base do construtor:</span> {playerData.bestBuilderBaseTrophies}
      </p>
      <p>
        <span className="text-gray-500">Liga do construtor:</span> {playerData.builderBaseLeague.name}
      </p>
    </div>
  );
}
