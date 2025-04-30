import { Inter, Roboto } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import { dbConnect } from '@/lib/mongo';
import AddNewTask from '@/components/todo/AddNewTask';

const inter = Inter({ subsets: ['latin'] });

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: 'IT-Lockey',
  description: 'Приложение',
};

export default async function RootLayout({ children }) {
  const conn = await dbConnect();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} font-sans`}
    >
      <body className={inter.className}>
        <Header />
        <main className="show-navbar_main">{children}</main>
        <AddNewTask />
      </body>
    </html>
  );
}
