
let subscriptionList = document.getElementById("subscriptionList");

function displaySubscriptions() {
    if (!subscriptionList) {
        return;
    }

    let subscriptions = getSubscriptions();

    subscriptionList.innerHTML = "";

    subscriptions.forEach(function(subscription) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${subscription.service}</td>
            <td>${subscription.provider}</td>
            <td>${subscription.subscriber}</td>
            <td>${subscription.renewalDate}</td>
            <td>${subscription.category}</td>
            <td>${getStatus(subscription.renewalDate)}</td>
            <td>
                <button class="delete-btn" data-id="${subscription.id}">
                    Delete
                </button>
            </td>
        `;

        subscriptionList.appendChild(row);
    });
}

if (subscriptionList) {
    subscriptionList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            let id = Number(event.target.dataset.id);

            let subscriptions = getSubscriptions();

            subscriptions = subscriptions.filter(function(subscription) {
                return subscription.id !== id;
            });

            saveSubscriptions(subscriptions);

            displaySubscriptions();
        }
    });
}

displaySubscriptions();
