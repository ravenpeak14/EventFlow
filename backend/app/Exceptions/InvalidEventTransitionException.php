<?php

namespace App\Exceptions;

use Exception;

class InvalidEventTransitionException extends Exception
{
    public function __construct(string $from, string $to)
    {
        parent::__construct("Cannot transition event from '{$from}' to '{$to}'.");
    }

    public function render()
    {
        return response()->json(['message' => $this->getMessage()], 422);
    }
}