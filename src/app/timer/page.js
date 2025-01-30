"use client"
import React, { useState, useEffect } from "react";
import Form from "./FormTimer";
import UpgradeList from "./UpgradeList";
import UpgradeAscending from "./UpgradeAscending";  // Importando o novo componente

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
    setUpgrades([...upgrades, { id: upgrades.length + 1, upgrade: "", time: "" }]);
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
      <Form
        villageName={villageName}
        setVillageName={setVillageName}
        goldQuantity={goldQuantity}
        setGoldQuantity={setGoldQuantity}
        goldTotal={goldTotal}
        setGoldTotal={setGoldTotal}
        elixirQuantity={elixirQuantity}
        setElixirQuantity={setElixirQuantity}
        elixirTotal={elixirTotal}
        setElixirTotal={setElixirTotal}
        upgrades={upgrades}
        addUpgrade={addUpgrade}
        handleUpgradeChange={handleUpgradeChange}
        removeUpgrade={removeUpgrade}
        handleSubmit={handleSubmit}
      />
      <UpgradeList
        submittedData={submittedData}
        setSubmittedData={setSubmittedData}
        timers={timers}
        setTimers={setTimers}
        deleteRecord={deleteRecord}
        formatTime={formatTime}
        calculatePercentage={calculatePercentage}
      />
      <UpgradeAscending submittedData={submittedData} />
    </div>
  );
}
