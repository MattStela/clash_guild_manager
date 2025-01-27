import React, { useState } from "react";

export default function AchievementList({ achievements }) {
  const [showAchievements, setShowAchievements] = useState(false);

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push("⭐");
    }
    return stars.join(" ");
  };

  const toggleAchievements = () => {
    setShowAchievements(!showAchievements);
  };

  return (
    <div className=" w-[90%] mt-10 flex justify-center items-center flex-col">
      <div className=" flex items-center justify-center w-[170px]">
        <h1 className="font-bold text-2xl">Conquistas</h1>
        <button onClick={toggleAchievements} className="ml-2 text-lg">
          {showAchievements ? "▲" : "▼"}
        </button>
      </div>
      <div className="bg-white h-[1px] my-4 w-3/4"></div>
      {showAchievements &&
        achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center mb-2"
          >
            <p>
              <span className="text-gray-500">Nome:</span> {achievement.name}{" "}
              {renderStars(achievement.stars)}
            </p>
            <p className="text-center">{achievement.info}</p>
            {achievement.completionInfo && <p>{achievement.completionInfo}</p>}
            <div className="bg-white h-[1px] my-4 w-3/4"></div>
          </div>
        ))}
    </div>
  );
}
