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
            let p = document.getElementById('userName');
            p.innerText = myUser.userName;
            if(myUserS.type == true){
                /*post all appointment*/
                $.post(`${URL}/appointment/allAppointment`, myUser)
                .done((appointments) => {
                /*Handeling data reciving*/
                console.log(appointments);
                })
                .fail((xhr, status, error) => {
                console.error("Failed to retrieve appointments:", error);
                });
                 /*post all messegeReplay*/
                 $.post(`${URL}/messegeReplay/AllMessegeReplay`, myUser)
                 .done((messegeReplay) =>{
                     console.log(messegeReplay)
                 })
                 .fail((xhr, status, error) =>{
                     console.log(error)
                 });
                    /*post all messegeSent*/
                 $.post(`${URL}/messegeSent/AllMessegeSent`, myUser)
                 .done((messegeSent) =>{
                     console.log(messegeSent)
                 })
                 .fail((xhr, status, error) =>{
                     console.log(error)
                 });
                    /*post all schedule*/
                 $.post(`${URL}/schedule/AllSchedule`, myUser)
                 .done((schedule) =>{
                     console.log(schedule)
                 })
                 .fail((xhr, status, error) =>{
                     console.log(error)
                 });
            }else{
                $.post(`${URL}/appointment/findAllByUserName`, myUser)
                .done((appointments) => {
                /*Handeling data reciving*/
                console.log(appointments);
                })
                .fail((xhr, status, error) => {
                console.error("Failed to retrieve appointments:", error);
                });
                    /*post my messegeReplay*/
                 $.post(`${URL}/messegeReplay/findAllByUserName`, myUser)
                 .done((messegeReplay) =>{
                     console.log(messegeReplay)
                 })
                 .fail((xhr, status, error) =>{
                     console.log(error)
                 });
                    /*post my messegeSent*/
                 $.post(`${URL}/messegeSent/findAllByUserName`, myUser)
                 .done((messegeSent) =>{
                     console.log(messegeSent)
                 })
                 .fail((xhr, status, error) =>{
                     console.log(error)
                 });
            }
        }
    })
    .fail((xhr, status, error) => {
        console.error("Failed to retrieve appointments:", error);
    });
});
