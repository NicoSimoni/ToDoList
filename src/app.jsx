import React, { Fragment, useEffect,useState, useRef } from "react";
import { ToDoList } from "./componentes/ToDoList";
//Libreria para ids aleatorios
import { v4 as uuidv4 } from "uuid"; 
//Libreria para alertas
import Swal from 'sweetalert2';
//Libreria para base de datos Firebase
import { collection, getDocs, setDoc, deleteDoc, updateDoc, doc} from "firebase/firestore";
import db from './firebase/firebaseConfig';

export function App() {
    
    const todoTaskRef = useRef();

    //Crear lista de tareas
    const [todos, setTodos] = useState([]);

    //Cargar DB de Firebase
    useEffect(() => {
        
        const obtenerDatos = async() => {
            const datos = await getDocs(collection(db, 'Tareas'));
            const newTodos = [];
            datos.forEach((dato) => {
                newTodos.push({...dato.data(), id: dato.id})
            });
            setTodos(newTodos);
        }
        
        obtenerDatos();
    }, []);   

    //Cambiar el estado de una tarea
    const cambiarEstado = async (id) => {
 
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
 
        setTodos(newTodos);

        //Actualizar db
        const todoRef = doc(db, "Tareas", todo.id);
        await updateDoc(todoRef, {
            completed: todo.completed
        });
    };

    //Editar una tarea existente
    const editarTarea = async (id) => {
        
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);

        //alerta con Sweetalert2
        await Swal.fire({
            title: 'Editar Tarea',
            html:
              '<input id="swal-input1" class="swal2-input" value="'+todo.task+'">',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
              return [
                todo.task = document.getElementById('swal-input1').value,
              ]
            }
        });
        
        if (todo.task === "") return;
        
        setTodos(newTodos);

        //Actualizar db
        const todoRef = doc(db, "Tareas", todo.id);
        await updateDoc(todoRef, {
            task: todo.task
        });     
    };
        
    //Agregar nueva tarea a la lista de tareas
    const añadirTarea = async () => {

        const task = todoTaskRef.current.value;
        if (task === "") return;

        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), task, completed: false }];
        });

        //Agregar a db
        await setDoc(doc(db, "Tareas", uuidv4()), {
            completed: false,
            task: task
        });      
        
        todoTaskRef.current.value = null;
    };

    //Eliminar tareas completedas
    const eliminarTareasCompletadas =  (e) => {

        const newTodos = todos.filter((todo) => !todo.completed);

        //Eliminar de db
        todos.forEach (async todo => {
            if(todo.completed){
                await deleteDoc(doc(db, "Tareas", todo.id));
            }
        });

        setTodos(newTodos);
    };

    return (
        <Fragment>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <h3>Lista de Tareas</h3>
                </div>
            </nav>

            <br/> <ToDoList todos={todos} cambiarEstado={cambiarEstado} editarTarea={editarTarea}/>
            
            <div class="justify-content-center">
                <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
                <button class="btn btn-outline-success" onClick={añadirTarea}>Añadir</button>
                <button class="btn btn-outline-danger"  onClick={eliminarTareasCompletadas}>Eliminar completadas</button>
            </div>
            
            <br/>Quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar
        </Fragment>
    );
}