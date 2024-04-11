function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        body: new URLSearchParams({
            'username': username,
            'password': password
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        // Handle response (e.g., display message to user)
    })
    .catch(error => {
        console.error('Registration failed:', error);
        // Handle registration failure
    });
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        body: new URLSearchParams({
            'username': username,
            'password': password
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        // Handle response (e.g., redirect to profile page)
    })
    .catch(error => {
        console.error('Login failed:', error);
        // Handle login failure
    });
}