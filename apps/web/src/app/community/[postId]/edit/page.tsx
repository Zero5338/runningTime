import type { Metadata } from 'next';

import CommunityRules from '@/components/post-write/CommunityRules';
import PostForm from '@/components/post-write/PostForm';

export const metadata: Metadata = { title: '글 수정' };

export default async function PostEditPage({ params }: PageProps<'/community/[postId]/edit'>) {
  const { postId } = await params;

  return (
    <div className="py-6 md:flex md:gap-8" data-post-id={postId}>
      <section className="flex-1">
        <PostForm />
      </section>
      <aside className="hidden md:block md:w-72 md:shrink-0">
        <CommunityRules />
      </aside>
    </div>
  );
}
