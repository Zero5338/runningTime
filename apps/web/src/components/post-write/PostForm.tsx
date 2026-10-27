// 글쓰기·수정 폼: 대회 고정(변경 불가), 종류(자유·질문·후기), 제목·내용 필수, 사진 최대 5장
// 후기는 대회 종료 후에만 선택 가능, 종목 칩 선택 필수 (React Hook Form + zod)
export default function PostForm() {
  return (
    <div className="rounded-md border border-dashed border-neutral-300 p-4 text-sm">PostForm</div>
  );
}
