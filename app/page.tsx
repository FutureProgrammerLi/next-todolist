import postgres from "postgres";

import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";
import { connectToDB } from "./db";
import { getTodos } from "./actions";
import { EditForm } from "./edit-form";
import TodoItem from "./todo-list";

// let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
//   ssl: "allow",
// });
connectToDB();

export default async function Home() {
  const todos = await getTodos();
  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} id={todo.id} text={todo.text} />
        ))}
      </ul>
    </main>
  );
}
