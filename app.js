
window.addEventListener('load', () => {
    const form = document.getElementById('new-task-form');
    const input = document.getElementById('new-task-input');
    const tasks = document.querySelector('.tasks');
    const month = document.getElementById('month');
    const today = new Date();
    console.log('date',today);
    

    month.innerText = `${today.toLocaleString('en', {month: 'long'})} ${today.getFullYear()}`;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskName = input.value;

        if(!taskName) {
            alert("Please fill out the task");
            return 0;
        }

        const newTask = document.createElement("div");
        newTask.classList.add("task");

        const newTaskContent = document.createElement("div");
        newTaskContent.classList.add("content");
        

        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.classList.add("text");
        newInput.setAttribute("readonly", "readonly")
        newInput.value = taskName;

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const edit = document.createElement("button");
        edit.innerText = "Edit";
        edit.classList.add("edit");

        const del = document.createElement("button");
        del.innerText = "Delete"
        del.classList.add("delete");

        newTask.append(newTaskContent);
        newTaskContent.append(newInput);
        newTask.append(actions);
        actions.append(edit);
        actions.append(del);
        tasks.append(newTask);

        edit.addEventListener('click', () => {
            if(edit.innerText.toLowerCase() == "edit")
            {
                newInput.removeAttribute("readonly", "readonly");
                newInput.focus();
                edit.innerText = "save";
            }

            else {
                newInput.setAttribute("readonly", "readonly");
                edit.innerText = "edit"
            }
        })

        del.addEventListener('click', () => {
            newTask.remove();
        })
    })
})