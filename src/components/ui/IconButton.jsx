const variantClasses = {
  default: "text-black/65 hover:bg-black/10",
  edit: "text-black/65 hover:text-note-add-ink",
  delete: "text-black/65 hover:text-note-delete-ink",
  filled: "bg-black/10 transition-colors enabled:hover:bg-black/15",
  close: "text-note-ink/60 hover:text-note-ink",
};

const sizeClasses = {
  default: "h-11 w-11",
  compact: "h-11 w-8",
};

function IconButton({
  label,
  title = label,
  variant = "default",
  size = "default",
  type = "button",
  className = "",
  children,
  ...props
}) {
  const focusOffset =
    variant === "close" ? "" : "focus-visible:outline-offset-2";

  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      title={title}
      className={`flex shrink-0 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-note-ink disabled:cursor-not-allowed disabled:opacity-40 ${sizeClasses[size]} ${variantClasses[variant]} ${focusOffset} ${className}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
