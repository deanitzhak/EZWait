const URL = window.location.origin;
import { APIpaths } from './APIpaths.js';

$(document).ready(() => {
    $('#signInForm').submit((e) => {
        e.preventDefault(); 
        let JSONUser = {}
        JSONUser.userName = $('input[name="username"]').val();
        JSONUser.password= $('input[name="password"]').val();
        console.log("URLLLL",URL);
        console.log(JSONUser)
       
        $.post(APIpaths.logIn, JSONUser)
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
