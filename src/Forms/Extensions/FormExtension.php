<?php

namespace Innoweb\FormValidation\Forms\Extensions;

use SilverStripe\Core\Extension;

class FormExtension extends Extension
{
    public function disableFrontendValidation()
    {
        $this->getOwner()->addExtraClass('js-no-validation');
        return $this->getOwner();
    }
    
    public function disableFormSubmission()
    {
        $this->getOwner()->addExtraClass('js-disable-submit');
        return $this->getOwner();
    }
}
