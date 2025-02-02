"use client";
import React, { useState } from "react";
import Image from "next/image";
import MemberList from "./MemberListGroup";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiSpikyExplosion } from "react-icons/gi";

const convertToBrasiliaTime = (isoString) => {
  if (typeof isoString !== "string" || !isoString) {
    return "Data Inválida";
  }

  const year = isoString.substring(0, 4);
  const month = isoString.substring(4, 6);
  const day = isoString.substring(6, 8);
  const hour = isoString.substring(9, 11);
  const minute = isoString.substring(11, 13);
  const second = isoString.substring(13, 15);

  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  if (isNaN(date.getTime())) {
    return "Data Inválida";
  }

  date.setHours(date.getHours() - 0);

  const formattedDate = date
    .toISOString()
    .split("T")[0]
    .split("-")
    .slice(1)
    .reverse()
    .join("/");
  const formattedTime = date.toTimeString().split(" ")[0];

  return `${formattedDate} ${formattedTime}`;
};

const Details = ({ currentWar }) => {
  if (!currentWar) {
    return null;
  }

  const { clan, opponent } = currentWar;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => setIsExpanded(!isExpanded);
  return (
    <div className="flex space-y-4 justify-center items-center flex-col text-white rounded-lg shadow-lg mt-4">
      <div className="rounded-full py-4 text-xs flex flex-col space-y-3 justify-center items-center w-full">
        {[
          {
            time: convertToBrasiliaTime(currentWar.preparationStartTime),
            label: "Preparação",
            color: "bg-green-800",
          },
          {
            time: convertToBrasiliaTime(currentWar.startTime),
            label: "Início",
            color: "bg-yellow-800",
          },
          {
            time: convertToBrasiliaTime(currentWar.endTime),
            label: "Fim",
            color: "bg-red-800",
          },
        ].map(({ time, label, color }, index) => (
          <div
            key={index}
            className={`flex justify-center items-center w-1/3 h-8 rounded-3xl ${color} relative group`}
          >
            <p className="text-white font-bold">{time}</p>
            <p className="hidden group-hover:flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 text-white text-center p-2">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        {currentWar.teamSize}&nbsp;<p className="mb-[0.1rem]">x</p>&nbsp;
        {currentWar.teamSize}
      </div>
      <div className="flex flex-row">
        {[clan, opponent].map((team, index) => (
          <div
            key={index}
            className="w-1/2 flex flex-col justify-center items-center"
          >
            <p className="font-bold">{team.name}</p>
            <p className="text-gray-400 text-xs">{team.tag}</p>
            <Image
              className=""
              src={team.badgeUrls.medium}
              width={200}
              height={50}
              alt="guild logo"
            />

            <div className="flex flex-col w-full justify-center items-center space-y-2">
              <div className="flex flex-row justify-center items-center">
                <p className="text-gray-400 text-base">{team.stars}</p>
                <FaStar className="h-5 w-5 text-yellow-500" />
              </div>

              <div
                className={`flex ${
                  index === 0 ? "flex-row-reverse" : "flex-row"
                } w-full h-8`}
              >
                <div
                  className={`${
                    index === 0 ? "bg-blue-800" : "bg-red-800"
                  } flex justify-${index === 0 ? "end" : "start"} ${
                    index === 0 ? "pr-2" : "pl-2"
                  } items-center flex-row${index === 0 ? "-reverse" : ""} h-8`}
                  style={{ width: `${team.destructionPercentage}%` }}
                >
                  <div
                    className={`flex flex-row${index === 0 ? "-reverse" : ""}`}
                  >
                    <p className="text-gray-200 text-base mb-1">
                      {team.destructionPercentage}%
                    </p>
                    &nbsp;
                    <GiSpikyExplosion className="text-gray-200 h-4 w-4 mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={toggleExpansion}
        className="p-4 flex flex-row space-x-2 justify-center items-center text-gray-400 hover:text-yellow-500 focus:outline-none"
      >
        <p>Registros</p> {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isExpanded && (
        <div className="flex flex-row justify-center items-start w-full">
          <div className="w-1/2 flex justify-center items-center">
            <MemberList currentWar={currentWar} members={clan.members} />
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <MemberList currentWar={currentWar} members={opponent.members} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
