import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import LateralMenu from "@/components/lateral_menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`text-sm min-h-screen bg-black flex flex-col justify-center items-center text-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-row w-full justify-center items-start">
          <LateralMenu />
          <div className="p-1 w-full">{children}</div>
        </div>

        <Footer />
      </body>
    </html>
  );
}
