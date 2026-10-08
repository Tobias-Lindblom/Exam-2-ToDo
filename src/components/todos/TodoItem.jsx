import { useRef, useState } from "react";
import { Check } from "lucide-react";
import TodoIllustration from "./TodoIllustration";
import TodoActions from "./TodoActions";
import TodoChecklist from "./TodoChecklist";
import TodoCompleteDialog from "./TodoCompleteDialog";
import TodoSubtaskCreateForm from "./TodoSubtaskCreateForm";

const noteStyles = [
  { color: "bg-[#FFE66D]", rotation: "rotate-[-1deg]" },
  { color: "bg-[#FFA0AF]", rotation: "rotate-[1deg]" },
  { color: "bg-[#9CDAF3]", rotation: "rotate-[-1.5deg]" },
  { color: "bg-[#B2E8B7]", rotation: "rotate-[1.5deg]" },
  { color: "bg-[#C5A2F0]", rotation: "rotate-[-1deg]" },
  { color: "bg-[#FFDF61]", rotation: "rotate-[1deg]" },
];

function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onAddSubtask,
  onToggleSubtask,
  onEditSubtask,
  onDeleteSubtask,
}) {
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [isConfirmingCompletion, setIsConfirmingCompletion] = useState(false);
  const addSubtaskButtonRef = useRef(null);
  const remainingCount = todo.subtasks.filter(
    (subtask) => !subtask.completed,
  ).length;

  if (todo.completed && isAddingSubtask) {
    setIsAddingSubtask(false);
  }

  function handleToggleTodo() {
    if (!todo.completed && remainingCount > 0) {
      setIsConfirmingCompletion(true);
      return;
    }
    onToggleTodo(todo.id);
  }

  function closeSubtaskForm() {
    setIsAddingSubtask(false);
    addSubtaskButtonRef.current?.focus();
  }

  const appearance = todo.appearance;
  const { color, rotation } = noteStyles[appearance % noteStyles.length];

  return (
    <article
      aria-label={todo.text}
      className={`post-it-note ${todo.completed ? "post-it-note--completed" : ""} relative isolate flex min-h-72 min-w-0 flex-col rounded-xs px-3 pb-5 pt-9 text-note-ink sm:min-h-80 sm:px-6 sm:pb-6 sm:pt-10 motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 ${color} ${rotation}`}
    >
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 h-7 w-20 -translate-x-1/2 -rotate-2 border-x border-white/20 bg-white/45 shadow-sm"
      />

      {todo.completed && (
        <span
          role="img"
          aria-label="Klar"
          className="pointer-events-none absolute inset-0 -z-1 flex items-center justify-center"
        >
          <Check
            aria-hidden="true"
            strokeWidth={2.5}
            className="h-auto max-h-[70%] w-3/5 -rotate-8 text-note-done opacity-80"
          />
        </span>
      )}
      <div className="flex items-start gap-3">
        <h3
          className={`note-title font-hand min-w-0 flex-1 text-[2rem] font-semibold leading-[1.15] wrap-anywhere sm:text-[2.375rem] ${todo.completed ? "line-through decoration-note-ink decoration-[3px] [text-decoration-skip-ink:none]" : ""}`}
        >
          {todo.text}
        </h3>
        <span
          aria-hidden="true"
          className="-mt-2 h-9 w-9 shrink-0 sm:h-10 sm:w-10"
        />
      </div>

      <div className="flex min-h-28 flex-1 flex-wrap items-start gap-3 py-4">
        <TodoChecklist
          todoId={todo.id}
          todoTitle={todo.text}
          subtasks={todo.subtasks}
          todoCompleted={todo.completed}
          onToggleSubtask={onToggleSubtask}
          onEditSubtask={onEditSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
        <TodoIllustration text={todo.text} completed={todo.completed} />
      </div>

      <div className="pt-3">
        {isAddingSubtask && (
          <TodoSubtaskCreateForm
            todoId={todo.id}
            todoTitle={todo.text}
            onAddSubtask={onAddSubtask}
            onCancel={closeSubtaskForm}
          />
        )}
        <TodoActions
          todoId={todo.id}
          todoTitle={todo.text}
          completed={todo.completed}
          isAddingSubtask={isAddingSubtask}
          addSubtaskButtonRef={addSubtaskButtonRef}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onToggleSubtaskForm={() =>
            isAddingSubtask ? closeSubtaskForm() : setIsAddingSubtask(true)
          }
        />
      </div>
      {isConfirmingCompletion && (
        <TodoCompleteDialog
          remainingCount={remainingCount}
          onCancel={() => setIsConfirmingCompletion(false)}
          onConfirm={() => {
            setIsConfirmingCompletion(false);
            onToggleTodo(todo.id);
          }}
        />
      )}
    </article>
  );
}

export default TodoItem;
