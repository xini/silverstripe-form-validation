;(function () {
	'use strict';

	function initFormValidation() {
		
		var validate = new Bouncer(
			'form:not(.js-no-validation):not(.userform)',
			{
				fieldClass: 'error', // Applied to fields with errors
				errorClass: 'error message', // Applied to the error message for invalid fields
				
				// custom validator for checkbox groups
				// currently not working, see https://github.com/cferdinandi/bouncer/issues/40 
				// and https://github.com/cferdinandi/bouncer/issues/47 
				customValidations: {
					checkboxSet: function(field) { 
						// where at least one checkbox must be checked
						var wrapper = field.closest('[data-bouncer-required-set]');
						if (!wrapper) return false;	
						var checkboxes = wrapper.querySelectorAll('[type="checkbox"]');
						if (checkboxes.length > 0) {
							var checkedCount = 0;
							for (var i = 0; i < checkboxes.length; ++i) {
								if (checkboxes[i].checked) { 
									checkedCount++; 
								}
							}
							return checkedCount === 0 ? true : false;
						}
					}
				},
				messages: {
					checkboxSet: 'Please choose at least one option'
				}
			}
		);
		
		// remove duplicated error messages for checkbox groups
		document.addEventListener('bouncerShowError', function (event) {
			var field = event.target;
			var wrapper = field.closest('[data-bouncer-required-set]');
			if (typeof(wrapper) == 'undefined' || wrapper == null) { 
				return;
			}
			var messages = wrapper.querySelectorAll('[id^="bouncer-error_"]');
			if (messages.length > 1) {
				Array.prototype.forEach.call(messages, function (message, index) {
					if (index > 0) {
						message.remove();
					}
				});
			}
		}, false);
		
	}

	if (document.readyState === "loading") {
		// Loading hasn't finished yet
		document.addEventListener("DOMContentLoaded", initFormValidation);
	} else {
		// `DOMContentLoaded` has already fired
		initFormValidation();
	}

}());
