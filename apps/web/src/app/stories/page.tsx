import type { Metadata } from 'next';

import StoryFeed from '@/components/stories/StoryFeed';
import StoryKindFilter from '@/components/stories/StoryKindFilter';
import StorySearch from '@/components/stories/StorySearch';

export const metadata: Metadata = { title: '대회 이야기' };

// 모든 대회의 글을 모은 피드. 검색과 종류 필터만 두고 글쓰기 버튼은 없다.
export default function StoriesPage() {
  return (
    <div className="space-y-4 py-6">
      <StorySearch />
      <StoryKindFilter />
      <StoryFeed />
    </div>
  );
}
