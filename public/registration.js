$(document).ready(function () {
    $("#sellerform").on('submit', function () {
        var productName = $('#name').val();
        var productSerialNumber = $('#number').val();
        var productCategory = $('#category').val();
        var productPrice = $('#price').val();
        var productDescription = $('#product').val();
        var productionDate = $('#date').val();
        var productImage = $('#image').val();
        $('#alert-box').empty();
        if (productName === '' || productSerialNumber === '' || productCategory === '' || productPrice === '' || productDescription === '' || productionDate === '' || productImage === '') {
            
            $('<p/>').text("All Field Are Required").addClass("alert alert-danger").appendTo("#r-alert-box");
            return;
        }

        var flag = null;
        $.ajax({
            method: "POST",
            url: "/product_registration",
            data: {
                productName: productName,
                productPrice: productPrice,
                productImage: productImage,
                productDescription: productDescription,
                productSerialNumber: productSerialNumber,
                productCategory: productCategory,
                productionDate: productionDate
            },
            dataType: 'json',
            success: function (data) {
                $('<p/>').text("Product added Successfully!").addClass("alert alert-success").appendTo("#r-alert-box");
                setTimeout(function () { $(location).attr('href', '/seller-profile') }, 1000);
            }
        });
    });
    $("#container").click(function () {
        $("#r-alert-box").empty();
    });
});