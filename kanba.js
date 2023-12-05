document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');

    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTask = createTaskElement(taskText);
            addToDoTask(newTask);
            taskInput.value = '';
        }
    });

    function createTaskElement(text) {
        const task = document.createElement('li');
        task.textContent = text;
        task.draggable = true;
        task.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text', e.target.textContent);
        });

        return task;
    }

    function addToDoTask(taskElement) {
        const toDoList = document.getElementById('todo-list');
        toDoList.appendChild(taskElement);
    }

    const columns = document.querySelectorAll('.kanban-list');

    columns.forEach(column => {
        column.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        column.addEventListener('drop', function (e) {
            e.preventDefault();
            const taskText = e.dataTransfer.getData('text');
            const newTask = createTaskElement(taskText);
            e.target.appendChild(newTask);
        });
    });
});
