import React from "react";
import { ToDoItem } from "./ToDoItem";

export function ToDoList({ todos, cambiarEstado, editarTarea }) {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} cambiarEstado={cambiarEstado} editarTarea={editarTarea} />
      ))}
    </ul>
  );
}