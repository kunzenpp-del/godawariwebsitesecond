<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AboutUsResource\Pages;
use App\Models\AboutUs;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AboutUsResource extends Resource
{
    protected static ?string $model = AboutUs::class;
    protected static ?string $navigationIcon = 'heroicon-o-information-circle';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 1;
    protected static ?string $navigationLabel = 'About Us';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Section Details')->schema([
                Forms\Components\Select::make('section_key')
                    ->options([
                        'hero' => 'Hero Section',
                        'story' => 'Our Story',
                        'mission' => 'Mission',
                        'vision' => 'Vision',
                        'values' => 'Values',
                        'team' => 'Team',
                        'why_choose_us' => 'Why Choose Us',
                        'milestones' => 'Milestones',
                    ])
                    ->required()
                    ->unique(ignoreRecord: true),
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\RichEditor::make('content')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->directory('about-us'),
            ])->columns(2),

            Forms\Components\Section::make('Additional Data')->schema([
                Forms\Components\KeyValue::make('metadata')
                    ->addActionLabel('Add Item')
                    ->keyLabel('Key')
                    ->valueLabel('Value')
                    ->columnSpanFull()
                    ->helperText('Use for stats, features, or other structured data'),
            ]),

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
                Tables\Columns\TextColumn::make('section_key')
                    ->label('Section')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->limit(50),
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
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
            'index' => Pages\ListAboutUs::route('/'),
            'create' => Pages\CreateAboutUs::route('/create'),
            'edit' => Pages\EditAboutUs::route('/{record}/edit'),
        ];
    }
}
