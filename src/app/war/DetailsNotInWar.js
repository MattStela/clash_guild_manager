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
      <h1 className="text-2xl font-bold">Não está em guerra ({currentWar.state})</h1>
      
    </div>
  );
};

export default Details;