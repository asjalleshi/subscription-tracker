
let form = document.getElementById("subscriptionForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let subscriptions = getSubscriptions();

        let newSubscription = {
            id: Date.now(),
            service: document.getElementById("service").value,
            provider: document.getElementById("provider").value,
            subscriber: document.getElementById("subscriber").value,
            renewalDate: document.getElementById("renewalDate").value,
            category: document.getElementById("category").value
        };

        subscriptions.push(newSubscription);

        saveSubscriptions(subscriptions);

        alert("Subscription added successfully!");

        form.reset();

        window.location.href = "expenses.html";
    });
}

