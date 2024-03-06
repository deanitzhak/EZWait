const domain = 'http://localhost:3000';
export const APIpaths = {
    appointment: domain + "Frontend/appointment",
    conection: domain + "Frontend/conection",
    CustomerList: domain + "Frontend/CustomerList",
    profilePage: domain + "Frontend/profilePage",
    signIn: domain + "Frontend/signIn",
    signup: domain + "Frontend/signup",
    // sendMail: domain + "/api/mail/sendMail",
    // createTemplate: domain + "/api/templates",
    // editTemplate: domain + "/api/templates",
    // deleteTemplate: domain + "/api/templates",
    // numTemplates: domain + "/api/templates/num",
    // welcomeHTML: domain + "/api/welcomeHTML",
    domain: domain,
};
  
function createNewAppointmentFromUserData() {
    const formData = {
      Appointment: {
        firstname: $("input[name=Type]").val(),
        lastName: $("input[name=Type]").val(),
        type: $("input[name=Type]").val(),
        time: $("input[name=time]").val(),
        date: $("input[name=date]").val(),
      },
    };
    $.ajax({
    //   url: paths["appointment"],
      url: ["http://localhost:3000/appointment.html"],
      type: "POST",
      data: formData,
      dataType: "json",
    })
      .done(function (data) {
        top.location.href = "appointment.html";
      })
      .fail(function (jqXHR, textStatus, message) {
        alert(`Error - Login - ${textStatus} ,  ${message}`);
        $("error-handler").html(JSON.stringify(message));
      });
  }
  function clickSubmit() {
    $(document).on("click", "#submit", function (e) {
      e.preventDefault();
      //alert("herrre");
      createNewAppointmentFromUserData();
    });
  }
  
