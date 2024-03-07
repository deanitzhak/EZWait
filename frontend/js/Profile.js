
//APIpaths = require ("./APIpaths.js");

const URL = window.location.origin;

window.onload = async () => {
    try {
        $('input[name="signUpSubmit"]').click(async (e) => {
            console.log("I'm here");
            e.preventDefault();
            console.log("I'm here");

            try {
                const newProfile = await postSetProfile();
                console.log("Can create new profile", newProfile);
                await createNewProfile(newProfile);
            } catch (error) {
                console.error('Failed to create new profile.', error);
                alert('Failed to create new profile.');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while fetching user data');
    }
};

async function createNewProfile(newProfile) {
    try {
        console.log(newProfile);
        const response = await $.post(`${URL}/profile/submitNewProfile`, newProfile);
        console.log("New profile created:", response);
        alert('Profile created successfully.');
    } catch (error) {
        console.error('Failed to send data to server:', error);
        alert('Failed to create new profile.');
        throw error; // Rethrow the error for further handling
    }
}

function postSetProfile() {


    const formData = {
        Profile: {
            userName: document.getElementById('username').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
            
        }
    };
    return formData;
    
}
