<?php

namespace Innoweb\FormValidation\Forms\Extensions;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Manifest\ModuleLoader;
use SilverStripe\GraphQL\Controller as GraphQLController;
use SilverStripe\Core\Extension;
use SilverStripe\i18n\i18n;
use SilverStripe\View\Requirements;

class FormFieldExtension extends Extension
{
    public function onBeforeRender($field, $properties) {
        $controller = Controller::curr();
        if ($controller
            && !is_a($controller, LeftAndMain::class)
            && !is_a($controller, GraphQLController::class)
            && (($form = $this->getOwner()->getForm()) && (!$form->hasExtraClass('js-no-validation') || ($form->hasExtraClass('js-disable-submit'))))
        ) {
            $language = explode('_', i18n::get_locale())[0];
            $module = ModuleLoader::getModule('innoweb/silverstripe-form-validation');
            if ($module->hasResource("client/dist/javascript/lang/{$language}.js")) {
                Requirements::javascript(
                    $module->getResource("client/dist/javascript/lang/{$language}.js")->getRelativePath(),
                    ['defer' => true]
                );
            } elseif ($module->hasResource("client/dist/javascript/lang/en.js")) {
                // load en as default
                Requirements::javascript(
                    $module->getResource("client/dist/javascript/lang/en.js")->getRelativePath(),
                    ['defer' => true]
                );
            }

            // needs to be run on base FormField class, otherwise it's not going to be loaded on time
            $this->getOwner()->invokeWithExtensions('addCustomValidatorScripts');

            Requirements::javascript(
                'innoweb/silverstripe-form-validation: client/dist/javascript/form-validation.js',
                ['defer' => true]
            );
        }
    }
}
