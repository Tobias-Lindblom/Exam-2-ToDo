import { Check } from "lucide-react";

function NoteCheckbox({ checked, onChange, className = "", ...props }) {
  return (
    <span className={`relative size-5 shrink-0 ${className}`}>
      <input
        {...props}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer block size-5 cursor-pointer appearance-none rounded border-2 border-note-ink/70 bg-transparent focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-note-ink forced-colors:appearance-auto"
      />
      <Check
        aria-hidden="true"
        size={20}
        strokeWidth={3.5}
        className="pointer-events-none absolute inset-0 text-note-done opacity-0 peer-checked:opacity-100 forced-colors:hidden"
      />
    </span>
  );
}

export default NoteCheckbox;
