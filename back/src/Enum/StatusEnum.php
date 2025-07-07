<?php

namespace App\Enum;

enum StatusEnum: string
{
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
}
