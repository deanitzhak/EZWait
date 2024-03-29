let my_user;
const monthsCal = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
async function getUserName() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${URL}/user/getUserData`,
            method: 'GET',
            success: function(myUser) {
                resolve(myUser); // Resolve the promise with user data
            },
            error: function(err) {
                reject(err); // Reject the promise with the error
            }
        });
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
var myClient;
const URL = window.location.origin;
$(document).ready(function () {
    $('.start-btn').click(function () {
        $('.modal-box').toggleClass("show-modal");
        $('.start-btn').toggleClass("show-modal");
    });
    $('.fa-close').click(function () {
        $('.modal-box').toggleClass("show-modal");
        $('.start-btn').toggleClass("show-modal");
    });
});
window.onload = () => {
    (async () => {
        try {
            my_user = await getUserName();
            if (!my_user || !my_user.userName || !my_user.firstName || !my_user.lastName || !my_user.email) {
                window.location.replace(`../signIn.html`);
                return;
            }else{
                myClient = await getClientData(my_user.userName);
                appointmentsArray = await findAppointmentsByStatus(EnumStatus.VALUE1);
                await isComplete();
                renderAppointments("appointmentsList");            
            }
        } catch (error) {
            console.error('Error occurred while fetching appointments:', error);
        }
    })();
    (async () => {
        try {

        } catch (error) {
            console.error('Error occurred while fetching appointments:', error);
        }
    })();
    $(document).on('click', '#Reschedule', async function(e) {
        e.preventDefault();
        try {
            //currentAppointmentId = await getAppointmentId(); 
            currentAppointmentId = $(this).attr('data-appointment-id');
            console.log("currentAppointmentId:" + currentAppointmentId);
            toggleModal();
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
                if(currentAppointmentId === null || currentAppointmentId === undefined ){
                    let newAppointment = createNewAppointmentFromUserData(1); // Await the result of postSetAppointment
                    const appointmentId = await scheduleNewAppointment(newAppointment);
                    console.log ("cancelcount",my_user.cancelCount);
                    if(appointmentId === null){
                        throw new Error('Failed to create new appointment.');
                    }else{
                        alert('success to create appointment');
                        const _newAppointment = createNewAppointmentFromUserData(appointmentId);
                        await createNewAppointment(_newAppointment);
                        currentAppointmentId = null;
                        window.location.replace(`../appointment.html`);
                    }
                }else{
                    var rescheduleAppointment = await getApoinmentFromAppointmentArray(appointmentsArray, currentAppointmentId);
                    const oldDate = rescheduleAppointment.date;
                    let newRescheduleAppointment = await createRescheduleAppointment(rescheduleAppointment);
                    const query = {newRescheduleAppointment : newRescheduleAppointment, oldDate : oldDate,appointmentId:rescheduleAppointment.appointmentId};
                    const isScheduled = await reScheduleNewAppointment(query);
                    if (isScheduled === true) {
                        const _newAppointment = createNewAppointmentFromUserData(currentAppointmentId);
                        await updateAppointment(_newAppointment,oldDate);
                        window.location.replace(`../appointment.html`);
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
        /*show all completed */
    $('button[name="completed_click"]').click((e) => {
        e.preventDefault(); 
        (async () => {
            try {
                appointmentsArray = await findAppointmentsByStatus(EnumStatus.VALUE2);
                console.log(appointmentsArray);
                renderAppointments("appointmentsList");
            } catch (error) {
                console.error('Error occurred while fetching appointments:', error);
            }
        })();
    });
        /*show all upcoming  */
    $('button[name="upcoming_click"]').click((e) => {
        e.preventDefault(); 
        (async () => {
            try {
                appointmentsArray = await findAppointmentsByStatus(EnumStatus.VALUE1);
                renderAppointments("appointmentsList");
            } catch (error) {
                console.error('Error occurred while fetching appointments:', error);
            }
        })();
    });

        /*show all cancelled */
    $('button[name="cancelled_click"]').click((e) => {
        e.preventDefault(); 
        (async () => {
            try {
                appointmentsArray = await findAppointmentsByStatus(EnumStatus.VALUE3);
                renderAppointments("appointmentsList");
            } catch (error) {
                console.error('Error occurred while fetching appointments:', error);
            }
        })();
    });

    /*cancle selected appointment*/
    $(document).on('click', '#Cancel_Appointment', async function(e) {
        e.preventDefault();
        try {
            const appointmentId = $(this).attr('data-appointment-id');
            const cancelAppointmentRes = await getApoinmentFromAppointmentArray(appointmentsArray, appointmentId);
            console.log("appointmentId:", appointmentId);
            console.log(cancelAppointmentRes);
            const response = await cancelScheduleAppointmentById(cancelAppointmentRes);
            if (response === true) {
                cancelAppointment(cancelAppointmentRes.appointmentId);
                
                window.location.replace(`../appointment.html`);
            }else{
                throw new Error('Failed to cancel appointment.');
            }
            currentAppointmentId = null;
        } catch (error) {
            currentAppointmentId = null;
            alert('Error occurred while fetching appointments:', error);
        }
    });
        /*selected date*/
    $(document).on('click', '#dayButton', async function(e) {
        e.preventDefault();
        try {
            const selectedDate = await GetCalendarGrid();
            await findAllAppointmentByDate(selectedDate);
        } catch (error) {
            currentAppointmentId = null;
            alert('Error occurred while fetching appointments:', error);
        }
    });
}
function cancelAppointment(appointmentId) {
    $.ajax({
        url: `${URL}/appointment/updateAppointmentStatus`,
        method: 'post', 
        data: { appointmentId: appointmentId ,
                status: EnumStatus.VALUE3},
        success: function(response) {
            console.log("Appointment cancelled:", response);
            alert("Appointment cancelled");
        },
        error: function(err) {
            console.error("Error occurred while cancelling the appointment:", err);
            alert("Error occurred while cancelling the appointment");
        }
    });
}
function ComplitAppointment(appointmentId) {
    $.ajax({
        url: `${URL}/appointment/updateAppointmentStatus`,
        method: 'post', 
        data: { appointmentId: appointmentId ,
                status: EnumStatus.VALUE2},
        success: function(response) {
            console.log("Appointment Complited:", response);
            alert("Appointment Complited");
        },
        error: function(err) {
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
async function findAllAppointmentByDate(date) {
    try {
        const response = await fetch(`/appointment/findAllAppointmentByDate?date=${date}`);
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }
        const appointments = await response.json();
        appointmentsArray = appointments;
        renderAppointments("appointmentsList");
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
async function scheduleNewAppointment(newAppointment) {
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
async function cancelScheduleAppointmentById(appointmentId) {
    return new Promise((resolve, reject) => {
        $.post(`${URL}/scheduler/cancelAppointmentById`, appointmentId)
        .done((response) => {
            resolve(response);
        })
        .fail((xhr, status, error) => {
            reject(`Failed to cancel appointment: ${error}`);
        });
    });
}
async function updateAppointment(newAppointment,oldDate) {
    const qury = {newAppointment : newAppointment,oldDate : oldDate }
    $.post(`${URL}/appointment/updateAppointment`, qury)
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
    const selectElement = document.getElementById('select');
    const selectedValue = selectElement.value;
    const input = document.getElementById('din').value;
    var firstName = my_user.firstName;
    var lastName = my_user.lastName;
    if (selectedValue != my_user.userName){
        firstName = selectedValue;
        lastName = selectedValue;
    }
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
        userName: selectedValue,
        firstName: firstName,
        lastName: lastName,
        type: input,
        date: document.getElementById('nave').value,
        startTime: document.getElementById('tomer').value,
        duration : _duration,
      },
    };
    return formData;
}
async function createRescheduleAppointment(appointment) {
    let currentAppointment = {}; // Initialize as empty object
    currentAppointment.type = document.getElementById('din').value; // Set appointment properties
    currentAppointment.date = document.getElementById('nave').value;
    currentAppointment.startTime = document.getElementById('tomer').value;
    currentAppointment.appointmentId = appointment.appointmentId;
    return currentAppointment; // Return a valid DOM node
}
/*Invoke HTML object*/ 
function createAppointmentListItem(appointment, tabContent) {
    const li = document.createElement('li');
    li.classList.add('relative', 'flex', 'space-x-6', 'py-6', 'xl:static');

    const div = document.createElement('div');
    div.classList.add('flex-auto');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('absolute', 'right-0', 'top-6', 'xl:relative', 'xl:right-auto', 'xl:top-auto', 'xl:self-center');

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('absolute', 'right-0', 'z-10', 'mt-2', 'w-36', 'origin-top-right', 'rounded-md', 'bg-white', 'shadow-lg', 'ring-1', 'ring-black', 'ring-opacity-5', 'focus:outline-none');
    buttonsDiv.setAttribute('role', 'menu');
    buttonsDiv.setAttribute('aria-orientation', 'vertical');

    const buttonsInnerDiv = document.createElement('div');
    buttonsInnerDiv.classList.add('flex', 'flex-col', 'gap-2');

    const editButton = document.createElement('button');
    editButton.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-md', 'hover:bg-blue-600', 'focus:outline-none');
    editButton.setAttribute('id', 'Reschedule_Appointment');
    editButton.setAttribute('role', 'menuitem');
    editButton.setAttribute(`id`,`Reschedule`);
    editButton.textContent = 'Rschedule';
    editButton.setAttribute('data-appointment-id', appointment.appointmentId);


    const cancelButton = document.createElement('button');
    cancelButton.classList.add('bg-red-500', 'text-white', 'px-4', 'py-2', 'rounded-md', 'hover:bg-red-600', 'focus:outline-none');
    cancelButton.setAttribute('id', 'Cancel_Appointment');
    cancelButton.setAttribute('role', 'menuitem');
    cancelButton.setAttribute('id', 'Cancel_Appointment');
    cancelButton.setAttribute('data-appointment-id', appointment.appointmentId);
    cancelButton.textContent = 'Cancel';
    

    const idSpan = document.createElement("span");
    idSpan.setAttribute("data-appointment-id", appointment.appointmentId); 
    idSpan.style.display = "none"; 
    const h3 = document.createElement('h3');
    h3.classList.add('pr-10', 'font-semibold', 'text-gray-900', 'xl:pr-0');
    if(appointment.userName === my_user.userName || my_user.type === "admin"
    || processSubClients(appointment.userName) )
    {
        if(appointment.status === EnumStatus.VALUE1)
        {
            buttonsInnerDiv.appendChild(editButton);
            buttonsInnerDiv.appendChild(cancelButton);    
        }
        h3.textContent = `${appointment.firstName} ${appointment.lastName}, Appointment Type : ${appointment.type},` ;
    }else{
        h3.textContent = "The appointment is busy"; ;
    }
    editButton.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-md', 'hover:bg-blue-600', 'focus:outline-none');
    buttonsDiv.appendChild(buttonsInnerDiv);

    buttonsContainer.appendChild(buttonsDiv);
    const dl = document.createElement('dl');
    dl.classList.add('mt-2', 'flex', 'flex-col', 'text-gray-500', 'xl:flex-row');

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('flex', 'items-start', 'space-x-3');
    const dateDt = document.createElement('dt');
    dateDt.innerHTML = `<span class="sr-only">Date</span><svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" /></svg>`;
    const dateDd = document.createElement('dd');
    dateDd.innerHTML = `<time datetime="${appointment.date}">${appointment.date} </time> , Duration : ${appointment.duration} hours`;
    dateDiv.appendChild(dateDt);
    dateDiv.appendChild(dateDd);

    const locationDiv = document.createElement('div');
    locationDiv.classList.add('mt-2', 'flex', 'items-start', 'space-x-3', 'xl:ml-3.5', 'xl:mt-0', 'xl:border-l', 'xl:border-gray-400', 'xl:border-opacity-50', 'xl:pl-3.5');
    const locationDt = document.createElement('dt');

    li.appendChild(idSpan);
    dl.appendChild(dateDiv);

    div.appendChild(buttonsContainer); // Append the buttons container
    div.appendChild(h3);
    div.appendChild(dl);

    li.appendChild(div);

    return li;
}
function renderAppointments(listType) {
    const appointmentList = document.getElementById(listType);
    appointmentList.innerHTML = '';
    appointmentsArray.forEach(appointment => {
        if(appointment === null || appointment === undefined){
        }else{
         const appointmentHTML = createAppointmentListItem(appointment);
        appointmentList.appendChild(appointmentHTML);
        }
    });
}
async function getAppointmentId(){

    const spanElement = document.querySelector('span[data-appointment-id]');
    const appointmentId = spanElement.getAttribute('data-appointment-id');
    return appointmentId;
}
async function GetCalendarGrid() {
    const selectedDateButton = document.querySelector('.selected-date');
    const datetimeValue = selectedDateButton.querySelector('time').getAttribute('datetime');
    return datetimeValue;
}

async function getApoinmentFromAppointmentArray(appointmentsArray, currentAppointmentId){
    try{
        const appointment = appointmentsArray.find(appointment => appointment.appointmentId === currentAppointmentId);
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
function toggleModal() {
    var modal = document.getElementById('shir');
    modal.classList.toggle('show-modal');
}

function toggleModalHiden() {
    var modal = document.getElementById('shir');
    modal.classList.toggle('hidden');
}
async function getClientData() {
    try {
        const response = await fetch(`${URL}/client/findAllByUserName?userName=${my_user.userName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to get client data');
        }
        const clientData = await response.json();
        return clientData;
    } catch (error) {
        console.error('Error occurred while fetching client data:', error);
        throw error;
    }
}
function processSubClients(appointmentUserName) {
    for (const subClient of myClient.subClients) {
        try {
            if(subClient.subfirstName === appointmentUserName){
                return true;
            }
        } catch (error) {
            console.error('Error processing subClient:', error);
        }
    }
    return false;
}
async function isComplete() {
    const today = new Date();
    console.log("today:", today); // Log today's date and time
    appointmentsArray = appointmentsArray.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        console.log("appointmentDate:", appointmentDate); // Log each appointment's date and time

        if (appointmentDate < today) {
            // If the appointment date is before today's date, complete the appointment
            ComplitAppointment(appointment.appointmentId);
            return false; // Exclude appointment from the filtered array
        }
        return true; // Include appointment in the filtered array
    });
}

