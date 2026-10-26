// --- 1. LOGIN / CREATE ACCOUNT FORM (index.html) ---
let emailInput = document.getElementById("email");
if (emailInput) {
    let loginForm = document.querySelector("form");
    
    loginForm.onsubmit = function(event) {
        event.preventDefault(); // Stop page from reloading
        
        // Check which button was clicked
        if (event.submitter.textContent === "Create Account") {
            alert("Welcome to Tilli, " + emailInput.value + "!"); 
        } else {
            alert("Welcome back, " + emailInput.value + "!"); 
            window.location.href = "tilli.html"; // Navigate to Tills page after login
        }
    };
}


// --- 2. CREATE TILL FORM (tilli.html) ---
let tillNameInput = document.getElementById("till-name");
if (tillNameInput) {
    let createTillForm = document.querySelector("form");
    let activeTillsList = document.querySelector("#tills ul"); 
    let personalVisibility = document.getElementById("visibility-personal");
    let teamVisibility = document.getElementById("visibility-team");

    createTillForm.onsubmit = function(event) {
        event.preventDefault(); // Stop page from reloading
        
        // Change the message based on the selected radio button
        if (teamVisibility.checked === true) {
            alert("Successfully created a restricted Team Till: " + tillNameInput.value);
        } else if (personalVisibility.checked === true) {
            alert("Successfully created an open Personal Till: " + tillNameInput.value);
        } else {
            alert("Successfully created new Till: " + tillNameInput.value);
        }
        
        // Add the new Till to the list on the screen
        let newTillHTML = "<li><a href='#'>" + tillNameInput.value + "</a> (Role: <em>Host</em>)</li>";
        activeTillsList.innerHTML = activeTillsList.innerHTML + newTillHTML;

        // Clear the text box
        tillNameInput.value = ""; 
    };
}


// --- 3. PENDING INVITATIONS (tilli.html) ---
// Only run if pending list exists on the page
let pendingList = document.querySelectorAll("#tills ul")[1]; 
if (pendingList) {
    let pendingItem = pendingList.querySelector("li"); 
    let acceptBtn = pendingItem.querySelectorAll("button")[0]; 
    let declineBtn = pendingItem.querySelectorAll("button")[1]; 
    let activeTillsList = document.querySelector("#tills ul"); 

    // When Accept is clicked
    acceptBtn.onclick = function() {
        alert("Invitation accepted! Welcome to Family Vacation.");
        
        // Move it to the Active Tills list
        let acceptedTillHTML = "<li><a href='#'>Family Vacation</a> (Role: <em>Member</em>)</li>";
        activeTillsList.innerHTML = activeTillsList.innerHTML + acceptedTillHTML;
        
        // Remove it from the Pending list
        pendingItem.remove();
    };

    // When Decline is clicked
    declineBtn.onclick = function() {
        alert("Invitation declined.");
        pendingItem.remove(); 
    };
}


// --- 4. BALANCE TRACKER & CATEGORY TOGGLE (cash-in-cash-out.html) ---
let amountInput = document.getElementById("amount");
if (amountInput) {
    let currentBalance = 0;
    let categoryInput = document.getElementById("category");
    let particularsInput = document.getElementById("particulars");
    let cashSectionHeader = document.querySelector("#cashin-cashout h2");
    let cashForm = document.querySelector("#cashin-cashout form");

    cashForm.onsubmit = function(event) {
        event.preventDefault(); // Stop page from reloading

        let transactionAmount = Number(amountInput.value);
        let selectedType = document.querySelector('input[name="type"]:checked');

        if (transactionAmount > 0 && selectedType) {
            let transaction = {
                date: document.getElementById("date").value,
                type: selectedType.value,
                category: categoryInput.value,
                particulars: particularsInput.value,
                amount: transactionAmount
            };

            // Include the extra text when the user chooses "Other"
            if (categoryInput.value === "miscellaneous") {
                transaction.other = otherInput.value;
            }

            fetch("http://localhost:3001/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(transaction)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("The server could not save the transaction.");
                }
                return response.json();
            })
            .then(function(data) {
                if (data.message !== "Transaction saved successfully.") {
                    throw new Error("The server did not confirm the transaction.");
                }

                // Update the balance after the server saves the transaction
                if (selectedType.value === "cash-in") {
                    currentBalance = currentBalance + transactionAmount;
                } else {
                    currentBalance = currentBalance - transactionAmount;
                }

                cashSectionHeader.textContent = "Cash In / Cash Out | Balance: ₱ " + currentBalance;
                alert("Transaction saved successfully!");

                // Clear the inputs
                amountInput.value = "";
                particularsInput.value = "";
            })
            .catch(function(error) {
                console.error("Error saving transaction:", error);
                alert("Could not save the transaction. Please try again.");
            });
        } else {
            alert("Please enter a valid amount!");
        }
    };

    // --- 5. HIDE / SHOW "OTHER" CATEGORY ---
    let otherInput = document.getElementById("miscellaneous");
    let otherLabel = document.querySelector('label[for="miscellaneous"]');

    // Hide the "Other" text box at the start
    otherInput.style.display = "none";
    otherLabel.style.display = "none";

    // Wait for the user to change the dropdown
    categoryInput.onchange = function() {
        if (categoryInput.value === "miscellaneous") {
            // Show the text box if "Other" is selected
            otherInput.style.display = "block";
            otherLabel.style.display = "block";
        } else {
            // Hide it again if they choose something else
            otherInput.style.display = "none";
            otherLabel.style.display = "none";
        }
    };
}


// --- 6. EDIT BUTTON ALERT (till-history.html) ---
let editBtn = document.querySelector("#till-history > button");
if (editBtn) {
    editBtn.onclick = function() {
        alert("Please select a row from the Till History to edit.");
    };
}