// 테스트용 함수들 나중에 API로 모두 대체 예정

// user id에 해당하는 projects 모두 가져오기
export async function getProjects(id) {
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

// user id에 해당하는 todo list 모두 가져오기
export async function getTodoLists(id) {
  return [
    {
      _id: "test1",
      owner: "1234",
      title: "toy project",
      due_date: "20240831",
      detail: "skku toy project",
      tags: ["test"],
      project: "abcd",
      done: false,
    },
    {
      _id: "test2",
      owner: "1234",
      title: "중간 발표회",
      due_date: "20240831",
      detail: "토이 프로젝트 중간 발표회",
      tags: ["test"],
      project: "abcd",
      done: true,
    },
  ];
}

export async function getDetail(id) {
  return {
    _id: "test1",
    owner: "1234",
    title: "toy project",
    due_date: "20240831",
    detail: "skku toy project",
    tags: ["test"],
    project: "abcd",
    done: false,
  };
}
