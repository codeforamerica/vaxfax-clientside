

function sendDataToServer(formData) {
	return $.ajax({
  		type: "POST",
		url: "http://app-2207.on-aptible.com/fax",
  		data: formData,
  		success: function(returnData){
  			window.location.href = "success.html"
  			console.log(returnData)
  		},
  		error: function(errorData){
  			console.log("error")
  			console.log(errorData)
  		},
  		dataType: "json",
  		contentType : "application/json"
	});
}


function submitItem(submitId, formId) {
	return $(submitId).submit(function( event ) {
		var formData = JSON.stringify($(formId).serializeArray());
	  	event.preventDefault();
	  	sendDataToServer(form)
	});	
}

$(function() {
 //    submitItem("#onlineSubmit", "#onlineForm")
 	console.log(location.pathname)
 	$("#onlineForm").submit(function( event ) {
		event.preventDefault();
		var formData = JSON.stringify($("#onlineForm").serializeArray());
		sendDataToServer(formData)
	});	


});