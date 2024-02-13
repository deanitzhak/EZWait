const URL = window.location.origin;

$(document).ready(() => {
    $('#signInForm').submit((e) => {
        e.preventDefault(); 

        let JSONUser = {}
        JSONUser.userName = $('input[name="username"]').val();
        JSONUser.password= $('input[name="password"]').val();
        console.log(JSONUser)
        $.post(`${URL}/login/checkUserAdmin`, JSONUser)
            .done((userCheckServer) => {
                if (userCheckServer == "The user exists") {
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
