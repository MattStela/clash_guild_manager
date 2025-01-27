"use client";
import React, { useState } from "react";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import { FaFolderOpen, FaHome } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import Link from "next/link";

export default function LateralMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const items = [
    {
      title: "Clã",
      subitems: [
        { name: "Guerra Atual", link: "/war" },
        { name: "Membros", link: "/members" },
        { name: "Histórico de guerras", link: "/history" },
        { name: "Capital", link: "/capital" },
      ],
    },
    {
      title: "Jogadores",
      subitems: [{ name: "Informações", link: "/info" }],
    },
  ];

  return (
    <div className="relative">
      {/* Ícone para abrir/fechar o menu lateral */}
      <div
        className={`fixed top-4 ${
          isOpen ? "left-[200px]" : "left-4"
        } min-h-screen flex flex-col items-center justify-center cursor-pointer z-50 transition-left duration-300 ease-in-out`}
        onClick={toggleMenu}
      >
        {isOpen ? (
          <TbLayoutSidebarRightExpandFilled
            size={40}
            className="ml-4 text-gray-400"
          />
        ) : (
          <TbLayoutSidebarLeftExpand size={30} className="text-gray-400" />
        )}
      </div>

      {/* Menu lateral com animação e fundo borrado transparente */}
      <div
        className={`border fixed top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out p-2 flex flex-col justify-start items-start w-[200px] min-h-screen bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg`}
      >
        <Link
          className="p-2 flex flex-row space-x-1 justify-center items-center text-white"
          href="/#"
        >
          <FaHome size={20} /><p>Início</p>
        </Link>

        {items.map((item, index) => (
          <div
            key={index}
            className="space-y-1 flex flex-col justify-center items-start p-2"
          >
            <div className="flex flex-row space-x-1 justify-center items-center text-white">
              <FaFolderOpen size={20} />
              <p>{item.title}</p>
            </div>
            {item.subitems.map((subitem, subIndex) => (
              <div
                key={subIndex}
                className="pl-2 flex flex-row space-x-1 justify-center items-center"
              >
                <MdOutlineSubdirectoryArrowRight className="text-white" />
                <a
                  href={subitem.link}
                  className="text-white hover:text-gray-400"
                >
                  {subitem.name}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
