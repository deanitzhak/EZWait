const URL = window.location.origin;

$(document).ready(() => {
    $('#signInForm').submit((e) => {
        e.preventDefault(); 
        let JSONUser = {}
        JSONUser.userName = $('input[name="username"]').val();
        JSONUser.password= $('input[name="password"]').val();
        console.log(JSONUser)
        $.post(`${URL}/login/logIn`, JSONUser)
            .done((userCheckServer) => {
                if (userCheckServer != "Invalid Data") {
                    window.location.replace(`../appointment.html?userName=${JSONUser.userName}`);
                } else {
                    alert("User does not exist");
                }
            })
            .fail((xhr, status, error) => {
                console.error("Failed to send to server:", error);
            });
    });
});

async function updateSignIn (newSignIn, oldSignIn) {
    const qury = {newSignIn : newSignIn, oldSignIn : oldSignIn};
    $where.post('${URL}/Frontend/signIn', qury)
    .done((_newApp) =>
    {
        const newApp = _newApp;
        return newApp;
    })
    .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
    });
}