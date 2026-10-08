import useTodoCarousel from "../../hooks/useTodoCarousel";
import TodoItem from "./TodoItem";
import TodoNavigation from "./TodoNavigation";
import TodoEmptyState from "./TodoEmptyState";

function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onAddSubtask,
  onToggleSubtask,
  onEditSubtask,
  onDeleteSubtask,
}) {
  const { carouselRef, activeIndex, handleScroll, scrollToTodo } =
    useTodoCarousel(todos);

  return (
    <section aria-label="Dina uppgifter">
      {todos.length === 0 ? (
        <TodoEmptyState />
      ) : (
        <>
          <TodoNavigation
            activeIndex={activeIndex}
            total={todos.length}
            onNavigate={scrollToTodo}
          />
          <div
            ref={carouselRef}
            className="relative flex items-start gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden md:grid md:h-auto md:items-stretch md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:overflow-visible md:pt-2 md:snap-none xl:grid-cols-3"
            onScroll={handleScroll}
          >
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className="min-w-0 flex-[0_0_100%] px-3 pt-4 pb-7 snap-start snap-always md:flex md:p-0 md:[&>article]:w-full"
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
