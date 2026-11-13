
const form = document.getElementById("subscriptionForm");
const subscriptionList = document.getElementById("subscriptionList");
const totalCount = document.getElementById("totalCount");
const expiredCount = document.getElementById("expiredCount");

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
    totalCount.textContent = subscriptions.length;

    let expired = 0;

    for (let i = 0; i < subscriptions.length; i++) {
        if (getStatus(subscriptions[i].renewalDate) === "Expired") {
            expired++;
        }
    }

    expiredCount.textContent = expired;
}

function displaySubscriptions() {
    subscriptionList.innerHTML = "";

    if (subscriptions.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 7;
        cell.textContent = "No subscriptions added yet.";

        row.appendChild(cell);
        subscriptionList.appendChild(row);
    }

    for (let i = 0; i < subscriptions.length; i++) {
        const item = subscriptions[i];
        const status = getStatus(item.renewalDate);

        const row = document.createElement("tr");

        const serviceCell = document.createElement("td");
        serviceCell.textContent = item.service;

        const providerCell = document.createElement("td");
        providerCell.textContent = item.provider;

        const subscriberCell = document.createElement("td");
        subscriberCell.textContent = item.subscriber;

        const dateCell = document.createElement("td");
        dateCell.textContent = item.renewalDate;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = item.category;

        const statusCell = document.createElement("td");
        const statusLabel = document.createElement("span");

        statusLabel.textContent = status;
        statusLabel.className = "status " + status.toLowerCase();

        statusCell.appendChild(statusLabel);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.dataset.index = i;

        actionCell.appendChild(deleteButton);

        row.appendChild(serviceCell);
        row.appendChild(providerCell);
        row.appendChild(subscriberCell);
        row.appendChild(dateCell);
        row.appendChild(categoryCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        subscriptionList.appendChild(row);
    }

    updateSummary();
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const newSubscription = {
        service: document.getElementById("service").value.trim(),
        provider: document.getElementById("provider").value.trim(),
        subscriber: document.getElementById("subscriber").value.trim(),
        renewalDate: document.getElementById("renewalDate").value,
        category: document.getElementById("category").value
    };

    if (!newSubscription.service || !newSubscription.provider ||
        !newSubscription.subscriber || !newSubscription.renewalDate ||
        !newSubscription.category) {
        alert("Please complete all fields.");
        return;
    }

    subscriptions.push(newSubscription);

    saveSubscriptions();
    displaySubscriptions();

    form.reset();
});

subscriptionList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-button")) {
        const index = Number(event.target.dataset.index);

        subscriptions.splice(index, 1);

        saveSubscriptions();
        displaySubscriptions();
    }
});

displaySubscriptions();
