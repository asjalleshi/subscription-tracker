
function getSubscriptions() {
    return JSON.parse(localStorage.getItem("subscriptions")) || [];
}

function saveSubscriptions(subscriptions) {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
}

function getStatus(date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let renewalDate = new Date(date + "T00:00:00");

    if (renewalDate < today) {
        return "Expired";
    }

    return "Active";
}

function updateSummary() {
    let subscriptions = getSubscriptions();

    let total = subscriptions.length;
    let expired = subscriptions.filter(function(subscription) {
        return getStatus(subscription.renewalDate) === "Expired";
    }).length;

    let totalElement = document.getElementById("totalCount");
    let expiredElement = document.getElementById("expiredCount");

    if (totalElement) {
        totalElement.textContent = total;
    }

    if (expiredElement) {
        expiredElement.textContent = expired;
    }
}

updateSummary();
