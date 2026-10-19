import type { Metadata } from 'next';

import CommunityRules from '@/components/post-write/CommunityRules';
import PostForm from '@/components/post-write/PostForm';

export const metadata: Metadata = { title: '글쓰기' };

export default function PostWritePage() {
  return (
    <div className="py-6 md:flex md:gap-8">
      <section className="flex-1">
        <PostForm />
      </section>
      <aside className="hidden md:block md:w-72 md:shrink-0">
        <CommunityRules />
      </aside>
    </div>
  );
}
