window.addEventListener('load', () => {
    const form = document.getElementById('new-task-form');
    const input = document.getElementById('new-task-input');
    const tasksContainer = document.querySelector('.tasks');
    const month = document.getElementById('month');
    const today = new Date();

    month.innerText = `${today.toLocaleString('en', { month: 'long' })} ${today.getFullYear()}`;

    const loadTasks = () => {
        tasksContainer.innerHTML = '';
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach((task) => createTaskElement(task));
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const createTaskElement = (taskName) => {
        const newTask = document.createElement('div');
        newTask.classList.add('task');

        const newTaskContent = document.createElement('div');
        newTaskContent.classList.add('content');

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.classList.add('text');
        newInput.setAttribute('readonly', 'readonly');
        newInput.value = taskName;

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const edit = document.createElement('button');
        edit.innerText = 'Edit';
        edit.classList.add('edit');

        const del = document.createElement('button');
        del.innerText = 'Delete';
        del.classList.add('delete');

        newTask.append(newTaskContent);
        newTaskContent.append(newInput);
        newTask.append(actions);
        actions.append(edit);
        actions.append(del);
        tasksContainer.append(newTask);

        edit.addEventListener('click', () => {
            if (edit.innerText.toLowerCase() === 'edit') {
                newInput.removeAttribute('readonly');
                newInput.focus();
                edit.innerText = 'Save';
            } else {
                newInput.setAttribute('readonly', 'readonly');
                edit.innerText = 'Edit';
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const index = tasks.indexOf(taskName);
                if (index !== -1) tasks[index] = newInput.value;
                saveTasks(tasks);
            }
        });

        del.addEventListener('click', () => {
            newTask.remove();
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.filter((task) => task !== taskName);
            saveTasks(updatedTasks);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = input.value.trim();

        if (!taskName) {
            alert('Please fill out the task');
            return;
        }

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskName);
        saveTasks(tasks);
        createTaskElement(taskName);
        input.value = '';
    });

    loadTasks();
});
