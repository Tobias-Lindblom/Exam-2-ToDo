import { useEffect, useRef, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import TodoSubtaskEditor from "./TodoSubtaskEditor";
import IconButton from "../ui/IconButton";
import NoteCheckbox from "../ui/NoteCheckbox";

function TodoSubtask({
  todoId,
  subtask,
  todoCompleted,
  onToggleSubtask,
  onEditSubtask,
  onDeleteSubtask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const rowRef = useRef(null);
  const editButtonRef = useRef(null);
  const restoreFocus = useRef(false);

  // Kasta ett öppet utkast om lappen slutförs under redigeringen.
  if (todoCompleted && isEditing) {
    setIsEditing(false);
  }

  useEffect(() => {
    if (!isEditing && restoreFocus.current) {
      editButtonRef.current?.focus();
      restoreFocus.current = false;
    }
  }, [isEditing]);

  function finishEditing() {
    restoreFocus.current = true;
    setIsEditing(false);
  }

  function save(text) {
    onEditSubtask(todoId, subtask.id, text);
    finishEditing();
  }

  function remove() {
    const row = rowRef.current;
    const note = row.closest("article");
    const nextControl =
      row.nextElementSibling?.querySelector("input") ??
      row.previousElementSibling?.querySelector("input") ??
      note?.querySelector('[data-note-action="add"]') ??
      note?.querySelector("[data-note-actions] button");
    onDeleteSubtask(todoId, subtask.id);
    nextControl?.focus();
  }

  return (
    <li ref={rowRef} className="group/subtask relative flex items-start gap-1">
      {isEditing && !todoCompleted ? (
        <TodoSubtaskEditor
          text={subtask.text}
          onSave={save}
          onCancel={finishEditing}
        />
      ) : (
        <>
          <label className="flex min-h-11 min-w-0 flex-1 cursor-pointer items-start gap-2 py-2">
            <NoteCheckbox
              checked={subtask.completed}
              onChange={() => onToggleSubtask(todoId, subtask.id)}
              className="mt-1"
            />
            <span
              className={`font-hand min-w-0 text-xl leading-7 wrap-anywhere ${subtask.completed ? "line-through decoration-note-ink decoration-2 [text-decoration-skip-ink:none]" : ""}`}
            >
              {subtask.text}
            </span>
          </label>
          <div className="flex w-16 shrink-0 [@media(hover:hover)_and_(pointer:fine)]:opacity-0 group-hover/subtask:opacity-100 group-focus-within/subtask:opacity-100">
            {!todoCompleted && (
              <>
                <IconButton
                  ref={editButtonRef}
                  variant="edit"
                  size="compact"
                  onClick={() => setIsEditing(true)}
                  label={`Ändra deluppgift: ${subtask.text}`}
                  title="Ändra"
                >
                  <Pencil aria-hidden="true" size={16} />
                </IconButton>
                <IconButton
                  variant="delete"
                  size="compact"
                  onClick={remove}
                  label={`Radera deluppgift: ${subtask.text}`}
                  title="Radera"
                >
                  <Trash2 aria-hidden="true" size={16} />
                </IconButton>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
}

export default TodoSubtask;
