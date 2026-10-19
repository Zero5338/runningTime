import type { Metadata } from 'next';

import MyPostTabs from '@/components/mypage/MyPostTabs';

export const metadata: Metadata = { title: '내가 쓴 글' };

export default function MyPostsPage() {
  return <MyPostTabs />;
}
