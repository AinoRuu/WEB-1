const todo = [];

const inputTask = document.getElementById('inputTask');
const inputPriority = document.getElementById('inputPriority');
const inputDeadline = document.getElementById('inputDeadline');
const table = document.querySelector('.list');

document.querySelector('.btn').addEventListener('click', () => {
    const task = inputTask.value;
    const priority = inputPriority.value;
    let deadline = inputDeadline.value;

    if (!deadline) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1)
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); 
        const day = String(tomorrow.getDate()).padStart(2, '0');
        deadline = `${year}-${month}-${day}`;

        alert('deadline has not been set, tomorrow will be selected')
    }

    

    if (task && priority && deadline) {


        const currentDate = new Date();
        const selectedDate = new Date(deadline);

        if (selectedDate < currentDate) {
            alert('deadline cannot be in the past');
            return; 
        }

        const todoItem = {
            number: todo.length +1,
            task,
            priority: Number(priority),
            deadline,
            completed: false
        };

        todo.push(todoItem);
        updateTable();
        clearInputs();
    } else  {
        alert('Please fill in all fields');
    }
});

function updateTable() {
    const rows = table.querySelectorAll('tr:not(:first-child)');
    rows.forEach(row => row.remove());


    todo.forEach((item, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = item.number;
        row.insertCell(1).innerText = item.task;
        row.insertCell(2).innerText = item.priority;
        row.insertCell(3).innerText = item.deadline;
        row.insertCell(4).innerText = item.completed ? 'completed' : 'not ready';


        const completeBtn = document.createElement('button');
        completeBtn.innerText = item.completed ? "\u2713" : "X";
        completeBtn.addEventListener('click', () => {
            item.completed = true;
            row.classList.add('disabled')
            updateTable();
        });
        row.insertCell(5).appendChild(completeBtn);

        if (item.completed) {
            row.classList.add('disabled');
        }
    });
}


function clearInputs() {
    inputTask.value = '';
    inputPriority.value = '';
    inputDeadline.value = '';
}

function sortTable(columnIndex) {
    const key = (item) => {
        switch (columnIndex) {
            case 0: return item.number;
            case 1: return item.task.toLowerCase();
            case 2: return item.priority;
            case 3: return new Date(item.deadline);
            case 4: return item.completed;
            default: return item;
        }
    };

    
    todo.sort((a, b) => {
    const aKey = key(a);
    const bKey = key(b);
    
    if (aKey < bKey) return -1; 
    if (aKey > bKey) return 1;  
    return 0; 
    });

    updateTable();
}

const headers = table.querySelectorAll('th')
headers.forEach((header, index) => {
    header.addEventListener('click', () => {
        sortTable(index);
    });
    });
