"use client";
import { useActionState, useEffect, useState } from 'react';
import { editTodo } from './actions';
import { useFormStatus } from 'react-dom';
const initialState = {
    message: "",
};

function EditButton() {
    const { pending } = useFormStatus();
    return <button type="submit" aria-disabled={pending}>Edit</button>
}

function CancelButton({ cancel }: { cancel: () => void }) {
    return <button onClick={cancel}>Cancel</button>
}

export function EditForm({ id, todo, cancel }: { id: number; todo: string, cancel: () => void }) {
    // useActionState is available with React 19 (Next.js App Router)
    const [state, formAction, isPending] = useActionState(editTodo, initialState);
    useEffect(    // any other methods? revalidate('/')?根本看不出来是修改成功之后返回todo-item的作用
        () => {
            state?.status === 200 && cancel();
        },
        [state])
    return (
        <form action={formAction}>
            <input id="id" type="hidden" name="id" value={id} />
            <input id="todo" type="text" name="todo" defaultValue={todo} />
            {/* <button type="submit" aria-disabled={isPending}>Edit</button> */}
            <EditButton />
            <CancelButton cancel={cancel} />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    );
}

// EditButton 成功之后,要调用cancel