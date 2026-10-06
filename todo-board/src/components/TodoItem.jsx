function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  return (
    <article className="min-h-52 bg-yellow-200 p-6 text-gray-900 shadow-lg transition hover:-translate-y-1">
      <h2
        className={`
          text-xl
          font-semibold
          ${todo.completed ? "line-through opacity-50" : ""}
        `}
      >
        {todo.text}
      </h2>

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => onToggleTodo(todo.id)}
          className="rounded-lg bg-green-200 px-4 py-2"
        >
          {todo.completed ? "Ångra" : "Klar"}
        </button>

        <button
          onClick={() => onDeleteTodo(todo.id)}
          className="rounded-lg bg-red-200 px-4 py-2"
        >
          Radera
        </button>
      </div>
    </article>
  );
}

export default TodoItem;
