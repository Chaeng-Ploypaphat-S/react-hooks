
import React, {useReducer} from 'react'
import ToDoList from './ToDoList'


const todosInitialState = {
  todos: []
}

export const TodosContext = React.createContext()

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'get':
      return {...state, todos: action.payload || []}
    case 'add':
      const addedToDos = [...state.todos, action.payload]
      return {...state, todos: addedToDos}
    case 'delete':
      const filteredTodos = state.todos.filter(
        todo => todo.id !== action.payload.id
      )
      return {
        ...state,
        todos: filteredTodos,
      }
    case 'edit':
      const updatedToDo = {...action.payload.text}
      const updatedToDoIndex = state.todos.findIndex(
        todo => todo.id === action.payload.id
      )
      console.log('updatedToDoIndex', updatedToDoIndex)
      console.log('updatedToDo', updatedToDo)
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1),
      ]
      return {
        ...state,
        todos: updatedToDos,
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState)
  return (
     <TodosContext.Provider value={{state, dispatch}}>
      <ToDoList />
    </TodosContext.Provider>
  )
}

export default App
