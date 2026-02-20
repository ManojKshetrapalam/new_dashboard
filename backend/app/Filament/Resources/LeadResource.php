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

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        $query = parent::getEloquentQuery();

        $user = auth()->user();

        // If the user is Super Admin, they see everything.
        // Otherwise, they only see leads in their assigned verticals.
        if ($user && !$user->hasRole('Super Admin')) {
            $verticalIds = $user->verticals->pluck('id');
            $query->whereIn('vertical_id', $verticalIds);
        }

        return $query;
    }

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

                        Forms\Components\Select::make('vertical_id')
                            ->label('Vertical')
                            ->options(function () {
                                $user = auth()->user();
                                if ($user->hasRole('Super Admin')) {
                                    return \App\Models\Vertical::all()->pluck('name', 'id');
                                }
                                return $user->verticals->pluck('name', 'id');
                            })
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function (callable $set) {
                                $set('enquiry_for', null);
                                $set('assign_to', null);
                            })
                            ->searchable()
                            ->preload()
                            ->placeholder('Select vertical'),

                        Forms\Components\Select::make('enquiry_for')
                            ->label('Enquiry For')
                            ->required()
                            ->options(function (callable $get) {
                                $verticalId = $get('vertical_id');
                                if (!$verticalId) {
                                    return \App\Models\EnquiryType::whereNull('vertical_id')->pluck('name', 'name');
                                }
                                return \App\Models\EnquiryType::where('vertical_id', $verticalId)
                                    ->orWhereNull('vertical_id')
                                    ->pluck('name', 'name');
                            })
                            ->searchable()
                            ->placeholder('Select category'),

                        Forms\Components\Select::make('assign_to')
                            ->label('Assign To')
                            ->options(function (callable $get) {
                                $verticalId = $get('vertical_id');
                                if (!$verticalId) {
                                    return [];
                                }

                                $users = \App\Models\User::whereHas('verticals', function ($query) use ($verticalId) {
                                    $query->where('vertical_id', $verticalId);
                                })->pluck('name', 'name');

                                if ($users->isEmpty()) {
                                    return ['' => 'No users to assign'];
                                }

                                return $users;
                            })
                            ->searchable()
                            ->placeholder('Select agent'),

                        Forms\Components\Select::make('lead_status_id')
                            ->label('Lead Status')
                            ->relationship('status', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->placeholder('Select status')
                            ->default(fn () => \App\Models\LeadStatus::where('name', 'New')->first()?->id),

                        Forms\Components\TextInput::make('revenue_amount')
                            ->label('Revenue Amount')
                            ->numeric()
                            ->prefix('₹')
                            ->placeholder('e.g. 5000'),
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

                Tables\Columns\TextColumn::make('vertical.name')
                    ->label('Vertical')
                    ->badge()
                    ->color('info')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('assign_to')
                    ->label('Assigned To')
                    ->searchable()
                    ->default('—'),

                Tables\Columns\TextColumn::make('status.name')
                    ->label('Status')
                    ->badge()
                    ->color(fn ($record) => $record->status?->color ?? 'gray')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('revenue_amount')
                    ->label('Revenue')
                    ->money('INR')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y, h:i A')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('lead_status_id')
                    ->label('Status')
                    ->relationship('status', 'name'),
                Tables\Filters\SelectFilter::make('enquiry_for')
                    ->label('Enquiry For')
                    ->options(\App\Models\EnquiryType::all()->pluck('name', 'name')),

                Tables\Filters\SelectFilter::make('vertical_id')
                    ->label('Vertical')
                    ->relationship('vertical', 'name'),
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
                    Tables\Actions\BulkAction::make('change_status')
                        ->label('Change Status')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->form([
                            Forms\Components\Select::make('lead_status_id')
                                ->label('New Status')
                                ->options(\App\Models\LeadStatus::all()->pluck('name', 'id'))
                                ->required(),
                        ])
                        ->action(fn (\Illuminate\Database\Eloquent\Collection $records, array $data) => $records->each->update(['lead_status_id' => $data['lead_status_id']]))
                        ->deselectRecordsAfterCompletion(),

                    Tables\Actions\BulkAction::make('reassign')
                        ->label('Reassign Agent')
                        ->icon('heroicon-o-user-plus')
                        ->color('warning')
                        ->form([
                            Forms\Components\Select::make('assign_to')
                                ->label('New Agent')
                                ->options(\App\Models\User::all()->pluck('name', 'name'))
                                ->required(),
                        ])
                        ->action(fn (\Illuminate\Database\Eloquent\Collection $records, array $data) => $records->each->update(['assign_to' => $data['assign_to']]))
                        ->deselectRecordsAfterCompletion(),

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
