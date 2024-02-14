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
                    window.location.replace(`../appointment.html`);
                } else {
                    alert("User does not exist");
                }
            })
            .fail((xhr, status, error) => {
                console.error("Failed to send to server:", error);
            });
    });
});
