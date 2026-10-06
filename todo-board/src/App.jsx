import { useRef, useState } from "react";

import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const nextAppearance = useRef(0);

  function addTodo(text) {
    if (!text.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      appearance: nextAppearance.current++,
    };

    setTodos((current) => [...current, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#090d13] px-3 py-4 text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-700/50 bg-[#111821] px-4 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:rounded-[28px] sm:p-8 lg:p-10">
        <Header />
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </main>
  );
}

export default App;
