import { Inter, Roboto } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

import { dbConnect } from "@/lib/mongo";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "IT-Lockey",
  description: "Приложение",
};

export default async function RootLayout({ children }) {
  const conn = await dbConnect();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} font-sans`}
    >
      <body className={inter.className}>
        <Navbar />
        <main className="ml-[240px] mt-10">{children}</main>
      </body>
    </html>
  );
}
