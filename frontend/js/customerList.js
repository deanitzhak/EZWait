let clientArray; 
const URL = window.location.origin;

window.onload = async function() {
    clientArray = await getAllPages(); // Wait for getAllPages() to complete before assigning the result to clientArray
    console.log("clientArray",clientArray);
    populateTable(clientArray); // Call createPatientTable with the fetched data
};

async function getAllPages() {
    try{
        const response = await fetch(`${URL}/client/allClient`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            throw new Error('Failed to fetch clients');
        }
        const clients = await response.json();
        return clients;

    }catch(error){
        console.error('Error occurred while fetching appointments:', error);
        throw error;
    }
}

function populateTable(clientArray) {
    const tableBody = document.querySelector('.divide-y.divide-gray-200.bg-white');

    clientArray.forEach(client => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0" id="itemList">
                <div class="flex items-center">
                    <div class="ml-4">
                        <div class="font-medium text-gray-900">${client.userName}</div>
                    </div>
                </div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.clientId}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.dateOfBirth}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.gender}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.phone}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.address}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.status}</td>
        `;
        
        // Check if client has subclients
        if (client.subClient !== undefined  ) {
            const selectDiv = document.createElement('div');
            selectDiv.classList.add('form-floating');

            const select = document.createElement('select');
            select.classList.add('form-select');
            select.id = 'floatingSelect';
            select.setAttribute('aria-label', 'Floating label select example');

            const memberOption = document.createElement('option');
            memberOption.setAttribute('selected', 'selected');
            memberOption.textContent = client.subClient.subfirstName;

            select.appendChild(memberOption);
            selectDiv.appendChild(select);

            const td = document.createElement('td');
            td.appendChild(selectDiv);

            row.appendChild(td);
        }

        tableBody.appendChild(row);
    });
}
