import { useRef, useState } from "react";

function useTodos() {
  const [todos, setTodos] = useState([]);
  // En separat räknare ger nya lappar nästa stil även när andra lappar har raderats.
  const nextAppearance = useRef(0);

  function addTodo(text) {
    if (!text.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      appearance: nextAppearance.current++,
      subtasks: [],
    };

    setTodos((current) => [...current, newTodo]);
  }

  // Klar och Ångra gäller både lappen och samtliga deluppgifter.
  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) => {
        if (todo.id !== id) return todo;

        const completed = !todo.completed;
        return {
          ...todo,
          completed,
          subtasks: todo.subtasks.map((subtask) => ({ ...subtask, completed })),
        };
      }),
    );
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  // Räkna om lappens status efter en ändring i checklistan.
  // Om sista deluppgiften raderas behålls lappens tidigare status.
  function updateSubtasks(todoId, update) {
    setTodos((current) =>
      current.map((todo) => {
        if (todo.id !== todoId) return todo;

        const subtasks = update(todo.subtasks);
        return {
          ...todo,
          subtasks,
          completed: subtasks.length > 0
            ? subtasks.every((subtask) => subtask.completed)
            : todo.completed,
        };
      }),
    );
  }

  function addSubtask(todoId, text) {
    if (!text.trim()) return;

    const subtask = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
    };
    setTodos((current) =>
      current.map((todo) =>
        // Färdiga lappar måste ångras innan fler deluppgifter kan läggas till.
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
