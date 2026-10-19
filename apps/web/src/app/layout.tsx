import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Sans_KR } from 'next/font/google';

import Header from '@/components/layout/Header';
import MobileTabBar from '@/components/layout/MobileTabBar';
import QueryProvider from '@/providers/QueryProvider';

import './globals.css';

const plexKr = IBM_Plex_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-plex-kr',
  display: 'swap',
});

// 숫자·로고용
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '러너스하이',
    template: '%s | 러너스하이',
  },
  description: '수도권 마라톤 대회를 한곳에서 찾고, 접수 오픈 알림을 받아보세요.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={`${plexKr.variable} ${archivo.variable}`}>
      <body>
        <QueryProvider>
          <Header />
          <main className="mx-auto w-full max-w-content px-4 pb-20 md:px-6 md:pb-10">
            {children}
          </main>
          <MobileTabBar />
        </QueryProvider>
      </body>
    </html>
  );
}
