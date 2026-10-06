import { useEffect, useId, useRef, useState } from "react";
import { Check, X } from "lucide-react";

function TodoSubtaskForm({ todo, onAddSubtask, onCancel }) {
  const [text, setText] = useState("");
  const inputId = useId();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;

    onAddSubtask(todo.id, text);
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
      aria-label={`Lägg till deluppgift i ${todo.text}`}
      className="mb-3 flex items-center gap-2"
    >
      <label htmlFor={inputId} className="sr-only">Ny deluppgift</label>
      <input
        ref={inputRef}
        id={inputId}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Skriv en deluppgift..."
        autoComplete="off"
        className="min-h-11 min-w-0 flex-1 rounded-lg border border-black/25 bg-white/30 px-3 py-2 text-base text-[#201d19] outline-none placeholder:text-black/50 focus:border-black/60 focus:ring-2 focus:ring-black/15"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        aria-label="Lägg till deluppgift"
        title="Lägg till"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-black/10 transition-colors enabled:hover:bg-black/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#201d19] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Check aria-hidden="true" size={18} />
      </button>
      <button
        type="button"
        onClick={onCancel}
        aria-label="Avbryt deluppgift"
        title="Avbryt"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-black/65 hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#201d19]"
      >
        <X aria-hidden="true" size={18} />
      </button>
    </form>
  );
}

export default TodoSubtaskForm;
