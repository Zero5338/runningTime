import CommentList from '@/components/post-detail/CommentList';
import PostDetail from '@/components/post-detail/PostDetail';

export default async function PostDetailPage({ params }: PageProps<'/community/[postId]'>) {
  const { postId } = await params;

  return (
    <article className="space-y-6 py-6" data-post-id={postId}>
      <PostDetail />
      <CommentList />
    </article>
  );
}
