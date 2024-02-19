const EnumType = {
    VALUE1: 'value1',
    VALUE2: 'value2',
    VALUE3: 'value3'
};
const URL = window.location.origin;
window.onload = () => {
    $('button[name="form_submit"]').click((e) => {
        e.preventDefault(); 
        let inputValuesForm = postSetAppointment();
        createNewAppointment(inputValuesForm);
    });
};


function createNewAppointment(newAppointment){
    $.post(`${URL}/appointment/submitNewAppointment`, newAppointment)
    .done(newApp =>{
        console.log(newApp);
        alert("stoppppppppppp");
    })
    .fail(err => {
        console(err);
    });

}
function postSetAppointment() {
    const formData = {
      Appointment: {
        userName: 'AmitD',
        firstName: "Amit",
        lastName: "donski",
        type: EnumType.VALUE2,
        time: new Date(),
        date: new Date(),
      },
    };
    return formData;
}
