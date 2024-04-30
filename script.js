document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");
    var loginButton = document.getElementById("loginButton");
    var registerButton = document.getElementById("registerButton");

    if (loginForm) {
        loginButton.addEventListener("click", function() {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            window.location.href = "index.html";
        });
    }

    if (registerForm) {
        registerButton.addEventListener("click", function() {
            var email = document.getElementById("email").value;
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            localStorage.setItem("email", email);
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            alert("Registration successful!");
            window.location.href = "login.html";
        });
    }

    var usernameSpan = document.getElementById("username");
    var emailSpan = document.getElementById("email");
    var passwordSpan = document.getElementById("password");
    if (usernameSpan && emailSpan && passwordSpan) {
        var username = localStorage.getItem("username");
        var email = localStorage.getItem("email");
        var password = localStorage.getItem("password");
        usernameSpan.innerText = username;
        emailSpan.innerText = email;
        passwordSpan.innerText = password;
    }

    var changeUsernameForm = document.getElementById("changeUsernameForm");
    var changePasswordForm = document.getElementById("changePasswordForm");

    if (changeUsernameForm) {
        changeUsernameForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var newUsername = document.getElementById("newUsername").value;
            localStorage.setItem("username", newUsername);
            alert("Username changed successfully!");
            window.location.reload();
        });
    }

    if (changeEmailForm) {
        changeEmailForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var newEmail = document.getElementById("newEmail").value;
            localStorage.setItem("email", newEmail);
            alert("Email changed successfully!");
            window.location.reload();
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var newPassword = document.getElementById("newPassword").value;
            localStorage.setItem("password", newPassword);
            alert("Password changed successfully!");
            window.location.reload();
        });
    }
});
 
