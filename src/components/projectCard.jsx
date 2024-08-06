export default function ProjectCard({ data }) {
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
