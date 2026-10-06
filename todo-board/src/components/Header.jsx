import { Smile, Heart } from "lucide-react";

function Header() {
  return (
    <header className="mb-6 grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-4 border-b border-slate-700/50 pb-6 pt-2 sm:mb-8 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-x-6 sm:gap-y-2 sm:pb-8">
      <div
        aria-hidden="true"
        className="post-it-paper relative flex h-16 w-14 -rotate-6 items-center justify-center bg-[#FFE875] text-[#292516] shadow-[3px_6px_0_rgba(255,232,117,0.08),0_8px_20px_rgba(0,0,0,0.2)] sm:row-span-2 sm:h-22 sm:w-20"
      >
        <div className="absolute -top-2 left-1/2 h-5 w-9 -translate-x-1/2 rotate-3 border-x border-white/20 bg-white/40 sm:h-6 sm:w-11" />
        <Smile className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.7} />
        <div className="absolute bottom-0 right-0 h-3 w-3 bg-[#e5cd59] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      </div>

      <h1 className="font-hand min-w-0 text-[2rem] leading-[1.15] text-slate-50 sm:text-[2.75rem] lg:text-5xl">
        Min{" "}
        <span className="relative inline-block whitespace-nowrap text-[#FFE875]">
          Todo-tavla
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-1 w-full -rotate-1 rounded-full bg-[#FFE875]/20"
          />
        </span>
      </h1>

      <p className="col-span-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm leading-relaxed text-slate-400 sm:col-span-1 sm:col-start-2 sm:text-base">
        <span>En sak i taget.</span>
        <span className="inline-flex items-center gap-2 text-slate-300">
          Du har koll.
          <Heart
            aria-hidden="true"
            size={16}
            strokeWidth={1.8}
            className="shrink-0 fill-pink-400/15 text-pink-300"
          />
        </span>
      </p>
    </header>
  );
}

export default Header;