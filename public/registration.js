$(document).ready(function() {
  $("#sellerform").on("submit", function() {
    var productName = $("#name").val();
    var productSerialNumber = $("#number").val();
    var productCategory = $("#category").val();
    var productPrice = $("#price").val();
    var productDescription = $("#product").val();
    var productionDate = $("#date").val();
    var productImage = $("#image").val();
    var productHighlights1 = $("#feature1").val();
    var productHighlights2 = $("#feature2").val();
    var productHighlights3 = $("#feature3").val();
    $("#alert-box").empty();
    if (
      productName === "" ||
      productSerialNumber === "" ||
      productCategory === "" ||
      productPrice === "" ||
      productDescription === "" ||
      productionDate === "" ||
      productImage === ""
    ) {
      $("<p/>")
        .text("All Field Are Required")
        .addClass("alert alert-danger")
        .appendTo("#r-alert-box");
      return;
    }

    var flag = null;
    $.ajax({
      method: "POST",
      url: "/Seller-product",
      data: {
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
        productDescription: productDescription,
        productSerialNumber: productSerialNumber,
        productCategory: productCategory,
        productionDate: productionDate,
        productHighlights1: productHighlights1,
        productHighlights2: productHighlights2,
        productHighlights3: productHighlights3
      },
      dataType: "json",
      success: function(data) {
        if (data.flag == true) {
          $("<p/>")
            .text("Product added Successfully!!!!")
            .addClass("alert alert-primary mt-4")
            .appendTo("#r-alert-box");
          setTimeout(function() {
            window.location = " /seller-login";
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
  $("#container").click(function() {
    $("#r-alert-box").empty();
  });
});
