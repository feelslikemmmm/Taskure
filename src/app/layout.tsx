import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/styles/themeProvider';
import Header from '@/components/home/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // ⬅️ 이 부분이 핵심
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taskure - 일정 및 태스크 관리',
  description: '효율적인 일정 및 태스크 관리를 위한 웹 애플리케이션',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
