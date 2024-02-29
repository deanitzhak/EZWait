function createClientTable(clients) {
    const table = document.createElement('table');
    table.classList.add('min-w-full', 'divide-y', 'divide-gray-200');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Patient Name', 'Client Id', 'Date of Birth', 'Gender', 'Phone', 'Address', 'Status', 'Action'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.classList.add('px-3', 'py-3.5', 'text-left', 'text-xl', 'font-semibold', 'text-black-900');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    clients.forEach(client => {
        const row = document.createElement('tr');

        // Populate client data into table cells
        const keys = ['userName', 'clientId', 'dateOfBirth', 'gender', 'phone', 'address', 'status'];
        keys.forEach(key => {
            const td = document.createElement('td');
            td.classList.add('whitespace-nowrap', 'px-3', 'py-5', 'text-sm', 'text-gray-900');
            td.textContent = client[key];
            row.appendChild(td);
        });

        // Action column (assuming you have buttons or links here)
        const actionCell = document.createElement('td');
        actionCell.classList.add('relative', 'py-3.5', 'pl-3', 'pr-4', 'sm:pr-0');
        // Add action buttons or links here
        // Example: actionCell.innerHTML = `<button>Edit</button>`;
        row.appendChild(actionCell);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}

const clientsList = document.getElementById('clients');
$.ajax({
    url: `${URL}/Client/allClient`,
    method: 'GET',
    success: function(clients) {
        console.log("Received clients data:", clients);

        // Clear previous content
        clientsList.innerHTML = "";

        // Create table for clients
        const clientTable = createClientTable(clients);
        clientTable.setAttribute('id', 'clientTable'); // Set an id for future reference
        clientsList.appendChild(clientTable); // Append the table to the client list container
    },
    error: function(xhr, status, error) {
        console.error("Failed to fetch clients:", error);
        // Handle error appropriately, e.g., show an error message to the user
    }
});
