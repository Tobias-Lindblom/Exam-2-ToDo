import { createElement } from "react";
import { Check, RotateCcw, Trash2 } from "lucide-react";
import { getTodoIcon } from "../utils/getTodoIcon";

const noteStyles = [
  { color: "bg-[#FFE66D]", rotation: "md:rotate-[-1deg]" },
  { color: "bg-[#FFA0AF]", rotation: "md:rotate-[1deg]" },
  { color: "bg-[#9CDAF3]", rotation: "md:rotate-[-1.5deg]" },
  { color: "bg-[#B2E8B7]", rotation: "md:rotate-[1.5deg]" },
  { color: "bg-[#C5A2F0]", rotation: "md:rotate-[-1deg]" },
  { color: "bg-[#FFDF61]", rotation: "md:rotate-[1deg]" },
];

function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  const icon = createElement(getTodoIcon(todo.text), {
    "aria-hidden": true,
    strokeWidth: 2.5,
    absoluteStrokeWidth: true,
    size: 96,
    className: "h-20 w-20 sm:h-24 sm:w-24",
  });
  const appearance = todo.appearance ?? 0;
  const { color, rotation } = noteStyles[appearance % noteStyles.length];

  return (
    <article
      aria-label={todo.text}
      className={`post-it-note relative isolate flex min-h-72 min-w-0 flex-col rounded-xs px-5 pb-5 pt-9 text-[#201d19] sm:min-h-80 sm:px-6 sm:pb-6 sm:pt-10 motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 ${color} ${rotation}`}
    >
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 h-7 w-20 -translate-x-1/2 -rotate-2 border-x border-white/20 bg-white/45 shadow-sm"
      />

      <div className="flex items-start gap-3">
        <h3
          className={`note-title font-hand min-w-0 flex-1 text-[2rem] font-semibold leading-[1.15] wrap-anywhere sm:text-[2.375rem] ${todo.completed ? "text-[#493036] line-through decoration-2" : ""}`}
        >
          {todo.text}
        </h3>
        {todo.completed && (
          <span
            role="img"
            aria-label="Klar"
            className="-mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#382334]/80 text-white sm:h-10 sm:w-10"
          >
            <Check aria-hidden="true" size={27} strokeWidth={3} />
          </span>
        )}
      </div>

      <div
        aria-hidden="true"
        className="flex min-h-28 flex-1 items-center justify-end py-3 pr-1"
      >
        <div className="relative -rotate-6">
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

      <div className="flex flex-wrap items-center gap-2.5 pt-3">
        <button
          type="button"
          onClick={() => onToggleTodo(todo.id)}
          aria-label={
            todo.completed
              ? `Markera som aktiv: ${todo.text}`
              : `Markera som klar: ${todo.text}`
          }
          className={todo.completed ? "note-action" : "note-action note-action--complete"}
        >
          {todo.completed ? (
            <RotateCcw aria-hidden="true" size={18} />
          ) : (
            <Check aria-hidden="true" size={18} strokeWidth={2.5} />
          )}
          <span>{todo.completed ? "Ångra" : "Klar"}</span>
        </button>
        <button
          type="button"
          onClick={() => onDeleteTodo(todo.id)}
          aria-label={`Radera uppgift: ${todo.text}`}
          className="note-action note-action--delete"
        >
          <Trash2 aria-hidden="true" size={18} />
          <span>Radera</span>
        </button>
      </div>
    </article>
  );
}

export default TodoItem;
