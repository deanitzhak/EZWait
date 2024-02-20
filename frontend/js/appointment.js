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
const URL = window.location.origin;
window.onload = () => {
    /*onLoad By status*/
    (async () => {
        try {
            appointmentsArray = await findAppointmentsByStatus(EnumStatus.VALUE1);
            console.log(appointmentsArray);
            //renderAppointments("appointmentsList");
        } catch (error) {
            console.error('Error occurred while fetching appointments:', error);
        }
    })();
    
    $('button[name="form_submit"]').click((e) => {
        e.preventDefault(); 
        let inputValuesForm = postSetAppointment();
        /*on Click Create*/
        createNewAppointment(inputValuesForm);
    });
    $('a[name="cancel_button"]').click((e) => {
        e.preventDefault(); 
        findAndDeleteByAppoinmentId(id);
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
    $('button[name="cancelled_click"]').click((e) => {
        e.preventDefault(); 
        (async () => {
            try {
                appointmentsArray = await findAppointmentsByStatus(EnumStatus.VALUE3);
                console.log(appointmentsArray);
                renderAppointments("cancelledAppointmentsList");
            } catch (error) {
                console.error('Error occurred while fetching appointments:', error);
            }
        })();
    });
};
/*delete by app Id*/
function findAndDeleteByAppoinmentId(id) {
    $.ajax({
        url: `${URL}/appointment/findAppointmentByIdAndDelete`,
        method: 'GET',
        data: { _id: id },
        success: function(appointments) {
            console.log("Appointments: ", appointments);
        },
        error: function(err) {
            alert("Error occurred while fetching appointments");
        }
    });
}
/*find by status*/
// function findAppointmentsByStatus(status) {
//     $.ajax({
//         url: `${URL}/appointment/findAllAppointmentByStatus`,
//         method: 'GET',
//         data: { status: status },
//         success: function(appointments) {
//             return appointments;
//         },
//         error: function(err) {
//             alert("Error occurred while fetching appointments");
//         }
//     });
// }
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
/*find by status*/
/*new app*/
function createNewAppointment(newAppointment){
    $.post(`${URL}/appointment/submitNewAppointment`, newAppointment)
    .done(newApp =>{
       return newApp;
    })
    .fail(err => {
        console(err);
    });

}
function postSetAppointment() {
    const formData = {
      Appointment: {
        userName: 'EranK',
        firstName: "Fail",
        lastName: "donski",
        type: EnumType.VALUE2,
        time: new Date(),
        date: new Date(),
      },
    };
    return formData;
}
/*Invoke HTML object*/ 
function createAppointmentListItem(appointment) {
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
        h2.textContent = `Pharmacy A - xxx building, xxx street, xxx city`;
    
        const dateDiv = document.createElement("div");
        dateDiv.className = "d-flex flex-row mt-1 text-black-50 date-time";
    
        const dateIcon = document.createElement("i");
        dateIcon.className = "fa fa-calendar-o";
    
        const dateSpan = document.createElement("span");
        dateSpan.className = "ml-2";
        const date = new Date(appointment.time);
        dateSpan.textContent = date.toLocaleString(); // Format date as needed
    
        dateDiv.appendChild(dateIcon);
        dateDiv.appendChild(dateSpan);
    
        innerDiv.appendChild(h1);
        innerDiv.appendChild(h2);
        innerDiv.appendChild(dateDiv);
    
        div1.appendChild(innerDiv);
    
        const div2 = document.createElement("div");
        div2.className = "d-flex flex-row align-items-center";
    
        const cancelButton = document.createElement("a");
        cancelButton.href = "#0";
        cancelButton.className = "cd-popup-trigger";
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
    
        div2.appendChild(rescheduleButton);
    
        li.appendChild(div1);
        li.appendChild(div2);
    
        return li;
}

function renderAppointments(listType) {
    const appointmentsList = document.getElementById(listType);
    // Clear previous content
    appointmentsList.innerHTML = "";
    // Create list items for each appointment and append them to the list
    appointmentsArray.forEach(function(appointment) {
        const li = createAppointmentListItem(appointment);
        appointmentsList.appendChild(li);
    });
}

// Call renderAppointments to render appointments when the page loads
