import { Todo } from "@/util/db.ts";
import { useState } from "preact/hooks";
import { CheckSquare, Square, Trash2 } from "lucide-preact";
import { ComponentChildren } from "preact";

export type TodoItemProps = {
  value: Todo;
};

type IconButtonProps = {
  className?: string;
  onClick?: () => void;
  children?: ComponentChildren;
};

function IconButton(props: IconButtonProps) {
  return (
    <button
      onClick={props.onClick}
      class={`rounded p-0.5 ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

export default function TodoItem(props: TodoItemProps) {
  const { value } = props;
  const [completed, setCompleted] = useState(value.completed);

  const onComplete = async () => {
    const res = await fetch(`/api/todos/${value.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...value, completed: !completed }),
    });
    const todo = await res.json();
    setCompleted(todo.completed);
  };
  const onDelete = async () => {
    await fetch(`/api/todos/${value.id}`, {
      method: "DELETE",
    });
  };

  return (
    <div class="w-full flex flex-row gap-2">
      <IconButton className="hover:bg-gray-200" onClick={onComplete}>
        {completed ? <CheckSquare /> : <Square />}
      </IconButton>
      <span class="flex-1">{value.text}</span>
      <IconButton className="text-red-500 hover:bg-red-200" onClick={onDelete}>
        <Trash2 />
      </IconButton>
    </div>
  );
}
