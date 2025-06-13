import type { Metadata } from 'next';
import './globals.css';
import Header from './components/header';
import { ThemeProvider } from '../components/theme-provider';
import localFont from 'next/font/local';

const mapleMono = localFont({
  src: './MapleMono-Regular.woff2',
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
      <body className={`${mapleMono.className} bg-main min-h-screen w-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="m-auto w-3/4 py-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
