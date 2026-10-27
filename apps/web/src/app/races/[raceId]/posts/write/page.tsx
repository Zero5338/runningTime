import type { Metadata } from 'next';

import PostForm from '@/components/post-write/PostForm';
import PostingRules from '@/components/post-write/PostingRules';

export const metadata: Metadata = { title: '글쓰기' };

// 글쓰기는 대회 상세의 대회 의견에서만 진입한다. 대회는 URL의 raceId로 고정된다.
export default async function PostWritePage({ params }: PageProps<'/races/[raceId]/posts/write'>) {
  const { raceId } = await params;

  return (
    <div className="py-6 md:flex md:gap-8" data-race-id={raceId}>
      <section className="flex-1">
        <PostForm />
      </section>
      <aside className="hidden md:block md:w-72 md:shrink-0">
        <PostingRules />
      </aside>
    </div>
  );
}
