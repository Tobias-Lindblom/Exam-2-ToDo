import { useState } from "react";

import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(text) {
    if (!text.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }
  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Header />

        <TodoForm onAddTodo={addTodo} />

        <TodoList todos={todos} />
      </div>
    </main>
  );
}

export default App;
