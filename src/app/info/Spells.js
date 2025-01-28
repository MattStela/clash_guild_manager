import React, { useState } from "react";

const translatedNames = {
  "Lightning Spell": "Feitiço de Relâmpago",
  "Healing Spell": "Feitiço de Cura",
  "Rage Spell": "Feitiço de Fúria",
  "Jump Spell": "Feitiço de Salto",
  "Freeze Spell": "Feitiço de Congelamento",
  "Clone Spell": "Feitiço de Clonagem",
  "Invisibility Spell": "Feitiço de Invisibilidade",
  "Recall Spell": "Feitiço de Recolhimento",
  "Revive Spell": "Feitiço de Reviver",
  "Poison Spell": "Feitiço de Veneno",
  "Earthquake Spell": "Feitiço de Terremoto",
  "Haste Spell": "Feitiço de Velocidade",
  "Skeleton Spell": "Feitiço de Esqueleto",
  "Bat Spell": "Feitiço do Morcego",
  "Overgrowth Spell": "Feitiço de Crescimento",
  "Santa's Surprise": "Surpresa do Papai Noel",
  "Birthday Boom": "Explosão de Aniversário",
  "Bag of Frostmites": "Saco de Gélidos",
  "Yellow Card": "Cartão Amarelo"
};

const translateSpellName = (name) => translatedNames[name] || name;

export default function Spells({ spells }) {
  const [showSpells, setShowSpells] = useState(false);

  const toggleSpells = () => {
    setShowSpells(!showSpells);
  };

  return (
    <div className="w-[90%] mt-10 flex justify-center items-center flex-col">
      <div className="flex items-center justify-center w-full">
        <h1 className="font-bold text-2xl">Feitiços</h1>
        <button onClick={toggleSpells} className="ml-2 text-lg">
          {showSpells ? "▲" : "▼"}
        </button>
      </div>
      <div className="bg-white h-[1px] my-4 w-3/4"></div>
      {showSpells && (
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-xl font-bold mb-4">Feitiços</h2>
          {spells.map((spell, index) => (
            <div key={index} className="flex space-x-2 justify-between mb-2">
              <p className="text-gray-500">{translateSpellName(spell.name)}</p>
              <p>
                {spell.level}/{spell.maxLevel}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

