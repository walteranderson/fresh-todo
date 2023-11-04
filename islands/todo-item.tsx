import { Todo } from "@/util/db.ts";
import { Square, CheckSquare, Trash2 } from "lucide-preact";
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
    <button class={`rounded p-0.5 ${props.className || ""}`}>
      {props.children}
    </button>
  );
}

export default function TodoItem(props: TodoItemProps) {
  const { value } = props;

  const onComplete = () => {
    //
  };
  const onDelete = () => {
    //
  };

  return (
    <div class="w-full flex flex-row gap-2">
      <IconButton className="hover:bg-gray-200" onClick={onComplete}>
        {value.completed ? <CheckSquare /> : <Square />}
      </IconButton>
      <span class="flex-1">{value.text}</span>
      <IconButton className="text-red-500 hover:bg-red-200" onClick={onDelete}>
        <Trash2 />
      </IconButton>
    </div>
  );
}
