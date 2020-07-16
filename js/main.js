const input = document.querySelector('.input');
const ul = document.querySelector('.ul-tasks-list');

class TODO {
  constructor(task) {
    this.task = task || null;
    this.id = new Date();
    this.checkboxState = false;
    this.createNewTask(task);
    this.renderList();
  }

  updateLS(task) {
    if (task) {
      localStorage.setItem('tasks', JSON.stringify(task));
    }
    return JSON.parse(localStorage.getItem('tasks'));
  }
  createNewTask(task) {
    const obj = {
      id: this.id,
      checkboxState: this.checkboxState,
      task: this.task,
    }
    if (task) {
      const tasksArr = this.updateLS();
      if (tasksArr) {
        tasksArr.push(obj);
        this.updateLS(tasksArr);
      } else {
        const tasksArr = [];
        tasksArr.push(obj);
        this.updateLS(tasksArr);
      }
    }
  }
  renderList() {
    ul.innerHTML = '';
    const tasksArr = this.updateLS();
    if (tasksArr) {
      tasksArr.forEach(elem => {
        ul.innerHTML += `
          <li class="li-task ${elem.checkboxState}" data-id="${elem.id}"> ${elem.task}
            <button class="delete"></button>
            <button class="edit"></button>
            <span class="checkbox-wr">
              <input type="checkbox" class="checkbox" ${elem.checkboxState}>
            </span>
          </li>`;
      });
    }
  }
}

// ADD
document.querySelector('.add').addEventListener("click", () => {
  let task = input.value;
  const newTask = new TODO(task);
  input.value = '';
});

// ENTER
document.addEventListener('keypress', (e) => {
  if (e.which == 13) {
    let task = input.value;
    const newTask = new TODO(task);
    input.value = '';
  }
});

// CLICK on Tasks- list
ul.addEventListener("click", (e) => {
  const taskID = e.target.parentElement.getAttribute('data-id');
  const tasksArr = todo.updateLS();

  // delete_Button
  if (e.target.classList.contains('delete')) {
    const result = tasksArr.filter(obj => obj.id !== taskID);
    todo.updateLS(result);
    todo.renderList();
  }
  // edit_Button
  if (e.target.classList.contains('edit')) {
    const [thisObj] = tasksArr.filter((obj => obj.id == taskID));
    const changedTask = prompt('Entry task', thisObj.task);
    if (changedTask) {
      thisObj.task = changedTask;
      todo.updateLS(tasksArr);
      todo.renderList();
    }
  }

  //checkbox
  if (e.target.classList.contains('checkbox')) {
    const taskID = e.target.parentElement.parentElement.getAttribute('data-id');
    const [thisObj] = tasksArr.filter((obj => obj.id == taskID));
    (e.target.checked) ? thisObj.checkboxState = 'checked': thisObj.checkboxState = false;
    todo.updateLS(tasksArr);
    todo.renderList();
  }
});

// Clear LS
document.querySelector('.clear').addEventListener('click', () => {
  localStorage.clear();
  todo.renderList();
});

const todo = new TODO;