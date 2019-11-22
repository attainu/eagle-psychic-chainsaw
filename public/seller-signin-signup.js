$(document).ready(function () {
    $('#signUp').on('click',function(){
        $('#container').addClass('right-panel-active');
    });
    $('#signIn').on('click',function(){
        $('#container').removeClass('right-panel-active');
    });
   

});