import type { Metadata } from 'next';

import NotificationSettings from '@/components/mypage/NotificationSettings';

export const metadata: Metadata = { title: '알림 설정' };

export default function NotificationsPage() {
  return <NotificationSettings />;
}
