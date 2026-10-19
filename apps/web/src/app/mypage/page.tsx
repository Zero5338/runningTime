import type { Metadata } from 'next';

import FavoriteRaceList from '@/components/mypage/FavoriteRaceList';
import MyPageMenu from '@/components/mypage/MyPageMenu';

export const metadata: Metadata = { title: '마이페이지' };

export default function MyPage() {
  return (
    <>
      <div className="md:hidden">
        <MyPageMenu />
      </div>
      {/* 웹에서는 왼쪽 메뉴가 레이아웃에 있으므로 첫 메뉴(관심 대회)를 바로 보여준다. */}
      <div className="hidden md:block">
        <FavoriteRaceList />
      </div>
    </>
  );
}
