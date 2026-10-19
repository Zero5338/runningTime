import type { Metadata } from 'next';

import WithdrawGuide from '@/components/mypage/WithdrawGuide';

export const metadata: Metadata = { title: '회원탈퇴' };

export default function WithdrawPage() {
  return <WithdrawGuide />;
}
