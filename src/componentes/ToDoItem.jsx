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
    <div class="container">
      <div class="row">
        <div class="col-sm">        
          <input class="form-check-input" type="checkbox" style={{position: 'absolute', left: '50px'}} checked={completed} onChange={checkboxClick} />
        </div>
        <div class="col-sm" style={{position: 'absolute', left: '100px'}}>
          {task}    
        </div>
        <div class="col-sm" style={{position: 'relative', right: '50px'}}>
          <button class="btn btn-outline-light" onClick={editTask}>Editar</button>
        </div>
      </div>
    </div>  
  );
}