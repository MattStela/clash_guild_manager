"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Capital() {
  const [capitalRaidSeasons, setCapitalRaidSeasons] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCapitalRaidSeasons = async () => {
      try {
        console.log("Fetching capital raid seasons data...");
        const response = await axios.get("http://localhost:4000/clashofclans/%232J8JP9RJR/capitalraidseasons?limit=2");
        console.log("Response received:", response.data);
        setCapitalRaidSeasons(response.data);
      } catch (error) {
        console.error("Error fetching capital raid seasons:", error.message);
        setError(error.message);
      }
    };

    fetchCapitalRaidSeasons();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1>Capital</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {capitalRaidSeasons ? (
        <pre className="text-left mt-4">{JSON.stringify(capitalRaidSeasons, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
