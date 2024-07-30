export default function TodoCard({ id }) {
  return (
    <div className="py-4 w-144">
      <div className="flex items-center">
        <input
          id="todo1"
          name="todo1"
          type="checkbox"
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <div
          for="todo1"
          className="flex items-center justify-between w-full ml-3 text-gray-900"
        >
          <span className="text-2xl font-medium left-component">
            {`finish the project${id}`}
          </span>
          <span className="text-1g font-light text-gray-500 right-component">
            Due on 4/1/23
          </span>
        </div>
      </div>
    </div>
  );
}
