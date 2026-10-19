import Link from 'next/link';

import { ROUTES } from '@/constants/routes';

const TAB_ITEMS = [
  { href: ROUTES.home, label: '대회' },
  { href: ROUTES.community, label: '커뮤니티' },
  { href: ROUTES.mypage, label: '마이' },
];

export default function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-neutral-200 bg-white md:hidden">
      {TAB_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-1 items-center justify-center text-sm font-medium"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
