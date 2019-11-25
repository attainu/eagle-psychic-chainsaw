$(document).ready(function () {
    console.log("1...")
    //Add to cart
    $("#addtocart").on("submit", function () {
        var id = $("#addToCart").val();
        console.log("2...");
        $.ajax({
            method: "POST",
            url: "/cart",
            data: {
                id: id
            },
            dataType: "json",
            success: function (data) {

            },
            error: function () { }
        });
    });
    $("#delete").on("click", function () {
        var href = $(this).attr('href');
        console.log(href)
        $.ajax({
            method: "GET",
            url: href,
            success: function (data) {

            },
            error: function () { }
        });
    });
})