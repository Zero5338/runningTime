import RaceApplyCard from '@/components/race-detail/RaceApplyCard';
import RaceDetailInfo from '@/components/race-detail/RaceDetailInfo';
import RaceStoryList from '@/components/race-detail/RaceStoryList';

export default async function RaceDetailPage({ params }: PageProps<'/races/[raceId]'>) {
  const { raceId } = await params;

  return (
    <div className="py-6 md:flex md:gap-8" data-race-id={raceId}>
      <div className="flex-1 space-y-6">
        <RaceDetailInfo />
        <RaceStoryList />
      </div>
      <aside className="md:w-80 md:shrink-0">
        <RaceApplyCard />
      </aside>
    </div>
  );
}
