<?php

namespace App\Filament\Resources\EnquiryTypeResource\Pages;

use App\Filament\Resources\EnquiryTypeResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageEnquiryTypes extends ManageRecords
{
    protected static string $resource = EnquiryTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
