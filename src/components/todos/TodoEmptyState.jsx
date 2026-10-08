import { StickyNote } from "lucide-react";

function TodoEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-600/60 bg-slate-800/20 px-5 py-12 text-center sm:py-16">
      <div
        aria-hidden="true"
        className="post-it-paper relative mb-7 flex h-24 w-24 -rotate-6 items-center justify-center bg-accent text-[#191919] shadow-md"
      >
        <div className="absolute -top-3 left-1/2 h-6 w-12 -translate-x-1/2 rotate-3 bg-white/50" />
        <StickyNote size={38} strokeWidth={1.4} />
      </div>
      <h3 className="font-hand text-3xl text-slate-100">Vad vill du få gjort idag?</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
        Lägg till din första uppgift ovan. En liten lapp är en bra början.
      </p>
    </div>
  );
}

export default TodoEmptyState;
