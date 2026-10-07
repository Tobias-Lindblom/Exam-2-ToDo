import { useEffect, useId, useRef } from "react";
import { Check, ListTodo, X } from "lucide-react";

function TodoCompleteDialog({ todo, onCancel, onConfirm }) {
  const dialogRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const id = useId();
  const remaining = todo.subtasks.filter(
    (subtask) => !subtask.completed,
  ).length;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    // showModal håller tangentbordsfokus i rutan. Börja på alternativet som avbryter.
    dialog.showModal();
    cancelButtonRef.current?.focus();
    return () => {
      dialog.close();
      // Återgå till öppningsknappen om den fortfarande finns kvar på sidan.
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-remaining ${id}-description`}
      className="complete-dialog"
      onCancel={(event) => {
        // Låt React stänga rutan via onCancel även när användaren trycker Escape.
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        // Bakgrunden skickar klick till dialogen; gränserna skiljer den från rutans tomma ytor.
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          onCancel();
        }
      }}
    >
      <button
        type="button"
        onClick={onCancel}
        aria-label="Stäng bekräftelserutan"
        title="Stäng"
        className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-lg text-note-ink/60 hover:text-note-ink focus-visible:outline-2 focus-visible:outline-note-ink"
      >
        <X aria-hidden="true" size={22} />
      </button>

      <p
        id={`${id}-remaining`}
        className="font-hand flex items-center gap-2 pr-8 text-xl text-note-ink/70"
      >
        <ListTodo aria-hidden="true" size={20} strokeWidth={1.8} />
        {remaining} {remaining === 1 ? "deluppgift" : "deluppgifter"} kvar
      </p>
      <h2
        id={`${id}-title`}
        className="note-title font-hand mt-2 pr-5 text-[2rem] leading-tight sm:text-[2.25rem]"
      >
        Är du verkligen klar med allt på lappen?
      </h2>
      <p
        id={`${id}-description`}
        className="mt-5 text-[0.9375rem] leading-relaxed"
      >
        Alla återstående deluppgifter i{" "}
        <span className="font-semibold wrap-anywhere">”{todo.text}”</span>{" "}
        bockas av om du gör lappen klar. Du kan också fortsätta en i taget.
      </p>

      <div className="complete-dialog-actions mt-6 grid gap-3">
        <button
          ref={cancelButtonRef}
          type="button"
          onClick={onCancel}
          className="note-action note-action--secondary"
        >
          Fortsätt med lappen
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="note-action note-action--complete"
        >
          <Check aria-hidden="true" size={20} strokeWidth={2.5} />
          Gör allt klart
        </button>
      </div>
    </dialog>
  );
}

export default TodoCompleteDialog;
