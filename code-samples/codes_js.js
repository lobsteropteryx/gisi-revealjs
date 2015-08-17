require(["dojo/request"], function(request){
    request("/contacts/1").then(function(data){
        if (data.hasError || !data.success) {
            // handle an error, even though we got 200 OK
            // note that we don't even have a real contact object!
        } else {
            // It really WAS successful, so we actually got back a contact object
            // display data.email, data.name, etc.
        }
    }, function(err){
        // handle an error -- we got an actual error HTTP code
    });
});