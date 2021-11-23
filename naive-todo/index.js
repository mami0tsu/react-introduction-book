function handleFormSubmit() {
  const inputElement = document.getElementById("task-input");
  const inputValue = inputElement.value;

  if (!inputValue.length > 0) {
    alert("テキストを入力してください。");
    return;
  }

  const todoElements = document.getElementById("todo-elements");
  const todoElement = createTodoElement(inputValue);

  todoElements.appendChild(todoElement);
  inputElement.value = "";
}

/**
 * Create todo element
 * @param {*} inputValue todoString
 * @return todoElement
 */
function createTodoElement(task) {
  const todoElement = document.createElement("li");

  const checkBoxElement = document.createElement("input");
  checkBoxElement.type = "checkbox";
  checkBoxElement.onchange = function (e) {
    const checked = e.target.checked;
    if (checked) {
      todoElement.className = `checked`;
    } else {
      todoElement.className = "";
    }
  };

  const labelElement = document.createElement("label");
  labelElement.innerText = task;

  const buttonElement = document.createElement("button");
  buttonElement.innerText = "Delete";
  buttonElement.onclick = function () {
    todoElement.remove();
  }

  todoElement.appendChild(checkBoxElement);
  todoElement.appendChild(labelElement);
  todoElement.appendChild(buttonElement);

  return todoElement;
}
