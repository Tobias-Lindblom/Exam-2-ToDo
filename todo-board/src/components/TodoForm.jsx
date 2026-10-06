import { useState } from "react";
import { Plus } from "lucide-react";

function TodoForm({ onAddTodo }) {
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
      className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-700/50 bg-[#1a2330] p-3 sm:flex-row"
    >
      <label htmlFor="new-todo" className="sr-only">
        Ny uppgift
      </label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Vad vill du få gjort?"
        autoComplete="off"
        className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-[#202b3b] px-4 py-3.5 text-base text-white outline-none transition-colors placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/25"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        <Plus aria-hidden="true" size={20} />
        Lägg till
      </button>
    </form>
  );
}

export default TodoForm;