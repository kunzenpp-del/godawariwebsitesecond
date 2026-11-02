<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';
    protected static ?string $navigationGroup = 'Shop';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Order Details')->schema([
                Forms\Components\TextInput::make('order_number')
                    ->placeholder('Automatically Generated')
                    ->disabled()
                    ->columnSpan(1),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'shipped' => 'Shipped',
                        'delivered' => 'Delivered',
                        'cancelled' => 'Cancelled',
                        'refunded' => 'Refunded',
                    ])
                    ->default('pending')
                    ->required(),
                Forms\Components\Select::make('payment_status')
                    ->options([
                        'pending' => 'Pending',
                        'paid' => 'Paid',
                        'failed' => 'Failed',
                        'refunded' => 'Refunded',
                    ])
                    ->default('pending')
                    ->required(),
                Forms\Components\Select::make('payment_method')
                    ->options([
                        'cod' => 'Cash on Delivery',
                        'esewa' => 'eSewa',
                        'khalti' => 'Khalti',
                        'bank_transfer' => 'Bank Transfer',
                    ])
                    ->default('cod')
                    ->required(),
                Forms\Components\TextInput::make('tracking_number')
                    ->maxLength(255),
            ])->columns(2),

            Forms\Components\Section::make('Customer Information')->schema([
                Forms\Components\TextInput::make('shipping_full_name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('shipping_phone')
                    ->required()
                    ->maxLength(20),
                Forms\Components\TextInput::make('shipping_email')
                    ->email()
                    ->maxLength(255),
                Forms\Components\TextInput::make('shipping_province')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('shipping_district')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('shipping_city')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('shipping_ward')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('shipping_street')
                    ->required()
                    ->maxLength(255),
            ])->columns(2),

            Forms\Components\Section::make('Financial Details')->schema([
                Forms\Components\TextInput::make('subtotal')
                    ->numeric()
                    ->default(0)
                    ->prefix('Rs.')
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Forms\Set $set, Forms\Get $get) => self::updateTotal($set, $get)),
                Forms\Components\TextInput::make('discount')
                    ->numeric()
                    ->default(0)
                    ->prefix('Rs.')
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Forms\Set $set, Forms\Get $get) => self::updateTotal($set, $get)),
                Forms\Components\TextInput::make('shipping_cost')
                    ->numeric()
                    ->default(0)
                    ->prefix('Rs.')
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Forms\Set $set, Forms\Get $get) => self::updateTotal($set, $get)),
                Forms\Components\TextInput::make('total')
                    ->numeric()
                    ->default(0)
                    ->prefix('Rs.')
                    ->readonly()
                    ->extraAttributes(['class' => 'font-bold text-lg']),
            ])->columns(2),

            Forms\Components\Section::make('Notes')->schema([
                Forms\Components\Textarea::make('notes')
                    ->rows(3)
                    ->columnSpanFull(),
            ]),
        ]);
    }

    protected static function updateTotal(Forms\Set $set, Forms\Get $get): void
    {
        $subtotal = floatval($get('subtotal') ?? 0);
        $discount = floatval($get('discount') ?? 0);
        $shipping = floatval($get('shipping_cost') ?? 0);
        
        $total = max(0, ($subtotal + $shipping) - $discount);
        
        $set('total', $total);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_number')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('shipping_full_name')
                    ->label('Customer')
                    ->searchable(),
                Tables\Columns\TextColumn::make('total')
                    ->money('NPR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'processing' => 'primary',
                        'shipped' => 'info',
                        'delivered' => 'success',
                        'cancelled', 'refunded' => 'danger',
                        default => 'secondary',
                    }),
                Tables\Columns\TextColumn::make('payment_status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'paid' => 'success',
                        'failed', 'refunded' => 'danger',
                        default => 'secondary',
                    }),
                Tables\Columns\TextColumn::make('payment_method')
                    ->badge()
                    ->color('secondary'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'shipped' => 'Shipped',
                        'delivered' => 'Delivered',
                        'cancelled' => 'Cancelled',
                    ]),
                Tables\Filters\SelectFilter::make('payment_method')
                    ->options([
                        'cod' => 'Cash on Delivery',
                        'esewa' => 'eSewa',
                        'khalti' => 'Khalti',
                        'bank_transfer' => 'Bank Transfer',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'view' => Pages\ViewOrder::route('/{record}'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
