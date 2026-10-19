// .env가 있으면 process.env로 불러온다 (Node 내장, 배포 환경에서는 플랫폼 환경 변수를 쓴다).
try {
  process.loadEnvFile();
} catch {
  // .env 없음
}
