;(function () {
    'use strict';

    window.bouncerMessages = window.bouncerMessages || {};

    window.bouncerMessages = {
        missingValue: {
            checkbox: 'Dies ist ein Pflichtfeld.',
            radio: 'Bitte wählen Sie einen Wert aus.',
            select: 'Bitte wählen Sie einen Wert aus.',
            'select-multiple': 'Bitte wählen Sie mindestens einen Wert aus.',
            default: 'Bitte füllen Sie dieses Feld aus.'
        },
        patternMismatch: {
            email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            url: 'Bitte geben Sie eine gültige URL ein.',
            number: 'Bitte geben Sie eine Nummer ein.',
            color: 'Bitte verwenden Sie das folgende Format: #rrggbb',
            date: 'Bitte verwenden Sie das Format YYYY-MM-DD.',
            time: 'Bitte geben Sie eine gültige Zeit ein.',
            month: 'Bitte verwenden Sie das Format JJJJ-MM.',
            default: 'Bitte verwenden Sie das angegebene Format.'
        },
        outOfRange: {
            over: 'Bitte wählen Sie einen Wert aus, der nicht größer als {max} ist.',
            under: 'Bitte wählen Sie einen Wert aus, der nicht kleiner als {min} ist.'
        },
        wrongLength: {
            over: 'Bitte kürzen Sie diesen Text auf maximal {maxLength} Zeichen. Sie verwenden derzeit {length} Zeichen.',
            under: 'Bitte verlängern Sie diesen Text auf {minLength} Zeichen oder mehr. Sie verwenden derzeit {length} Zeichen.'
        },
        internationalPhoneNumber: 'Bitte geben Sie eine gültige Telefonnummer ein.'
    };

}());
