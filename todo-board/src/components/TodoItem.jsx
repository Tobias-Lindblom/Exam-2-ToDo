function TodoItem({ todo }) {
  return (
    <article className="min-h-52 bg-yellow-200 p-6 text-gray-900 shadow-lg transition hover:-translate-y-1">
      <h2 className="text-xl font-semibold">{todo.text}</h2>
    </article>
  );
}

export default TodoItem;
