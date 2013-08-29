$(document).ready(function(){
	var email = 'mmiller@rdacorp.com';
	var password = 'smallpox';
	// Set username and password (provided by Jim).
    $.ajaxSetup({
        headers: { 'Authorization': 'Basic ' + email + ':' + password }
    });
    $.get('http://brownbagapi.azurewebsites.net/api/Cities/', function(data){console.log(data);});
	// Gets all cities...
    $.get('http://brownbagapi.azurewebsites.net/api/cities', function(data){
        console.log(data);
    });
    
    // Get the person with id of 2...
    $.get('http://brownbagapi.azurewebsites.net/api/people/1002', function(person){
        console.log(person);
    });
});