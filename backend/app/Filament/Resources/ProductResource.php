<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationGroup = 'Shop';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Product Information')->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) =>
                        $operation === 'create' ? $set('slug', Str::slug($state)) : null),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                Forms\Components\Textarea::make('short_description')
                    ->maxLength(500)
                    ->rows(2),
                Forms\Components\RichEditor::make('description')
                    ->required()
                    ->columnSpanFull(),
            ])->columns(2),

            Forms\Components\Section::make('Pricing & Inventory')->schema([
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('Rs.'),
                Forms\Components\TextInput::make('original_price')
                    ->numeric()
                    ->prefix('Rs.')
                    ->label('Original Price (for discount)'),
                Forms\Components\TextInput::make('stock')
                    ->required()
                    ->numeric()
                    ->default(0)
                    ->minValue(0),
                Forms\Components\TextInput::make('sku')
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Forms\Components\TextInput::make('weight')
                    ->numeric()
                    ->suffix('kg'),
            ])->columns(2),

            Forms\Components\Section::make('Organization')->schema([
                Forms\Components\Select::make('category_id')
                    ->relationship('category', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),
                Forms\Components\TagsInput::make('tags')
                    ->separator(','),
                Forms\Components\Toggle::make('is_active')->default(true),
                Forms\Components\Toggle::make('is_new'),
                Forms\Components\Toggle::make('is_best_seller'),
                Forms\Components\Toggle::make('is_featured'),
            ])->columns(2),

            Forms\Components\Section::make('Variants')->schema([
                Forms\Components\KeyValue::make('variants')
                    ->addActionLabel('Add Variant')
                    ->keyLabel('Variant Name')
                    ->valueLabel('Options (comma-separated)')
                    ->columnSpanFull(),
            ]),

            Forms\Components\Section::make('Bulk Pricing')->schema([
                Forms\Components\Repeater::make('bulk_pricing')
                    ->schema([
                        Forms\Components\TextInput::make('minQty')->numeric()->required(),
                        Forms\Components\TextInput::make('maxQty')->numeric()->required(),
                        Forms\Components\TextInput::make('pricePerUnit')->numeric()->required()->prefix('Rs.'),
                    ])
                    ->columns(3)
                    ->columnSpanFull(),
            ]),

            Forms\Components\Section::make('Specifications')->schema([
                Forms\Components\KeyValue::make('specifications')
                    ->addActionLabel('Add Specification')
                    ->keyLabel('Property')
                    ->valueLabel('Value')
                    ->columnSpanFull(),
            ]),

            Forms\Components\Section::make('Images')->schema([
                Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                    ->collection('products')
                    ->multiple()
                    ->image()
                    ->imageEditor()
                    ->columnSpanFull(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\SpatieMediaLibraryImageColumn::make('image')
                    ->collection('products')
                    ->circular(),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('category.name')->sortable(),
                Tables\Columns\TextColumn::make('price')->money('NPR')->sortable(),
                Tables\Columns\TextColumn::make('stock')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
                Tables\Columns\IconColumn::make('is_best_seller')->boolean(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name'),
                Tables\Filters\TernaryFilter::make('is_active'),
                Tables\Filters\TernaryFilter::make('is_best_seller'),
                Tables\Filters\TernaryFilter::make('is_new'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ReplicateAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
