import React from "react";
import AchievementList from "./AchievementList";
import PlayerInfo from "./PlayerInfo";
import Troops from "./Troops";
import Heroes from "./Heroes";

export default function PlayerAchievements({ playerData }) {
  return (
    <div className="flex justify-center items-center flex-col">
      <PlayerInfo playerData={playerData} />
      <AchievementList achievements={playerData.achievements} />
      <Troops troops={playerData.troops}/>
      <Heroes heroes={playerData.heroes}/>
    </div>
  );
}
