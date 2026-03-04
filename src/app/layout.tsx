import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { cookies } from 'next/headers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ad-Marketplace',
  description: 'Marketplace website for a Next project Web KeepCoding XIX Bootcamp',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session-token');
  const isAuthenticated = !!sessionToken;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </body>
    </html>
  );
}
