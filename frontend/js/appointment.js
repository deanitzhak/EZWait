let my_user;
function getUserName() {
    $.ajax({
        url: `${URL}/user/getUserData`,
        method: 'GET',
        success: function(myUser) {
            console.log("user: ", myUser);
            my_user = myUser;
            return my_user;
        },
        error: function(err) {
            alert("Error occurred while fetching appointments");
        }
    });
}
const EnumType = {
    VALUE1: 'value1',
    VALUE2: 'value2',
    VALUE3: 'value3'
};
const EnumStatus = {
    VALUE1: 'Upcoming',
    VALUE2: 'Completed',
    VALUE3: 'Cancelled'
};
var appointmentsArray ;
/*after Reschedule or cancel assign needed to be null*/
var currentAppointmentId = null;
const URL = window.location.origin;
window.onload = () => {
    my_user = getUserName ();
    (async () => {
        try {
            appointmentsArray = await findAppointmentsByStatus("Upcoming");
            console.log(appointmentsArray);
            renderAppointments("appointmentsList");
        } catch (error) {
            console.error('Error occurred while fetching appointments:', error);
        }
    })();
    $(document).on('click', '.Reschedule', async function(e) {
        e.preventDefault();
        try {
            currentAppointmentId = await getAppointmentId(); 
        } catch (error) {
            alert('Failed to reschedule appointment.');
            console.error('Error occurred while rescheduling appointment:', error);
        }
    });
    
    $('button[name="form_submit"]').click((e) => {
        e.preventDefault(); 
        (async () => {
            try {
                /*if the currentAppointmentId is null create new appointment if the id is not null so ctreate new appointment*/
                if(currentAppointmentId === null || currentAppointmentId === undefined){
                    let newAppointment = createNewAppointmentFromUserData(1); // Await the result of postSetAppointment
                    const appointmentId = await scheduleNewAppointment(newAppointment);
                    if(appointmentId === null){
                        throw new Error('Failed to create new appointment.');
                    }else{
                        alert('secssused.');
                        const _newAppointment = createNewAppointmentFromUserData(appointmentId);
                        await createNewAppointment(_newAppointment);
                        currentAppointmentId = null;
                        window.location.replace(`../appointment.html`);
                    }
                }else{
                    var rescheduleAppointment = await getApoinmentFromAppointmentArray(appointmentsArray, currentAppointmentId);
                    const oldDate = rescheduleAppointment.date;
                    const newRescheduleAppointment = await createRescheduleAppointment(rescheduleAppointment);
                    const query = {newRescheduleAppointment : newRescheduleAppointment, oldDate : oldDate};
                    const isScheduled = await reScheduleNewAppointment(query);
                    if (isScheduled === true) {
                        await updateAppointment(newRescheduleAppointment);
                        window.location.reload();
                    } else {
                        currentAppointmentId = null;          
                        throw new Error('Failed to reschedule appointment.');
                    }  
                    currentAppointmentId = null;          
                }
            } catch (error) {
                alert(error.message);
            }
        })();   
    });
    $('button[name="completed_click"]').click((e) => {
        e.preventDefault(); 
        (async () => {
            try {
                appointmentsArray = await findAppointmentsByStatus(EnumStatus.VALUE2);
                console.log(appointmentsArray);
                renderAppointments("complitedAppointmentsList");
            } catch (error) {
                console.error('Error occurred while fetching appointments:', error);
            }
        })();
    });


    $(document).on('click', '#Cancel_Appointment', function(e) {
        e.preventDefault();
        console.log("shircancel");
        const appointmentId = $(this).closest('li').find('[data-appointment-id]').attr('data-appointment-id');
        console.log(appointmentId,"shrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        cancelAppointment(appointmentId); // Call function to cancel appointment
    });
    

    
};

// function deleteAppointment(appointmentId) {
//     $.ajax({
//         url: `${URL}/appointment/findAppointmentByIdAndDelete`,
//         method: 'GET',
//         data: { _id: appointmentId },
        
//         success: function(appointments) {
//         console.log(appointmentId,"appointmengdeket");
//             console.log("Appointments: ", appointments);
//             // If deletion is successful, remove the appointment from the UI
//             // This step depends on your UI implementation
//             // You may need to remove the appointment from the appointmentsArray and re-render the appointments list
//         },
//         error: function(err) {
//             alert("Error occurred while deleting the appointment");
//         }
//     });
// }
function cancelAppointment(appointmentId) {
    $.ajax({
        url: `${URL}/appointment/updateAppointmentStatus`, // Assuming this is the endpoint to cancel appointments
        method: 'PUT', // Use PUT method to update the appointment status
     
        data: { _id: appointmentId },
        success: function(response) {
            console.log("Appointment cancelled:", response);
            // If cancellation is successful, you can handle any UI updates here
            // For example, remove the cancelled appointment from the UI
        },
        error: function(err) {
            console.log (appointmentId);
            console.error("Error occurred while cancelling the appointment:", err);
            alert("Error occurred while cancelling the appointment");
        }
    });
}
async function findAppointmentsByStatus(status) {
    try {
        const response = await fetch(`${URL}/appointment/findAllAppointmentByStatus?status=${status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }
        const appointments = await response.json();        
        return appointments;
    } catch (error) {
        console.error('Error occurred while fetching appointments:', error);
        throw error;
    }
}
/*new app*/
async function getStartAndEndTimeFromUser(newAppointment) {
    try {
        const queryParams = encodeURIComponent(JSON.stringify(newAppointment));
        const response = await fetch(`${URL}/scheduler/scheduleNewAppointment?newAppointment=${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }
        const appId = await response.json();
        return appId;
    } catch (error) {
        console.error('Error occurred while fetching appointments:', error);
        throw error;
    }
}
/*reSchedule current appointment*/
async function reScheduleNewAppointment(currentAppointment) {
    return new Promise((resolve, reject) => {
        $.post(`${URL}/scheduler/reScheduleNewAppointment`, currentAppointment)
            .done((update) => {
                resolve(update); 
            })
            .fail((xhr, status, error) => {
                console.error("Failed to send to server:", error);
                reject(error); 
            });
    });
}
/*create new appointment*/
async function createNewAppointment(newAppointment) {
        $.post(`${URL}/appointment/submitNewAppointment`, newAppointment)
        .done((_newApp) =>
        {
            const newApp = _newApp;
            return newApp;
        })
        .fail((xhr, status, error) => {
            console.error("failed send to server" + error);
        });
}
async function cancelScheduleAppointmentById(appointmentId) 
{
    $.post(`${URL}/scheduler/cancelAppointmentById`, appointmentId)
    .done((response) =>
    {
        return response;
    })
    .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
    });

}
async function updateAppointment(newAppointment) {
    $.post(`${URL}/appointment/updateAppointment`, newAppointment)
    .done((_newApp) =>
    {
        const newApp = _newApp;
        return newApp;
    })
    .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
    });
}
function createNewAppointmentFromUserData(_appointmentId) {
    const input = document.getElementById('din').value;
    let _duration;
    switch (input) {
        case '1':
            _duration = 2;
            break;
        case '2':
            _duration = 3;
            break;
        case '3':
            _duration = 1;
            break;
        default:
            break;
    }
    const formData = {
      Appointment: {
        appointmentId : _appointmentId,
        userName: my_user.userName,
        firstName:  my_user.firstName,
        lastName: my_user.lastName,
        type: input,
        date: document.getElementById('nave').value,
        startTime: document.getElementById('tomer').value,
        duration : _duration,
      },
    };
    return formData;
}
async function createRescheduleAppointment(currentAppointment)
{
    currentAppointment.type = document.getElementById('din').value;
    currentAppointment.date = document.getElementById('nave').value;
    currentAppointment.startTime = document.getElementById('tomer').value;
    return currentAppointment;
}
/*Invoke HTML object*/ 
function createAppointmentListItem(appointment, tabContent) {
    const li = document.createElement("li");
    li.className = "d-flex justify-content-between";

    const div1 = document.createElement("div");
    div1.className = "d-flex flex-row align-items-center";

    const innerDiv = document.createElement("div");
    innerDiv.className = "ml-2";

    const h1 = document.createElement("h1");
    h1.className = "mb-0";
    h1.textContent = `Dr ${appointment.userName || appointment.firstName} ${appointment.lastName}`;

    const h2 = document.createElement("h2");
    h2.textContent =` ${appointment.type}`;

    const dateDiv = document.createElement("div");
    dateDiv.className = "d-flex flex-row mt-1 text-black-50 date-time";

    const dateIcon = document.createElement("i");
    dateIcon.className = "fa fa-calendar-o";

    const dateSpan = document.createElement("span");
    dateSpan.className = "ml-2";
    const date = new Date(appointment.startTime);
    dateSpan.textContent = date.toUTCString(); 

    dateDiv.appendChild(dateIcon);
    dateDiv.appendChild(dateSpan);

    const idSpan = document.createElement("span");
    idSpan.setAttribute("data-appointment-id", appointment.appointmentId); 
    idSpan.style.display = "none"; 
    

    innerDiv.appendChild(h1);
    innerDiv.appendChild(h2);
    innerDiv.appendChild(dateDiv);
    innerDiv.appendChild(idSpan);

    div1.appendChild(innerDiv);

    const div2 = document.createElement("div");
    div2.className = "d-flex flex-row align-items-center";

    const cancelButton = document.createElement("a");
    cancelButton.href = "#0";
    cancelButton.className = "cd-popup-trigger";
    cancelButton.id = "Cancel_Appointment";
    cancelButton.textContent = "Cancel Appointment";

    const cdPopup = document.createElement("div");
    cdPopup.className = "cd-popup";
    cdPopup.setAttribute("role", "alert");

    const cdPopupContainer = document.createElement("div");
    cdPopupContainer.className = "cd-popup-container";

    const cdPopupText = document.createElement("p");
    cdPopupText.textContent = "Are you sure you want to cancel this Appointment?";

    const cdButtons = document.createElement("ul");
    cdButtons.className = "cd-buttons";

    const yesButton = document.createElement("li");
    const yesLink = document.createElement("a");
    yesLink.href = "#0";
    yesLink.textContent = "Yes";
    yesButton.appendChild(yesLink);

    const noButton = document.createElement("li");
    const noLink = document.createElement("a");
    noLink.href = "#0";
    noLink.textContent = "No";
    noButton.appendChild(noLink);

    const closeButton = document.createElement("a");
    closeButton.href = "#0";
    closeButton.className = "cd-popup-close img-replace";
    closeButton.textContent = "Close";

    cdButtons.appendChild(yesButton);
    cdButtons.appendChild(noButton);

    cdPopupContainer.appendChild(cdPopupText);
    cdPopupContainer.appendChild(cdButtons);
    cdPopupContainer.appendChild(closeButton);

    cdPopup.appendChild(cdPopupContainer);

    div2.appendChild(cancelButton);
    div2.appendChild(cdPopup);
    const rescheduleButton = document.createElement("button");
    rescheduleButton.className = "Reschedule";
    rescheduleButton.textContent = "Reschedule";
    rescheduleButton.id = "Reschedule_Appointment";

    rescheduleButton.addEventListener('click', function() {
        $('.modal-box').toggleClass("show-modal");
        $('.start-btn').toggleClass("show-modal");
    });

    div2.appendChild(rescheduleButton);

    li.appendChild(div1);
    li.appendChild(div2);

    if (tabContent === "Completed") {
        cancelButton.remove();
        rescheduleButton.remove();
    } else if (tabContent === "Cancelled") {
        try {
        }catch(error){
            console.error('Error occurred while fetching appointments:', error);
        }
    }

    return li;
}
function renderAppointments(listType) {
    const appointmentsList = document.getElementById(listType);
    appointmentsList.innerHTML = "";
    appointmentsArray.forEach(function(appointment) {
        const li = createAppointmentListItem(appointment);
        appointmentsList.appendChild(li);
    });
}
async function getAppointmentId(){
    const appointmentId = $('[data-appointment-id]').data('appointment-id');
    return appointmentId;
}
async function getApoinmentFromAppointmentArray(appointmentsArray, currentAppointmentId){
    try{
        const appointment = appointmentsArray.find(appointment => appointment.appointmentId === currentAppointmentId);
        console.log("appointment",appointment);
        return appointment;
    }catch(error){
        console.error('Error occurred while fetching appointments:', error);
    }
}
async function getCurrentAppointment(appointmentsArray, currentAppointmentId) {
    try {
        console.log("currentAppointmentId:", currentAppointmentId);
        console.log("appointmentsArray:", appointmentsArray);
        const appointment = appointmentsArray.find(appointment => appointment.appointmentId === currentAppointmentId);
        console.log("Found appointment:", appointment);

        return appointment;
    } catch (error) {
        console.error('Error occurred while fetching appointments:', error);
        throw error; // Rethrow the error to propagate it further if needed
    }
}




