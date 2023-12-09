const savedTasks = localStorage.getItem('tasks');
const tasks = savedTasks ? JSON.parse(savedTasks) : [];

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('task-item');

        const textSpan = document.createElement('span');
        textSpan.classList.add('task-item-text');
        textSpan.innerText = task.text;

        const removeButton = document.createElement('span');
        removeButton.classList.add('task-item-remove');
        removeButton.innerText = 'Supprimer';
        removeButton.addEventListener('click', () => {
            removeTask(index);
        });

        listItem.appendChild(textSpan);
        listItem.appendChild(removeButton);

        taskList.appendChild(listItem);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push({
            text: taskText,
            completed: false
        });

        taskInput.value = '';
        saveTasks();
        displayTasks();
    }
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

displayTasks();

document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
