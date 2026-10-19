import type { Metadata } from 'next';

import AccountSettings from '@/components/mypage/AccountSettings';

export const metadata: Metadata = { title: '계정 설정' };

export default function AccountPage() {
  return <AccountSettings />;
}
