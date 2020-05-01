<?php

namespace Innoweb\FormValidation\Forms\Extensions;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\Controller;
use SilverStripe\GraphQL\Controller as GraphQLController;
use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class FormFieldExtension extends Extension
{
    public function onBeforeRender($field, $properties) {
        $controller = Controller::curr();
        if ($controller && !is_a($controller, LeftAndMain::class) && !is_a($controller, GraphQLController::class)) {
            Requirements::javascript(
                'innoweb/silverstripe-form-validation: client/dist/javascript/form-validation.js',
                ['defer' => true]
            );
        }
    }
}