import React, { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [...state.todos, { id: uuidv4(), todo: action.payload }],
        todoCount: state.todoCount + 1,
      };
    case "DEL_TODO":
      return {
        todos: state.todos.filter((t) => t.id !== action.id),
        todoCount: state.todoCount - 1,
      };
    default:
      throw new Error();
  }
}

function App() {
  const initialState = { todos: [], todoCount: 0 };
  const [formInput, setFormInput] = useState("");
  const [{ todos, todoCount }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "ADD_TODO", payload: formInput });
          setFormInput("");
        }}
      >
        <input
          type="text"
          value={formInput}
          autoComplete="off"
          onChange={(e) => {
            setFormInput(e.target.value);
          }}
        />
      </form>
      <>
        <p>Total Notes: {todoCount}</p>
        <ul>
          {todos.map((t) => (
            <li
              key={t.id}
              onClick={() => {
                dispatch({ type: "DEL_TODO", id: t.id });
              }}
            >
              {t.todo}
            </li>
          ))}
        </ul>
      </>
    </div>
  );
}

export default App;
