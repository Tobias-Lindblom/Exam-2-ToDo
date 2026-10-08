import TodoSubtask from "./TodoSubtask";

function TodoChecklist({
  todoId,
  todoTitle,
  subtasks,
  todoCompleted,
  onToggleSubtask,
  onEditSubtask,
  onDeleteSubtask,
}) {
  if (subtasks.length === 0) return null;

  return (
    <ul aria-label={`Deluppgifter för ${todoTitle}`} className="min-w-0 flex-[1_1_11rem] space-y-1">
      {subtasks.map((subtask) => (
        <TodoSubtask
          key={subtask.id}
          todoId={todoId}
          subtask={subtask}
          todoCompleted={todoCompleted}
          onToggleSubtask={onToggleSubtask}
          onEditSubtask={onEditSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </ul>
  );
}

export default TodoChecklist;
