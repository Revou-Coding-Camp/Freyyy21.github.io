const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const filterBtn = document.getElementById('filterBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const taskTable = document.getElementById('taskTable');

let tasks = [];

function renderTasks(filter = "") {
    taskTable.innerHTML = "";

    let filteredTasks = tasks.filter(t => t.task.toLowerCase().includes(filter.toLowerCase()));

    if (filteredTasks.length === 0) {
        taskTable.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
        return;
    }

    filteredTasks.forEach((t, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${t.task}</td>
            <td>${t.date}</td>
            <td>
                <button class="status-btn ${t.done ? 'done' : 'not-done'}">
                    ${t.done ? 'Done' : 'Not Done'}
                </button>
            </td>
            <td>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        // Toggle status
        row.querySelector('.status-btn').addEventListener('click', () => {
            tasks[index].done = !tasks[index].done;
            renderTasks(filter);
        });

        // Delete task
        row.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks(filter);
        });

        taskTable.appendChild(row);
    });
}

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText && taskDate) {
        tasks.push({ task: taskText, date: taskDate, done: false });
        taskInput.value = "";
        dateInput.value = "";
        renderTasks();
    }
});

filterBtn.addEventListener('click', () => {
    const keyword = prompt("Masukkan kata kunci filter:");
    renderTasks(keyword || "");
});

deleteAllBtn.addEventListener('click', () => {
    if (confirm("Yakin ingin menghapus semua task?")) {
        tasks = [];
        renderTasks();
    }
});

renderTasks();
