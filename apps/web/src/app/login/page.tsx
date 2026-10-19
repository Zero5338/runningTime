import type { Metadata } from 'next';

import LoginCard from '@/components/login/LoginCard';
import ServiceIntro from '@/components/login/ServiceIntro';

export const metadata: Metadata = { title: '로그인' };

export default function LoginPage() {
  return (
    <div className="py-10 md:grid md:grid-cols-2 md:items-center md:gap-10">
      <div className="hidden md:block">
        <ServiceIntro />
      </div>
      <LoginCard />
    </div>
  );
}
