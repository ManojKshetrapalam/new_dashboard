# WedMetrics Dashboard

A real-time analytics dashboard for the wedding platform, covering B2B App, B2C App, Business Leads, Bytes, Quotes & Packages.

---

## 📁 Project Structure

```
wedding-dashboard/
├── index.html   — Layout & page structure
├── styles.css   — All styling (CSS variables, components)
└── app.js       — Data, rendering logic & API plug-in points
```

---

## 🔌 Laravel API Integration Guide

All mock data in `app.js` is clearly marked with `// TODO: REPLACE WITH LARAVEL API` comments. Below is a consolidated reference of every endpoint that needs to be wired up.

### Global Config

At the top of `app.js`, set your Laravel API base URL:

```js
const API_BASE = '/api'; // or 'https://yourdomain.com/api'
```

Protect all routes in `routes/api.php` with Sanctum:

```php
Route::middleware('auth:sanctum')->group(function () {
    // register all routes below here
});
```

---

### 1. Business Leads

| Property | Value |
|---|---|
| **Endpoint** | `GET /api/leads` |
| **Controller** | `App\Http\Controllers\LeadController@index` |
| **Query Params** | `from`, `to`, `vertical`, `status` |
| **Returns** | `[{ id, name, vertical, source, date, status, value }, ...]` |

**Used in:** `DATA.leads`, `applyLeadFilter()`

```js
const res = await fetch(`${API_BASE}/leads?from=${from}&to=${to}&vertical=${vert}&status=${status}`);
const json = await res.json();
DATA.leads = json.data; // if using Laravel Resource pagination
filteredLeads = [...DATA.leads];
renderLeadsTable();
```

---

### 2. B2B App Feature Usage

| Property | Value |
|---|---|
| **Endpoint** | `GET /api/app/b2b/features` |
| **Controller** | `App\Http\Controllers\B2BFeatureController@index` |
| **Query Params** | `from`, `to` |
| **Returns** | `[{ icon, name, users, pct, color }, ...]` |

- `users` = count of app subscribers who used this feature
- `pct` = adoption % among all B2B app subscribers

**Used in:** `DATA.b2bFeatures`, `initB2BFeatures()`, `initDashboardGrids()`

```js
const res = await fetch(`${API_BASE}/app/b2b/features?from=${from}&to=${to}`);
DATA.b2bFeatures = await res.json();
initDashboardGrids();
```

---

### 3. B2C App Feature Usage

| Property | Value |
|---|---|
| **Endpoint** | `GET /api/app/b2c/features` |
| **Controller** | `App\Http\Controllers\B2CFeatureController@index` |
| **Query Params** | `from`, `to` |
| **Returns** | `[{ icon, name, users, pct, color }, ...]` |

- `users` = count of app subscribers who used this feature
- `pct` = adoption % among all B2C app subscribers

**Used in:** `DATA.b2cFeatures`, `initB2CFeatures()`, `initDashboardGrids()`

```js
const res = await fetch(`${API_BASE}/app/b2c/features?from=${from}&to=${to}`);
DATA.b2cFeatures = await res.json();
initDashboardGrids();
```

---

### 4. Bytes, Quotes & Packages Stats

| Property | Value |
|---|---|
| **Endpoint** | `GET /api/app/bq-stats` |
| **Controller** | `App\Http\Controllers\BQStatsController@index` |
| **Query Params** | `from`, `to` |
| **Returns** | Array of 3 objects (bytes, quotes, packages) |

```json
[
  { "type": "bytes",    "icon": "📝", "title": "Wedding Bytes", "generated": 3421, "sold": 1892, "pending": 1529, "convRate": "55.3%", "avgValue": "₹1,200", "topSource": "Instagram", "revenue": "₹22.7L" },
  { "type": "quotes",   "icon": "💬", "title": "Get Quote",     "generated": 1876, "sold": 943,  "pending": 933,  "convRate": "50.3%", "avgValue": "₹3,800", "topSource": "LinkedIn",  "revenue": "₹35.8L" },
  { "type": "packages", "icon": "📦", "title": "Packages",      "generated": 2104, "sold": 1347, "pending": 757,  "convRate": "64.0%", "avgValue": "₹8,500", "topSource": "Facebook",  "revenue": "₹1.14Cr" }
]
```

- `generated` = total bytes/quotes/packages created by app users
- `sold` = how many were converted/purchased

**Used in:** `DATA.bqData`, `initBQPage()`, `renderBQCardsDash()`

```js
const res = await fetch(`${API_BASE}/app/bq-stats?from=${from}&to=${to}`);
DATA.bqData = await res.json();
renderBQCardsDash();
```

---

### 5. Feature Subscriber Drill-Down (Modal)

| Property | Value |
|---|---|
| **Endpoint** | `GET /api/app/{type}/features/{featureId}/subscribers` |
| **Controller** | `App\Http\Controllers\FeatureSubscriberController@index` |
| **Path Params** | `type` = `b2b` or `b2c`, `featureId` = feature slug |
| **Query Params** | `from`, `to`, `page` |
| **Returns** | `{ data: [{ name, phone, plan, joined, status }], total, per_page }` |

**Used in:** `showFeatureModal()`

```js
const res = await fetch(`${API_BASE}/app/${type}/features/${f.id}/subscribers?from=${from}&to=${to}`);
const json = await res.json();
const subscribers = json.data; // use instead of f.subscribers
```

---

### 6. BQ User Activity Drill-Down (Modal)

| Property | Value |
|---|---|
| **Endpoint** | `GET /api/app/bq/{type}/activity` |
| **Controller** | `App\Http\Controllers\BQActivityController@index` |
| **Path Params** | `type` = `bytes`, `quotes`, or `packages` |
| **Query Params** | `from`, `to`, `page` |
| **Returns** | `{ data: [{ name, phone, action, date, status }], total }` |

Action values:
- For `bytes`: `Viewed`, `Shared`, `Saved`
- For `quotes`/`packages`: `Requested`, `Sent`
- Status: `Converted`, `Pending`

**Used in:** `showBQModal()`

```js
const res = await fetch(`${API_BASE}/app/bq/${type}/activity?from=${from}&to=${to}`);
const json = await res.json();
const subs = json.data; // use instead of mock array
```

---

### 7. Conversion Charts

| Property | Value |
|---|---|
| **Endpoint** | `GET /api/conversions/summary` |
| **Controller** | `App\Http\Controllers\ConversionController@summary` |
| **Query Params** | `from`, `to` |
| **Returns** | `{ byVertical: [...], revenueByMonth: [...] }` |

```json
{
  "byVertical": [
    { "vertical": "B2B App",   "generated": 1284, "sold": 924 },
    { "vertical": "B2C App",   "generated": 876,  "sold": 534 },
    { "vertical": "Buy Leads", "generated": 2156, "sold": 1186 },
    { "vertical": "IPM",       "generated": 643,  "sold": 437 }
  ],
  "revenueByMonth": [
    { "month": "Sep", "b2b_revenue": 28, "buyleads_revenue": 38 },
    ...
  ]
}
```

**Used in:** `initConversionCharts()`

---

### 8. Dashboard Stat Cards

| Property | Value |
|---|---|
| **Endpoint** | `GET /api/dashboard/stats` |
| **Controller** | `App\Http\Controllers\DashboardController@stats` |
| **Query Params** | `from`, `to` |
| **Returns** | `{ b2b_leads, b2c_leads, buy_leads, ipm_leads, total_revenue, ... }` |

**Used in:** `applyDateBtn` click handler (re-fetch on date range change)

---

### 9. Date Range Apply — Central Re-fetch Point

When the user clicks **Apply** in the top bar, all sections should refresh. This is handled in the `applyDateBtn` click listener in `app.js`. Use `Promise.all` for parallel fetching:

```js
document.getElementById('applyDateBtn').addEventListener('click', async () => {
  const from = document.getElementById('dateFrom').value;
  const to   = document.getElementById('dateTo').value;

  // Fetch all data in parallel
  const [b2bRes, b2cRes, bqRes, leadsRes, statsRes] = await Promise.all([
    fetch(`${API_BASE}/app/b2b/features?from=${from}&to=${to}`),
    fetch(`${API_BASE}/app/b2c/features?from=${from}&to=${to}`),
    fetch(`${API_BASE}/app/bq-stats?from=${from}&to=${to}`),
    fetch(`${API_BASE}/leads?from=${from}&to=${to}`),
    fetch(`${API_BASE}/dashboard/stats?from=${from}&to=${to}`),
  ]);

  DATA.b2bFeatures = await b2bRes.json();
  DATA.b2cFeatures = await b2cRes.json();
  DATA.bqData      = await bqRes.json();
  DATA.leads       = (await leadsRes.json()).data;
  filteredLeads    = [...DATA.leads];

  // Re-render everything
  initDashboardGrids();
  renderLeadsTable();
  renderBQCardsDash();
});
```

---

## 🗂️ Summary Table

| Section | Endpoint | Controller |
|---|---|---|
| Business Leads | `GET /api/leads` | `LeadController@index` |
| Lead Filter | `GET /api/leads?vertical=&status=` | `LeadController@index` |
| B2B Features | `GET /api/app/b2b/features` | `B2BFeatureController@index` |
| B2C Features | `GET /api/app/b2c/features` | `B2CFeatureController@index` |
| BQ Stats | `GET /api/app/bq-stats` | `BQStatsController@index` |
| Feature Subscribers | `GET /api/app/{type}/features/{id}/subscribers` | `FeatureSubscriberController@index` |
| BQ User Activity | `GET /api/app/bq/{type}/activity` | `BQActivityController@index` |
| Conversion Charts | `GET /api/conversions/summary` | `ConversionController@summary` |
| Dashboard Stats | `GET /api/dashboard/stats` | `DashboardController@stats` |

---

## 📌 API Plug-in Points in `app.js`

Every section of `app.js` that needs a real API has a `// TODO` comment. Here's a quick map of where each plug-in point lives:

| Section | Laravel Endpoint | Comment Location in `app.js` |
|---|---|---|
| Global config | `const API_BASE = '/api'` | Top of file — set your base URL here |
| Business Leads table | `GET /api/leads?from&to&vertical&status` | Inside `DATA.leads` array |
| Lead filter | `GET /api/leads?vertical=&status=` | Inside `applyLeadFilter()` |
| B2B Features grid | `GET /api/app/b2b/features?from&to` | Inside `DATA.b2bFeatures` + `initB2BFeatures()` |
| B2C Features grid | `GET /api/app/b2c/features?from&to` | Inside `DATA.b2cFeatures` + `initB2CFeatures()` |
| Bytes/Quotes/Packages stats | `GET /api/app/bq-stats?from&to` | Inside `DATA.bqData` + `initBQPage()` + `renderBQCardsDash()` |
| Feature subscriber drill-down | `GET /api/app/{b2b\|b2c}/features/{id}/subscribers` | Inside `showFeatureModal()` |
| BQ user activity drill-down | `GET /api/app/bq/{bytes\|quotes\|packages}/activity` | Inside `showBQModal()` |
| Conversion charts | `GET /api/conversions/summary?from&to` | Inside `initConversionCharts()` |
| Dashboard grids (parallel load) | All 3 APIs via `Promise.all` | Inside `initDashboardGrids()` |
| Date Apply button | Re-fetches everything + `GET /api/dashboard/stats` | Inside `applyDateBtn` click handler |

> Each `// TODO` comment in `app.js` includes the suggested Controller name, expected JSON shape, and a ready-to-copy `fetch()` example so your Laravel team can wire it up quickly.
