import OpinionList from '@/components/race-detail/OpinionList';
import RaceApplyCard from '@/components/race-detail/RaceApplyCard';
import RaceDetailTabs from '@/components/race-detail/RaceDetailTabs';
import RaceInfo from '@/components/race-detail/RaceInfo';
import RaceSummaryCard from '@/components/race-detail/RaceSummaryCard';

// 대회 상세: 대회정보 + 대회 의견(다나와식). 모바일 탭은 ?tab=opinions 쿼리로 유지한다.
export default async function RaceDetailPage({ params }: PageProps<'/races/[raceId]'>) {
  const { raceId } = await params;

  return (
    <div className="space-y-6 py-6" data-race-id={raceId}>
      <div className="md:flex md:gap-8">
        <div className="flex-1 space-y-6">
          <RaceSummaryCard />
          <div className="md:hidden">
            <RaceDetailTabs />
          </div>
          <RaceInfo />
        </div>
        {/* 웹: 오른쪽 신청 카드 / 모바일: 하단 고정 관심·공식 홈페이지 버튼 */}
        <aside className="md:w-80 md:shrink-0">
          <RaceApplyCard />
        </aside>
      </div>
      <OpinionList />
    </div>
  );
}
