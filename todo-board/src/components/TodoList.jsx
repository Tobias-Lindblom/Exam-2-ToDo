import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
}

export default TodoList;
