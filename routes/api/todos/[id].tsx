import { Handlers } from "$fresh/server.ts";
import * as db from "@/util/db.ts";

export const handler: Handlers = {
  async PUT(req, ctx) {
    const { id } = ctx.params;
    const body = await req.json() as db.Todo;
    const todo = await db.todos.update(id, body);
    return new Response(JSON.stringify(todo));
  },
  async DELETE(_, ctx) {
    const { id } = ctx.params;
    await db.todos.delete(id);
    return new Response(null, { status: 202 });
  }
};
