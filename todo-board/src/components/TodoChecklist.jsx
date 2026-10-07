import TodoSubtask from "./TodoSubtask";

function TodoChecklist({
  todo,
  onToggleSubtask,
  onEditSubtask,
  onDeleteSubtask,
}) {
  if (todo.subtasks.length === 0) return null;

  return (
    <ul aria-label={`Deluppgifter för ${todo.text}`} className="min-w-0 flex-[1_1_11rem] space-y-1">
      {todo.subtasks.map((subtask) => (
        <TodoSubtask
          key={subtask.id}
          todoId={todo.id}
          subtask={subtask}
          onToggleSubtask={onToggleSubtask}
          onEditSubtask={onEditSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </ul>
  );
}

export default TodoChecklist;
