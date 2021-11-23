import { useState } from "react";

function App() {
  const [idCounter, setIdCounter] = useState(0);
  const [todos, setTodo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputText = e.target["task"].value;
    const nextId = idCounter + 1;
    setIdCounter(nextId);
    setTodo([...todos, {id: nextId, task: inputText, checked: false}]);
  };

  const handleClickDeleteButton = (id) => {
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  const handleChangeCheckBox = (id) => {
    const changedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodo(changedTodos);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="task" />
        <button>Submit</button>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className={todo.checked ? "checked" : ""}>
            <input
              type="checkbox"
              onChange={() => handleChangeCheckBox(todo.id)}
            />
            {todo.task}
            <button onClick={() => handleClickDeleteButton(todo.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
