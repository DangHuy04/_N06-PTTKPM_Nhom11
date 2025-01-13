// Function to toggle between login and register forms
function toggleForms(form) {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    if (form === 'register') {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    } else {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    }
}