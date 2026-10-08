import { ListTodo } from "lucide-react";

function Header() {
  return (
    <header className="mb-5 flex items-center gap-4 border-b border-slate-700/50 pb-4 pt-2 sm:mb-6 sm:gap-5 sm:pb-5">
      <div
        aria-hidden="true"
        className="post-it-paper relative flex h-14 w-12 shrink-0 -rotate-3 items-center justify-center bg-accent text-accent-ink shadow-md sm:h-16 sm:w-14"
      >
        <div className="absolute -top-2 left-1/2 h-5 w-9 -translate-x-1/2 rotate-3 border-x border-white/20 bg-white/40 sm:h-6 sm:w-11" />
        <ListTodo className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <h1 className="font-hand text-[1.875rem] leading-[1.1] text-slate-100 sm:text-[2.5rem]">
          Mina lappar
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Uppgifter och checklistor på en tavla.
        </p>
      </div>
    </header>
  );
}

export default Header;
