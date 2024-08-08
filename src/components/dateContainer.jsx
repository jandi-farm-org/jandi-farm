import TodoCard from "./todoCard";

export default function DateContainer({ date, events }) {
  return (
    <div className="border-2 p-4">
      <div className="flex justify-center items-center w-144 m-4">
        <span>{date}</span>
      </div>
      <div>
        <ul className="divide-y divide-gray-200 px-4">
          <div className="flex flex-col gap-2">
            {events.map((data, idx) => (
              <TodoCard key={idx} id={data} />
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
