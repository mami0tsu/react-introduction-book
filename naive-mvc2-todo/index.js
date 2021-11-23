class TodoListModel {
  constructor() {
    this.idCounter = 0;
    this.todos = new Map();
  }

  /**
   * Add task as todo to todo list
   * @param {string} task
   * @returns new todo's id
   */
  addTodo(task) {
    this.idCounter += 1;
    this.todos.set(this.idCounter, {
      id: this.idCounter,
      task,
      checked: false,
    });

    return this.idCounter;
  }
  
  /**
   * Get todo
   * @param {number} id todo's id
   * @return todo
   */
  getTodo(id) {
    return this.todos.get(id);
  }

  /**
   * Remove todo
   * @param {number} id todo's id
   */
  removeTodo(id) { 
    this.todos.delete(id); 
  }

  /**
   * Change todo status
   * @param {number} id todo's id
   * @param {boolean} isCheck desired state
   * @return changed todo
   */
  checkTodo(id, isCheck) {
    const todo = this.todos.get(id);
    todo.checked = isCheck;
    return todo;
  }
}

class View {
  /**
   * Add todo to UI
   * @param {id: number, task: string, isCheck: boolean} todo
   */
  addTodo(todo) {
    const todoElements = document.getElementById("todo-elements");
    const todoElement = this._createTodoElement(todo);
    todoElements.appendChild(todoElement);
  }

  /**
   * Check todo
   * @param {number} id todo's id
   */
  check(id) {
    const todoElement = document.getElementById(`todo-${id}`);
    todoElement.className = `checked`;
  }

  /**
   * Uncheck todo
   * @param {number} id todo's id
   */
  uncheck(id) {
    const todoElement = document.getElementById(`todo-${id}`);
    todoElement.className = "";
  }

  /**
   * Reset input form
   */
  resetTodo() {
    const input = document.getElementById("task-input");
    input.value = "";
  }

  /**
   * Remove todo
   * @param {number} id todo's id
   */
  removeTodo(id) {
    const todoElement = document.getElementById(`todo-${id}`);
    todoElement.remove();
  }

  /**
   * Create todo element
   * @param {id: number, task: string} todo
   * @return HTML element about todo
   */
  _createTodoElement(todo) {
    const {id, task} = todo;

    const todoElement = document.createElement("li");
    todoElement.id = `todo-${id}`;

    const checkBoxElement = document.createElement("input");
    checkBoxElement.type = "checkbox";
    checkBoxElement.id `checkbox-${id}`;
    todoElement.appendChild(checkBoxElement);

    const labelElement = document.createElement("label");
    labelElement.innerText = task;
    todoElement.appendChild(labelElement);

    const buttonElement = document.createElement("button");
    buttonElement.innerText = "Delete";
    buttonElement.id = `button-${id}`;
    todoElement.appendChild(buttonElement);

    return todoElement;
  }
}
