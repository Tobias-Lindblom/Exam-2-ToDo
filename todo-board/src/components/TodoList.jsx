import useTodoCarousel from "../hooks/useTodoCarousel";
import { ArrowLeft, ArrowRight, StickyNote } from "lucide-react";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onAddSubtask,
  onToggleSubtask,
  onEditSubtask,
  onDeleteSubtask,
}) {
  const { carouselRef, activeIndex, updatePosition, goTo } = useTodoCarousel(todos);

  return (
    <section aria-label="Dina uppgifter">
      {todos.length === 0 ? (
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
      ) : (
        <>
          <nav
            aria-label="Bläddra mellan lappar"
            className="mx-auto mb-2 flex w-fit items-center justify-center gap-3 md:hidden"
          >
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Föregående lapp"
              className="note-navigation"
            >
              <ArrowLeft aria-hidden="true" size={24} strokeWidth={2.2} className="-rotate-6" />
            </button>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="font-hand min-w-24 text-center text-[1.75rem] leading-none text-slate-300"
            >
              <span className="sr-only">Lapp </span>
              <span className="text-accent">{activeIndex + 1}</span> av {todos.length}
            </p>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === todos.length - 1}
              aria-label="Nästa lapp"
              className="note-navigation"
            >
              <ArrowRight aria-hidden="true" size={24} strokeWidth={2.2} className="rotate-6" />
            </button>
          </nav>
          <div ref={carouselRef} className="todo-notes" onScroll={updatePosition}>
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className="todo-slide"
                role="group"
                aria-label={`Lapp ${index + 1} av ${todos.length}`}
              >
                <TodoItem
                  todo={todo}
                  onToggleTodo={onToggleTodo}
                  onDeleteTodo={onDeleteTodo}
                  onAddSubtask={onAddSubtask}
                  onToggleSubtask={onToggleSubtask}
                  onEditSubtask={onEditSubtask}
                  onDeleteSubtask={onDeleteSubtask}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default TodoList;
