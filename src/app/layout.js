import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/Navbar';

import { dbConnect } from '@/lib/mongo';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next-Auth V5 - tapaScript',
  description: 'Learn Next-Auth Practically',
};

export default async function RootLayout({ children }) {
  const conn = await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-[96vh] ml-72 mt-4 mr-4 mb-4 p-2 bg-[#eff3ff] rounded-r-xl outset-main">
          {children}
        </main>
      </body>
    </html>
  );
}
