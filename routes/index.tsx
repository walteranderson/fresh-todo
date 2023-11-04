import { Handlers } from "$fresh/server.ts";
import * as db from "@/util/db.ts";
import { Button } from "@/components/button.tsx";
import { TextInput } from "@/components/text-input.tsx";
import TodoItem from "@/islands/todo-item.tsx";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const text: string = form.get("text") as string;
    const todo = await db.todos.create({ text, completed: false });
    console.log("todo created", todo);

    return ctx.render();
  },
};

export default async function Home() {
  const todos = await db.todos.list();

  return (
    <>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-sm mx-auto flex flex-col items-center justify-center">
          <img
            class="mb-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">Welcome to Fresh Todo</h1>
        </div>
      </div>

      <div class="mt-6 max-w-[300px] mx-auto flex flex-col items-center justify-content">
        {todos.map((todo) => (
          <TodoItem value={todo} />
        ))}

        <form method="post" class="flex flex-row gap-2 mt-4">
          <TextInput type="text" name="text" placeholder="Add a new todo" />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </>
  );
}
