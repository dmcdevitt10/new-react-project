import { useState, useEffect } from "react"

import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  

  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  const persistData = (newList) => {
    localStorage.setItem("todos", JSON.stringify({todos: newList}))
  }

  const handleAddTodos = (newTodo) => {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  const handleDeleteTodo = (Index) => {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== Index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  const handleEditTodo = (Index) => {
    const valueToBeEdited = todos[Index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(Index)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem("todos")
    if (!localTodos) {
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])

  return (
      <>
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
        <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
      </>
  )
}

export default App
