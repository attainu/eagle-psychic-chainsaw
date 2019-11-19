$(document).ready(function () {

    //User Validation
    $('#login-form').on('submit', function () {
        var email = $('#l-email').val();
        var password = $('#l-password').val();
        console.log("hello");
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
                console.log(data);
                if (data.flag == true) {
                    setTimeout(function () { $('<p/>').text("Succefully Login").addClass("alert alert-success mt-4").appendTo("#r-alert-box"); }, 1000);
                    $(location).attr('href', '/')
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
        console.log("hello");
        $("#r-alert-box").empty();
        if (name.trim() == '' || password == '' || number == '' || email == '') {
            $('<p/>').text("All Field Are Required").addClass("alert alert-primary mt-4").appendTo("#r-alert-box");
            return;
        }
        if (password != c_password) {
            $('<p/>').text("Password Not Matched").addClass("alert alert-danger mt-4").appendTo("#r-alert-box");
            return;
        }
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
            success: function () {
                $(location).attr('href', '/user-login')
            },
            error: function () {

            }
        });
        $(location).attr('href', '/user-login')
    });
    $("#container").click(function () {
        $("#r-alert-box").empty();
    });
})