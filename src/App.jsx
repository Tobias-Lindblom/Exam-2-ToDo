import useTodos from "./hooks/useTodos";

import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    addSubtask,
    toggleSubtask,
    editSubtask,
    deleteSubtask,
  } = useTodos();

  return (
    <main className="min-h-screen bg-page px-3 py-4 text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-700/50 bg-[#111821] px-4 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:rounded-[28px] sm:p-8 lg:p-10">
        <Header />
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onAddSubtask={addSubtask}
          onToggleSubtask={toggleSubtask}
          onEditSubtask={editSubtask}
          onDeleteSubtask={deleteSubtask}
        />
      </div>
    </main>
  );
}

export default App;
