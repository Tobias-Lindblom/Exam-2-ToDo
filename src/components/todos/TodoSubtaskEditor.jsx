import { useEffect, useId, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import NoteButton from "../ui/NoteButton";

function TodoSubtaskEditor({ text, onSave, onCancel }) {
  const [draft, setDraft] = useState(text);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const id = useId();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  function save(event) {
    event.preventDefault();
    const trimmedText = draft.trim();
    if (!trimmedText) {
      setError("Skriv en deluppgift.");
      inputRef.current?.focus();
      return;
    }
    onSave(trimmedText);
  }

  return (
    <form
      onSubmit={save}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onCancel();
        }
      }}
      aria-label={`Ändra deluppgift: ${text}`}
      className="min-w-0 flex-1 py-1"
    >
      <label htmlFor={id} className="sr-only">
        Ändra deluppgift
      </label>
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
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-sm text-red-950"
        >
          {error}
        </p>
      )}
      <div className="mt-2 flex gap-2">
        <NoteButton type="submit" variant="complete">
          <Check aria-hidden="true" size={16} />
          Spara
        </NoteButton>
        <NoteButton
          onClick={onCancel}
          aria-label="Avbryt ändring"
          title="Avbryt ändring"
        >
          <X aria-hidden="true" size={18} />
        </NoteButton>
      </div>
    </form>
  );
}

export default TodoSubtaskEditor;
