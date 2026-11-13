
let subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];

function getStatus(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const renewal = new Date(date + "T00:00:00");

    if (renewal < today) {
        return "Expired";
    } else {
        return "Active";
    }
}

function saveSubscriptions() {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
}

function updateSummary() {
    const totalCount = document.getElementById("totalCount");
    const expiredCount = document.getElementById("expiredCount");

    if (totalCount && expiredCount) {
        totalCount.textContent = subscriptions.length;

        let expired = 0;

        for (let i = 0; i < subscriptions.length; i++) {
            if (getStatus(subscriptions[i].renewalDate) === "Expired") {
                expired++;
            }
        }

        expiredCount.textContent = expired;
    }
}

function displaySubscriptions() {
    const subscriptionList = document.getElementById("subscriptionList");

    if (!subscriptionList) {
        return;
    }

    subscriptionList.innerHTML = "";

    for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
        const status = getStatus(subscription.renewalDate);

        const row = document.createElement("tr");

        const values = [
            subscription.service,
            subscription.provider,
            subscription.subscriber,
            subscription.renewalDate,
            subscription.category
        ];

        for (let j = 0; j < values.length; j++) {
            const cell = document.createElement("td");
            cell.textContent = values[j];
            row.appendChild(cell);
        }

        const statusCell = document.createElement("td");
        statusCell.textContent = status;
        statusCell.className = status.toLowerCase();
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.dataset.id = subscription.id;

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        subscriptionList.appendChild(row);
    }
}

const subscriptionForm = document.getElementById("subscriptionForm");

if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newSubscription = {
            id: Date.now(),
            service: document.getElementById("service").value.trim(),
            provider: document.getElementById("provider").value.trim(),
            subscriber: document.getElementById("subscriber").value.trim(),
            renewalDate: document.getElementById("renewalDate").value,
            category: document.getElementById("category").value
        };

        subscriptions.push(newSubscription);

        saveSubscriptions();

        alert("Subscription added successfully!");

        window.location.href = "expenses.html";
    });
}

const subscriptionList = document.getElementById("subscriptionList");

if (subscriptionList) {
    subscriptionList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const id = Number(event.target.dataset.id);

            subscriptions = subscriptions.filter(function(subscription) {
                return subscription.id !== id;
            });

            saveSubscriptions();
            displaySubscriptions();
        }
    });
}

displaySubscriptions();
updateSummary();

