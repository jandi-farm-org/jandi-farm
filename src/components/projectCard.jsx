export default function ProjectCard({ data }) {
  // 디버깅용 데이터
  if (data == "debug") {
    data = {
      _id: "abcd",
      owner: "1234",
      title: "토이 프로젝트",
      due_date: "2024-08-31T00:00:00.000Z",
      detail: "성균관대 여름방학 토이 프로젝트",
    };
  }

  return (
    <div className="w-96 h-36 flex flex-col shrink-0 p-4 justify-between align-items border-2 shadow-lg">
      <div className="w-full flex">
        <span className="font-bold text-2xl">{data.title}</span>
      </div>
      <div className="w-full flex flex-row justify-between">
        <div>Progress</div>
        <div className="flex flex-col justify-center">
          <span>Due : {data.due_date.slice(0, 10)}</span>
        </div>
      </div>
    </div>
  );
}
