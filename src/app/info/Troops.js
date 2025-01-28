import React, { useState } from "react";
import Image from "next/image";
import { iconUrls, translatedNames } from "./ref";

export default function Troops({ troops }) {
  const [showTroops, setShowTroops] = useState(false);

  const toggleTroops = () => {
    setShowTroops(!showTroops);
  };

  const superTroopNames = [
    "Super Barbarian",
    "Super Archer",
    "Super Giant",
    "Sneaky Goblin",
    "Super Wall Breaker",
    "Rocket Balloon",
    "Super Wizard",
    "Super Dragon",
    "Inferno Dragon",
    "Super Miner",
    "Super Minion",
    "Super Hog Rider",
    "Super Valkyrie",
    "Super Witch",
    "Ice Hound",
    "Super Bowler",
  ];

  const translatedNames = {
    Barbarian: "Bárbaro",
    Archer: "Arqueira",
    Goblin: "Goblin",
    Giant: "Gigante",
    "Wall Breaker": "Quebra-Muros",
    Balloon: "Balão",
    Wizard: "Mago",
    Healer: "Curadora",
    Dragon: "Dragão",
    "P.E.K.K.A": "P.E.K.K.A",
    Minion: "Serva",
    "Hog Rider": "Corredor",
    Valkyrie: "Valquíria",
    Golem: "Golem",
    "Super Barbarian": "Super Bárbaro",
    "Super Archer": "Super Arqueira",
    "Super Giant": "Super Gigante",
    "Sneaky Goblin": "Goblin Furtivo",
    "Super Wall Breaker": "Super Quebra-Muros",
    "Rocket Balloon": "Balão de Foguete",
    "Super Wizard": "Super Mago",
    "Super Dragon": "Super Dragão",
    "Inferno Dragon": "Dragão Infernal",
    "Super Miner": "Super Mineiro",
    "Super Minion": "Super Serva",
    "Super Hog Rider": "Super Corredor",
    "Super Valkyrie": "Super Valquíria",
    "Super Witch": "Super Bruxa",
    "Ice Hound": "Sabueso de Gelo",
    "Super Bowler": "Super Lançador",
    "Raged Barbarian": "Bárbaro Furioso",
    "Sneaky Archer": "Arqueira Furtiva",
    "Boxer Giant": "Gigante Boxeador",
    "Beta Minion": "Serva Beta",
    Bomber: "Bombardeiro",
    "Baby Dragon": "Bebê Dragão",
    "Cannon Cart": "Carrinho de Canhão",
    "Night Witch": "Bruxa da Noite",
    "Drop Ship": "Nau Bombardeira",
    "Super P.E.K.K.A": "Super P.E.K.K.A",
    "Hog Glider": "Deslizador de Porco",
    "Electro Dragon": "Dragão Elétrico",
    Yeti: "Yeti",
    "Dragon Rider": "Dragão Rider",
    "Electro Owl": "Coruja Elétrica",
    "Mighty Yak": "Iaque Poderoso",
    Unicorn: "Unicórnio",
    "Ice Mage": "Mago de Gelo",
    "Skeleton Giant": "Gigante Esqueleto",
    "Skeleton Barrel": "Barril (Esqueleto)",
    "El Primo": "Primo",
    "Royal Ghost": "Mago Real",
    "Royal Dragon": "Dragão Real",
    "Fire Mage": "Mago de Fogo",
    "Fire Dragon": "Dragão de Fogo",
    "Water Mage": "Mago de Água",
    "Water Dragon": "Dragão de Água",
  };

  const translateTroopName = (name) => translatedNames[name] || name;

  const homeTroops = troops.filter(
    (troop) => troop.village === "home" && !superTroopNames.includes(troop.name)
  );
  const builderBaseTroops = troops.filter(
    (troop) => troop.village === "builderBase"
  );
  const superTroops = troops.filter((troop) =>
    superTroopNames.includes(troop.name)
  );

  return (
    <div className="w-[90%] mt-10 flex justify-center items-center flex-col">
      <div className="flex items-center justify-center w-full">
        <h1 className="font-bold text-2xl">Tropas</h1>
        <button onClick={toggleTroops} className="ml-2 text-lg">
          {showTroops ? "▲" : "▼"}
        </button>
      </div>
      <div className="bg-white h-[1px] my-4 w-3/4"></div>

      {showTroops && (
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-xl font-bold mb-4">Tropas de Base Principal</h2>

          <div className="grid grid-cols-5 space-x-2">
            {homeTroops.map((troop, index) => (
              <div key={index} className="flex space-x-2 justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {iconUrls[troop.name] ? (
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        src={iconUrls[troop.name]}
                        alt={translateTroopName(troop.name)}
                        width={75}
                        height={75}
                        title={translateTroopName(troop.name)}
                      />
                      <div className="font-bold flex flex-row space-x-1 text-[1rem]">
                        <div>{troop.level}</div>
                        <p>/</p>
                        <div>{troop.maxLevel}</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      {translateTroopName(troop.name)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white h-[1px] my-4 w-full"></div>
          <h2 className="text-xl font-bold mb-4">Super Tropas</h2>
          <div className="grid grid-cols-5 space-x-2">
            {superTroops.map((troop, index) => (
              <div key={index} className="flex space-x-2 justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {iconUrls[troop.name] ? (
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        src={iconUrls[troop.name]}
                        alt={translateTroopName(troop.name)}
                        width={75}
                        height={75}
                        title={translateTroopName(troop.name)}
                      />
                      <div className="font-bold flex flex-row space-x-1 text-[1rem]">
                        <div>{troop.level}</div>
                        <p>/</p>
                        <div>{troop.maxLevel}</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      {translateTroopName(troop.name)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white h-[1px] my-4 w-full"></div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Tropas de Base do Construtor
          </h2>

          <div className="flex flex-col space-y-2 mt-2">
            {builderBaseTroops.map((troop, index) => (
              <div key={index} className="flex space-x-2 justify-center items-center">
                <div className="flex items-center space-x-2">
                  <div className="font-bold flex flex-row space-x-1 text-[1rem]">
                    <p className="text-gray-400">{translateTroopName(troop.name)}&nbsp;</p>
                    <div>{troop.level}</div>
                    <p>/</p>
                    <div>{troop.maxLevel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
