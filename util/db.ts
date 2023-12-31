// TODO: default path is a mysterious directory, supply env var to override to current dir
export const kv = await Deno.openKv();

export type Todo = {
  id?: string;
  text: string;
  completed: boolean;
};

export const todos = {
  list: async () => {
    const iter = kv.list<Todo>({ prefix: ["todos"] });
    const todos: Todo[] = [];
    for await (const res of iter) {
      todos.push(res.value);
    }
    return todos;
  },
  get: async (id: string) => {
    const res = await kv.get<Todo>(["todos", id]);
    return res.value;
  },
  create: async (todo: Todo) => {
    const id = crypto.randomUUID();
    todo.id = id;
    await kv.set(["todos", id], todo);
    return todo;
  },
  update: async (id: string, todo: Todo) => {
    await kv.set(["todos", id], todo);
    return todo;
  },
  delete: async (id: string) => {
    await kv.delete(["todos", id]);
  }
};
