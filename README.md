# runningTime

러닝타임: 수도권 마라톤 대회를 모아 찾고, 접수 오픈을 웹 푸시로 알려주는 웹앱 + 러너 커뮤니티

## 구조 (npm workspaces 모노레포)

```
runningtime/
├─ apps/
│  ├─ web/        @runningtime/web     Next.js 16.2 App Router, Tailwind 4, TanStack Query, React Hook Form
│  └─ api/        @runningtime/api     Express 5, Prisma 7 (PostgreSQL), zod
├─ packages/
│  └─ shared/     @runningtime/shared  웹·API 공통 zod 스키마와 타입
├─ docker-compose.yml                 로컬 PostgreSQL
└─ tsconfig.base.json                 공통 TS 설정
```

## 환경

- Node.js 24 (`.nvmrc`) → `nvm use`
- `.npmrc`의 `save-exact=true`로 버전 고정, `package-lock.json`은 루트 하나만 커밋한다.
- 패키지는 항상 대상 워크스페이스를 지정해 설치한다.

```bash
npm install <패키지> -w @runningtime/web
npm install -D <패키지> -w @runningtime/api
```

## 시작

```bash
nvm use
npm install                          # 설치 후 Prisma 클라이언트 자동 생성
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
docker compose up -d                 # 로컬 PostgreSQL
npm run dev                          # web :3000 + api :4000 동시 실행
```

## 스크립트 (루트)

| 명령                                     | 설명                                     |
| ---------------------------------------- | ---------------------------------------- |
| `npm run dev`                            | web·api 동시 실행 (`dev:web`, `dev:api`) |
| `npm run build`                          | api → web 순서로 빌드                    |
| `npm run lint` / `npm run typecheck`     | 전체 워크스페이스 검사                   |
| `npm run format`                         | Prettier 전체 포맷                       |
| `npm run db:migrate -w @runningtime/api` | Prisma 마이그레이션                      |
| `npm run db:studio -w @runningtime/api`  | Prisma Studio                            |

## 코드 품질

- Prettier 설정은 루트 하나, ESLint는 앱별(`apps/*/eslint.config.mjs`)
- Husky pre-commit → lint-staged: 커밋하는 파일마다 가장 가까운 `lint-staged.config.mjs`가 실행된다.
