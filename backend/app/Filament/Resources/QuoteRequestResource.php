<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuoteRequestResource\Pages;
use App\Models\QuoteRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class QuoteRequestResource extends Resource
{
    protected static ?string $model = QuoteRequest::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Shop';
    protected static ?int $navigationSort = 3;
    protected static ?string $navigationLabel = 'Quote Requests';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Customer Information')->schema([
                Forms\Components\TextInput::make('first_name')
                    ->disabled(),
                Forms\Components\TextInput::make('last_name')
                    ->disabled(),
                Forms\Components\TextInput::make('phone')
                    ->disabled(),
                Forms\Components\TextInput::make('email')
                    ->disabled(),
            ])->columns(2),

            Forms\Components\Section::make('Product Details')->schema([
                Forms\Components\TextInput::make('product')
                    ->disabled(),
                Forms\Components\TextInput::make('dimensions')
                    ->label('Dimensions')
                    ->disabled()
                    ->default(fn ($record) => $record ? $record->dimensions : ''),
                Forms\Components\TextInput::make('quantity')
                    ->disabled(),
                Forms\Components\TextInput::make('quantity_2')
                    ->disabled(),
                Forms\Components\TextInput::make('quantity_3')
                    ->disabled(),
            ])->columns(2),

            Forms\Components\Section::make('Design File')->schema([
                Forms\Components\FileUpload::make('design_file')
                    ->disabled()
                    ->downloadable(),
                Forms\Components\Textarea::make('comments')
                    ->disabled()
                    ->rows(3)
                    ->columnSpanFull(),
            ]),

            Forms\Components\Section::make('Admin Actions')->schema([
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('quoted_price')
                    ->numeric()
                    ->prefix('Rs.')
                    ->placeholder('Enter quoted price'),
                Forms\Components\Textarea::make('admin_notes')
                    ->rows(3)
                    ->placeholder('Internal notes about this quote'),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),
                Tables\Columns\TextColumn::make('full_name')
                    ->label('Customer')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('product')
                    ->searchable()
                    ->limit(30),
                Tables\Columns\TextColumn::make('quantity')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'primary' => 'processing',
                        'success' => 'completed',
                        'danger' => 'cancelled',
                    ]),
                Tables\Columns\TextColumn::make('quoted_price')
                    ->money('NPR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ]),
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('from'),
                        Forms\Components\DatePicker::make('until'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn ($q, $date) => $q->whereDate('created_at', '>=', $date))
                            ->when($data['until'], fn ($q, $date) => $q->whereDate('created_at', '<=', $date));
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuoteRequests::route('/'),
            'create' => Pages\CreateQuoteRequest::route('/create'),
            'view' => Pages\ViewQuoteRequest::route('/{record}'),
            'edit' => Pages\EditQuoteRequest::route('/{record}/edit'),
        ];
    }
}
