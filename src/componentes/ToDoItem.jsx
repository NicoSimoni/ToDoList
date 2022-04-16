import React from "react";

export function ToDoItem({ todo, cambiarEstado, editarTarea}){
  
  const {task, completed, id} = todo;

  const checkboxClick = () => {
    cambiarEstado(id);  
  };

  const editTask = () => {
      editarTarea(id)
  };

  return (
    <div class="container" style={{textAlign: "center"}}> 
      <div class="row">
        <div class="col-sm">        
          <input class="form-check-input" type="checkbox" checked={completed} onChange={checkboxClick} />
        </div>
        <div class="col-sm">
          {task}    
        </div>
        <div class="col-sm">
          <button class="btn btn-outline-light" onClick={editTask}>Editar</button>
        </div>
      </div>
    </div>  
  );
}