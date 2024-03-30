let clientArray; 
const URL = window.location.origin;
function getUserName() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${URL}/user/getUserData`,
            method: 'GET',
            success: function(myUser) {
                console.log("user: ", myUser);
                my_user = myUser;
                resolve(my_user);
            },
            error: function(err) {
                window.location.replace(`../signIn.html`);
            }
        });
    });
}
window.onload = async function() {
    my_user = await getUserName();
        if (!my_user || !my_user.userName || !my_user.firstName || !my_user.lastName || !my_user.email) {
            window.location.replace(`../signIn.html`);
            return;
        }
    clientArray = await getAllPages(); // Wait for getAllPages() to complete before assigning the result to clientArray
    console.log("clientArray",clientArray);
    populateTable(clientArray); // Call createPatientTable with the fetched data
    $('button[name="new_client"]').click((e) => {
        e.preventDefault();
        window.location.replace(`../profilePage.html?source=NewClient`);
    });
    
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
    
        // Create cells for client information
        const cellsHtml = `
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
        row.innerHTML = cellsHtml;
    
        // Check if client has subclients
        if (client.subClients !== undefined && client.subClients.length > 0) {
            const td = document.createElement('td');
    
            const selectDiv = document.createElement('div');
            selectDiv.classList.add('form-floating');
    
            const select = document.createElement('select');
            select.classList.add('form-select');
            select.setAttribute('aria-label', 'Floating label select example');
    
            // Add options for each subclient
            client.subClients.forEach(subClient => {
                const option = document.createElement('option');
                option.textContent = `${subClient.subfirstName} ${subClient.sublastName}`;
                option.value = subClient._id; // Assuming _id is the value you want to use
                select.appendChild(option);
            });
    
            selectDiv.appendChild(select);
            td.appendChild(selectDiv);
            row.appendChild(td);
        }
    
        tableBody.appendChild(row);
    });}
    