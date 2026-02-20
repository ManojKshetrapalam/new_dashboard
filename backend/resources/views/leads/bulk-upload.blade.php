<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bulk Upload Leads — WedMetrics</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', sans-serif;
            background: #FAF8FF;
            color: #2D2D3A;
            min-height: 100vh;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 40px 16px;
        }
        .container { width: 100%; max-width: 680px; }
        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: #9B7FD4;
            text-decoration: none;
            margin-bottom: 24px;
            font-weight: 500;
        }
        .back-link:hover { text-decoration: underline; }
        h1 {
            font-size: 26px;
            font-weight: 800;
            background: linear-gradient(135deg, #C9B8F0, #FFB3C6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 6px;
        }
        .subtitle { font-size: 14px; color: #9999AA; margin-bottom: 32px; }

        .card {
            background: #fff;
            border-radius: 16px;
            border: 1.5px solid #EEE8FF;
            padding: 28px;
            box-shadow: 0 2px 16px rgba(180,160,220,0.10);
            margin-bottom: 20px;
        }
        .card-title {
            font-size: 15px;
            font-weight: 700;
            color: #2D2D3A;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .card-desc { font-size: 13px; color: #9999AA; margin-bottom: 16px; }

        .sample-headers {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 16px;
        }
        .badge {
            background: #F3F0FF;
            color: #9B7FD4;
            border-radius: 8px;
            padding: 4px 12px;
            font-size: 12px;
            font-weight: 600;
            border: 1px solid #EEE8FF;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border-radius: 10px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            transition: opacity 0.2s;
            border: none;
        }
        .btn:hover { opacity: 0.85; }
        .btn-primary {
            background: linear-gradient(135deg, #C9B8F0, #FFB3C6);
            color: white;
        }
        .btn-outline {
            background: #F3F0FF;
            color: #9B7FD4;
            border: 1.5px solid #EEE8FF;
        }

        /* Upload form */
        .file-drop {
            border: 2px dashed #C9B8F0;
            border-radius: 12px;
            padding: 32px;
            text-align: center;
            background: #F3F0FF22;
            cursor: pointer;
            transition: border-color 0.2s, background 0.2s;
            margin-bottom: 16px;
        }
        .file-drop:hover { border-color: #9B7FD4; background: #F3F0FF44; }
        .file-drop input[type="file"] { display: none; }
        .file-drop-icon { font-size: 36px; margin-bottom: 10px; }
        .file-drop-text { font-size: 14px; color: #6B6B80; }
        .file-drop-text strong { color: #9B7FD4; cursor: pointer; }
        .file-name { font-size: 13px; color: #5CB88A; margin-top: 8px; font-weight: 500; }

        /* Alerts */
        .alert { border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; font-size: 13px; }
        .alert-success { background: #EDFAF4; border: 1.5px solid #B5EAD7; color: #2D6A4F; }
        .alert-error { background: #FFF0F4; border: 1.5px solid #FFB3C6; color: #7D2040; }
        .alert ul { margin-top: 8px; padding-left: 18px; }
        .alert li { margin-bottom: 4px; }
    </style>
</head>
<body>
<div class="container">
    <a href="/admin/leads" class="back-link">← Back to Leads</a>

    <h1>📤 Bulk Upload Leads</h1>
    <p class="subtitle">Download the sample CSV, fill in your data, and upload it back here.</p>

    {{-- Success / Error messages --}}
    @if(session('imported') !== null)
        <div class="alert alert-success">
            ✅ <strong>{{ session('imported') }} lead(s) imported successfully!</strong>
            @if(count(session('errors', [])) > 0)
                <br/><br/>⚠️ The following rows had errors and were skipped:
                <ul>
                    @foreach(session('errors') as $err)
                        <li>{{ $err }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    @endif

    {{-- Step 1: Download Sample --}}
    <div class="card">
        <div class="card-title">📥 Step 1 — Download Sample CSV</div>
        <p class="card-desc">The CSV must have these exact column headers (in order):</p>
        <div class="sample-headers">
            <span class="badge">name</span>
            <span class="badge">mobile</span>
            <span class="badge">city</span>
            <span class="badge">enquiry_for</span>
            <span class="badge">assign_to</span>
        </div>
        <p class="card-desc" style="margin-bottom:16px">
            Valid values for <strong>enquiry_for</strong>:
            {{ \App\Models\EnquiryType::pluck('name')->implode(', ') }}
        </p>
        <a href="{{ route('leads.sample-csv') }}" class="btn btn-outline">
            ⬇️ Download Sample CSV
        </a>
    </div>

    {{-- Step 2: Upload --}}
    <div class="card">
        <div class="card-title">📤 Step 2 — Upload Your CSV</div>
        <p class="card-desc">Only .csv files are accepted. Max size: 2MB.</p>

        <form method="POST" action="{{ route('leads.import') }}" enctype="multipart/form-data">
            @csrf

            <label class="file-drop" id="fileDrop" for="csvFile">
                <div class="file-drop-icon">📂</div>
                <div class="file-drop-text">
                    Drag & drop your CSV here, or <strong>click to browse</strong>
                </div>
                <div class="file-name" id="fileName"></div>
                <input type="file" id="csvFile" name="csv_file" accept=".csv,text/csv" required />
            </label>

            @error('csv_file')
                <div class="alert alert-error">{{ $message }}</div>
            @enderror

            <button type="submit" class="btn btn-primary">
                🚀 Import Leads
            </button>
        </form>
    </div>
</div>

<script>
    const input    = document.getElementById('csvFile');
    const fileName = document.getElementById('fileName');
    const fileDrop = document.getElementById('fileDrop');

    input.addEventListener('change', () => {
        fileName.textContent = input.files[0] ? '✓ ' + input.files[0].name : '';
    });

    // Drag & drop
    fileDrop.addEventListener('dragover', e => { e.preventDefault(); fileDrop.style.borderColor = '#9B7FD4'; });
    fileDrop.addEventListener('dragleave', () => { fileDrop.style.borderColor = '#C9B8F0'; });
    fileDrop.addEventListener('drop', e => {
        e.preventDefault();
        fileDrop.style.borderColor = '#C9B8F0';
        if (e.dataTransfer.files.length) {
            input.files = e.dataTransfer.files;
            fileName.textContent = '✓ ' + e.dataTransfer.files[0].name;
        }
    });
</script>
</body>
</html>
