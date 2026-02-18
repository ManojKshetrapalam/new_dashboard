<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeadResource\Pages;
use App\Models\Lead;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationLabel = 'Leads';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Lead Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Full Name')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g. Priya Sharma'),

                        Forms\Components\TextInput::make('mobile')
                            ->label('Mobile Number')
                            ->required()
                            ->tel()
                            ->maxLength(15)
                            ->placeholder('e.g. 9876543210'),

                        Forms\Components\TextInput::make('city')
                            ->label('City')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g. Mumbai'),

                        Forms\Components\Select::make('enquiry_for')
                            ->label('Enquiry For')
                            ->required()
                            ->options([
                                'Venue'       => 'Venue',
                                'Catering'    => 'Catering',
                                'Photography' => 'Photography',
                                'Decoration'  => 'Decoration',
                                'Mehendi'     => 'Mehendi',
                                'Music'       => 'Music',
                                'Other'       => 'Other',
                            ])
                            ->searchable()
                            ->placeholder('Select category'),

                        Forms\Components\TextInput::make('assign_to')
                            ->label('Assign To')
                            ->maxLength(255)
                            ->placeholder('e.g. Agent Name'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('mobile')
                    ->label('Mobile')
                    ->searchable(),

                Tables\Columns\TextColumn::make('city')
                    ->label('City')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('enquiry_for')
                    ->label('Enquiry For')
                    ->colors([
                        'primary'   => 'Venue',
                        'success'   => 'Catering',
                        'warning'   => 'Photography',
                        'danger'    => 'Decoration',
                        'secondary' => 'Mehendi',
                        'info'      => 'Music',
                    ])
                    ->searchable(),

                Tables\Columns\TextColumn::make('assign_to')
                    ->label('Assigned To')
                    ->searchable()
                    ->default('—'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y, h:i A')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('enquiry_for')
                    ->label('Enquiry For')
                    ->options([
                        'Venue'       => 'Venue',
                        'Catering'    => 'Catering',
                        'Photography' => 'Photography',
                        'Decoration'  => 'Decoration',
                        'Mehendi'     => 'Mehendi',
                        'Music'       => 'Music',
                        'Other'       => 'Other',
                    ]),
            ])
            ->headerActions([
                Tables\Actions\Action::make('bulk_upload')
                    ->label('Bulk Upload')
                    ->icon('heroicon-o-arrow-up-tray')
                    ->color('gray')
                    ->url(fn () => route('leads.bulk-upload')),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListLeads::route('/'),
            'create' => Pages\CreateLead::route('/create'),
            'edit'   => Pages\EditLead::route('/{record}/edit'),
        ];
    }
}
