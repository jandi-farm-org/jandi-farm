import TodoCard from "@/components/todoCard";

export default function Home() {
  const test = [1, 2, 3, 4];

  return (
    <div className="flex justify-between w-full">
      <div className="left-component w-96 bg-gray-300">Calender or Weekly</div>
      <div className="w-full flex justify-center">
        <div>
          <div className="flex justify-center items-center w-144 m-4">
            <span>2024.07.30</span>
          </div>
          <div>
            <ul className="divide-y divide-gray-200 px-4">
              {test.map((n, idx) => (
                <TodoCard key={idx} id={n} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
