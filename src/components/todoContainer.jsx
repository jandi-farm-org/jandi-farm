export default function TodoContainer({ data, due_date, project }) {
  return (
    <div className="border-4">
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
  );
}
