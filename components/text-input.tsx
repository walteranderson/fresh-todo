import { JSX } from "preact";

export function TextInput(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      class={`${props.className} px-2 py-1 border-gray-500 border-2 rounded bg-white`}
    />
  );
}
