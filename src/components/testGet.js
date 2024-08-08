// 테스트용 함수들 나중에 API로 모두 대체 예정
export async function getProjcets() {
  return [
    {
      _id: "abcd",
      owner: "1234",
      title: "토이 프로젝트",
      due_date: "2024-08-31T00:00:00.000Z",
      detail: "성균관대 여름방학 토이 프로젝트",
    },
    {
      _id: "efgh",
      owner: "1234",
      title: "정보보호개론",
      due_date: "2024-08-31T00:00:00.000Z",
      detail: "3-2 수업 김형식 교수님 정보보호개론",
    },
    {
      _id: "ijkl",
      owner: "1234",
      title: "다이어트",
      due_date: "2024-08-31T00:00:00.000Z",
      detail: "다이어트",
    },
  ];
}
