# Bouncer.js Form Validation

[![Version](https://img.shields.io/packagist/v/innoweb/silverstripe-form-validation.svg?style=flat-square)](https://packagist.org/packages/innoweb/silverstripe-form-validation)
[![License](https://img.shields.io/packagist/l/innoweb/silverstripe-form-validation.svg?style=flat-square)](license.md)

## Introduction

Adds automatic form validation for frontend forms using the [Bouncer.js] (https://github.com/cferdinandi/bouncer) library. This replaces the default HTML5 field validation to improve and unify the layout of error messages accross browsers. 

This doesn't replace backend form validation. Backend validation should still be done using the default SS validator (e.g. RequiredFields).

It leaves [UserForms] (https://github.com/silverstripe/silverstripe-userforms) forms alone as they are too heavily dependant on jQuery.

## Requirements

 * SilverStripe ^4

## Installation

Install the module using composer:
```
composer require innoweb/silverstripe-form-validation dev-master
```
Then run dev/build.

## Configuration

No configuration required. By default, all frontend forms are being validated based on their HTML5 properties. 

### Disable validation

If you want to exclude a form from validation, you can disable it in code:

```
$form = Form::create($controller, 'MyForm', $fields, $actions, $validator);
$form->disableFrontendValidation();
```

### Add Custom Validators

You can inject custom JavaScript validators for certain fields. To do so, you need to extend `FormField` as follows:

```
SilverStripe\Forms\FormField:
  extensions:
    - Your\Custom\ValidationExtension
```

Use the `addCustomValidatorScripts` extension hook to inject your JavaScript validator:

```
class ValidationExtension extends Extension
{
    // needs to be run on base FormField class, otherwise it's not going to be loaded on time
    public function addCustomValidatorScripts() {
        Requirements::javascript(
            'your/custom/field-validation.js'
        );
    }
}
```

In your `field-validation.js` you need to add your validator definition to the global `bouncerValidators` variable:

```
window.bouncerValidators = window.bouncerValidators || {};
		
window.bouncerValidators.yourCustomValidator = {
	validator: function(field) { 
		if (field.classList.contains('YourCustomField')) { // limit validator to your custom field type
			if (...) {
				// return true if field is NOT valid
				return true;
			}
		}
		// return false if field is valid!
		return false;
	},
	message: 'Please enter a valid value'
};
```

## License

BSD 3-Clause License, see [License](license.md)
