$(document).ready(function(){
$("#password1").mouseleave(function(){
	var pass  = document.getElementById("password").value;
         var rpass  = document.getElementById("password1").value;
        if(pass != rpass){
            document.getElementById("submit").disabled = true;
             alert("Password didn't match")
        }else{
            
            document.getElementById("submit").disabled = false;
        }

   });
});
 
  
         