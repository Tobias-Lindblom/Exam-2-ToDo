import { createElement } from "react";
import { getTodoIcon } from "../../utils/getTodoIcon";

function TodoIllustration({ text, completed }) {
  const icon = createElement(getTodoIcon(text), {
    "aria-hidden": true,
    strokeWidth: 2.5,
    absoluteStrokeWidth: true,
    size: 96,
    className: "h-16 w-16 sm:h-20 sm:w-20",
  });

  return (
    <div
      aria-hidden="true"
      className={`relative mt-4 ml-auto shrink-0 -rotate-6 ${completed ? "invisible" : ""}`}
    >
      <svg
        viewBox="0 0 32 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="absolute -right-1 -top-4 h-6 w-8"
      >
        <path d="M8 13 12 3M19 18l8-7" />
      </svg>
      {icon}
    </div>
  );
}

export default TodoIllustration;
