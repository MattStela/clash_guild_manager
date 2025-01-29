import React, { useState } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { BsEraserFill } from "react-icons/bs";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const UpgradeList = ({
  submittedData,
  setSubmittedData,
  timers,
  setTimers,
  deleteRecord,
  formatTime,
  calculatePercentage,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editUpgradeIndex, setEditUpgradeIndex] = useState(null);
  const [editData, setEditData] = useState({ upgrade: "", time: "00:00:00" });

  const handleEdit = (index, upgradeIndex, upgrade) => {
    setEditIndex(index);
    setEditUpgradeIndex(upgradeIndex);
    setEditData({
      ...upgrade,
      time: upgrade.time || "00:00:00",
      upgrade: upgrade.upgrade,
    });
  };

  const handleSave = (index, upgradeIndex) => {
    const newSubmittedData = [...submittedData];
    const now = new Date();
    const timeInMilliseconds = timeToMilliseconds(editData.time);

    if (!isNaN(timeInMilliseconds)) {
      newSubmittedData[index].upgrades[upgradeIndex].time = editData.time;
      newSubmittedData[index].upgrades[upgradeIndex].upgrade = editData.upgrade;
      newSubmittedData[index].upgrades[upgradeIndex].finalTime = new Date(
        now.getTime() + timeInMilliseconds
      ).toISOString();

      // Atualizar o temporizador
      const timerId = `${newSubmittedData[index].upgrades[upgradeIndex].id}-${newSubmittedData[index].upgrades[upgradeIndex].finalTime}`;
      timers[timerId] = timeInMilliseconds;
      setTimers({ ...timers });
    }

    setSubmittedData(newSubmittedData);
    localStorage.setItem("submittedData", JSON.stringify(newSubmittedData));
    setEditIndex(null);
    setEditUpgradeIndex(null);
    setEditData({ upgrade: "", time: "00:00:00" });
  };

  const handleChange = (e, field) => {
    setEditData({
      ...editData,
      [field]: e.target.value,
    });
  };

  const handleDeleteUpgrade = (index, upgradeIndex) => {
    const newSubmittedData = [...submittedData];
    newSubmittedData[index].upgrades.splice(upgradeIndex, 1);
    setSubmittedData(newSubmittedData);
    localStorage.setItem("submittedData", JSON.stringify(newSubmittedData));
  };

  const handleAddUpgrade = (index) => {
    const newSubmittedData = [...submittedData];
    const newUpgrade = { id: new Date().getTime(), upgrade: "", time: "00:00:00", finalTime: null };
    newSubmittedData[index].upgrades.push(newUpgrade);
    setSubmittedData(newSubmittedData);
    localStorage.setItem("submittedData", JSON.stringify(newSubmittedData));
  };

  const timeToMilliseconds = (time) => {
    const parts = time.split(":");
    if (parts.length !== 3) {
      return NaN; // Formato de tempo inválido
    }
    const [hours, minutes, seconds] = parts.map((part) => {
      const number = Number(part);
      return isNaN(number) ? NaN : number;
    });
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return NaN; // Valores inválidos
    }
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 my-10">
      {submittedData.map((data, index) => (
        <div
          key={index}
          className="flex flex-col border border-4 border-gray-700 p-4 rounded-3xl relative m-4"
        >
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
                <div className="mx-2 mt-1 rounded-full bg-[#F1DE80] h-[0.4rem] flex-grow bg-[#DFC147]"></div>
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
                <div className="mx-2 mt-1 rounded-full bg-[#D592DD] h-[0.4rem] flex-grow bg-[#AF37BB]"></div>
                <div className="h-full mr-4 flex justify-center items-center">
                  <Image
                    src="/elixir_icon.webp"
                    width={35}
                    height={25}
                    alt="elixir icon"
                  />
                </div>
              </div>
            </div>
            <p>{Number(data.elixirQuantity).toLocaleString("pt-BR")}</p>
          </div>

          <h3 className="text-xl mt-4">Melhorias em Andamento:</h3>

          {data.upgrades.map((upgrade, upgradeIndex) => (
            <div
              className="w-full justify-center flex flex-row"
              key={`${upgrade.id}-${upgrade.finalTime}`}
            >
              <div className="flex flex-row flex-grow justify-between space-x-2">
                {editIndex === index && editUpgradeIndex === upgradeIndex ? (
                  <>
                    <input
                      type="text"
                      value={editData.upgrade}
                      onChange={(e) => handleChange(e, "upgrade")}
                      className="rounded-3xl text-black w-[150px] px-4 "
                    />
                    <input
                      type="text"
                      value={editData.time}
                      onChange={(e) => handleChange(e, "time")}
                      className="rounded-3xl text-black w-[100px] px-4 "
                    />
                  </>
                ) : (
                  <>
                    <p>{upgrade.upgrade}</p>
                    <p>
                      {upgrade.finalTime
                        ? formatTime(
                            timers[`${upgrade.id}-${upgrade.finalTime}`]
                          )
                        : "Valor de tempo inválido"}
                    </p>
                  </>
                )}
              </div>
              {editIndex === index && editUpgradeIndex === upgradeIndex ? (
                <button
                  className="ml-2 hover:cursor-pointer text-green-600"
                  onClick={() => handleSave(index, upgradeIndex)}
                >
                  Salvar
                </button>
              ) : (
                <div className="flex flex-row">
                  <MdEdit
                    className="ml-2 hover:cursor-pointer text-green-600"
                    onClick={() => handleEdit(index, upgradeIndex, upgrade)}
                  />
                  <BsEraserFill
                    className="ml-2 hover:cursor-pointer text-red-600"
                    onClick={() => handleDeleteUpgrade(index, upgradeIndex)}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="w-full flex justify-center items-center">
            <MdOutlinePlaylistAdd
              className="hover:cursor-pointer my-4 w-8 h-8"
              onClick={() => handleAddUpgrade(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpgradeList;
