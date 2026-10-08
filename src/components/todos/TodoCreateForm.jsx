import { useState } from "react";
import { Plus } from "lucide-react";

function TodoCreateForm({ onAddTodo }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    onAddTodo(text);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Lägg till en ny lapp"
      className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-700/50 bg-[#1a2330] p-3 sm:flex-row"
    >
      <label htmlFor="new-todo" className="sr-only">
        Ny lapp
      </label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Vad ska stå på lappen?"
        autoComplete="off"
        className="font-hand min-w-0 flex-1 rounded-xl border border-slate-600 bg-[#202b3b] px-4 py-3.5 text-[1.375rem] leading-6 text-white outline-none transition-colors placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="font-hand flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-xl leading-6 text-accent-ink transition-colors enabled:hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:bg-accent/15 disabled:text-accent/45"
      >
        <Plus aria-hidden="true" size={20} />
        Ny lapp
      </button>
    </form>
  );
}

export default TodoCreateForm;
