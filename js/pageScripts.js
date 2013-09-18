$(document).ready(function(){
	var email = 'mmiller@rdacorp.com';
	var password = 'smallpox';
	// Set username and password (provided by Jim).
    $.ajaxSetup({
        headers: { 'Authorization': 'Basic ' + email + ':' + password }
    });
	
	$('.MainContent').pagination({
		source:'http://brownbagapi.azurewebsites.net/api/people?page={{page}}&pageSize={{pageSize}}',
		pageSize: 5,
		startingPage: 1,
		templateIdentifiers: '#entry-template'
	});
});	