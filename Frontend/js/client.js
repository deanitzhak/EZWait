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

document.addEventListener('DOMContentLoaded', function() {
    // Assuming you have the user's email available in the variable 'userEmail'
    
    // Set the value of the email input field
    document.getElementById('email').value = client.email;
  });

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
            subfirstName: document.getElementById('subfirstName').value,
            sublastName: document.getElementById('sublastName').value,
            subgender: document.getElementById('subGender').value,
            subdateOfBirth: document.getElementById('subDateofBirth').value,
         
        },
    };
    return formData;
}
