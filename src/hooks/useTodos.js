import { useRef, useState } from "react";

function useTodos() {
  const [todos, setTodos] = useState([]);
  // Räknaren ger nya lappar nästa stil även när tidigare lappar har raderats.
  const nextAppearance = useRef(0);

  function addTodo(text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
      appearance: nextAppearance.current++,
      subtasks: [],
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  }

  // Klar och Ångra ändrar både lappens status och alla dess deluppgifter.
  function toggleTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id !== todoId) return todo;

        const completed = !todo.completed;
        return {
          ...todo,
          completed,
          subtasks: todo.subtasks.map((subtask) => ({ ...subtask, completed })),
        };
      }),
    );
  }

  function deleteTodo(todoId) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
  }

  // updateSubtaskList tar emot deluppgifterna och returnerar en uppdaterad lista.
  function updateSubtasks(todoId, updateSubtaskList, { allowCompleted = false } = {}) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id !== todoId) return todo;

        // Redigering och radering kräver att lappen är aktiv.
        if (todo.completed && !allowCompleted) return todo;

        const updatedSubtasks = updateSubtaskList(todo.subtasks);
        // Om sista deluppgiften raderas behåller lappen sin tidigare status.
        const completed = updatedSubtasks.length > 0
          ? updatedSubtasks.every((subtask) => subtask.completed)
          : todo.completed;
        return {
          ...todo,
          subtasks: updatedSubtasks,
          completed,
        };
      }),
    );
  }

  function addSubtask(todoId, text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const subtask = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
    };
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        // En färdig lapp måste ångras innan fler deluppgifter kan läggas till.
        todo.id === todoId && !todo.completed
          ? { ...todo, subtasks: [...todo.subtasks, subtask] }
          : todo,
      ),
    );
  }

  function toggleSubtask(todoId, subtaskId) {
    updateSubtasks(todoId, (subtasks) =>
      subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask,
      ),
      // Kryssrutan kan fortfarande användas för att ångra en avbockning.
      { allowCompleted: true },
    );
  }

  function editSubtask(todoId, subtaskId, text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    updateSubtasks(todoId, (subtasks) =>
      subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, text: trimmedText } : subtask,
      ),
    );
  }

  function deleteSubtask(todoId, subtaskId) {
    updateSubtasks(todoId, (subtasks) =>
      subtasks.filter((subtask) => subtask.id !== subtaskId),
    );
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    addSubtask,
    toggleSubtask,
    editSubtask,
    deleteSubtask,
  };
}

export default useTodos;
