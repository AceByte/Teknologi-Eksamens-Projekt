document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");
    var loginButton = document.getElementById("loginButton");
    var registerButton = document.getElementById("registerButton");

    var previousValues = {};

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

    var changeTotalAmountForm = document.getElementById("changeTotalAmountForm");

    if (changeTotalAmountForm) {
        changeTotalAmountForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var newTotalAmount = document.getElementById("newTotalAmount").value;
            if (isNaN(newTotalAmount) || newTotalAmount <= 0) {
                alert("Please enter a valid total amount.");
                return;
            }
            localStorage.setItem("totalAmount", newTotalAmount);
            document.getElementById("totalAmount").innerText = newTotalAmount;
            updateUnassignedAmount();
            alert("Total amount changed successfully!");
        });
    }

    var envelopesSection = document.getElementById("envelopes");
    if (envelopesSection) {
        var totalAmount = parseInt(localStorage.getItem("totalAmount")) || 1000;
        var envelopeInputs = [];

        // Create a separate element for unassigned amount
        var unassignedAmountDiv = document.createElement("div");
        var unassignedAmountLabel = document.createElement("label");
        unassignedAmountLabel.textContent = "Unassigned Amount:";
        var unassignedAmountText = document.createElement("span");
        unassignedAmountText.id = "unassignedAmount";
        unassignedAmountDiv.appendChild(unassignedAmountLabel);
        unassignedAmountDiv.appendChild(unassignedAmountText);
        envelopesSection.appendChild(unassignedAmountDiv);

        // Add new envelope
        var addEnvelopeButton = document.createElement("button");
        addEnvelopeButton.textContent = "Add Envelope";
        addEnvelopeButton.className = "thing"; // Add class
        envelopesSection.appendChild(addEnvelopeButton);

        // Remove envelope
        var removeEnvelopeButton = document.createElement("button");
        removeEnvelopeButton.textContent = "Remove Envelope";
        removeEnvelopeButton.className = "thing"; // Add class
        envelopesSection.appendChild(removeEnvelopeButton);

        addEnvelopeButton.addEventListener("click", function() {
            var newEnvelopeNumber = envelopeInputs.length + 1;
            var newEnvelopeDiv = document.createElement("div");
            var newEnvelopeLabel = document.createElement("label");
            newEnvelopeLabel.textContent = "Envelope " + newEnvelopeNumber + ":";
            var newEnvelopeInput = document.createElement("input");
            newEnvelopeInput.type = "number";
            newEnvelopeInput.id = "envelope" + newEnvelopeNumber;
            newEnvelopeInput.required = true;
            newEnvelopeDiv.appendChild(newEnvelopeLabel);
            newEnvelopeDiv.appendChild(newEnvelopeInput);
            envelopesSection.insertBefore(newEnvelopeDiv, addEnvelopeButton);
            envelopeInputs.push(newEnvelopeInput);

            newEnvelopeInput.addEventListener("input", function() {
                if (this.value < 0) {
                    this.value = 0;
                }
                previousValues[this.id] = this.value;
                updateUnassignedAmount(this.id);
            });

            if (envelopeInputs.length >= 5) {
                addEnvelopeButton.style.display = 'none';
            }
            if (envelopeInputs.length >= 0) {
                removeEnvelopeButton.style.display = '';
            }

            // Save envelopes after creating a new one
            updateUnassignedAmount();
        });

        removeEnvelopeButton.addEventListener("click", function() {
            if (envelopeInputs.length > 0) { // Ensure there is always at least 1 envelope
                var lastEnvelopeInput = envelopeInputs.pop();
                envelopesSection.removeChild(lastEnvelopeInput.parentNode);
            }

            if (envelopeInputs.length <= 0) {
                removeEnvelopeButton.style.display = 'none';
            }
            if (envelopeInputs.length < 5) {
                addEnvelopeButton.style.display = '';
            }

            // Save envelopes after removing one
            updateUnassignedAmount();
        });

        function updateUnassignedAmount(lastModifiedId) {
            var totalAssignedAmount = 0;
            for (var i = 0; i < envelopeInputs.length; i++) {
                totalAssignedAmount += parseInt(envelopeInputs[i].value) || 0;
            }
            if (totalAssignedAmount > totalAmount) {
                alert("The total amount in the envelopes cannot exceed the total amount.");
                document.getElementById(lastModifiedId).value = previousValues[lastModifiedId];
                return;
            }
            var unassignedAmount = totalAmount - totalAssignedAmount;
            document.getElementById("unassignedAmount").innerText = unassignedAmount >= 0 ? unassignedAmount : 0;

            // Store the unassigned amount, total amount, and envelopes in localStorage
            localStorage.setItem("unassignedAmount", unassignedAmount);
            localStorage.setItem("totalAmount", totalAmount);
            localStorage.setItem("envelopes", JSON.stringify(envelopeInputs.map(input => ({id: input.id, value: input.value || 0}))));
        }

        document.getElementById("totalAmount").innerText = totalAmount;
        updateUnassignedAmount();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var unassignedAmount = localStorage.getItem("unassignedAmount");
    var totalAmount = localStorage.getItem("totalAmount");
    var envelopes = JSON.parse(localStorage.getItem("envelopes"));

    // Display the unassigned amount and total amount
    document.getElementById("unassignedAmount").innerText = unassignedAmount;
    document.getElementById("totalAmount").innerText = totalAmount;

    // Display the envelopes
    envelopes.forEach(function(envelope) {
        var envelopeElement = document.getElementById(envelope.id);
        if (envelopeElement) {
            envelopeElement.value = envelope.value;
        }
    });
});

document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.clear();
});