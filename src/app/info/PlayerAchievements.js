import React from "react";
import AchievementList from "./AchievementList";
import PlayerInfo from "./PlayerInfo";
import Troops from "./Troops";
import Heroes from "./Heroes";
import Spells from "./Spells";

export default function PlayerAchievements({ playerData }) {
  return (
    <div className="flex justify-center items-center flex-col">
      <PlayerInfo playerData={playerData} />
      <AchievementList achievements={playerData.achievements} />
      <Troops troops={playerData.troops}/>
      <Spells spells={playerData.spells}/>
      <Heroes heroes={playerData.heroes}/>
      
    </div>
  );
}
