"use client";
import React, { useState, useEffect } from "react";

export default function Timer() {
  const [villageName, setVillageName] = useState("");
  const [goldQuantity, setGoldQuantity] = useState("");
  const [goldTotal, setGoldTotal] = useState("");
  const [elixirQuantity, setElixirQuantity] = useState("");
  const [elixirTotal, setElixirTotal] = useState("");
  const [upgrades, setUpgrades] = useState([{ id: 1, upgrade: "", time: "" }]);
  const [submittedData, setSubmittedData] = useState([]);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("submittedData")) || [];
    const dataArray = Array.isArray(storedData) ? storedData : [];
    setSubmittedData(dataArray);
    const allUpgrades = dataArray.flatMap((data) => data.upgrades || []);
    initializeTimers(allUpgrades);

    const intervalId = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers };
        Object.keys(newTimers).forEach((id) => {
          newTimers[id] = Math.max(newTimers[id] - 1000, 0);
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const addUpgrade = () => {
    setUpgrades([
      ...upgrades,
      { id: upgrades.length + 1, upgrade: "", time: "" },
    ]);
  };

  const handleUpgradeChange = (id, event, field) => {
    const newUpgrades = upgrades.map((upgrade) => {
      if (upgrade.id === id) {
        return { ...upgrade, [field]: event.target.value };
      }
      return upgrade;
    });
    setUpgrades(newUpgrades);
  };

  const deleteRecord = (index) => {
    const newRecords = submittedData.filter((_, i) => i !== index);
    setSubmittedData(newRecords);
    localStorage.setItem("submittedData", JSON.stringify(newRecords));
  };

  const initializeTimers = (upgrades) => {
    const now = new Date();
    const newTimers = upgrades.reduce((acc, upgrade) => {
      const finalTime = new Date(upgrade.finalTime);
      const remainingTime = Math.max(finalTime - now, 0);
      acc[`${upgrade.id}-${upgrade.finalTime}`] = remainingTime;
      return acc;
    }, {});
    setTimers(newTimers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const now = new Date();
    const data = {
      villageName,
      goldQuantity,
      goldTotal,
      elixirQuantity,
      elixirTotal,
      upgrades: upgrades.map((upgrade) => {
        const timeValue = timeToMilliseconds(upgrade.time);
        if (isNaN(timeValue) || timeValue <= 0) {
          return { ...upgrade, finalTime: null };
        }
        const finalTime = new Date(now.getTime() + timeValue);
        return { ...upgrade, finalTime: finalTime.toISOString() };
      }),
    };

    const storedData = JSON.parse(localStorage.getItem("submittedData")) || [];
    const dataArray = Array.isArray(storedData) ? storedData : [];
    dataArray.push(data);
    setSubmittedData(dataArray);
    localStorage.setItem("submittedData", JSON.stringify(dataArray));
    initializeTimers(dataArray.flatMap((d) => d.upgrades));
  };

  const removeUpgrade = (id) => {
    setUpgrades((prevUpgrades) =>
      prevUpgrades.filter((upgrade) => upgrade.id !== id)
    );
  };

  const timeToMilliseconds = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const calculatePercentage = (quantity, total) => {
    return (quantity / total) * 100;
  };

  return (
    <div className="flex flex-col items-center text-base font-bold text-gray-400 min-h-screen">

      {/* FORMULÁRIO */}
      <form
        className="flex flex-col items-center justify-between space-y-4 p-4"
        onSubmit={handleSubmit}
      >
        {/* NOME DA VILA */}
        <div className="flex flex-col items-center">
          <label className="pl-4">Nome da Vila</label>
          <input
            type="text"
            value={villageName}
            onChange={(e) => setVillageName(e.target.value)}
            className="rounded-3xl text-black border w-64 px-4 p-2"
          />
        </div>

        {/* RECURSOS */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="text-2xl">Recursos</h1>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col">
              <label className="pl-4">Ouro (Quantidade)</label>
              <input
                type="number"
                name="goldQuantity"
                value={goldQuantity}
                onChange={(e) => setGoldQuantity(e.target.value)}
                className="rounded-3xl text-black border w-44 px-4 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="pl-4">Ouro Total</label>
              <input
                type="number"
                name="goldTotal"
                value={goldTotal}
                onChange={(e) => setGoldTotal(e.target.value)}
                className="rounded-3xl text-black border w-44 px-4 p-2"
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col">
              <label className="pl-4">Elixir (Quantidade)</label>
              <input
                type="number"
                name="elixirQuantity"
                value={elixirQuantity}
                onChange={(e) => setElixirQuantity(e.target.value)}
                className="rounded-3xl text-black border w-44 px-4 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="pl-4">Elixir Total</label>
              <input
                type="number"
                name="elixirTotal"
                value={elixirTotal}
                onChange={(e) => setElixirTotal(e.target.value)}
                className="rounded-3xl text-black border w-44 px-4 p-2"
              />
            </div>
          </div>
        </div>

        {/* MELHORIAS EM ANDAMENTO */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="text-2xl">Melhorias em Andamento</h1>
          {upgrades.map((upgrade) => (
            <div
              key={upgrade.id}
              className="flex  pl-14 flex-row space-x-4 items-center"
            >
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  value={upgrade.upgrade}
                  onChange={(e) =>
                    handleUpgradeChange(upgrade.id, e, "upgrade")
                  }
                  className="rounded-3xl text-black border w-44 px-4 p-2"
                  placeholder={`Melhoria ${upgrade.id}`}
                />
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  value={upgrade.time}
                  onChange={(e) => handleUpgradeChange(upgrade.id, e, "time")}
                  className="rounded-3xl text-black border w-44 px-4 p-2"
                  placeholder={`Tempo ${upgrade.id} (HH:MM:SS)`}
                />
              </div>
              <button
                type="button"
                onClick={() => removeUpgrade(upgrade.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-3xl"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addUpgrade}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-3xl"
          >
            +
          </button>
        </div>
        {/* BOTÃO CONFIRMAR */}
        <div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-3xl"
          >
            Confirmar
          </button>
        </div>
      </form>

      {/* REGISTROS */}
      {submittedData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 my-10">
          {submittedData.map((data, index) => (
            <div key={index} className="p-4 rounded-lg relative m-4">
              <button
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full m-3 px-3 py-1"
                onClick={() => deleteRecord(index)}
              >
                x
              </button>
              <h2 className="text-2xl">{data.villageName}</h2>

              <div className=" mt-4">
                <p>
                  <strong>Ouro:</strong>
                </p>



                <div className="w-full rounded-full h-4">

                  <div
                    className="flex justify-center items-start bg-[#DFC147] h-4 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        data.goldQuantity,
                        data.goldTotal,
                      )}%`,
                    }}
                  >

                    <div className="mx-2 mt-1 rounded-full bg-[#F1DE80] h-[0.3rem] w-full bg-white"></div>
                  </div>

                </div>



                <p>
                <p>{Number(data.goldQuantity).toLocaleString('pt-BR')}</p>
                </p>
              </div>
              <div className="mt-4">
                <p>
                  <strong>Elixir:</strong>
                </p>
                <div className="w-full rounded-full h-4">

                  <div
                    className="flex justify-center items-start bg-[#AF37BB] h-4 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        data.elixirQuantity,
                        data.elixirTotal,
                      )}%`,
                    }}
                  >

                    <div className="mx-2 mt-1 rounded-full bg-[#D592DD] h-[0.3rem] w-full bg-white"></div>
                  </div>

                </div>
                <p>{Number(data.elixirQuantity).toLocaleString('pt-BR')}</p>



              </div>
              <h3 className="text-xl mt-4">Melhorias em Andamento:</h3>
              {data.upgrades.map((upgrade) => (
                <div
                  className="flex flex-row space-x-2"
                  key={`${upgrade.id}-${upgrade.finalTime}`}
                >
                  <p>{upgrade.upgrade}</p>
                  <p>-</p>
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
      )}
    </div>
  );
}
