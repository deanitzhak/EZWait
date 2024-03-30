const URL = window.location.origin;
var myUser;

async function getUserName() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${URL}/user/getUserData`,
            method: 'GET',
            success: function(myUser) {
                fetchClientData(myUser);
                resolve(myUser);
            },
            error: function(err) {
                window.location.replace(`../signIn.html`);
            }
        });
    });
}
const sendEmail = async (senderName, senderEmail, message,phone) => {
    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ senderName, senderEmail, message ,phone})
        });
        const data = await response.json();
        return data.status;
    } catch (error) {
        throw error;
    }
};

window.onload = async () => {
    try {
        await getUserName();
        const emailInput = document.getElementById('email');
        const nameInput = document.getElementById('fullName'); 
        emailInput.value = myUser.email;
        nameInput.value = `${myUser.firstName} ${myUser.lastName}`;

        document.querySelector('form').addEventListener('submit', async (event) => {
            event.preventDefault(); 
            try {
                const emailInput = document.getElementById('email').value;
                const fullNameInput = document.getElementById('fullName').value;
                const messageInput = document.getElementById('message').value;
                const phoneInput = document.getElementById('phoneNumber').value;
                await sendEmail(fullNameInput, emailInput, messageInput,phoneInput);
                emailInput.value = '';
                fullNameInput.value = '';
                messageInput.value = '';
            } catch (error) {
            }
        });
    } catch (error) {
    }
};
function fetchClientData(data) {
    try {
        console.log('usertype:', data);
        const firstNameString = data.firstName + '' + data.lastName;
        const emailString = data.email;
        document.getElementById('fullName').value = firstNameString;
        document.getElementById('email').value = emailString;
        const usertype = data.type; 
        if (usertype === 'user') {
            const customersLink = document.getElementById('customersLink');
            customersLink.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching client data:', error);
    }
}
