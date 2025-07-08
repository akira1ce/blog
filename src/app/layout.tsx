import type { Metadata } from 'next';
import './globals.css';
import Header from './components/header';
import { ThemeProvider } from '../components/theme-provider';
import localFont from 'next/font/local';

const mapleMono = localFont({
  src: './MapleMono-Regular.woff2',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Akira1ce',
  description: "akira1ce's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mapleMono.className} bg-main w-full antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <main className="m-auto w-3/4 py-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
