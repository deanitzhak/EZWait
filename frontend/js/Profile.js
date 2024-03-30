const URL = window.location.origin;
window.onload = async () => {
    try {
        $('input[name="signUpSubmit"]').click(async (e) => {
            e.preventDefault();
            try {
                const newProfile = await postSetProfile();
                await createNewProfile(newProfile);
            } catch (error) {
            }
        });
        $('input[name="signUpSubmit"]').click(function() {
            window.location.replace("/signIn.html");
          });
      
    } catch (error) {
    }
};

async function createNewProfile(newProfile) {
    try {
        console.log(newProfile);
        const response = await $.post(`${URL}/profile/submitNewProfile`, newProfile);
        console.log("New profile created:", response);
    } catch (error) {
        throw error; 
    }
}

async function postSetProfile() {
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
