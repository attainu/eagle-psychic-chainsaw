$(document).ready(function() {
  /*-------------- to disable input box of seller modification form------------------------*/
  $("#check1").click(function() {
    $("#1").prop("disabled", false);
  });
  $("#check2").click(function() {
    $("#2").prop("disabled", false);
  });
  $("#check3").click(function() {
    $("#3").prop("disabled", false);
  });
  $("#check4").click(function() {
    $("#4").prop("disabled", false);
  });
  $("#check5").click(function() {
    $("#5").prop("disabled", false);
  });

  /*--------------------------- ajax call to check if user exist or not-----------------------*/

  $("#sellersignin").on("submit", function() {
    var email = $("#email2").val();
    var password = $("#seller-password").val();
    $.ajax({
      method: "POST",
      url: "/seller_signin",
      data: {
        email: email,
        password: password
      },
      dataType: "json",
      success: function(data) {
        if (data.flag == true) {
          $("<p/>")
            .text("Welcome to our online selling platform")
            .addClass("alert alert-primary mt-4")
            .appendTo("#r-alert-box");
          setTimeout(function() {
            window.location = " /seller-profile";
          }, 1500);
        } else {
          console.log("hi");
          $("<p/>")
            .text("Wrong Username or Password")
            .addClass("alert alert-danger mt-4")
            .appendTo("#r-alert-box");
        }
      },
      error: function() {}
    });
  });

  /*----------------------if email is registerd or not---------------------------*/

  $("#CheckPincode").click(function() {
    alert("hi");
    var pass = $("#pincode").val();
    console.log(pass);
    console("gi");
  });
});
