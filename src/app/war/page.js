"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineExpandMore } from "react-icons/md";

function formatDate(dateString) {
  if (!dateString) return "Data inválida";

  // Extrair partes da data e hora do formato ISO 8601
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  const hour = dateString.slice(9, 11); // Ignorando o "T"
  const minutes = dateString.slice(11, 13);
  const seconds = dateString.slice(13, 15);

  // Criar um objeto Date usando as partes extraídas
  const date = new Date(
    `${year}-${month}-${day}T${hour}:${minutes}:${seconds}Z`
  );
  if (isNaN(date.getTime())) return "Data inválida";

  // Converter a data para o horário de Brasília (UTC-3)
  const brtOffset = -3;
  date.setHours(date.getUTCHours() + brtOffset);

  const formattedDay = date.getDate().toString().padStart(2, "0");
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0"); // Janeiro é 0!
  const formattedYear = date.getFullYear();
  const formattedHours = date.getHours().toString().padStart(2, "0");
  const formattedMinutes = date.getMinutes().toString().padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${formattedYear} - ${formattedHours}:${formattedMinutes}`;
}

export default function War() {
  const [clanTag, setClanTag] = useState("#2J8JP9RJR");
  const [clanName, setClanName] = useState("");
  const [currentWar, setCurrentWar] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showOpponent, setShowOpponent] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const renderMembersSection = (currentWar, title, filterCondition) => {
    const members = currentWar?.clan?.members?.filter(filterCondition) || [];
    return (
      <div className="flex text-center justify-center items-center flex-col items-start w-[300px] text-white mx-4 mt-4">
        <h3 className="text-lg font-bold mt-4">
          {title} ({members.length})
        </h3>
        <p>{members.map((member) => member.name).join(", ")}</p>
      </div>
    );
  };

  const toggleShowOpponent = () => {
    setShowOpponent(!showOpponent);
  };

  const fetchCurrentWar = async () => {
    const url = `http://localhost:4000/clashofclans/${encodeURIComponent(
      clanTag.replace("#", "")
    )}/currentwar`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCurrentWar(data);
      setClanName(data.clan.name); // Supondo que o nome do clã esteja nos dados da guerra atual
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="my-10 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-lg font-bold">Guerra Atual</h1>
      <br />

      <p className="text-gray-400">Insira o ID do Clã:</p>
      <div className="flex items-center space-x-2">
        <input
          className="h-8 rounded-full px-3 text-black bg-white"
          value={clanTag}
          onChange={(e) => setClanTag(e.target.value)}
        />
        <button
          onClick={fetchCurrentWar}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
      </div>
      <br />

      {currentWar && (
        <div className="flex flex-col justify-center items-center">
          {currentWar.state === "notInWar" ? (
            <p>não está em guerra</p>
          ) : currentWar.state === "warEnded" ? (
            <p>A guerra acabou</p>
          ) : currentWar.state === "preparation" ? (
            <div className="w-[400px] flex flex-col justify-center items-center">
              <p className="text-orange-500">Dia de preparação</p>
              <div className="flex flex-row">
                <p>Início da preparação -&nbsp;</p>{" "}
                {formatDate(currentWar.preparationStartTime)}
              </div>
              <div className="flex flex-row">
                <p>Início da guerra -&nbsp;</p>{" "}
                {formatDate(currentWar.startTime)}
              </div>
              <div className="flex flex-row">
                <p>Fim da guerra -&nbsp;</p> {formatDate(currentWar.endTime)}
              </div>
              <div className="flex flex-row justify-center items-center">
                <p>tamanho da guerra:</p>&nbsp;
                {currentWar.teamSize}x{currentWar.teamSize}
              </div>
              <div className="my-4 flex flex-row space-x-2 justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <img src={currentWar.clan.badgeUrls.medium}></img>
                  <div>{currentWar.clan.name}</div>
                  <div className="text-xs text-gray-500">
                    {currentWar.clan.tag}
                  </div>
                </div>{" "}
                <p>X</p>{" "}
                <div className="flex flex-col justify-center items-center">
                  <img src={currentWar.opponent.badgeUrls.medium}></img>
                  <div>{currentWar.opponent.name}</div>
                  <div className="text-xs text-gray-500">
                    {currentWar.opponent.tag}
                  </div>
                </div>{" "}
              </div>
            </div>
          ) : currentWar.state === "inWar" ? (
            <div className="flex flex-col justify-center items-center">
              {/*currentWar.state === "inWar"*/}
              {/*=================== Cabeçalho ===================*/}

              <div className="flex flex-col items-center justify-center text-white">
                <p>
                  <strong className="text-gray-500">
                    Início da Preparação:
                  </strong>{" "}
                  {formatDate(currentWar.preparationStartTime)}
                </p>
                <p>
                  <strong className="text-gray-500">Início da Guerra:</strong>{" "}
                  {formatDate(currentWar.startTime)}
                </p>
                <p>
                  <strong className="text-gray-500">Término da Guerra:</strong>{" "}
                  {formatDate(currentWar.endTime)}
                </p>
              </div>

              <div className="flex flex-col mt-4 w-full sm:flex-row justify-center items-start">
                {/*=================== clã pesquisado ===================*/}
                {currentWar && currentWar.clan && currentWar.clan.members && (
                  <div className="flex flex-col items-start sm:items-end w-1/2 text-white mx-4">
                    <h2 className="text-xl font-bold">Clã</h2>
                    <p>{currentWar.clan.name}</p>
                    <p>Ataques - {currentWar.clan.attacks}</p>

                    <div className="flex flex-row justify-center items-center">
                      {" "}
                      <p>{currentWar.clan.stars} </p>
                      <FaStar size={12} className="text-yellow-500" />
                    </div>

                    <p>
                      Destruição:{" "}
                      {currentWar.clan.destructionPercentage.toFixed(2)}%
                    </p>
                    <img
                      className="h-24 mt-4"
                      src={currentWar.clan.badgeUrls.medium}
                      alt="Clan Badge"
                    />
                    <div className="flex justify-center items-center flex-col">
                      <div className="flex flex-row justify-center space-x-2 items-center">
                        <h3 className="text-lg font-bold">Membros</h3>
                        <MdOutlineExpandMore
                          onClick={toggleShow}
                          className="hover:cursor-pointer h-10 w-6"
                        />
                      </div>

                      {show && (
                        <div>
                          {currentWar.clan.members
                            .sort((a, b) => a.mapPosition - b.mapPosition)
                            .map((member) => (
                              <div
                                key={member.tag}
                                className="flex flex-col items-start sm:items-end mt-2"
                              >
                                <p>
                                  {member.mapPosition}. {member.name}
                                </p>
                                <div className="flex flex-row">
                                  <p className="text-gray-500">
                                    Centro de Vila -
                                  </p>
                                  &nbsp;
                                  <p>{member.townhallLevel}</p>
                                </div>
                                <div className="flex flex-row">
                                  <p className="text-gray-500">
                                    Ataques sofridos -
                                  </p>
                                  &nbsp;
                                  <p>{member.opponentAttacks}</p>
                                </div>

                                {/*============================ Ataques ==================================*/}

                                {member.attacks && (
                                  <div className="text-xs flex flex-row justify-center space-x-2 items-center">
                                    {/* Primeiro Ataque */}
                                    <div className="flex flex-col justify-center items-end">
                                      <div className="flex flex-col justify-center items-center">
                                        <strong className="text-blue-400">
                                          1º Ataque
                                        </strong>

                                        <div className="flex flex-row justify-center items-center">
                                          {member.attacks[0]
                                            ? Array.from({
                                                length: member.attacks[0].stars,
                                              }).map((_, index) => (
                                                <FaStar
                                                  key={index}
                                                  size={12}
                                                  className="text-yellow-500"
                                                />
                                              ))
                                            : "N/A"}
                                        </div>

                                        <div>
                                          {member.attacks[0]
                                            ? member.attacks[0]
                                                .destructionPercentage
                                            : "N/A"}
                                          %
                                        </div>
                                        {member.attacks[0]
                                          ? `${member.attacks[0].duration} seg.`
                                          : "N/A"}
                                      </div>
                                    </div>

                                    {/* Segundo Ataque */}
                                    <div className="flex flex-col justify-center items-end mt-2">
                                      <div className="flex flex-col justify-center items-center">
                                        <strong className="text-blue-400">
                                          2º Ataque
                                        </strong>

                                        <div className="flex flex-row justify-center items-center">
                                          {member.attacks[1]
                                            ? Array.from({
                                                length: member.attacks[1].stars,
                                              }).map((_, index) => (
                                                <FaStar
                                                  key={index}
                                                  size={12}
                                                  className="text-yellow-500"
                                                />
                                              ))
                                            : "N/A"}
                                        </div>

                                        <div>
                                          {member.attacks[1]
                                            ? member.attacks[1]
                                                .destructionPercentage
                                            : "N/A"}
                                          %
                                        </div>
                                        {member.attacks[1]
                                          ? `${member.attacks[1].duration} seg.`
                                          : "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/*=================== separador ===================*/}
                <div className="flex sm:hidden h-[2px] bg-gray-500 w-3/4"></div>

                {/*=================== clã oponente ===================*/}
                <div className="flex  flex-col items-start w-1/2 text-white mx-4">
                  <h2 className="text-xl font-bold">Oponente</h2>
                  <p>{currentWar.opponent.name}</p>
                  <p>{currentWar.opponent.attacks} - Ataques</p>
                  <div className="flex flex-row justify-center items-center">
                    {" "}
                    <p>{currentWar.opponent.stars} </p>
                    <FaStar size={12} className="text-yellow-500" />
                  </div>
                  <p>
                    Destruição:{" "}
                    {currentWar.opponent.destructionPercentage.toFixed(2)}%
                  </p>
                  <img
                    src={currentWar.opponent.badgeUrls.medium}
                    alt="Opponent Clan Badge"
                    className="h-24 mt-4"
                  />

                  <div className="flex flex-row justify-center space-x-2 items-center">
                    <h3 className="text-lg font-bold">Membros</h3>
                    <MdOutlineExpandMore
                      onClick={toggleShowOpponent}
                      className="hover:cursor-pointer h-10 w-6"
                    />
                  </div>
                  {showOpponent && (
                    <div>
                      {currentWar.opponent.members
                        .sort((a, b) => a.mapPosition - b.mapPosition)
                        .map((member) => (
                          <div
                            key={member.tag}
                            className="flex flex-col items-start mt-2"
                          >
                            <div className="flex flex-row">
                              <p>
                                {member.mapPosition}. {member.name}
                              </p>
                            </div>
                            <div className="flex flex-row">
                              <p>{member.townhallLevel}</p>&nbsp;
                              <p className="text-gray-500">- Centro de Vila</p>
                            </div>
                            <div className="flex flex-row">
                              <p>{member.opponentAttacks}</p>&nbsp;
                              <p className="text-gray-500">
                                - Ataques Sofridos
                              </p>
                            </div>
                            {/*============================ Ataques ==================================*/}
                            {member.attacks && (
                              <div className="text-xs flex flex-row justify-center space-x-2 items-center">
                                {/* Primeiro Ataque */}
                                <div className="flex flex-col justify-center items-end mt-2">
                                  <div className="flex flex-col justify-center items-center">
                                    <strong className="text-blue-400">
                                      1º Ataque
                                    </strong>

                                    <div className="flex flex-row justify-center items-center">
                                      {member.attacks[0]
                                        ? Array.from({
                                            length: member.attacks[0].stars,
                                          }).map((_, index) => (
                                            <FaStar
                                              key={index}
                                              size={12}
                                              className="text-yellow-500"
                                            />
                                          ))
                                        : "N/A"}
                                    </div>

                                    <div>
                                      {member.attacks[0]
                                        ? member.attacks[0]
                                            .destructionPercentage
                                        : "N/A"}
                                      %
                                    </div>
                                    {member.attacks[0]
                                      ? `${member.attacks[0].duration} seg.`
                                      : "N/A"}
                                  </div>
                                </div>

                                {/* Segundo Ataque */}
                                <div className="flex flex-col justify-center items-end mt-2">
                                  <div className="flex flex-col justify-center items-center">
                                    <strong className="text-blue-400">
                                      2º Ataque
                                    </strong>

                                    <div className="flex flex-row justify-center items-center">
                                      {member.attacks[1]
                                        ? Array.from({
                                            length: member.attacks[1].stars,
                                          }).map((_, index) => (
                                            <FaStar
                                              key={index}
                                              size={12}
                                              className="text-yellow-500"
                                            />
                                          ))
                                        : "N/A"}
                                    </div>

                                    <div>
                                      {member.attacks[1]
                                        ? member.attacks[1]
                                            .destructionPercentage
                                        : "N/A"}
                                      %
                                    </div>
                                    {member.attacks[1]
                                      ? `${member.attacks[1].duration} seg.`
                                      : "N/A"}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              {currentWar?.clan && (
                <>
                  {renderMembersSection(
                    currentWar,
                    "Não atacaram",
                    (member) => !member.attacks || member.attacks.length === 0
                  )}
                  {renderMembersSection(
                    currentWar,
                    "Atacaram uma vez",
                    (member) => member.attacks && member.attacks.length === 1
                  )}
                  {renderMembersSection(
                    currentWar,
                    "Atacaram duas vezes",
                    (member) => member.attacks && member.attacks.length === 2
                  )}
                </>
              )}
            </div>
          ) : currentWar.state === "matchmakng" ? (
            <div>Procurando guerra...</div>
          ) : (
            <div>{currentWar.state}</div>
          )}
        </div>
      )}

      {error && <div className="text-red-500 mt-4">Erro: {error}</div>}
    </div>
  );
}
