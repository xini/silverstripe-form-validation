<?php

namespace Innoweb\FormValidation\Forms\Extensions;

use SilverStripe\Core\Extension;

class FormExtension extends Extension
{
    public function disableFrontendValidation() {
        $this->owner->addExtraClass('js-no-validation');
        return $this->owner;
    }
	
    public function disableFormSubmission() {
        $this->owner->addExtraClass('js-disable-submit');
        return $this->owner;
    }
}