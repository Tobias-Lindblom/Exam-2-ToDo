import { Check, Trash2 } from "lucide-react";

function TodoChecklist({ todo, onToggleSubtask, onDeleteSubtask }) {
  if (todo.subtasks.length === 0) return null;

  return (
    <ul
      aria-label={`Deluppgifter för ${todo.text}`}
      className="min-w-0 flex-[1_1_11rem] space-y-1"
    >
      {todo.subtasks.map((subtask) => (
        <li key={subtask.id} className="flex items-start gap-1">
          <label className="flex min-h-11 min-w-0 flex-1 cursor-pointer items-start gap-2 py-2">
            <span className="relative mt-1 h-5 w-5 shrink-0">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => onToggleSubtask(todo.id, subtask.id)}
                className="note-checkbox peer"
              />
              <Check
                aria-hidden="true"
                size={20}
                strokeWidth={3}
                className="pointer-events-none absolute inset-0 text-white opacity-0 peer-checked:opacity-100"
              />
            </span>
            <span
              className={`font-hand min-w-0 text-xl leading-7 wrap-anywhere ${subtask.completed ? "text-black/60 line-through" : ""}`}
            >
              {subtask.text}
            </span>
          </label>
          <button
            type="button"
            onClick={() => onDeleteSubtask(todo.id, subtask.id)}
            aria-label={`Radera deluppgift: ${subtask.text}`}
            title="Radera deluppgift"
            className="flex h-11 w-9 shrink-0 items-center justify-center rounded-lg text-black/50 transition-colors hover:bg-red-700/10 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#201d19]"
          >
            <Trash2 aria-hidden="true" size={15} />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoChecklist;
