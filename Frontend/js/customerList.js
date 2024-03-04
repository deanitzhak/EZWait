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
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div class="flex items-center">
                    <div class="ml-4">
                        <div class="font-medium text-gray-900">${client.userName}</div>
                    </div>
                </div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">
                <div class="text-gray-900">${client.clientId}</div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.dateOfBirth}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.gender}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.phone}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.address}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">${client.status}</td>
            <td class="whitespace-nowrap px-3 py-5 text-me text-gray-900">
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Member</option>
                        <option value="1">Lia Reynolds</option>
                    </select>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

