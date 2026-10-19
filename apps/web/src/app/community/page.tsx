import type { Metadata } from 'next';

import CommunitySearch from '@/components/community/CommunitySearch';
import PostList from '@/components/community/PostList';
import TopicFilter from '@/components/community/TopicFilter';

export const metadata: Metadata = { title: '커뮤니티' };

export default function CommunityPage() {
  return (
    <div className="py-6 md:flex md:gap-8">
      <aside className="md:w-48 md:shrink-0">
        <TopicFilter />
      </aside>
      <section className="flex-1 space-y-4">
        <PostList />
        <CommunitySearch />
      </section>
    </div>
  );
}
