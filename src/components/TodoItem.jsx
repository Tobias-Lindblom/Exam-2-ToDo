import { createElement, useRef, useState } from "react";
import { Check } from "lucide-react";
import { getTodoIcon } from "../utils/getTodoIcon";
import TodoActions from "./TodoActions";
import TodoChecklist from "./TodoChecklist";
import TodoCompleteDialog from "./TodoCompleteDialog";
import TodoSubtaskForm from "./TodoSubtaskForm";

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

  // Stäng deluppgiftsfältet när lappen blir klar, så att det inte öppnas igen vid Ångra.
  if (todo.completed && isAddingSubtask) {
    setIsAddingSubtask(false);
  }

  // Be om bekräftelse innan Klar bockar av återstående deluppgifter åt användaren.
  function handleToggleTodo() {
    if (
      !todo.completed &&
      todo.subtasks.some((subtask) => !subtask.completed)
    ) {
      setIsConfirmingCompletion(true);
      return;
    }
    onToggleTodo(todo.id);
  }

  function closeSubtaskForm() {
    setIsAddingSubtask(false);
    // Formuläret försvinner; flytta fokus tillbaka till knappen som öppnade det.
    addSubtaskButtonRef.current?.focus();
  }

  const icon = createElement(getTodoIcon(todo.text), {
    "aria-hidden": true,
    strokeWidth: 2.5,
    absoluteStrokeWidth: true,
    size: 96,
    className: "h-16 w-16 sm:h-20 sm:w-20",
  });
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

      <div className="flex items-start gap-3">
        <h3
          className={`note-title font-hand min-w-0 flex-1 text-[2rem] font-semibold leading-[1.15] wrap-anywhere sm:text-[2.375rem] ${todo.completed ? "note-completed-text" : ""}`}
        >
          {todo.text}
        </h3>
        <span
          role="img"
          aria-label="Klar"
          aria-hidden={!todo.completed}
          className={`-mt-2 flex h-9 w-9 shrink-0 items-center justify-center text-note-done sm:h-10 sm:w-10 ${todo.completed ? "" : "invisible"}`}
        >
          <Check
            aria-hidden="true"
            size={48}
            strokeWidth={3.5}
            className="h-11 w-11 shrink-0 rotate-[-8deg] sm:h-12 sm:w-12"
          />
        </span>
      </div>

      <div className="flex min-h-28 flex-1 flex-wrap items-start gap-3 py-4">
        <TodoChecklist
          todo={todo}
          onToggleSubtask={onToggleSubtask}
          onEditSubtask={onEditSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
        <div
          aria-hidden="true"
          className="relative mt-4 ml-auto shrink-0 -rotate-6"
        >
          <svg
            viewBox="0 0 32 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="absolute -right-1 -top-4 h-6 w-8"
          >
            <path d="M8 13 12 3M19 18l8-7" />
          </svg>
          {icon}
        </div>
      </div>

      <div className="pt-3">
        {isAddingSubtask && (
          <TodoSubtaskForm
            todo={todo}
            onAddSubtask={onAddSubtask}
            onCancel={closeSubtaskForm}
          />
        )}
        <TodoActions
          todo={todo}
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
          todo={todo}
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
