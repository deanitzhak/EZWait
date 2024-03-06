const URL = window.location.origin;
var myUser;

async function getUserName() {
    try {
        const response = await fetch(`${URL}/user/getUserData`);
        myUser = await response.json(); // Assign to the global variable
        return myUser;
    } catch (error) {
        console.error("Error occurred while fetching user data:", error);
        throw error; // Re-throw the error to handle it outside
    }
}
const sendEmail = async (senderName, senderEmail, message,phone) => {
    try {
        console.log("senderName",senderName);
        console.log("senderEmail",senderEmail); 
        console.log("message",message); 
        console.log("phone",phone); 
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
        console.error('Error sending email:', error);
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
            event.preventDefault(); // Prevent the default form submission behavior
        
            // Get form input values

        
            try {
                const emailInput = document.getElementById('email').value;
                const fullNameInput = document.getElementById('fullName').value;
                const messageInput = document.getElementById('message').value;
                const phoneInput = document.getElementById('phoneNumber').value;
                await sendEmail(fullNameInput, emailInput, messageInput,phoneInput);
                emailInput.value = '';
                fullNameInput.value = '';
                messageInput.value = '';
                alert('Email sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Failed to send email. Please try again later.');
            }
        });
                
    } catch (error) {
        console.error("Error:", error);
    }
};
