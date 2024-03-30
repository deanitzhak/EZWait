let my_user;
var new_client_to_add = false;
var sub_client_clicked = false;
var index = 1; 
var mySubClient;
var myClientEdit;
function getUserName() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${URL}/user/getUserData`,
            method: 'GET',
            success: function(myUser) {
                my_user = myUser;
                resolve(my_user);
                fetchClientData(my_user);
            },
            error: function(err) {
                window.location.replace(`../signIn.html`);
            }
        });
    });
}
const URL = window.location.origin;
window.onload = async () => {
    try {
        new_client_to_add = false;
        sub_client_clicked = false
        index = 1;
        mySubClient = [];
        my_user = await getUserName();
        if (!my_user || !my_user.userName || !my_user.firstName || !my_user.lastName || !my_user.email) {
            window.location.replace(`../signIn.html`);
            return;
        }
        sub_client_clicked = false;
        /*check if admin press on Create new Client*/
        const urlParams = new URLSearchParams(window.location.search);
        const sourcePage = urlParams.get('source');
        if (sourcePage === 'NewClient') {
            new_client_to_add = true;
        }else{new_client_to_add = false;}
        if(!new_client_to_add){
            loadClientData();
        }else{
            await newClientDisplay();
        }
        $('input[name="submit"]').click(async (e) => {
            e.preventDefault();
            try {    
                if(sub_client_clicked && !new_client_to_add){
                    const newSubClient = await postSetSubClient();
                    await createNewSubClient(newSubClient);
                }
                else if(sub_client_clicked && new_client_to_add)
                {

                }else if(!sub_client_clicked && !new_client_to_add){
                   const MyClientEdit= await editingMyClient();
                   updateClientData(MyClientEdit);
                }else
                {
                    await postNewClient();
                }
                
            } catch (error) {
            }
        });
        $('button[name="addmemberbtn"]').click(async (e) => {
            e.preventDefault();
            if(!new_client_to_add){
                sub_client_clicked = true;
                var createSubClient = await createDemoSubClient();
                SubOpenInputFields(createSubClient);    
            }else{
                alert("can't add sub client to new client");
            }
        });
    } catch (error) {
    }
};
async function createNewSubClient(newClient) {
    try {
        const response = await $.post(`${URL}/client/submitNewSubClient`, newClient);
    } catch (error) {
        throw error; // Rethrow the error for further handling
    }
}
async function editingMyClient() {
    dateOfBirthIn = document.getElementById('dob').value;
    genderIn = document.getElementById('gender').value;
    emailIn = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    addressIn = document.getElementById('address').value;
    const formData = {
        Client: {
            clientId : myClientEdit.clientId,
            userName: my_user.userName,
            firstName: my_user.firstName,
            lastName: my_user.lastName,
            dateOfBirth: dateOfBirthIn,
            gender: genderIn,
            email: emailIn,
            phone: phone,
            address: addressIn,
            subClients: mySubClient 
        }
    };
    return formData;
}
async function postSetSubClient() {
    var subfirstNameiN = document.getElementById("submit_new_first_name").value;
    var sublastNameiN = document.getElementById("submit_new_last_name").value;
    var subgenderiN = document.getElementById("submit_new_gender").value;
    var subdateOfBirthiN = document.getElementById("submit_new_date").value;
    const formData = {
        subClient: {
            subfirstName: subfirstNameiN,
            sublastName: sublastNameiN,
            subdateOfBirth: subdateOfBirthiN,
            subgender: subgenderiN,
        }
    }
    return formData;
}
async function loadClientData() 
{
    const myClient = await getClientData();
    myClientEdit = myClient;
    populateFormFields(myClient);
}
async function getClientData() {
    try {
        const response = await fetch(`${URL}/client/findAllByUserName?userName=${my_user.userName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to get client data');
        }
        const clientData = await response.json();
        return clientData;
    } catch (error) {
        console.error('Error occurred while fetching client data:', error);
        throw error;
    }
}
// Function to dynamically populate form fields with client data
function populateFormFields(clientData) {
    const dateOfBirth = new Date(clientData.dateOfBirth);
    const formattedDate = dateOfBirth.toISOString().split('T')[0]; // Extract YYYY-MM-DD
    document.getElementById('dob').value = formattedDate;
    document.getElementById("phone").value= clientData.phone;
    document.getElementById("address").value= clientData.address;
    const genderSelect = document.getElementById('gender');
    for (let i = 0; i < genderSelect.options.length; i++) {
        const option = genderSelect.options[i];
        if (option.value === clientData.gender) {
            genderSelect.selectedIndex = i;
            break;
        }
    }
    clientData.subClients.forEach((subClient) => {
        SubOpenInputFields(subClient);
        index++;
    });
    if(new_client_to_add)
    {
        document.getElementById('firstname').value = "new client firstname";
        document.getElementById('lastname').value = "new client lastname";
        document.getElementById('email').value = "example@email.com";
    }
}
async function newClientDisplay()
{
   const myClient = await createNewClientDemo();
    myClientEdit = myClient;
    populateFormFields(myClientEdit);
}
async function updateClientData(MyClientEdit)
{
    try {
        const response = await $.post(`${URL}/client/updateClientData`, MyClientEdit);
    } catch (error) {
        console.error('Failed to send data to server:', error);
        alert('Failed to create new client.');
        throw error; // Rethrow the error for further handling
    }
}
function SubOpenInputFields(subClient) {
    mySubClient.push(subClient);
    var itemsContainer = document.getElementById("itemsContainer");
    subClient.subdateOfBirth
    // Create a new label
    var newItemDiv = document.createElement("label");
    newItemDiv.textContent = "Member client";
    newItemDiv.className = "formbold-form-input formbold-mb-3";
    
    // Create input fields dynamically with unique IDs and set their initial values
    var firstNameInput = createInput("text", "subfirstName" + index, "Subclient First Name", subClient.subfirstName);
    var lastNameInput = createInput("text", "sublastName" + index, "Subclient Last Name", subClient.sublastName);
    var dobInput = createInput("date", "subDateOfBirth" + index, "Subclient Date of Birth", subClient.subdateOfBirth);
    var genderInput = createInput("text", "subGender" + index, "Subclient Gender", subClient.subgender);
    
    // Increment the index for the next function call
    index++;
    
    // Set IDs for new subclients
    if (subClient.subfirstName === "new sub first name") {
        firstNameInput.querySelector("input").id = "submit_new_first_name";
        lastNameInput.querySelector("input").id = "submit_new_last_name";
        dobInput.querySelector("input").id = "submit_new_date";
        genderInput.querySelector("input").id = "submit_new_gender";
    }

    // Append input fields to the label
    newItemDiv.appendChild(firstNameInput);
    newItemDiv.appendChild(lastNameInput);
    newItemDiv.appendChild(dobInput);
    newItemDiv.appendChild(genderInput);

    // Append the label to the container
    itemsContainer.appendChild(newItemDiv);
}

function createInput(type, placeholder, label, value) {
    var input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.id = placeholder;
    input.className = "formbold-form-input";
    if(type === "date")
    {
        input.valueAsDate = new Date(value);
    }else{
        input.value = value;
    }
    //input.value = value; // Set the value of the input field

    // Create a label for the input
    var labelElement = document.createElement("label");
    labelElement.textContent = label;
    labelElement.className = "formbold-form-label";

    // Append the label before the input
    var container = document.createElement("div");
    container.className = "formbold-mb-3";
    container.appendChild(labelElement);
    container.appendChild(input);

    return container;
}
async function createDemoSubClient() {
    // Construct the subclient object with predefined values
    const subClient = {
        subfirstName: "new sub first name",
        sublastName: "new sub Last name",
        subdateOfBirth: Date.now(),
        subgender: "Them"
    };
    return subClient;
}
async function createNewClientDemo() {
    const newClient = {
        userName: "new Client",
        dateOfBirth: new Date(), // Assuming current date
        gender: "Male", // Assuming gender
        phone: "1234567890", // Assuming phone number
        address: "123 Main Street", // Assuming address
        status: "active", // Assuming status
        subClients: [] // Assuming no sub-clients initially
    };

    return newClient;
}
async function postNewClient() 
{
    const newClinetData = await getNewClinetData();
    try {
        const response = await $.post(`${URL}/client/submitNewClient`, newClinetData);
    } catch (error) {
        alert('Failed to create new client.');
        throw error; 
    }
}
async function getNewClinetData(){
    const clientName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const useName = clientName + " " + lastName;
    dateOfBirthIn = document.getElementById('dob').value;
    genderIn = document.getElementById('gender').value;
    emailIn = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    addressIn = document.getElementById('address').value;
    const formData = {
        Client: {
            clientId : generateRandomId(),
            userName: useName,
            firstName: clientName,
            lastName: lastName,
            dateOfBirth: dateOfBirthIn,
            gender: genderIn,
            email: emailIn,
            phone: phone,
            address: addressIn,
            subClients: mySubClient 
        }
    };
    return formData;

}
function generateRandomId() {
    const characters = '0123456789abcdef';
    let randomId = '';
    for (let i = 0; i < 24; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}
function fetchClientData(data) {
    try {
        const firstNameString = String(data.firstName);
        const lastNameString = String(data.lastName);
        const emailString = String(data.email);

        document.getElementById('firstname').value = firstNameString;
        document.getElementById('lastname').value = lastNameString;
        document.getElementById('email').value = emailString;
        document.getElementById('password').value = "";

        const usertype = data.type; 
        if (usertype === 'user') {
            const customersLink = document.getElementById('customersLink');
            customersLink.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching client data:', error);
    }
}
