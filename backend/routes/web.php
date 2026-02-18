<?php

use App\Http\Controllers\LeadBulkUploadController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Leads Bulk Upload routes
Route::prefix('leads')->name('leads.')->group(function () {
    Route::get('/bulk-upload',        [LeadBulkUploadController::class, 'index'])     ->name('bulk-upload');
    Route::get('/sample-csv',         [LeadBulkUploadController::class, 'sampleCsv'])->name('sample-csv');
    Route::post('/import',            [LeadBulkUploadController::class, 'import'])    ->name('import');
});
