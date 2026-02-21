document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input")
    const addTaskButton = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")

    let task_arr = JSON.parse(localStorage.getItem("tasks_key")) || [];

    task_arr.forEach(task => renderTask(task));

    addTaskButton.addEventListener("click", function(){
        const taskText = todoInput.value.trim()
        if(taskText === "")  return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        }
        task_arr.push(newTask)
        saveTasks();
        renderTask(newTask)
        todoInput.value = "";        // Clear Input
        // console.log(tasks);
    })

    function saveTasks(){          // Adds tasks to Local Storage
        localStorage.setItem("tasks_key", JSON.stringify(task_arr));
    }

    // Local Storage => Browser feature that allows website to store data directly in a users browser(key-value pairs)
    // It does not update, it rewrites the whole thing
    // As soon as the page loads, read from the local storage, grab all the tasks, store the tasks in the array. Inside a loop, read all the tasks from the array and call the function to render it.

    function renderTask(task){
        // console.log(task.text);
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        li.innerHTML = 
        `<span>${task.text}</span>
        <button>Delete</button>`;
        todoList.appendChild(li);

        if(task.completed)  li.classList.add("completed")
        li.addEventListener("click", (event) => {
            if(event.target.tagName === "BUTTON")  return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks()
        })

        li.querySelector("button").addEventListener("click", (event) => {
            event.stopPropagation()           // prevent toggle from firing the parent
            task_arr = task_arr.filter((t => t.id !== task.id));
            li.remove();
            saveTasks();
        })

    }
})


