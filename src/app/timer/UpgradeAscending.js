import React from "react";

const UpgradeList = ({ submittedData }) => {
  const processData = () => {
    const allUpgrades = submittedData.flatMap((data) =>
      data.upgrades.map((upgrade) => ({
        village: data.villageName,
        upgrade: upgrade.upgrade,
        time: upgrade.finalTime
          ? new Date(upgrade.finalTime).getTime() - Date.now()
          : 0,
      }))
    );

    const sortedUpgrades = allUpgrades
      .filter((upgrade) => upgrade.time > 0) // Filtrando melhorias com tempo acima de 00:00:00
      .sort((a, b) => a.time - b.time);

    const completedUpgrades = allUpgrades
      .filter((upgrade) => upgrade.time <= 0) // Filtrando melhorias finalizadas
      .sort((a, b) => a.time - b.time);

    return {
      sortedUpgrades: sortedUpgrades.map((upgrade) => ({
        ...upgrade,
        formattedTime: formatTime(upgrade.time),
      })),
      completedUpgrades: completedUpgrades.map((upgrade) => ({
        ...upgrade,
        formattedTime: formatTime(upgrade.time),
      })),
    };
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.abs(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const { sortedUpgrades, completedUpgrades } = processData();

  return (
    <div className="w-full px-10 flex justify-center items-center flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
      <div className="border p-4 border border-4 border-gray-600 rounded-3xl mb-10">
        <h1 className="text-lg font-base mb-4">
          Lista de Melhorias (ordem Crescente)
        </h1>
        <ul>
          {sortedUpgrades.map((upgrade, index) => (
            <li key={index}>
              {upgrade.formattedTime} - {upgrade.village} - {upgrade.upgrade}
            </li>
          ))}
        </ul>
      </div>
      {completedUpgrades.length > 0 && (
        <div className="border p-4 border border-4 border-gray-600 rounded-3xl mb-10">
          <h1 className="text-lg font-base mb-4">
            Lista de Melhorias (Finalizadas)
          </h1>
          <ul>
            {completedUpgrades.map((upgrade, index) => (
              <li key={index}>
                {upgrade.formattedTime} - {upgrade.village} - {upgrade.upgrade}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UpgradeList;
