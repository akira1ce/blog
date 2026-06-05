import type { Metadata } from 'next';
import './globals.css';
import Header from './components/header';
import { ThemeProvider } from '../components/theme-provider';

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-main w-full antialiased">
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <main className="mx-auto max-w-5xl px-6 pb-24 md:px-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
