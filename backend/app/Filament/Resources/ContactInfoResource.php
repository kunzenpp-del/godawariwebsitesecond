<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactInfoResource\Pages;
use App\Models\ContactInfo;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContactInfoResource extends Resource
{
    protected static ?string $model = ContactInfo::class;
    protected static ?string $navigationIcon = 'heroicon-o-phone';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 2;
    protected static ?string $navigationLabel = 'Contact Info';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Contact Details')->schema([
                Forms\Components\Select::make('type')
                    ->options([
                        'phone' => 'Phone',
                        'email' => 'Email',
                        'address' => 'Address',
                        'social' => 'Social Media',
                        'working_hours' => 'Working Hours',
                        'map' => 'Map Location',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('label')
                    ->maxLength(255)
                    ->placeholder('e.g., Main Office, Support Email'),
                Forms\Components\Textarea::make('value')
                    ->required()
                    ->rows(2),
                Forms\Components\TextInput::make('icon')
                    ->maxLength(50)
                    ->placeholder('e.g., phone, mail, map-pin'),
                Forms\Components\TextInput::make('link')
                    ->maxLength(500)
                    ->placeholder('e.g., tel:+977..., mailto:..., https://...'),
            ])->columns(2),

            Forms\Components\Section::make('Settings')->schema([
                Forms\Components\TextInput::make('order')
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('is_active')
                    ->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->colors([
                        'primary' => 'phone',
                        'success' => 'email',
                        'warning' => 'address',
                        'info' => 'social',
                    ])
                    ->sortable(),
                Tables\Columns\TextColumn::make('label')
                    ->searchable(),
                Tables\Columns\TextColumn::make('value')
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->value),
                Tables\Columns\TextColumn::make('icon'),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'phone' => 'Phone',
                        'email' => 'Email',
                        'address' => 'Address',
                        'social' => 'Social Media',
                        'working_hours' => 'Working Hours',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactInfo::route('/'),
            'create' => Pages\CreateContactInfo::route('/create'),
            'edit' => Pages\EditContactInfo::route('/{record}/edit'),
        ];
    }
}
