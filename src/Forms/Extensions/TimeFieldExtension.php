<?php

namespace Innoweb\FormValidation\Forms\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\ORM\FieldType\DBTime;

class TimeFieldExtension extends Extension
{
    public function updateAttributes(&$attributes)
    {
        if ($this->getOwner()->getTimeFormat() == DBTime::ISO_TIME) {
            $attributes['pattern'] = '([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]';
        }
    }
}
