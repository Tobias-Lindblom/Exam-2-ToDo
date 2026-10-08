import { Check, Plus, RotateCcw, Trash2 } from "lucide-react";
import NoteButton from "../ui/NoteButton";

function TodoActions({
  todoId,
  todoTitle,
  completed,
  isAddingSubtask,
  addSubtaskButtonRef,
  onToggleTodo,
  onDeleteTodo,
  onToggleSubtaskForm,
}) {
  return (
    <div
      data-note-actions
      className="flex flex-nowrap items-center gap-2 md:flex-wrap"
    >
      <NoteButton
        layout="footer"
        type="button"
        onClick={onToggleTodo}
        aria-label={
          completed
            ? `Markera som aktiv: ${todoTitle}`
            : `Markera som klar: ${todoTitle}`
        }
        variant={completed ? "secondary" : "complete"}
      >
        {completed ? (
          <RotateCcw aria-hidden="true" size={18} />
        ) : (
          <Check aria-hidden="true" size={18} strokeWidth={2.5} />
        )}
        <span>{completed ? "Ångra" : "Klar"}</span>
      </NoteButton>
      <NoteButton
        variant="delete"
        layout="footer"
        type="button"
        onClick={() => onDeleteTodo(todoId)}
        aria-label={`Radera uppgift: ${todoTitle}`}
      >
        <Trash2 aria-hidden="true" size={18} />
        <span>Radera</span>
      </NoteButton>
      {!completed && (
        <NoteButton
          variant="add"
          layout="footer-icon"
          ref={addSubtaskButtonRef}
          type="button"
          aria-expanded={isAddingSubtask}
          aria-label={
            isAddingSubtask
              ? `Stäng deluppgiftsfältet i ${todoTitle}`
              : `Lägg till deluppgift i ${todoTitle}`
          }
          title={
            isAddingSubtask ? "Stäng deluppgiftsfältet" : "Lägg till deluppgift"
          }
          onClick={onToggleSubtaskForm}
          className="group"
        >
          <Plus
            aria-hidden="true"
            size={16}
            className="size-5.5 max-md:group-aria-expanded:rotate-45 md:size-4"
          />
          <span className="hidden md:inline">Deluppgift</span>
        </NoteButton>
      )}
    </div>
  );
}

export default TodoActions;
