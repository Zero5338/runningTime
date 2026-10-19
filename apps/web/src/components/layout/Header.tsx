import Link from 'next/link';

import { ROUTES } from '@/constants/routes';

const NAV_ITEMS = [
  { href: ROUTES.home, label: '대회' },
  { href: ROUTES.community, label: '커뮤니티' },
  { href: ROUTES.mypage, label: '마이페이지' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-4 md:px-6">
        <Link href={ROUTES.home} className="font-display text-lg font-bold">
          runnershigh<span className="text-brand">.</span>
        </Link>
        {/* md 이상에서만 상단 메뉴 노출, 모바일은 MobileTabBar */}
        <nav className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
