import React, { useState } from "react";

export default function Heroes({ heroes }) {
  const [showHeroes, setShowHeroes] = useState(false);

  const toggleHeroes = () => {
    setShowHeroes(!showHeroes);
  };

  const translatedHeroNames = {
    "Barbarian King": "Rei Bárbaro",
    "Archer Queen": "Rainha Arqueira",
    "Grand Warden": "Grande Guardião",
    "Battle Machine": "Máquina de Batalha",
    "Minion Prince": "Príncipe Minion",
    "Royal Champion": "Campeã Real",
  };

  const translatedEquipmentNames = {
    "Spiky Ball": "Bola Espinhosa",
    "Giant Gauntlet": "Manopla Gigante",
    "Frozen Arrow": "Flecha Congelada",
    "Magic Mirror": "Espelho Mágico",
    "Rage Gem": "Gema da Fúria",
    "Fireball": "Bola de Fogo",
    "Dark Orb": "Orbe Sombria",
    "Henchmen Puppet": "Fantoche de Capanga",
    "Lightning Sword": "Espada Relâmpago",
    "Flaming Sword": "Espada Flamejante",
    "Mystic Cloak": "Manto Místico",
    "Dragon Scale Shield": "Escudo de Escamas de Dragão",
    "Cursed Skull": "Caveira Amaldiçoada",
    "Thunder Hammer": "Martelo do Trovão",
    "Boneco de Bárbaro": "Barbarian Puppet",
    "Boneco de Arqueira": "Archer Puppet",
    "Vial da Fúria": "Rage Vial",
    "Botas de Terremoto": "Earthquake Boots",
    "Bigode Vampiro": "Vampstache",
    "Vial da Invisibilidade": "Invisibility Vial",
    "Flecha Gigante": "Giant Arrow",
    "Boneco de Curandeiro": "Healer Puppet",
    "Tome Eterno": "Eternal Tome",
    "Gema da Vida": "Life Gem",
    "Tome de Cura": "Healing Tome",
    "Boneco de Lavaloon": "Lavaloon Puppet",
    "Gema Real": "Royal Gem",
    "Escudo Buscador": "Seeking Shield",
    "Boneco de Cavaleiro": "Hog Rider Puppet",
    "Vial da Velocidade": "Haste Vial",
    "Lança de Foguete": "Rocket Spear",
    "Botas Elétricas": "Electro Boots",
  };

  const translateHeroName = (name) => translatedHeroNames[name] || name;
  const translateEquipmentName = (name) => translatedEquipmentNames[name] || name;

  return (
    <div className="w-[90%] mt-10 flex justify-center items-center flex-col">
      <div className="flex items-center justify-center w-full">
        <h1 className="font-bold text-2xl">Heróis</h1>
        <button onClick={toggleHeroes} className="ml-2 text-lg">
          {showHeroes ? "▲" : "▼"}
        </button>
      </div>
      <div className="bg-white h-[1px] my-4 w-3/4"></div>
      {showHeroes && (
        <div className="w-full">
          {heroes.map((hero, index) => (
            <div key={index} className="mb-4 p-4 rounded shadow-lg">
              <div className="flex justify-center items-center space-x-2">
                <h2 className="text-xl font-bold text-blue-500">
                  {translateHeroName(hero.name)}
                </h2>
                <p className="text-white">
                  {hero.level}/{hero.maxLevel}
                </p>
              </div>

              {hero.equipment && hero.equipment.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-white">Equipamentos</h3>
                  {hero.equipment.map((equipment, eqIndex) => (
                    <div key={eqIndex} className="flex space-x-2 ml-4">
                      <p className="text-gray-300">{translateEquipmentName(equipment.name)}</p>
                      <p className="text-gray-300">
                        {equipment.level}/{equipment.maxLevel}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
