import useTodos from "./hooks/useTodos";
import AppLayout from "./components/layout/AppLayout";
import TodoCreateForm from "./components/todos/TodoCreateForm";
import TodoList from "./components/todos/TodoList";

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
    <AppLayout>
      <TodoCreateForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
        onAddSubtask={addSubtask}
        onToggleSubtask={toggleSubtask}
        onEditSubtask={editSubtask}
        onDeleteSubtask={deleteSubtask}
      />
    </AppLayout>
  );
}

export default App;
