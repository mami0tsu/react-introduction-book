class TodoListModel {
  constructor() {
    this.idCounter = 0;
    this.todos = new Map();
  }

  /**
   * Get all todos
   * @return todos
   */
  getTodos() {
    return Array.from(this.todos.values());
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
    const stateChangedTodo = {...todo, checked: isCheck };
    this.todos.set(id, stateChangedTodo);
    return this.getTodo(id);
  }
}

const todoList = new TodoListModel();

class View {
  /**
   * Create UI from todos array
   * @param {todo[]} todos
   */
  render(todos) {
    const todoElements = document.getElementById("todo-elements");
    todoElements.innerHTML = "";

    const fragment = document.createDocumentFragment();

    todoElements.forEach((todo) => {
      const todoElement = this._createTodoElement(todo);
      fragment.appendChild(todoElement);
    });

    todoElements.appendChild(fragment);
  }

  /**
   * Create todo element
   * @param {id: number, task: string} todo
   * @return HTML element about todo
   */
  _createTodoElement(todo) {
    const {id, task, checked} = todo;

    const todoElement = document.createElement("li");
    todoElement.id = `todo-${id}`;

    const checkBoxElement = document.createElement("input");
    checkBoxElement.type = "checkbox";
    checkBoxElement.id `checkbox-${id}`;
    checkBoxElement.checked = checked;
    todoElement.appendChild(checkBoxElement);

    const labelElement = document.createElement("label");
    labelElement.innerText = task;
    todoElement.appendChild(labelElement);

    const buttonElement = document.createElement("button");
    buttonElement.innerText = "Delete";
    buttonElement.id = `button-${id}`;
    todoElement.appendChild(buttonElement);

    if (checked) {
      todoElement.className = `checked`;
    } else {
      todoElement.className = "";
    }

    return todoElement;
  }
}

const view = new View();

class Controller {
  setup() {
    this.handleSubmitForm();
  }

  flash() {
    const todos = todoList.getTodos();
    view.render(todos);

    todos.forEach((todo) => {
      const id = todo.id;
      this.handleCheckTask(id);
      this.handleDeleteTask(id);
    });
  }

  handleSubmitForm() {
    const formElement = document.getElementById("task-send-form");

    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const input = document.getElementById("task-input");
      const task = input.value;

      if (!task.length > 0) {
        alert("Input text.")
        return;
      }

      const addedTodoId = todoList.addTodo(task);
      this.flash();
    });
  }

  handleCheckTask(id) {
    const checkBoxElement = document.getElementById(`checkbox-${id}`);
    checkBoxElement.addEventListener("change",  (e) => {
      const checked = e.target.checked;
      todoList.checkTodo(id, checked);
      this.flash();
    });
  }

  handleDeleteTask(id) {
    const buttonElement = document.getElementById(`button-${id}`);
    buttonElement.addEventListener("click", () => {
      todoList.removeTodo(id);
      this.flash();
    });
  }
}

const formController = new Controller();
formController.setup();
