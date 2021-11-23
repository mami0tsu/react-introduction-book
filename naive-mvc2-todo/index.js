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
