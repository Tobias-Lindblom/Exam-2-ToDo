const baseClasses =
  "inline-flex items-center justify-center rounded-lg border shadow-[inset_0_1px_0_rgb(255_255_255/16%)] leading-[1.25] transition-[background-color,border-color,color] duration-150 ease-[ease] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-note-ink motion-reduce:transition-none [&_svg]:shrink-0";

const defaultColors = "border-note-ink/16 bg-white/8 text-note-ink";

const hoverClasses = {
  default: "hover:border-note-ink/30 hover:bg-white/24",
  complete:
    "hover:border-note-done hover:bg-note-done-hover hover:active:bg-note-done-hover hover:text-white",
  secondary:
    "hover:border-accent-border hover:bg-accent hover:active:bg-accent hover:text-accent-ink",
  add: "hover:border-note-add-border hover:bg-note-add-hover hover:active:bg-note-add-hover hover:text-note-add-ink",
  delete:
    "hover:border-note-delete-border hover:bg-note-delete-hover hover:active:bg-note-delete-hover hover:text-white",
};

const layoutClasses = {
  default: "min-h-11 gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap",
  footer:
    "min-h-12 flex-1 gap-1.5 px-1.5 py-2 text-sm font-medium whitespace-nowrap md:min-h-11 md:flex-initial md:gap-2 md:px-3",
  "footer-icon":
    "min-h-12 flex-[0_0_3rem] gap-1.5 p-0 text-sm font-medium whitespace-nowrap md:min-h-11 md:flex-initial md:gap-2 md:px-3 md:py-2",
  dialog:
    "font-hand min-h-12 gap-2 px-3 py-2.5 text-lg font-normal whitespace-normal",
};

const dialogColors = {
  secondary: "border-note-ink/25 bg-white/40 text-note-ink",
  complete: "border-note-done-soft-border bg-note-done-soft text-note-done",
};

function NoteButton({
  variant = "default",
  layout = "default",
  type = "button",
  className = "",
  children,
  ...props
}) {
  const colors =
    layout === "dialog"
      ? (dialogColors[variant] ?? defaultColors)
      : defaultColors;

  return (
    <button
      {...props}
      type={type}
      data-note-action={variant}
      className={`${baseClasses} ${layoutClasses[layout]} ${colors} ${hoverClasses[variant]} active:bg-note-ink/8 ${className}`}
    >
      {children}
    </button>
  );
}

export default NoteButton;
