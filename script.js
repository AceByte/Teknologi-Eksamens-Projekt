document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");
    var loginButton = document.getElementById("loginButton");
    var registerButton = document.getElementById("registerButton");
    var previousValues = {};
    var envelopesSection = document.getElementById("envelopes");
    var envelopeInputs = [];

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

    function loadEnvelopes() {
        fetch('load_envelopes.php')
            .then(response => response.json())
            .then(data => {
                envelopeInputs = [];
                envelopesSection.innerHTML = '';
                data.forEach(envelope => {
                    var newEnvelopeDiv = document.createElement("div");
                    var newEnvelopeLabel = document.createElement("label");
                    newEnvelopeLabel.textContent = envelope.name + ":";
                    var newEnvelopeInput = document.createElement("input");
                    newEnvelopeInput.type = "number";
                    newEnvelopeInput.value = envelope.amount;
                    newEnvelopeInput.required = true;
                    newEnvelopeDiv.appendChild(newEnvelopeLabel);
                    newEnvelopeDiv.appendChild(newEnvelopeInput);
                    envelopesSection.appendChild(newEnvelopeDiv);
                    envelopeInputs.push(newEnvelopeInput);
                    newEnvelopeInput.addEventListener("input", function() {
                        if (this.value < 0) {
                            this.value = 0;
                        }
                        previousValues[this.id] = this.value;
                        updateUnassignedAmount(this.id);
                    });
                });
                updateUnassignedAmount();
            });
    }

    loadEnvelopes();

    document.getElementById("saveEnvelopesButton").addEventListener("click", function() {
        var envelopes = envelopeInputs.map(input => ({
            name: input.previousElementSibling.textContent.replace(":", ""),
            amount: input.value
        }));
        fetch('save_envelopes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ envelopes: envelopes })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        });
    });

    var changeUsernameForm = document.getElementById("changeUsernameForm");
    var changeEmailForm = document.getElementById("changeEmailForm");
    var changePhoneForm = document.getElementById("changePhoneForm");
    var changeAddressForm = document.getElementById("changeAddressForm");
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
    if (changePhoneForm) {
        changePhoneForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var newPhone = document.getElementById("newPhone").value;
            localStorage.setItem("phone", newPhone);
            alert("Phone changed successfully!");
            window.location.reload();
        });
    }
    if (changeAddressForm) {
        changeAddressForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var newAddress = document.getElementById("newAddress").value;
            localStorage.setItem("address", newAddress);
            alert("Address changed successfully!");
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

    var unassignedAmountDiv = document.createElement("div");
    var unassignedAmountLabel = document.createElement("label");
    unassignedAmountLabel.textContent = "Unassigned Amount:";
    var unassignedAmountText = document.createElement("span");
    unassignedAmountText.id = "unassignedAmount";
    unassignedAmountDiv.appendChild(unassignedAmountLabel);
    unassignedAmountDiv.appendChild(unassignedAmountText);
    envelopesSection.appendChild(unassignedAmountDiv);

    var addEnvelopeButton = document.createElement("button");
    addEnvelopeButton.textContent = "Add Envelope";
    addEnvelopeButton.className = "thing"; // Add class
    envelopesSection.appendChild(addEnvelopeButton);

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
        updateUnassignedAmount();
    });

    removeEnvelopeButton.addEventListener("click", function() {
        if (envelopeInputs.length > 0) {
            var lastEnvelopeInput = envelopeInputs.pop();
            envelopesSection.removeChild(lastEnvelopeInput.parentNode);
        }
        if (envelopeInputs.length <= 0) {
            removeEnvelopeButton.style.display = 'none';
        }
        if (envelopeInputs.length < 5) {
            addEnvelopeButton.style.display = '';
        }
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
        localStorage.setItem("unassignedAmount", unassignedAmount);
        localStorage.setItem("totalAmount", totalAmount);
        localStorage.setItem("envelopes", JSON.stringify(envelopeInputs.map(input => ({id: input.id, value: input.value || 0}))));
    }

    document.getElementById("totalAmount").innerText = localStorage.getItem("totalAmount") || 1000;
    updateUnassignedAmount();
});

document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.clear();
});
