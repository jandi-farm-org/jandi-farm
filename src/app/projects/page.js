import TodoCard from "@/components/todoCard";
import ProjectCard from "@/components/projectCard";

export default function ProjcetPage() {
  const projcets = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col h-full w-140 gap-4 p-4 overflow-y-auto shrink-0 no-scrollbar">
        {projcets.map((n, idx) => (
          <ProjectCard key={idx} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className="border-4">
          <div className="flex justify-center items-center w-144 m-4">
            <span>2024.07.30</span>
          </div>
          <div>
            <ul className="divide-y divide-gray-200 px-4">
              {/* {test.map((n, idx) => (
                <TodoCard key={idx} id={n} />
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
