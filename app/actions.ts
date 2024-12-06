"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";
import Todo from "./models/todos";



// let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
//   ssl: "allow",
// });

export const getTodos = async () => {
  const todos = await Todo.find({
  });
  return todos;
}

export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;
  try {
    // await sql`
    //   INSERT INTO todos (text)
    //   VALUES (${data.todo})
    // `;
    const newTodo = new Todo({
      text: `${data.todo}`
    });
    await newTodo.save();
    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });


  try {
    // await sql`
    //   DELETE FROM todos
    //   WHERE id = ${data.id};
    // `;
    await Todo.findByIdAndDelete(data.id);
    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}

export async function editTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to edit todo" };
  }

  const data = parse.data;

  try {
    // await sql`
    //   DELETE FROM todos
    //   WHERE id = ${data.id};
    // `;
    const todo = await Todo.findByIdAndUpdate(data.id, {
      text: data.todo
    }, { new: true });
    if (!todo) {
      return { message: 'Todo not found' }
    }
    revalidatePath("/");
    return { message: `Update todo ${data.todo} successfully!`, status: 200 };
  } catch (e) {
    return { message: "Failed to update todo" };
  }
}

