import { Check, Plus, RotateCcw, Trash2 } from "lucide-react";

function TodoActions({
  todo,
  isAddingSubtask,
  addSubtaskButtonRef,
  onToggleTodo,
  onDeleteTodo,
  onToggleSubtaskForm,
}) {
  return (
    <div className="note-footer-actions flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onToggleTodo}
        aria-label={
          todo.completed
            ? `Markera som aktiv: ${todo.text}`
            : `Markera som klar: ${todo.text}`
        }
        className={
          todo.completed
            ? "note-action note-action--secondary"
            : "note-action note-action--complete"
        }
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
      {!todo.completed && (
        <button
          ref={addSubtaskButtonRef}
          type="button"
          aria-expanded={isAddingSubtask}
          aria-label={
            isAddingSubtask
              ? `Stäng deluppgiftsfältet i ${todo.text}`
              : `Lägg till deluppgift i ${todo.text}`
          }
          title={isAddingSubtask ? "Stäng deluppgiftsfältet" : "Lägg till deluppgift"}
          onClick={onToggleSubtaskForm}
          className="note-action note-action--add"
        >
          <Plus aria-hidden="true" size={16} />
          <span>Deluppgift</span>
        </button>
      )}
    </div>
  );
}

export default TodoActions;
