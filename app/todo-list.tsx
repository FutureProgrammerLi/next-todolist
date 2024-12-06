"use client";
import { DeleteForm } from "./delete-form"
import { EditForm } from "./edit-form";
import { useState } from "react";

type TodoType = {
    id: number;
    text: string;
}

export default function TodoItem({ id, text }:{id:number, text:string}) {
    const [editingId, setEditingId] = useState<number | null>(null)
    function toggleEdit(id:number){
        setEditingId(id);
    }
    return (
        <>
            <li key={id}>
        {
            editingId === id ?
                <EditForm id={id} todo={text} cancel={()=> setEditingId(null)}/> :
                <>
                    {text}
                    <DeleteForm id={id} todo={text} />
                    <button onClick={() => toggleEdit(id)}>Edit</button>
                </>
        }
    </li>
        </>
    )

}

// export default function TodoList({ todo, text }: { todo: number, text: string }) {
//     const [editingId, setEditingId] = useState<number | null>(null);
//     function handleClick(id: number) {
//         setEditingId(id)
//     }
//     return (
//         <>
//             <ul>
//                 {todos.map((todo) => (
                    
//                 ))}
//             </ul>
//         </>
//     )
// }