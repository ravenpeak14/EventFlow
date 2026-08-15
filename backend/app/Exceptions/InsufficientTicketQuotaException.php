<?php

namespace App\Exceptions;

use Exception;

class InsufficientTicketQuotaException extends Exception
{
    public function __construct(string $ticketTypeName)
    {
        parent::__construct("Not enough quota available for '{$ticketTypeName}'.");
    }

    public function render()
    {
        return response()->json(['message' => $this->getMessage()], 422);
    }
}