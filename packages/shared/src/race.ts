export type Distance = '5K' | '10K' | 'HALF' | 'FULL';

export type RaceListItem = {
  slug: string; // 'jamsil-winter-2026'
  name: string; // 마라톤 대회이름
  raceDate: string; // 날짜
  region: { code: string; name: string }; // { code: 'seoul', name: '서울' }
  venue: string; // 장소
  distances: Distance[]; // ['FULL', 'HALF']
  isInterested?: boolean; // 로그인했을 때만
};
