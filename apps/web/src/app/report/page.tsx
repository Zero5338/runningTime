import type { Metadata } from 'next';

import RaceReportForm from '@/components/race-report/RaceReportForm';
import ServiceRegionNotice from '@/components/race-report/ServiceRegionNotice';

export const metadata: Metadata = { title: '대회 제보' };

// 신규 대회·정보 오류 제보. ?type=new|correction&raceId= 로 진입한다.
export default function RaceReportPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 py-6">
      <ServiceRegionNotice />
      <RaceReportForm />
    </div>
  );
}
