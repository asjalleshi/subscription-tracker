
const form = document.getElementById("subscriptionForm");
const subscriptionList = document.getElementById("subscriptionList");
const totalCount = document.getElementById("totalCount");
const expiredCount = document.getElementById("expiredCount");

let subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];

function getStatus(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const renewalDate = new Date(date + "T00:00:00");

    if (renewalDate < today) {
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
        subscriptionList.innerHTML = `
            <tr>
                <td colspan="7">No subscriptions yet.</td>
            </tr>
        `;
    }

    for (let i = 0; i < subscriptions.length; i++) {
        const item = subscriptions[i];
        const status = getStatus(item.renewalDate);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(item.service)}</td>
            <td>${escapeHTML(item.provider)}</td>
            <td>${escapeHTML(item.subscriber)}</td>
            <td>${item.renewalDate}</td>
            <td>${escapeHTML(item.category)}</td>
            <td>
                <span class="status ${status.toLowerCase()}">
                    ${status}
                </span>
            </td>
            <td>
                <button class="delete-button" data-index="${i}">
                    Delete
                </button>
            </td>
        `;

        subscriptionList.appendChild(row);
    }

    updateSummary();
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(character) {
        const symbols = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return symbols[character];
    });
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
