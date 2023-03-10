const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const ul = document.querySelector('ul');
const toggleButton = document.getElementById('toggle-mode');
const body = document.body;


let tasks = [];

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

function addTask(task) {
    tasks.push(task);
    renderTasks();
  
    const li = ul.lastChild;
    li.style.opacity = 0;
    li.style.transform = 'translateX(-20px)';
    li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      li.style.opacity = 1;
      li.style.transform = 'none';
    }, 150);
  }
  

function editTask(index, newTask) {
  tasks[index] = newTask;
  renderTasks();
}

function deleteTask(index) {
    const li = ul.children[index];
    li.style.opacity = '0';
    setTimeout(() => {
      tasks.splice(index, 1);
      renderTasks();
    }, 500); 
  }

function renderTasks() {
  ul.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;
    li.appendChild(span);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newTask = prompt('Enter a new task:', task);
      if (newTask) {
        editTask(index, newTask);
      }
    });
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });
    li.appendChild(deleteButton);

    ul.appendChild(li);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const task = input.value;
  if (task) {
    addTask(task);
    input.value = '';
  }
});


