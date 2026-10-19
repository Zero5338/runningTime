import type { Metadata } from 'next';

import WithdrawComplete from '@/components/mypage/WithdrawComplete';

export const metadata: Metadata = { title: '탈퇴 완료' };

export default function WithdrawCompletePage() {
  return <WithdrawComplete />;
}
