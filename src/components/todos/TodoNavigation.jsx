import { ArrowLeft, ArrowRight } from "lucide-react";

const navigationClasses =
  "flex size-11 items-center justify-center rounded-lg border-0 bg-transparent text-[#e2e8f0] disabled:cursor-default disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent enabled:hover:text-accent";

function TodoNavigation({ activeIndex, total, onNavigate }) {
  return (
    <nav
      aria-label="Bläddra mellan lappar"
      className="mx-auto mb-2 flex w-fit items-center justify-center gap-3 md:hidden"
    >
      <button
        type="button"
        onClick={() => onNavigate(activeIndex - 1)}
        disabled={activeIndex === 0}
        aria-label="Föregående lapp"
        className={navigationClasses}
      >
        <ArrowLeft aria-hidden="true" size={24} strokeWidth={2.2} className="-rotate-6" />
      </button>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="font-hand min-w-24 text-center text-[1.75rem] leading-none text-slate-300"
      >
        <span className="sr-only">Lapp </span>
        <span className="text-accent">{activeIndex + 1}</span> av {total}
      </p>
      <button
        type="button"
        onClick={() => onNavigate(activeIndex + 1)}
        disabled={activeIndex === total - 1}
        aria-label="Nästa lapp"
        className={navigationClasses}
      >
        <ArrowRight aria-hidden="true" size={24} strokeWidth={2.2} className="rotate-6" />
      </button>
    </nav>
  );
}

export default TodoNavigation;
