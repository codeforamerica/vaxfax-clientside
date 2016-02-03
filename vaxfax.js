
function successText(faxId) {
    return "Success! We have received your fax and your \
    fax id is " + faxId + ". We will update you \
    when the records have been sent to the school."
}

function failureText(faxId) {
    return "We are sorry, but your request was unsuccessful. \
    Please try again. If you continue to have issues, please \
    call the Kansas City Department of Health Services at \
    ***-***-****."
}

function processResult(result) {
    if(result === true) {
        $("#onlineForm")[0].reset();
        window.location.href = "success.html"
    }
}

function createDialog(dialogCopy, clear) {
    return $("#dialog").dialog({
        create: function( event, ui ) {
            $("#dialogContent").html(dialogCopy)
        },
        autoOpen: false,
        modal: true,
        buttons: {
            "ok": function() {
                $(this).dialog("destroy");
                processResult(clear);
            }
        }
    });
}

function successCallbackFunction(dataResponse) {
    var returnText = successText(dataResponse['fax_id'])
    createDialog(returnText, true).dialog("open")
}

function failureCallbackFunction(dataResponse) {
    var returnText = failureText()
    createDialog(returnText, false).dialog("open")
}

function sendDataToServer(formData, successFunction, errorFunction) {
    return $.ajax({
        type: "POST",
        url: "http://app-2207.on-aptible.com/fax",
        // url: "http://127.0.0.1:5000/fax",
        data: formData,
        success: function(returnData){
            successFunction(returnData)
        },
        error: function(errorData){
            errorFunction(errorData)
        },
        contentType : "application/json"
    });
}


function submitItem(submitId, formId) {
    return $(submitId).submit(function( event ) {
        var formData = JSON.stringify($(formId).serializeArray());
        event.preventDefault();
        sendDataToServer(formData);
    }); 
}

function getCalendarDate() {
    var year  = $("#dob-year").val();
    var month = $("#dob-month").val();
    var day   = $("#dob-day").val();
    return month + "-" + day + "-" + year;
}

$(function() {
    $("#onlineForm").submit(function( event ) {
        event.preventDefault();
        var formData = $("#onlineForm").find(':input').serializeArray()
            .reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
        formData['child_dob'] = getCalendarDate()
        formData = JSON.stringify(formData)
    
        sendDataToServer(formData, successCallbackFunction, failureCallbackFunction)
    }); 


});