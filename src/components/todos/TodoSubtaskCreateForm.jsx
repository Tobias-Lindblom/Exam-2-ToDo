import { useEffect, useId, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import IconButton from "../ui/IconButton";

function TodoSubtaskCreateForm({ todoId, todoTitle, onAddSubtask, onCancel }) {
  const [text, setText] = useState("");
  const inputId = useId();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;

    onAddSubtask(todoId, text);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onCancel();
        }
      }}
      aria-label={`Lägg till deluppgift i ${todoTitle}`}
      className="mb-3 flex items-center gap-2"
    >
      <label htmlFor={inputId} className="sr-only">
        Ny deluppgift
      </label>
      <input
        ref={inputRef}
        id={inputId}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Skriv en deluppgift..."
        autoComplete="off"
        className="min-h-11 min-w-0 flex-1 rounded-lg border border-black/25 bg-white/30 px-3 py-2 text-base text-note-ink outline-none placeholder:text-black/50 focus:border-black/60 focus:ring-2 focus:ring-black/15"
      />
      <IconButton
        variant="filled"
        type="submit"
        disabled={!text.trim()}
        label="Lägg till deluppgift"
        title="Lägg till"
      >
        <Check aria-hidden="true" size={18} />
      </IconButton>
      <IconButton onClick={onCancel} label="Avbryt deluppgift" title="Avbryt">
        <X aria-hidden="true" size={18} />
      </IconButton>
    </form>
  );
}

export default TodoSubtaskCreateForm;
