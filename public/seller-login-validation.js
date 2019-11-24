$(document).ready(function() {
  $("#myform").submit(function() {
    var pass = $("#password").val();
    var cnfrmpass = $("#password1").val();
    var name = $("#name").val();
    var company = $("#company").val();
    var number = $("#number").val();
    var email = $("#email1").val();

    if (pass != cnfrmpass) {
      swal("Your password didn't match!!!!!");
      return false;
    } else {
      $.ajax({
        method: "POST",
        url: "/seller",
        data: {
          name: name,
          email: email,
          number: number,
          company: company,
          password: pass
        },
        dataType: "json",
        success: function(data) {
          $("<p/>")
            .text("Account Successfully creted!!!!!!")
            .addClass("alert alert-primary mt-4")
            .appendTo("#r-alert-box");
          setTimeout(function() {
            window.location = "/seller-login";
          }, 1500);
        },
        error: function() {
          $("<p/>")
            .text("Email Already In Use")
            .addClass("alert alert-success mt-4")
            .appendTo("#r-alert-box");
        }
      });
    }
  });
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
});
