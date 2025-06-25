import Header from '@/components/ui/header';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Mada } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const mada = Mada({
  variable: '--font-mada',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RecruitMax',
  description: 'Democratizing School Recruiting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mada.variable} antialiased bg-brand-secondary-50`}
      >
        <Toaster
          theme="light"
          richColors
          position={'bottom-center'}
          visibleToasts={1}
        />
        <Providers>
          <Header />
            {children}
        </Providers>
      </body>
    </html>
  );
}