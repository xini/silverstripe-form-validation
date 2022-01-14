;(function () {
    'use strict';

    window.bouncerMessages = window.bouncerMessages || {};

    window.bouncerMessages = {
        missingValue: {
            checkbox: 'C\'est un champ obligatoire.',
            radio: 'Veuillez sélectionner une valeur.',
            select: 'Veuillez sélectionner une valeur.',
            'select-multiple': 'Veuillez sélectionner au moins une valeur.',
            default: 'Veuillez remplir ce champ.'
        },
        patternMismatch: {
            email: 'Veuillez entrer une adresse email valide.',
            url: 'Veuillez entrer une URL valide.',
            number: 'Veuillez entrer un nombre.',
            color: 'Veuillez utiliser le format suivant: #rrggbb',
            date: 'Veuillez utiliser le format suivant: YYYY-MM-DD',
            time: 'Veuillez utiliser le format 24 heures, par exemple 23:00',
            month: 'Veuillez utiliser le format suivant: JJJJ-MM',
            default: 'Veuillez utiliser le format donné.'
        },
        outOfRange: {
            over: 'Veuillez sélectionner une valeur ne dépassant pas {max}.',
            under: 'Veuillez sélectionner une valeur non inférieure à {min}.'
        },
        wrongLength: {
            over: 'Veuillez raccourcir ce texte à un maximum de {maxLength} caractères. Vous utilisez actuellement {length} caractères.',
            under: 'Veuillez étendre ce texte à {minLength} caractères ou plus. Vous utilisez actuellement {length} caractères.'
        },
        internationalPhoneNumber: 'Veuillez entrer un numéro de téléphone valide.'
    };

}());
