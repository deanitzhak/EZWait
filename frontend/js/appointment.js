const URL = window.location.origin;
let myUserS;
const status = {
    VALUE1: 'value1',
    VALUE2: 'value2',
    VALUE3: 'value3'
};
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
                findAppointmentByStartTime({ "startTime": "2024-02-15T22:00:00.663+00:00" });
                //findAppointmentByIdAndDelete({"_id" : "65cf1371b85f0166c68138f8"});
                const newAppointment = {
                userName: "Shekel",
                firstName: "Shekel",
                lastName: "Haparsi",
                type: "value1", 
                status: "value1", 
                };
                console.log(createNewAppointment(newAppointment));
            } else{               

            }
        }
    })
    .fail((xhr, status, error) => {
        console.error("Failed to retrieve appointments:", error);
    });
});
function getAllAppointment(myUser){
    /*post all appointment*/
    $.post(`${URL}/appointment/allAppointment`, myUser)
    .done((appointments) => {
        return appointments;
    })
    .fail((xhr, status, error) => {
    return error;
    });                
}
function findAppointmentByAppId(_id){
    /*post appointment by appId*/
    $.post(`${URL}/appointment/findAppointmentByAppId`, _id)
    .done((appointment) => {
        return appointment;
     })
     .fail((xhr, status, error) => {
      console.error("Failed to retrieve appointments:", error);
      });
}
function findAppointmentByIdAndDelete(_id){
    $.post(`${URL}/appointment/findAppointmentByIdAndDelete`, _id)
    .done((appointment) => {
        return appointment;
     })
     .fail((xhr, status, error) => {
      console.error("Failed to retrieve appointments:", error);
      });
}
function getAllMessegeReplay(myUser){
     /*post all messegeReplay*/
     $.post(`${URL}/messegeReplay/AllMessegeReplay`, myUser)
     .done((messegeReplay) =>{
        return messegeReplay;
     })
     .fail((xhr, status, error) =>{
        return error;
     });
}
function getAllMessegeSent(myUser){
        /*post all messegeSent*/
        $.post(`${URL}/messegeSent/AllMessegeSent`, myUser)
        .done((messegeSent) =>{
            return messegeSent;
        })
        .fail((xhr, status, error) =>{
            return error;
        });
}
function getAllSchedule(myUser){
    $.post(`${URL}/schedule/AllSchedule`, myUser)
    .done((schedule) =>{
        return schedule;
    })
    .fail((xhr, status, error) =>{
        return error;
    });
}
function findAllAppointmentsByUserName(userName){
    $.post(`${URL}/appointment/findAllByUserName`, userName)
    .done((appointments) => {
        return appointments;
    })
    .fail((xhr, status, error) => {
        return error;
    });
}
function findAllMessegeReplayByUserName(userName){
    $.post(`${URL}/messegeReplay/findAllByUserName`, userName)
    .done((messegeReplay) =>{
        return messegeReplay;
    })
    .fail((xhr, status, error) =>{
        return error;
    });
}
function findAllMessegeReplayByUserName(userName){
    $.post(`${URL}/messegeSent/findAllByUserName`, userName)
    .done((messegeSent) =>{
        return messegeSent;
    })
    .fail((xhr, status, error) =>{
        return error;
    });
}
function findAllAppointmentByStatus(status){
    $.post(`${URL}/appointment/findAllAppointmentByStatus`, status)
    .done((appointments) => {
        return appointments;
    })
    .fail((xhr, status, error) => {
        return error;
    });

}
function findAppointmentByStartTime(startTime){
    $.post(`${URL}/appointment/findAppointmentByStartTime`, startTime)
    .done((appointments) => {
        console.log(appointments);
        return appointments;
    })
    .fail((xhr, status, error) => {
        return error;
    });
}
function createNewAppointment(newAppointment){
    $.post(`${URL}/appointment/createNewAppointment`, newAppointment)
    .done((appointment) => {
        return appointment;
    })
    .fail((xhr, status, error) => {
        return error;
    });
}

