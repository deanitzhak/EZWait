let my_user;

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
                reject("Error occurred while fetching user data");
            }
        });
    });
}

const URL = window.location.origin;

window.onload = async () => {
    try {

        my_user = await getUserName();
        
        console.log("User data fetched successfully");
       
        // const datas = my_user.userName;
        // const datas = myuser.email;
        // document.getElementById('email').value =datas;
        // console.log(datas);
      
        console.log("im hereeeeeeeeeeeeeeeee");

        $('input[name="submit"]').click(async (e) => {
            e.preventDefault();
            console.log("im hereeeeeeeeeeeeeeeee");
            
            
            try {
                
                const _newClient = await postSetClient();

                console.log("can create new client",_newClient);
        
                await createNewClient(_newClient);
            } catch (error) {
                console.error('Failed to create new client.', error);
                alert('Failed to create new client.');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while fetching user data');
    }
};

// document.addEventListener('DOMContentLoaded', function() {
//     // Assuming you have the user's email available in the variable 'userEmail'
    
//     // Set the value of the email input field


async function createNewClient(newClient) {
    try {
        console.log(newClient);
        const response = await $.post(`${URL}/client/submitNewClient`, newClient);
        console.log("New client created:", response);
        console.log(newClient);
        alert('Client created successfully.');
    } catch (error) {
        console.error('Failed to send data to server:', error);
        alert('Failed to create new client.');
        throw error; // Rethrow the error for further handling
    }
}
function postSetClient() {
    const formData = {
        Client: {
            userName: my_user.userName,
            firstName: my_user.firstName,
            lastName: my_user.lastName,
            dateOfBirth: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            email: my_user.email,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            subClients: [] // Initialize an array for subclients
        }
        
    
    };

    // Loop through the input fields for subclients
    var index = 1; // Start index for subclients
    while (true) {
        // Construct the IDs for subclient input fields
        var subfirstNameId = 'subfirstName' + index;
        var sublastNameId = 'sublastName' + index;
        var subgenderId = 'subGender' + index;
        var subdateOfBirthId = 'subDateofBirth' + index;

        // Get the values from the input fields
        var subfirstName = document.getElementById(subfirstNameId);
        var sublastName = document.getElementById(sublastNameId);
        var subgender = document.getElementById(subgenderId);
        var subdateOfBirth = document.getElementById(subdateOfBirthId);

        // Check if the input fields exist
        if (!subfirstName || !sublastName || !subgender || !subdateOfBirth) {
            break; // Exit the loop if input fields don't exist
        }

        // Add subclient data to the formData
        formData.Client.subClients.push({
            subfirstName: subfirstName.value,
            sublastName: sublastName.value,
            subgender: subgender.value,
            subdateOfBirth: subdateOfBirth.value
        });

        index++; // Increment index for the next set of subclients
    }

    return formData;
}






// AJAX request to fetch user's email from the backend
