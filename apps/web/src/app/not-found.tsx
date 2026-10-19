import Link from 'next/link';

import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-xl font-bold">페이지를 찾을 수 없어요</h1>
      <Link
        href={ROUTES.home}
        className="mt-6 inline-block rounded-md bg-black px-5 py-3 text-white"
      >
        대회 목록으로
      </Link>
    </section>
  );
}
