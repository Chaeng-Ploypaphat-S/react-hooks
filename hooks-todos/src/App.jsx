
import React, {useReducer} from 'react'
import { UserContext } from './main'
import { Button } from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import ToDoList from './ToDoList'


const todosInitialState = {
  todos: [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Learn Redux', completed: false },
    { id: 3, text: 'Learn React Router', completed: false },
  ],
}

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      if (!action.payload.text) {
        return state
      }
      const newToDo = {
        id: uuidv4(), 
        text: action.payload.text, 
        completed: false
      }
      const addedToDos = [...state.todos, newToDo]
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
      const updatedToDo = {...action.payload}
      const updatedTodoIndex = state.todos.findIndex(
        todo => todo.id === action.payload.id
      )
      // slice the array to get before and after the updated todo
      // and insert the updated todo in the middle
      const updatedToDos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedToDo,
        ...state.todos.slice(updatedTodoIndex + 1),
      ]
      return {
        ...state,
        todos: updatedToDos,
      }
    default:
      return todosInitialState
  }
}

export const TodosContext = React.createContext()

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState)
  return (
     <TodosContext.Provider value={{state, dispatch}}>
      <ToDoList />
    </TodosContext.Provider>
  )
}

export default App
