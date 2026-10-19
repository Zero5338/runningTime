import RaceFilterBar from '@/components/race-list/RaceFilterBar';
import RaceFilterSidebar from '@/components/race-list/RaceFilterSidebar';
import RaceList from '@/components/race-list/RaceList';

// 대회 목록 (메인). 필터 상태는 URL 쿼리 파라미터로 관리한다.
export default function HomePage() {
  return (
    <div className="py-6 lg:flex lg:gap-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <RaceFilterSidebar />
      </aside>
      <section className="flex-1 space-y-4">
        <div className="lg:hidden">
          <RaceFilterBar />
        </div>
        <RaceList />
      </section>
    </div>
  );
}
