;(function () {
    'use strict';

    function initFormValidation() {
        // define custom validations
        var validators = {
            // custom validator for checkbox groups
            // currently not working, see https://github.com/cferdinandi/bouncer/issues/40
            // and https://github.com/cferdinandi/bouncer/issues/47
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
        };
        // define custom messages
        var messages = {
            checkboxSet: 'Please choose at least one option',
            missingValue: {
                checkbox: 'This field is required.',
                radio: 'Please select a value.',
                select: 'Please select a value.',
                'select-multiple': 'Please select at least one value.',
                default: 'Please fill out this field.'
            },
            patternMismatch: {
                email: 'Please enter a valid email address.',
                url: 'Please enter a URL.',
                number: 'Please enter a number',
                color: 'Please match the following format: #rrggbb',
                date: 'Please use the YYYY-MM-DD format',
                time: 'Please use the 24-hour time format. Ex. 23:00',
                month: 'Please use the YYYY-MM format',
                default: 'Please match the requested format.'
            },
            outOfRange: {
                over: 'Please select a value that is no more than {max}.',
                under: 'Please select a value that is no less than {min}.'
            },
            wrongLength: {
                over: 'Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.',
                under: 'Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.'
            }
        };

        // load globally defined validators, e.g. for international phone field (see https://github.com/xini/silverstripe-international-phone-number-field)
        // example:
        //
        // window.bouncerValidators = window.bouncerValidators || {};
        // window.bouncerValidators.phoneNumber = {
        //     validator: function(field) { ... }, // return false if field is valid!
        //     message: 'Please enter a valid phone number'
        // };
        var bouncerValidators = window.bouncerValidators || {};
        for (var validatorName in bouncerValidators) {
            if (bouncerValidators.hasOwnProperty(validatorName)) {
                if (bouncerValidators[validatorName].hasOwnProperty('validator')) {
                    validators[validatorName] = bouncerValidators[validatorName].validator;
                }
                if (bouncerValidators[validatorName].hasOwnProperty('message')) {
                    messages[validatorName] = bouncerValidators[validatorName].message;
                }
            }
        }

        // load translated messages
        var bouncerMessages = window.bouncerMessages || {};
        messages = extend(true, messages, bouncerMessages);

        // init bouncer for each form separately in order to control the settings
        var forms = document.querySelectorAll('form:not(.js-no-validation):not(.userform)');
        Array.prototype.forEach.call(forms, function(form, i) {
            if (form.hasAttribute('id')) {
                var formID = form.getAttribute('id');
                var disableSumbit = false;
                if (form.classList.contains('js-disable-submit')) {
                    disableSumbit = true;
                }
                var bouncer = new Bouncer(
                    '#' + formID,
                    {
                        fieldClass: 'error', // Applied to fields with errors
                        errorClass: 'message error', // Applied to the error message for invalid fields
                        customValidations: validators,
                        messages: messages,
                        disableSubmit: disableSumbit
                    }
                );
            }
        });

        // clean up error messages
        document.addEventListener('bouncerShowError', function (event) {
            var field = event.target;
            var wrapper = field.closest('.middleColumn');
            if (typeof(wrapper) !== 'undefined' && wrapper !== null) {
                // remove duplicated error messages, e.g. for checkbox groups
                var messages = wrapper.querySelectorAll('.message');
                if (messages.length > 1) {
                    Array.prototype.forEach.call(messages, function (message, index) {
                        if (index > 0) {
                            message.remove();
                        }
                    });
                }
                // place message at the end of middleColumn
                var message = wrapper.querySelector('.message');
                if (typeof(message) !== 'undefined' && message !== null) {
                    wrapper.appendChild(message);
                }
            }
        }, false);

    }

    // merge json objects, see https://gomakethings.com/merging-objects-with-vanilla-javascript/
    // var shallowMerge = extend(obj1, obj2);
    // var deepMerge = extend(true, obj1, obj2);
    var extend = function () {
        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        // Check if a deep merge
        if (typeof (arguments[0]) === 'boolean') {
            deep = arguments[0];
            i++;
        }
        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        // If we're doing a deep merge and the property is an object
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        // Otherwise, do a regular merge
                        extended[prop] = obj[prop];
                    }
                }
            }
        };
        // Loop through each object and conduct a merge
        for (; i < arguments.length; i++) {
            merge(arguments[i]);
        }
        return extended;
    };


    if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", initFormValidation);
    } else {
        // `DOMContentLoaded` has already fired
        initFormValidation();
    }

}());
