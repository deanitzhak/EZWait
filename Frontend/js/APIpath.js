function postSetAppointment() {
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
    //   url: APIpaths["appointment"],
    
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
      postSetAppointment();
    });
  }
  
  