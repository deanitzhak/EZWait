const URL = window.location.origin;
let myUserS;
document.addEventListener("DOMContentLoaded", function() {
    $.post(`${URL}/user/getUserData`, "GET")
    .done((myUser) => {
        if(myUser.userName === undefined){
            window.location.replace(`../`);
        }else{
            myUserS = myUser;    
            /*for example using the */
            let p = document.getElementById('pTest');
            p.innerText = myUser.userName;
            /*loading all appointment*/
            $.post(`${URL}/appointment/allAppointment`, myUser)
            .done((appointments) => {
                console.log(appointments);
            })
            .fail((xhr, status, error) => {
                console.error("Failed to retrieve appointments:", error);
            });
        
        }
    })
    .fail((xhr, status, error) => {
        console.error("Failed to retrieve appointments:", error);
    });
});
