import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Adaptador para formatação de data
import dayjs from "dayjs"; // Importando dayjs
import utc from "dayjs/plugin/utc"; // Plugin utc
import timezone from "dayjs/plugin/timezone"; // Plugin timezone

dayjs.extend(utc);
dayjs.extend(timezone);

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
); // Registrando TimeScale

const colors = [
  "rgba(75, 192, 192, 0.6)",
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
  "rgba(153, 102, 255, 0.6)",
]; // Adicionando cores diferentes

const UpgradeChart = ({ submittedData }) => {
  const processData = () => {
    const allUpgrades = submittedData.flatMap((data) =>
      data.upgrades.map((upgrade) => ({
        village: data.villageName,
        upgrade: upgrade.upgrade,
        time: upgrade.finalTime
          ? new Date(upgrade.finalTime).getTime() - new Date().getTime()
          : 0,
      }))
    );

    const sortedUpgrades = allUpgrades.sort((a, b) => a.time - b.time);
    const labels = sortedUpgrades.map(
      (upgrade) => `${upgrade.village} - ${upgrade.upgrade}`
    );
    const times = sortedUpgrades.map((upgrade) => upgrade.time);
    const formattedTimes = times.map((time) => {
      const totalSeconds = time / 1000;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    });
    const maxTime = Math.ceil(Math.max(...times) / 1000) * 1000; // Arredondar para cima o tempo máximo em segundos

    // Criando um mapa de cores para cada vila
    const villageColors = {};
    sortedUpgrades.forEach((upgrade, index) => {
      if (!villageColors[upgrade.village]) {
        villageColors[upgrade.village] =
          colors[Object.keys(villageColors).length % colors.length];
      }
    });

    const backgroundColors = sortedUpgrades.map(
      (upgrade) => villageColors[upgrade.village]
    );

    return {
      labels,
      datasets: [
        {
          label: "Tempo Restante",
          data: times,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((color) =>
            color.replace("0.6", "1")
          ),
          borderWidth: 1,
        },
      ],
      formattedTimes, // Retornando formattedTimes
      maxTime, // Retornando maxTime
    };
  };

  const { labels, datasets, formattedTimes, maxTime } = processData(); // Adicionando formattedTimes

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Comparação de Tempos das Melhorias" },
      tooltip: {
        callbacks: {
          label: (context) =>
            `Tempo Restante: ${formattedTimes[context.dataIndex]}`,
        },
      },
    },
    scales: {
      y: {
        type: "linear", // Usando escala linear
        min: 0,
        max: maxTime,
        title: {
          display: false,
          text: "Tempo Restante (HH:MM:SS)",
        },
        ticks: {
          callback: function (value) {
            const totalSeconds = value / 1000;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = Math.floor(totalSeconds % 60);
            return `${String(hours).padStart(2, "0")}:${String(
              minutes
            ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
          },
        },
      },
      x: {
        title: {
          display: false,
          text: "Melhorias",
        },
        ticks: {
          display: false, // Isso removerá os rótulos das barrinhas no eixo X
        },
      },
    },
  };
  

  return (
    <div className="w-full hidden sm:flex">
    <Bar
      className="px-10"
      data={{ labels, datasets }}
      options={options}
    />
    </div>
  );
};

export default UpgradeChart;
