;(function () {
    'use strict';

    window.bouncerMessages = window.bouncerMessages || {};

    window.bouncerMessages = {
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
            time: 'Please enter a valid time value.',
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
        },
        internationalPhoneNumber: 'Please enter a valid phone number'
    };

}());
