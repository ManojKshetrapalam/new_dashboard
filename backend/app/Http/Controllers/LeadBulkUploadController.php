<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeadBulkUploadController extends Controller
{
    /**
     * Show the bulk upload form.
     */
    public function index()
    {
        return view('leads.bulk-upload');
    }

    /**
     * Download a sample CSV file.
     */
    public function sampleCsv()
    {
        $headers = [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="leads_sample.csv"',
        ];

        $columns = ['name', 'mobile', 'city', 'enquiry_for', 'assign_to'];

        $sampleRows = [
            ['Priya Sharma',  '9876543210', 'Mumbai',    'Venue',       'Agent A'],
            ['Rahul Mehta',   '9123456789', 'Delhi',     'Photography', 'Agent B'],
            ['Anita Verma',   '9988776655', 'Bangalore', 'Catering',    'Agent A'],
        ];

        $callback = function () use ($columns, $sampleRows) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            foreach ($sampleRows as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Handle CSV upload and import leads.
     */
    public function import(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $file   = $request->file('csv_file');
        $handle = fopen($file->getRealPath(), 'r');

        // Skip header row
        $header = fgetcsv($handle);

        $imported = 0;
        $errors   = [];
        $rowNum   = 1;

        $enquiryOptions = ['Venue', 'Catering', 'Photography', 'Decoration', 'Mehendi', 'Music', 'Other'];

        while (($row = fgetcsv($handle)) !== false) {
            $rowNum++;

            if (count($row) < 4) {
                $errors[] = "Row {$rowNum}: Not enough columns (need at least name, mobile, city, enquiry_for).";
                continue;
            }

            $data = [
                'name'        => trim($row[0] ?? ''),
                'mobile'      => trim($row[1] ?? ''),
                'city'        => trim($row[2] ?? ''),
                'enquiry_for' => trim($row[3] ?? ''),
                'assign_to'   => trim($row[4] ?? ''),
            ];

            $validator = Validator::make($data, [
                'name'        => 'required|string|max:255',
                'mobile'      => 'required|string|max:15',
                'city'        => 'required|string|max:255',
                'enquiry_for' => 'required|string|in:' . implode(',', $enquiryOptions),
                'assign_to'   => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                $errors[] = "Row {$rowNum}: " . implode(', ', $validator->errors()->all());
                continue;
            }

            Lead::create($data);
            $imported++;
        }

        fclose($handle);

        return back()->with([
            'imported' => $imported,
            'errors'   => $errors,
        ]);
    }
}
