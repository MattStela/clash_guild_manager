import React from "react";
import Image from "next/image";

const UpgradeList = ({
  submittedData,
  timers,
  deleteRecord,
  formatTime,
  calculatePercentage,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 my-10">
    {submittedData.map((data, index) => (
      <div key={index} className="border border-4 border-gray-700 p-4 rounded-3xl relative m-4">
        <button
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full m-3 px-3 py-1"
          onClick={() => deleteRecord(index)}
        >
          x
        </button>
        <h2 className="text-2xl">{data.villageName}</h2>

        <div className=" mt-4">

          <div className="w-full rounded-full h-7">
            <div
              className="flex justify-center items-start bg-[#DFC147] h-6 rounded-full"
              style={{
                width: `${calculatePercentage(
                  data.goldQuantity,
                  data.goldTotal
                )}%`,
              }}
            >
              <div className="mx-2 mt-1 rounded-full bg-[#F1DE80] h-[0.4rem] flex-grow bg-white"></div>
              <div className="h-full mr-4 flex justify-center items-center">
                <Image
                  src="/gold_icon.webp"
                  width={35}
                  height={25}
                  alt="gold icon"
                />
              </div>
            </div>
          </div>

          <p>{Number(data.goldQuantity).toLocaleString("pt-BR")}</p>
        </div>
        <div className="mt-4">

          <div className="w-full rounded-full h-7">
            <div
              className="flex justify-center items-start bg-[#AF37BB] h-6 rounded-full"
              style={{
                width: `${calculatePercentage(
                  data.elixirQuantity,
                  data.elixirTotal
                )}%`,
              }}
            >
              <div className="mx-2 mt-1 rounded-full bg-[#D592DD] h-[0.4rem] flex-grow bg-white"></div>
              <div className="h-full mr-4 flex justify-center items-center">
                <Image
                  src="/elixir_icon.webp"
                  width={35}
                  height={25}
                  alt="gold icon"
                />
              </div>
            </div>
          </div>

          <p>{Number(data.elixirQuantity).toLocaleString("pt-BR")}</p>
        </div>
        <h3 className="text-xl mt-4">Melhorias em Andamento:</h3>
        {data.upgrades.map((upgrade) => (
          <div
            className="flex flex-row justify-between space-x-2"
            key={`${upgrade.id}-${upgrade.finalTime}`}
          >
            <p>{upgrade.upgrade}</p>
            
            <p>
              {upgrade.finalTime
                ? formatTime(timers[`${upgrade.id}-${upgrade.finalTime}`])
                : "Valor de tempo inválido"}
            </p>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default UpgradeList;
