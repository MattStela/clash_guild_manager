"use client";
import React from "react";
import Image from "next/image";
import HeaderContent from "./HeaderContent";

const Details = ({ currentWar }) => {
  if (!currentWar) {
    return null;
  }

  return (
    <div className="flex space-y-4 justify-center items-center flex-col text-white p-6 rounded-lg shadow-lg mt-4">
      <h1 className="text-2xl font-bold">
        Guerra Finalizada ({currentWar.state})
      </h1>

      <div className="w-full">
        <HeaderContent currentWar={currentWar} />
      </div>

    </div>
  );
};

export default Details;
