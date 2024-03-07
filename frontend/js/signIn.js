//APIpaths = require ("./APIpaths.js");

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
                if (userCheckServer != "Invalid Data" ) {
                    
                    // && my_user.cancelCount>=3
                    // my_user.status == 'block'
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
