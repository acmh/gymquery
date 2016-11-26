(function() {

	$(document).on('click', '#login-form-link', function(e) {
		e.preventDefault();
		console.log('click');
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
	});

    $(document).on('click', '#register-form-link', function(e) {
    	e.preventDefault();
		console.log('click');	
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
	
	})

})();
