<?php
namespace App\Filament\Resources\ContactInfoResource\Pages;
use App\Filament\Resources\ContactInfoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
class ListContactInfo extends ListRecords
{
    protected static string $resource = ContactInfoResource::class;
    protected function getHeaderActions(): array { return [Actions\CreateAction::make()]; }
}
