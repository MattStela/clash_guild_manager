import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-yellow-800 flex flex-row justify-center items-center w-full h-[100px]">
      <Image src="/icon.png" width={75} height={150} alt="um ícone"/>
    </div>
  );
}
