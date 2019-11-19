$(document).ready(function () {
    console.log("hello")
    $("#password1").focusout(function () {
        console.log("hello");
        var pass = $('#password').val();
        var rpass = $('#password1').val();
        if (pass != rpass) {
            $("#submit").disabled = true;
            alert("Password didn't match");
        } else {

            $("#submit").disabled = false;
        }

    });
});