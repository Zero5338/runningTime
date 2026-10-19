import MyPageMenu from '@/components/mypage/MyPageMenu';

// 웹: 왼쪽 메뉴 + 오른쪽 내용 / 모바일: 각 페이지만 표시 (메뉴는 /mypage 목록형)
export default function MyPageLayout({ children }: LayoutProps<'/mypage'>) {
  return (
    <div className="py-6 md:flex md:gap-8">
      <aside className="hidden md:block md:w-56 md:shrink-0">
        <MyPageMenu />
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}
