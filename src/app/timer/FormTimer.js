import React from "react";

const Form = ({
  villageName,
  setVillageName,
  goldQuantity,
  setGoldQuantity,
  goldTotal,
  setGoldTotal,
  elixirQuantity,
  setElixirQuantity,
  elixirTotal,
  setElixirTotal,
  upgrades,
  addUpgrade,
  handleUpgradeChange,
  removeUpgrade,
  handleSubmit,
}) => (
  <form
    className="flex flex-col items-center justify-between space-y-4 p-4"
    onSubmit={handleSubmit}
  >
    {/* NOME DA VILA */}
    <div className="flex flex-col items-center">
      <label className="pl-4">Nome da Vila</label>
      <input
        type="text"
        value={villageName}
        onChange={(e) => setVillageName(e.target.value)}
        className="rounded-3xl text-black border w-64 px-4 p-2"
      />
    </div>

    {/* RECURSOS */}
    <div className="flex flex-col items-center justify-center space-y-3">
      <h1 className="text-2xl">Recursos</h1>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <label className="pl-4">Ouro (Quantidade)</label>
          <input
            type="number"
            name="goldQuantity"
            value={goldQuantity}
            onChange={(e) => setGoldQuantity(e.target.value)}
            className="rounded-3xl text-black border w-44 px-4 p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="pl-4">Ouro Total</label>
          <input
            type="number"
            name="goldTotal"
            value={goldTotal}
            onChange={(e) => setGoldTotal(e.target.value)}
            className="rounded-3xl text-black border w-44 px-4 p-2"
          />
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <label className="pl-4">Elixir (Quantidade)</label>
          <input
            type="number"
            name="elixirQuantity"
            value={elixirQuantity}
            onChange={(e) => setElixirQuantity(e.target.value)}
            className="rounded-3xl text-black border w-44 px-4 p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="pl-4">Elixir Total</label>
          <input
            type="number"
            name="elixirTotal"
            value={elixirTotal}
            onChange={(e) => setElixirTotal(e.target.value)}
            className="rounded-3xl text-black border w-44 px-4 p-2"
          />
        </div>
      </div>
    </div>

    {/* MELHORIAS EM ANDAMENTO */}
    <div className="flex flex-col items-center justify-center space-y-3">
      <h1 className="text-2xl">Melhorias em Andamento</h1>
      {upgrades.map((upgrade) => (
        <div
          key={upgrade.id}
          className="flex  pl-14 flex-row space-x-4 items-center"
        >
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={upgrade.upgrade}
              onChange={(e) => handleUpgradeChange(upgrade.id, e, "upgrade")}
              className="rounded-3xl text-black border w-44 px-4 p-2"
              placeholder={`Melhoria ${upgrade.id}`}
            />
          </div>
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={upgrade.time}
              onChange={(e) => handleUpgradeChange(upgrade.id, e, "time")}
              className="rounded-3xl text-black border w-44 px-4 p-2"
              placeholder={`Tempo ${upgrade.id} (HH:MM:SS)`}
            />
          </div>
          <button
            type="button"
            onClick={() => removeUpgrade(upgrade.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-3xl"
          >
            -
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addUpgrade}
        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-3xl"
      >
        +
      </button>
    </div>
    {/* BOTÃO CONFIRMAR */}
    <div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-3xl"
      >
        Confirmar
      </button>
    </div>
  </form>
);

export default Form;
