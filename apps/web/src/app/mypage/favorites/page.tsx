import type { Metadata } from 'next';

import FavoriteRaceList from '@/components/mypage/FavoriteRaceList';

export const metadata: Metadata = { title: '관심 대회' };

export default function FavoriteRacesPage() {
  return <FavoriteRaceList />;
}
