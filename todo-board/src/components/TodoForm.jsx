import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) return;

    onAddTodo(text);

    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb10 flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Skriv en ny uppgift..."
        className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-5 py-4 outline-none"
      />

      <button
        type="submit"
        className="rounded-xl bg-violet-600 px-6 font-medium"
      >
        + Lägg till
      </button>
    </form>
  );
}

export default TodoForm;
