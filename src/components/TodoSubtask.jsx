import { useEffect, useId, useRef, useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";

function TodoSubtask({
  todoId,
  subtask,
  onToggleSubtask,
  onEditSubtask,
  onDeleteSubtask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(subtask.text);
  const [error, setError] = useState("");
  const rowRef = useRef(null);
  const editButtonRef = useRef(null);
  const inputRef = useRef(null);
  const restoreFocus = useRef(false);
  const id = useId();

  // Flytta fokus efter renderingen, när inputfältet eller pennknappen finns i DOM:en.
  // Flaggan gör att fokus återställs efter redigering, inte när raden först visas.
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    } else if (restoreFocus.current) {
      editButtonRef.current?.focus();
      restoreFocus.current = false;
    }
  }, [isEditing]);

  function startEditing() {
    setDraft(subtask.text);
    setError("");
    setIsEditing(true);
  }

  function finishEditing() {
    restoreFocus.current = true;
    setIsEditing(false);
  }

  function save(event) {
    event.preventDefault();
    if (!draft.trim()) {
      setError("Skriv en deluppgift.");
      inputRef.current?.focus();
      return;
    }
    onEditSubtask(todoId, subtask.id, draft.trim());
    finishEditing();
  }

  // Välj nästa rad, föregående rad eller en knapp på lappen innan raden tas bort.
  // På en färdig lapp saknas Deluppgift-knappen, så fokus hamnar då på Ångra.
  function remove() {
    const row = rowRef.current;
    const note = row.closest("article");
    const nextControl =
      row.nextElementSibling?.querySelector("input")
      ?? row.previousElementSibling?.querySelector("input")
      ?? note?.querySelector(".note-action--add")
      ?? note?.querySelector(".note-footer-actions button");
    onDeleteSubtask(todoId, subtask.id);
    nextControl?.focus();
  }

  return (
    <li
      ref={rowRef}
      className="note-subtask relative flex items-start gap-1"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isEditing) {
          event.preventDefault();
          finishEditing();
        }
      }}
    >
      {isEditing ? (
        <form
          onSubmit={save}
          aria-label={`Ändra deluppgift: ${subtask.text}`}
          className="min-w-0 flex-1 py-1"
        >
          <label htmlFor={id} className="sr-only">Ändra deluppgift</label>
          <input
            ref={inputRef}
            id={id}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="font-hand min-h-11 w-full min-w-0 rounded-lg border border-black/30 bg-white/25 px-2 text-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-note-ink"
          />
          {error && <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-950">{error}</p>}
          <div className="mt-2 flex gap-2">
            <button type="submit" className="note-action note-action--complete">
              <Check aria-hidden="true" size={16} />
              Spara
            </button>
            <button
              type="button"
              onClick={finishEditing}
              aria-label="Avbryt ändring"
              title="Avbryt ändring"
              className="note-action"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </div>
        </form>
      ) : (
        <>
          <label className="flex min-h-11 min-w-0 flex-1 cursor-pointer items-start gap-2 py-2">
            <span className="relative mt-1 h-5 w-5 shrink-0">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => onToggleSubtask(todoId, subtask.id)}
                className="note-checkbox peer"
              />
              <Check
                aria-hidden="true"
                size={20}
                strokeWidth={3.5}
                className="pointer-events-none absolute inset-0 text-note-done opacity-0 peer-checked:opacity-100"
              />
            </span>
            <span className={`font-hand min-w-0 text-xl leading-7 wrap-anywhere ${subtask.completed ? "note-completed-text" : ""}`}>
              {subtask.text}
            </span>
          </label>
          <div className="note-subtask-actions flex shrink-0">
            <button
              ref={editButtonRef}
              type="button"
              onClick={startEditing}
              aria-label={`Ändra deluppgift: ${subtask.text}`}
              title="Ändra"
              className="flex h-11 w-8 items-center justify-center rounded-lg text-black/65 hover:text-note-add-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-note-ink"
            >
              <Pencil aria-hidden="true" size={16} />
            </button>
            <button
              type="button"
              onClick={remove}
              aria-label={`Radera deluppgift: ${subtask.text}`}
              title="Radera"
              className="flex h-11 w-8 items-center justify-center rounded-lg text-black/65 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-note-ink"
            >
              <Trash2 aria-hidden="true" size={16} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoSubtask;
