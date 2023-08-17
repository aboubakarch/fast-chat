import './globals.css';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
});

export const metadata = {
  title: 'Fast Chat',
  description:
    'This is a chat application built by using firebase and tailwindcss',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
