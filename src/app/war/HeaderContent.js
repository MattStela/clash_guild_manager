"use client";
import React from "react";
import Image from "next/image";
import MemberList from "./MemberListGroup";
import { FaStar } from "react-icons/fa";
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

  date.setHours(date.getHours() - 3);

  const formattedDate = date.toISOString().split("T")[0].split("-").slice(1).reverse().join("/");
  const formattedTime = date.toTimeString().split(" ")[0];

  return `${formattedDate} ${formattedTime}`;
};

const Details = ({ currentWar }) => {
  if (!currentWar) {
    return null;
  }

  const { clan, opponent } = currentWar;

  return (
    <div className="flex space-y-4 justify-center items-center flex-col text-white rounded-lg shadow-lg mt-4">
      <div className="flex flex-col justify-center items-center">
        <p>
          começo da preparação:{" "}
          {convertToBrasiliaTime(currentWar.preparationStartTime)}
        </p>
        <p>início da guerra: {convertToBrasiliaTime(currentWar.startTime)}</p>
        <p>fim da guerra: {convertToBrasiliaTime(currentWar.endTime)}</p>
        <br />
        <div className="flex justify-center items-center">
          {currentWar.teamSize}&nbsp;<p className="mb-[0.1rem]">x</p>&nbsp;{currentWar.teamSize}
        </div>
      </div>

      <div className="flex flex-row justify-center items-start w-full">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="font-bold">{clan.name}</p>
          <p className="text-gray-400 text-xs">{clan.tag}</p>
          <Image className="" src={clan.badgeUrls.medium} width={200} height={50} alt="guild logo" />

          <div className="flex flex-row space-x-2">
            <div className="flex flex-row justify-center items-center">
              <p className="text-gray-400 text-base">{clan.stars}</p>
              <FaStar className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-row justify-center items-center text-gray-400 text-xs">
                <p className="text-gray-400 text-base">{clan.destructionPercentage}%</p>
                <GiSpikyExplosion className="text-red-500 h-5 w-5" />
              </div>
            </div>
          </div>

          <MemberList currentWar={currentWar} members={clan.members} />
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="font-bold">{opponent.name}</p>
          <p className="text-gray-400 text-xs">{opponent.tag}</p>
          <Image className="" src={opponent.badgeUrls.medium} width={200} height={50} alt="guild logo" />

          <div className="flex flex-row space-x-2">
            <div className="flex flex-row justify-center items-center">
              <p className="text-gray-400 text-base">{opponent.stars}</p>
              <FaStar className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-row justify-center items-center text-gray-400 text-xs">
                <p className="text-gray-400 text-base">{opponent.destructionPercentage}%</p>
                <GiSpikyExplosion className="text-red-500 h-5 w-5" />
              </div>
            </div>
          </div>

          <MemberList currentWar={currentWar} members={opponent.members} />
        </div>
      </div>
    </div>
  );
};

export default Details;
