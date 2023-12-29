/* eslint-disable eqeqeq */
// eslint-disable-next-line no-unused-vars
import { TodoCount } from './TodoCount';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { TodoButton } from './TodoButton';
import React from 'react';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: false },
//   { text: 'Tomar el Curso de Intro a React.js', completed: true },
//   { text: 'Usar estados derivados', completed: false },
//   { text: 'Cortar berenjena', completed: false },
//   { text: 'Tomar la ruta de JavaScript a pronfundidad', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   {text: 'cortarte las uñas', completed: false},
// ]

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos))   //añadir o crear un objeto
//localStorage.removeItem('TODOS_V1', defaultTodos)                 //borrar ese objeto en especifico

function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1');  // Obtiene los datos de 'TODOS_V1' almacenados en el localStorage

  let parsedTodos;

  // Comprueba si no hay datos en el localStorage
  if (!localStorageTodos){
    localStorage.setItem('TODOS_V1', JSON.stringify([]));// Establece datos iniciales si no existen en el localStorage
    parsedTodos = []; // Inicializa como un arreglo vacío
  } else {
    parsedTodos = JSON.parse(localStorageTodos);// Si hay datos en el localStorage, los convierte de formato string a formato de arreglo usando JSON.parse()
  }

  
  const [todos, setTodos] = React.useState(parsedTodos);// Inicializa el estado 'todos' con los datos obtenidos del localStorage o un arreglo vacío si no hay datos

  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length; 
        //Para filtrar un elemento de un array (manipulacion de arrays) existen dos formas: find y filter. Find te permite filtrar un elemento, UN solo eelemento lo cual va a ser el primero de una lista, en cambio del filter; te filtrara TODOS los elemntos de una lista 
        //segundo; se hace una arrowFutsion; '(todo => todo.completed)' se llama -todo- a aquellos todos que tengan el estado -completed- como true. Pero a simple vista se ve que va a llamar es a un valor, y nosotros necesitamos un buleano, por lo tanto se escribe con doble explamacion, para que esos valores se transformen en boleano '(todo => !!todo.completed)'
        //tercero; se pone la propiedad 'lwngth' para recibir las cantidades del array que se quiere filtrar
  const totalTodos = todos.length; //contador de todos en total
        
  
  const searchedTodos = todos.filter( //estado derivado de buscar todos
    (todo) => { //arrow futsion
      //return todo.text.toLowerCase().includes(searchValue.toLowerCase()) 
          //aqui estamos preguntando si por cada 'todo'; si el texto (text) de ese todo incluye (includes) en alñguna parte ese texto que forma parte del searchValue
          //el  codigo '.toLowerCase()' convuerte toda aquellas minusculas a mayusculas y viceversa, o mejor dicho hace mas facil la busqueda de todos
          //esta es una linea de codigo larga o mejor dicho de JavaScript moderno, para ordenarnos mas nos guiamos con la de abajo ↓
      
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );

  const saveTodos = (newTodos) => {
    localStorage.setItem('TODOS_V1', JSON.stringify(newTodos));// Almacena la lista actualizada de tareas en el localStorage y actualiza la lista de tareas
    setTodos(newTodos); // Actualiza la lista de tareas
  };
  
  const completeTodo = (text) => {
    console.log('click'); // Imprime 'click' en la consola cada vez que se llama a la función
  
    const newTodos = [...todos]; // Crea una copia de la matriz todos
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    ); // Encuentra el índice en la matriz newTodos donde el texto de la tarea coincide con el argumento text proporcionado
  
    newTodos[todoIndex].completed = true; // Marca la tarea encontrada como completada
    saveTodos(newTodos); // Guarda y actualiza la lista de tareas
  };
  
  const deleteTodo = (text) => {
    console.log('click delete'); // Imprime 'click delete' en la consola
  
    const newTodos = [...todos]; // Crea una copia de la matriz todos
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    ); // Encuentra el índice en la matriz newTodos donde el texto de la tarea coincide con el argumento text proporcionado
  
    newTodos.splice(todoIndex, 1); // Elimina la tarea en el índice todoIndex de la matriz newTodos
    saveTodos(newTodos); // Guarda y actualiza la lista de tareas
  };
  
  return ( // a partir de aqui no estamos incorporando html, sino JSX
    <> {/* → este "codigo" sin declaracion alguna es igual o hace la misma funcion que React.Fragment*/}
      {/* ¿ Cómo llamo a un componente? Escribiendo su nombre con la siguiente sintáxis < Componente1 />  */}
        <TodoCount completed={completedTodos} total={totalTodos}/>
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <TodoList>
          {searchedTodos.map(todo =>(
            <TodoItem 
              key={todo.text} 
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)} //evento del onClick del archivo TodoItem
              onDelete={() => deleteTodo(todo.text)} //evento del onClick del archivo TodoItem
            />
          ))}
        </TodoList>
        
        <TodoButton/>
    </>
  );
}

export default App;
