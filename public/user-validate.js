$(document).ready(function () {

    //User Validation
    $('#login-form').on('submit', function () {
        var email = $('#l-email').val();
        var password = $('#l-password').val();
        $("#r-alert-box").empty();
        if (email.trim() == '' || password == '') {
            $('<p/>').text("Username or Password not Entered").addClass("alert alert-primary mt-4").appendTo("#r-alert-box");
            return;
        }

        $.ajax({
            method: "POST",
            url: "/user-signin",
            data: {
                email: email,
                password: password
            },
            dataType: 'json',
            success: function (data) {
                if (data.flag == true) {
                    $('<p/>').text("Succefully Login").addClass("alert alert-success mt-4").appendTo("#r-alert-box");
                    setTimeout(function () { $(location).attr('href', '/') }, 1000);

                }
                else {
                    $('<p/>').text("Wrong Username or Password").addClass("alert alert-danger mt-4").appendTo("#r-alert-box");
                }

            },
            error: function () {

            }
        });
    });

    // Registration Validation
    $('#register-form').on('submit', function () {
        var name = $('#r-name').val();
        var password = $('#r-password').val();
        var number = $('#r-number').val();
        var email = $('#r-email').val();
        var c_password = $('#r-password1').val();
        $("#r-alert-box").empty();
        if (name.trim() == '' || password == '' || number == '' || email == '') {
            $('<p/>').text("All Field Are Required").addClass("alert alert-primary mt-4").appendTo("#r-alert-box");
            return;
        }
        if (password != c_password) {
            $('<p/>').text("Password Not Matched").addClass("alert alert-danger mt-4").appendTo("#r-alert-box");
            return;
        }
        var flag = null;
        $.ajax({
            method: "POST",
            url: "/user-signup",
            data: {
                name: name,
                email: email,
                number: number,
                password: password
            },
            dataType: 'json',
            success: function (data) {
                $('<p/>').text("Succefully Register").addClass("alert alert-success mt-4").appendTo("#r-alert-box");
                setTimeout(function () { $(location).attr('href', '/user-login') }, 1000);
            },
            error: function () {
                $('<p/>').text("Email Already In Use").addClass("alert alert-success mt-4").appendTo("#r-alert-box");
            }
        });


    });
    $("#container").click(function () {
        $("#r-alert-box").empty();
    });
})