(function ($) {
	"use strict";

    // form validation
    $('#contact-form .input_field.required').on('change paste blur', function () {
		if ($(this).val().trim() == '') { $(this).addClass('inputEmpty').removeClass('inputNotEmpty'); }
		else { $(this).removeClass('inputEmpty').addClass('inputNotEmpty'); }
		if ($(this).val().trim() == '') { $(this).attr('placeholder', 'Field is Required!'); }
    });
	
    $("input[type='email']").on('change paste blur', function () {
        var sEmail = $("input[type='email']").val();
        if ($.trim(sEmail).length == 0) {
            $(this).addClass('invalid').removeClass('valid');
        }
        if (validateEmail(sEmail)) {
            $(this).addClass('valid').removeClass('invalid');
        }
        else {
            $(this).addClass('invalid').removeClass('valid');
        }
    });

    function validateEmail(sEmail) {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,10}\.[0-9]{1,10}\.[0-9]{1,10}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,10})(\]?)$/;
        if (filter.test(sEmail)) {
            return true;
        }
        else {
            return false;
        }
    }
	
	var form = $('#contact-form');
	var formMessages = $('.form-message');
	$(form).submit(function(e) {
		e.preventDefault();
		var formData = $(form).serialize();
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');
			$(formMessages).text(response);
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});
})(jQuery);