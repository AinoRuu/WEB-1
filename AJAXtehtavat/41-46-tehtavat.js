const apiUrl = 'https://reqres.in/api';

document.getElementById('register').addEventListener('click', async () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (!email || !password) {
        displayMessage({ error: 'Please enter both email and password.' });
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            displayMessage({ success: data.id + " " + data.token });
        } else {
            displayMessage({ error: data.error });
        }
    } catch (error) {
        displayMessage({ error: 'Network error: ' + error.message });
    }
});

document.getElementById('login').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        displayMessage({ error: 'Please enter both email and password.' });
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (response.ok) {
            displayMessage({ success: data.token });
            fetchUsers();
        } else {
            displayMessage({ error: data.error });
        }
    } catch (error) {
        displayMessage({ error: 'Network error: ' + error.message });
    }
});



async function fetchUsers(page = 1) {
    try {
        const response = await fetch(`${apiUrl}/users?page=${page}`);
        const data = await response.json();
        displayUsers(data.data);
        setupPagination(data.total_pages);
    } catch (error) {
        displayMessage({ error: 'Failed to fetch users' });
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`${apiUrl}/users/${userId}`, {
            method: 'DELETE'
        });
        if (response.ok) {

            removeUser(userId);
        } else {
            const data = await response.json();
            displayMessage({ error: data.error });
        }
    } catch (error) {
        displayMessage({ error: 'Network error: ' + error.message });
    }
}

function removeUser(userId) {
    const userList = document.getElementById('user-list');
    const userDiv = userList.querySelector(`div[data-user-id="${userId}"]`);
    if (userDiv) {
        userList.removeChild(userDiv);
    }
}

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <h5>${user.id} ${user.first_name} ${user.last_name}</h5>
            <p>Email: ${user.email}</p>
            <img src=${user.avatar}></img> 
            <button onclick="updateUser (${user.id})" class="btn btn-warning">Update</button>
            <button onclick="deleteUser (${user.id})" class="btn btn-danger">Delete</button>
        `;
        userList.appendChild(userDiv);
    });
}

function setupPagination(totalPages) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = 'btn btn-secondary mx-1';
        pageButton.onclick = () => fetchUsers(i);
        paginationDiv.appendChild(pageButton);
    }
}

async function updateUser(userId) {
    const newName = prompt("Enter new name for user:");
    const newJob = prompt("Enter new job for user:");

    try {
        const response = await fetch(`${apiUrl}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, job: newJob })
        });

        const data = await response.json();


        if (response.ok) {
            displayMessage({ success: data.name + " " + data.job + " " + data.updatedAt });
            fetchUsers();
        } else {
            displayMessage({ error: data.error });
        }
    } catch (error) {
        displayMessage({ error: 'Error occurred while updating user.' });
    }
}



function displayMessage(data) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'block';
    if (data.error) {
        messageDiv.className = 'alert alert-danger';
        messageDiv.innerText = data.error;
    } else if (data.success) {
        messageDiv.className = 'alert alert-success';
        messageDiv.innerText = data.success;
    } else {
        messageDiv.className = 'alert alert-info';
        messageDiv.innerText = 'No message available.';
    }
}