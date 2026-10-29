// 러닝타임 개발용 시드 데이터 초안 v0.1 (2026-10-29)
// 위치(예정): apps/api/prisma/seed.ts
// 실행(예정): npm run db:seed -w apps/api  →  prisma db seed
//
// - 로컬 개발 DB 전용. 실행할 때마다 기존 데이터를 지우고 다시 넣는다.
// - 대회는 모두 화면 확인용 가상 데이터다(실제 대회 정보 아님).
// - 날짜는 2026-10-29 기준으로 접수 상태가 골고루 나오게 잡았다.
//   (접수중 / 접수 예정 / 접수 마감 / 일정 미정 / 대회 종료 / 취소 / 비공개)

import { PrismaPg } from '@prisma/adapter-pg';

import {
  AuthProvider,
  EventSource,
  EventStatus,
  PostKind,
  PrismaClient,
  RaceReportType,
  ReportReason,
  ReportTargetType,
  ReporterRole,
  UserRole,
} from '../src/generated/prisma/client';

import '../src/config/load-env';

if (process.env.NODE_ENV === 'production') {
  throw new Error('시드는 운영 DB에서 실행할 수 없습니다.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' }),
});

/** 한국 시간 기준 날짜·시각 */
const kst = (date: string, time = '00:00') => new Date(`${date}T${time}:00+09:00`);
/** @db.Date 컬럼용 날짜 */
const day = (date: string) => new Date(`${date}T00:00:00Z`);

// ─────────────────────────────────────────────
// 지역 6곳
// ─────────────────────────────────────────────
const regions = [
  { code: 'seoul', name: '서울', sortOrder: 1 },
  { code: 'gyeonggi', name: '경기', sortOrder: 2 },
  { code: 'incheon', name: '인천', sortOrder: 3 },
  { code: 'gangwon', name: '강원', sortOrder: 4 },
  { code: 'daejeon', name: '대전', sortOrder: 5 },
  { code: 'chungnam', name: '충남', sortOrder: 6 },
];

// ─────────────────────────────────────────────
// 대회(시리즈 + 회차 + 종목)
// ─────────────────────────────────────────────
type CourseSeed = {
  distance: string;
  distanceM: number;
  fee: number;
  startTime: string;
  timeLimit: number;
};

const FULL = (fee: number, startTime = '08:00'): CourseSeed => ({
  distance: 'FULL',
  distanceM: 42195,
  fee,
  startTime,
  timeLimit: 300,
});
const HALF = (fee: number, startTime = '08:00'): CourseSeed => ({
  distance: 'HALF',
  distanceM: 21097,
  fee,
  startTime,
  timeLimit: 180,
});
const K10 = (fee: number, startTime = '08:10'): CourseSeed => ({
  distance: '10K',
  distanceM: 10000,
  fee,
  startTime,
  timeLimit: 90,
});
const K5 = (fee: number, startTime = '08:20'): CourseSeed => ({
  distance: '5K',
  distanceM: 5000,
  fee,
  startTime,
  timeLimit: 60,
});

type EventSeed = {
  key: string; // 시드 안에서 참조용
  year: number;
  slug: string;
  raceDate: string;
  regionCode: string;
  venue: string;
  registrationStart?: Date;
  registrationEnd?: Date;
  status?: EventStatus;
  source?: EventSource;
  isPublic?: boolean;
  courses: CourseSeed[];
};

const series: {
  name: string;
  organizer: string;
  officialUrl: string;
  events: EventSeed[];
}[] = [
  {
    name: '잠실 윈터 마라톤',
    organizer: '잠실러닝협회(샘플)',
    officialUrl: 'https://example.com/jamsil-winter',
    events: [
      {
        key: 'jamsil-2026',
        year: 2026,
        slug: 'jamsil-winter-2026',
        raceDate: '2026-12-13',
        regionCode: 'seoul',
        venue: '잠실종합운동장',
        registrationStart: kst('2026-10-01', '10:00'),
        registrationEnd: kst('2026-11-20', '18:00'),
        courses: [HALF(50000), K10(45000), K5(35000)],
      }, // 접수중
    ],
  },
  {
    name: '한강 나이트런',
    organizer: '한강나이트런 조직위(샘플)',
    officialUrl: 'https://example.com/hangang-night',
    events: [
      {
        key: 'hangang-2026',
        year: 2026,
        slug: 'hangang-night-run-2026',
        raceDate: '2026-11-21',
        regionCode: 'seoul',
        venue: '여의도 한강공원',
        registrationStart: kst('2026-09-01', '10:00'),
        registrationEnd: kst('2026-10-25', '18:00'),
        courses: [K10(55000, '19:00'), K5(45000, '19:20')],
      }, // 접수 마감, 대회 전
    ],
  },
  {
    name: '송도 해변 하프마라톤',
    organizer: '인천러너스(샘플)',
    officialUrl: 'https://example.com/songdo-half',
    events: [
      {
        key: 'songdo-2027',
        year: 2027,
        slug: 'songdo-half-2027',
        raceDate: '2027-03-14',
        regionCode: 'incheon',
        venue: '송도 센트럴파크',
        registrationStart: kst('2026-11-10', '10:00'),
        registrationEnd: kst('2027-02-20', '18:00'),
        courses: [HALF(55000), K10(45000)],
      }, // 접수 예정 → 관심 체크·알림 테스트용
    ],
  },
  {
    name: '춘천 호수 마라톤',
    organizer: '춘천달리기모임(샘플)',
    officialUrl: 'https://example.com/chuncheon-lake',
    events: [
      {
        key: 'chuncheon-2025',
        year: 2025,
        slug: 'chuncheon-lake-2025',
        raceDate: '2025-10-26',
        regionCode: 'gangwon',
        venue: '공지천 의암공원',
        registrationStart: kst('2025-07-01', '10:00'),
        registrationEnd: kst('2025-09-30', '18:00'),
        courses: [FULL(60000), HALF(50000), K10(40000)],
      }, // 작년 회차 → 작년 후기 연결 테스트용
      {
        key: 'chuncheon-2026',
        year: 2026,
        slug: 'chuncheon-lake-2026',
        raceDate: '2026-10-25',
        regionCode: 'gangwon',
        venue: '공지천 의암공원',
        registrationStart: kst('2026-07-01', '10:00'),
        registrationEnd: kst('2026-09-30', '18:00'),
        courses: [FULL(65000), HALF(55000), K10(45000)],
      }, // 대회 종료 → 후기 작성 가능
    ],
  },
  {
    name: '갑천 가을 레이스',
    organizer: '대전시민러닝(샘플)',
    officialUrl: 'https://example.com/gapcheon',
    events: [
      {
        key: 'gapcheon-2026',
        year: 2026,
        slug: 'gapcheon-autumn-2026',
        raceDate: '2026-11-08',
        regionCode: 'daejeon',
        venue: '엑스포 시민광장',
        registrationStart: kst('2026-09-15', '10:00'),
        registrationEnd: kst('2026-10-31', '23:59'),
        courses: [HALF(45000), K10(35000), K5(25000)],
      }, // 접수 마감 임박
    ],
  },
  {
    name: '천안 봄꽃 마라톤',
    organizer: '천안러닝클럽(샘플)',
    officialUrl: 'https://example.com/cheonan-spring',
    events: [
      {
        key: 'cheonan-2027',
        year: 2027,
        slug: 'cheonan-spring-2027',
        raceDate: '2027-04-11',
        regionCode: 'chungnam',
        venue: '천안종합운동장',
        courses: [HALF(50000), K10(40000)],
      }, // 접수 일정 미정
    ],
  },
  {
    name: '수원 화성 런',
    organizer: '수원러너스(샘플)',
    officialUrl: 'https://example.com/suwon-hwaseong',
    events: [
      {
        key: 'suwon-2026',
        year: 2026,
        slug: 'suwon-hwaseong-run-2026',
        raceDate: '2026-11-15',
        regionCode: 'gyeonggi',
        venue: '수원종합운동장',
        registrationStart: kst('2026-09-01', '10:00'),
        registrationEnd: kst('2026-10-31', '18:00'),
        status: EventStatus.CANCELED,
        courses: [K10(40000), K5(30000)],
      }, // 취소
    ],
  },
  {
    name: '속초 바다 10K',
    organizer: '제보자 입력(샘플)',
    officialUrl: 'https://example.com/sokcho-10k',
    events: [
      {
        key: 'sokcho-2027',
        year: 2027,
        slug: 'sokcho-sea-10k-2027',
        raceDate: '2027-05-16',
        regionCode: 'gangwon',
        venue: '속초해수욕장',
        source: EventSource.USER_REPORT,
        isPublic: false,
        courses: [K10(40000)],
      }, // 비공개(검수 대기) → 목록에 안 보여야 함
    ],
  },
];

async function reset() {
  // 자식 → 부모 순서로 삭제
  await prisma.report.deleteMany();
  await prisma.raceReport.deleteMany();
  await prisma.postLike.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.postImage.deleteMany();
  await prisma.post.deleteMany();
  await prisma.notificationLog.deleteMany();
  await prisma.interest.deleteMany();
  await prisma.pushSubscription.deleteMany();
  await prisma.notificationSetting.deleteMany();
  await prisma.socialAccount.deleteMany();
  await prisma.withdrawnAccount.deleteMany();
  await prisma.user.deleteMany();
  await prisma.raceCourse.deleteMany();
  await prisma.raceEvent.deleteMany();
  await prisma.raceSeries.deleteMany();
  await prisma.region.deleteMany();
}

async function main() {
  await reset();

  // 지역
  await prisma.region.createMany({ data: regions });

  // 대회
  const eventIds: Record<string, string> = {};
  const courseIds: Record<string, string> = {}; // `${eventKey}:${distance}`

  for (const s of series) {
    const created = await prisma.raceSeries.create({
      data: { name: s.name, organizer: s.organizer, officialUrl: s.officialUrl },
    });

    for (const e of s.events) {
      const event = await prisma.raceEvent.create({
        data: {
          seriesId: created.id,
          year: e.year,
          slug: e.slug,
          raceDate: day(e.raceDate),
          regionCode: e.regionCode,
          venue: e.venue,
          registrationStart: e.registrationStart,
          registrationEnd: e.registrationEnd,
          status: e.status ?? EventStatus.SCHEDULED,
          source: e.source ?? EventSource.ADMIN,
          isPublic: e.isPublic ?? true,
          courses: {
            create: e.courses.map((c, i) => ({ ...c, sortOrder: i })),
          },
        },
        include: { courses: true },
      });

      eventIds[e.key] = event.id;
      for (const c of event.courses) courseIds[`${e.key}:${c.distance}`] = c.id;
    }
  }

  // 회원(소셜 식별값은 가짜)
  const admin = await prisma.user.create({
    data: {
      nickname: '러닝타임운영자',
      email: 'admin@example.com',
      role: UserRole.ADMIN,
      socialAccounts: {
        create: { provider: AuthProvider.KAKAO, providerUserId: 'seed-kakao-admin' },
      },
      notificationSetting: { create: {} },
    },
  });
  const dawn = await prisma.user.create({
    data: {
      nickname: '새벽러너',
      socialAccounts: {
        create: { provider: AuthProvider.NAVER, providerUserId: 'seed-naver-1' },
      },
      notificationSetting: { create: {} },
    },
  });
  const weekend = await prisma.user.create({
    data: {
      nickname: '주말10K',
      socialAccounts: {
        create: { provider: AuthProvider.GOOGLE, providerUserId: 'seed-google-1' },
      },
      notificationSetting: { create: { notifySameDay: false } },
    },
  });

  // 관심 대회(= 알림 신청)
  await prisma.interest.createMany({
    data: [
      { userId: dawn.id, eventId: eventIds['songdo-2027']! },
      { userId: dawn.id, eventId: eventIds['jamsil-2026']! },
      { userId: weekend.id, eventId: eventIds['songdo-2027']! },
    ],
  });

  // 대회 의견
  const review2025 = await prisma.post.create({
    data: {
      eventId: eventIds['chuncheon-2025']!,
      userId: weekend.id,
      kind: PostKind.REVIEW,
      courseId: courseIds['chuncheon-2025:10K'],
      title: '작년 10K 후기, 호수 바람이 꽤 셉니다',
      body: '반환점 이후 맞바람 구간이 길어요. 바람막이 챙기는 걸 추천합니다.',
    },
  });

  const review2026 = await prisma.post.create({
    data: {
      eventId: eventIds['chuncheon-2026']!,
      userId: dawn.id,
      kind: PostKind.REVIEW,
      courseId: courseIds['chuncheon-2026:HALF'],
      title: '하프 첫 완주! 급수대 간격 좋았어요',
      body: '5km마다 급수대가 있었고 15km 지점에 바나나도 있었어요. 물품 보관은 30분 전에 줄이 길었습니다.',
    },
  });

  const question = await prisma.post.create({
    data: {
      eventId: eventIds['jamsil-2026']!,
      userId: dawn.id,
      kind: PostKind.QUESTION,
      title: '물품 보관소 있나요?',
      body: '지하철로 가려고 하는데 짐 맡길 곳이 있는지 궁금해요.',
    },
  });

  const free = await prisma.post.create({
    data: {
      eventId: eventIds['jamsil-2026']!,
      userId: weekend.id,
      kind: PostKind.FREE,
      title: '같이 10K 나가실 분 계신가요',
      body: '페이스 6분대로 편하게 뛰려고 합니다.',
    },
  });

  // 신고 3회로 자동 숨김된 글 예시(광고 계정이 작성)
  const spammer = await prisma.user.create({
    data: {
      nickname: '광고계정',
      socialAccounts: {
        create: { provider: AuthProvider.KAKAO, providerUserId: 'seed-kakao-spam' },
      },
    },
  });
  const hidden = await prisma.post.create({
    data: {
      eventId: eventIds['jamsil-2026']!,
      userId: spammer.id,
      kind: PostKind.FREE,
      title: '[광고] 러닝화 최저가',
      body: '링크 클릭',
      reportCount: 3,
      isHidden: true,
    },
  });

  // 탈퇴한 회원의 글(userId 없음)
  await prisma.post.create({
    data: {
      eventId: eventIds['hangang-2026']!,
      kind: PostKind.QUESTION,
      title: '야간이라 조명 괜찮을까요?',
      body: '헤드랜턴 필요한지 궁금합니다.',
    },
  });

  // 댓글
  await prisma.comment.createMany({
    data: [
      { postId: question.id, userId: weekend.id, body: '작년엔 운동장 안쪽에 있었어요!' },
      {
        postId: question.id,
        userId: admin.id,
        body: '공식 홈페이지 안내에도 보관소가 있다고 나와 있어요.',
      },
      { postId: review2026.id, userId: weekend.id, body: '완주 축하해요 👏' },
    ],
  });
  await prisma.post.update({ where: { id: question.id }, data: { commentCount: 2 } });
  await prisma.post.update({ where: { id: review2026.id }, data: { commentCount: 1 } });

  // 공감
  await prisma.postLike.createMany({
    data: [
      { postId: review2026.id, userId: weekend.id },
      { postId: review2026.id, userId: admin.id },
      { postId: review2025.id, userId: dawn.id },
      { postId: free.id, userId: dawn.id },
    ],
  });
  await prisma.post.update({ where: { id: review2026.id }, data: { likeCount: 2 } });
  await prisma.post.update({ where: { id: review2025.id }, data: { likeCount: 1 } });
  await prisma.post.update({ where: { id: free.id }, data: { likeCount: 1 } });

  // 글 신고 3건 → reportCount 3, isHidden true 와 일치
  await prisma.report.createMany({
    data: [dawn.id, weekend.id, admin.id].map((reporterId) => ({
      targetType: ReportTargetType.POST,
      targetId: hidden.id,
      reporterId,
      reason: ReportReason.SPAM_AD,
    })),
  });

  // 댓글 신고 1건(숨김 기준 미달) → 어드민 신고 목록 확인용
  const rudeComment = await prisma.comment.create({
    data: { postId: free.id, userId: spammer.id, body: '그 페이스로 무슨 대회를…', reportCount: 1 },
  });
  await prisma.report.create({
    data: {
      targetType: ReportTargetType.COMMENT,
      targetId: rudeComment.id,
      reporterId: weekend.id,
      reason: ReportReason.ABUSE,
    },
  });
  await prisma.post.update({ where: { id: free.id }, data: { commentCount: 1 } });

  // 대회 제보(검수 대기)
  await prisma.raceReport.createMany({
    data: [
      {
        type: RaceReportType.NEW_RACE,
        reporterId: dawn.id,
        reporterRole: ReporterRole.PARTICIPANT,
        payload: {
          name: '청라 호수 5K',
          raceDate: '2027-04-04',
          regionCode: 'incheon',
          venue: '청라호수공원',
          distances: ['5K', '10K'],
          officialUrl: 'https://example.com/cheongna-5k',
          memo: '동네 러닝크루에서 봤어요',
        },
      },
      {
        type: RaceReportType.CORRECTION,
        eventId: eventIds['gapcheon-2026'],
        reporterId: weekend.id,
        reporterRole: ReporterRole.PARTICIPANT,
        payload: {
          field: 'registrationEnd',
          value: '2026-11-01',
          memo: '접수 기간이 하루 연장됐어요',
        },
      },
    ],
  });

  const counts = {
    regions: await prisma.region.count(),
    events: await prisma.raceEvent.count(),
    courses: await prisma.raceCourse.count(),
    users: await prisma.user.count(),
    posts: await prisma.post.count(),
  };
  console.log('시드 완료', counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
