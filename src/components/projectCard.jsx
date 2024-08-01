export default function ProjectCard({}) {
  return (
    <div className="w-96 h-36 flex flex-col shrink-0 p-4 justify-between align-items border-2">
      <div className="w-full flex">
        <span className="font-bold text-2xl">토이 프로젝트</span>
      </div>
      <div className="w-full flex flex-row justify-between">
        <div>Progress</div>
        <div className="flex flex-col justify-center">
          <span>Due : 2024.08.31</span>
        </div>
      </div>
    </div>
  );
}
