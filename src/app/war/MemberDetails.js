"use client";
import React from "react";
import { FaShieldHalved } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { LuSword } from "react-icons/lu";

const MemberDetails = ({ member }) => {
  return (
    <div className="font-normal flex flex-row justify-center items-center p-3 text-base w-full font-bold">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row space-x-2">
            <div className="flex items-center">
              <FaShieldHalved />
              <div>{member.opponentAttacks}</div>
            </div>
            <div className="flex items-center">
              <LuSword />
              <div>{member.attacks ? member.attacks.length : 0}</div>
            </div>
          </div>
        </div>
        {member.attacks && member.attacks.length > 0 && (
          <>
            <p className="font-bold text-gray-500">Ataques:</p>
            {member.attacks.map((attack, i) => (
              <div className="flex flex-row justify-center items-center" key={i}>
                <p className="flex flex-row justify-center items-center">
                  {attack.order}º {attack.destructionPercentage}% {attack.duration}s {attack.stars}
                  <FaStar className="text-yellow-500 h-2" />
                </p>
              </div>
            ))}
          </>
        )}
        <br />
        <div className="font-bold text-gray-500">Pior Defesa:</div>
        {member.bestOpponentAttack ? (
          <div className="flex space-x-2 flex-row justify-center items-center">
            <div>
              {member.bestOpponentAttack.order}º {member.bestOpponentAttack.destructionPercentage}%
            </div>
            <div>{member.bestOpponentAttack.duration}s</div>
            <div className="flex items-center">
              <div>{member.bestOpponentAttack.stars}</div>
              <FaStar className="text-yellow-500 h-2" />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Sem ataques a essa vila</p>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;
