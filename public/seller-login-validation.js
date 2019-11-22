$(document).ready(function() {
  $("#myform").submit(function() {
    var pass = $("#password").val();
    var cnfrmpass = $("#password1").val();

    if (pass != cnfrmpass) {
      swal("Your password didn't match!!!!!");
      return false;
    } else {
      swal("Account created sucessfully");
      return true;
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
});
