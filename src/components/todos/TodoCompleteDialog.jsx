import { useEffect, useId, useRef } from "react";
import { Check, X } from "lucide-react";
import NoteButton from "../ui/NoteButton";
import IconButton from "../ui/IconButton";

function TodoCompleteDialog({ remainingCount, onCancel, onConfirm }) {
  const dialogRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    cancelButtonRef.current?.focus();
    return () => {
      dialog.close();
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      className="complete-dialog fixed isolate inset-0 m-auto w-[min(30rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[6px_12px_8px_10px] border border-[#e6cc67] p-7 text-note-ink shadow-[0_24px_80px_rgb(0_0_0/40%)] backdrop:bg-page/75 backdrop:backdrop-blur-xs"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
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
      <IconButton
        variant="close"
        onClick={onCancel}
        label="Stäng bekräftelserutan"
        title="Stäng"
        className="absolute top-2 right-2"
      >
        <X aria-hidden="true" size={22} />
      </IconButton>

      <h2
        id={`${id}-title`}
        className="note-title font-hand mt-2 pr-5 text-[2rem] leading-tight sm:text-[2.25rem]"
      >
        Bocka av resten också?
      </h2>
      <p
        id={`${id}-description`}
        className="mt-5 text-[0.9375rem] leading-relaxed"
      >
        Du har {remainingCount}{" "}
        {remainingCount === 1 ? "deluppgift" : "deluppgifter"} kvar. Vill du
        markera {remainingCount === 1 ? "den som klar" : "dem som klara"}{" "}
        tillsammans med lappen?
      </p>

      <div className="mt-6 grid gap-3 min-[28rem]:grid-cols-[1.2fr_1fr]">
        <NoteButton
          variant="secondary"
          layout="dialog"
          ref={cancelButtonRef}
          type="button"
          onClick={onCancel}
        >
          Fortsätt med lappen
        </NoteButton>
        <NoteButton variant="complete" layout="dialog" onClick={onConfirm}>
          <Check aria-hidden="true" size={20} strokeWidth={2.5} />
          Ja, bocka av allt
        </NoteButton>
      </div>
    </dialog>
  );
}

export default TodoCompleteDialog;
