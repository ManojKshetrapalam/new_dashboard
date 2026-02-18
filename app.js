// ===== DATA =====
// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — Replace each section below with a fetch() call to your
// Laravel API. All endpoints should be prefixed with your base URL, e.g.:
//   const API_BASE = '/api';   // or 'https://yourdomain.com/api'
//
// Laravel tip: Add routes in routes/api.php and protect them with
//   Route::middleware('auth:sanctum')->group(function () { ... });
//
// Pass the date range from the top bar pickers as query params:
//   ?from=2026-02-01&to=2026-02-18
// ─────────────────────────────────────────────────────────────────────────────
const API_BASE = '/api'; // TODO: Set your Laravel API base URL here

const DATA = {
  leads: [
    // ── TODO: REPLACE WITH LARAVEL API ──────────────────────────────────────
    // Endpoint : GET /api/leads?from={date}&to={date}&vertical={filter}
    // Controller: App\Http\Controllers\LeadController@index
    // Returns  : [{ id, name, vertical, source, date, status, value }, ...]
    // Example  :
    //   const res = await fetch(`${API_BASE}/leads?from=${from}&to=${to}`);
    //   const leads = await res.json();
    //   DATA.leads = leads.data; // if paginated via Laravel Resource
    //   filteredLeads = [...DATA.leads];
    //   renderLeadsTable();
    // ─────────────────────────────────────────────────────────────────────────
    { id: 'WL-1001', name: 'Priya Sharma', vertical: 'B2B App', source: 'Instagram', date: '2026-02-18', status: 'sold', value: '₹5,200' },
    { id: 'WL-1002', name: 'Rahul Mehta', vertical: 'B2C App', source: 'Facebook', date: '2026-02-18', status: 'pending', value: '₹3,800' },
    { id: 'WL-1003', name: 'Ananya Patel', vertical: 'Buy Leads', source: 'LinkedIn', date: '2026-02-17', status: 'sold', value: '₹7,100' },
    { id: 'WL-1004', name: 'Vikram Singh', vertical: 'IPM', source: 'Instagram', date: '2026-02-17', status: 'new', value: '₹4,500' },
    { id: 'WL-1005', name: 'Deepika Nair', vertical: 'B2B App', source: 'Facebook', date: '2026-02-16', status: 'sold', value: '₹6,300' },
    { id: 'WL-1006', name: 'Arjun Kumar', vertical: 'B2C App', source: 'Instagram', date: '2026-02-16', status: 'sold', value: '₹2,900' },
    { id: 'WL-1007', name: 'Sneha Gupta', vertical: 'Buy Leads', source: 'LinkedIn', date: '2026-02-15', status: 'pending', value: '₹8,400' },
    { id: 'WL-1008', name: 'Rohan Verma', vertical: 'IPM', source: 'Facebook', date: '2026-02-15', status: 'sold', value: '₹5,700' },
    { id: 'WL-1009', name: 'Kavya Reddy', vertical: 'B2B App', source: 'Instagram', date: '2026-02-14', status: 'new', value: '₹4,100' },
    { id: 'WL-1010', name: 'Aditya Joshi', vertical: 'B2C App', source: 'Facebook', date: '2026-02-14', status: 'sold', value: '₹3,600' },
    { id: 'WL-1011', name: 'Meera Iyer', vertical: 'Buy Leads', source: 'LinkedIn', date: '2026-02-13', status: 'sold', value: '₹9,200' },
    { id: 'WL-1012', name: 'Kiran Bhat', vertical: 'IPM', source: 'Instagram', date: '2026-02-13', status: 'pending', value: '₹4,800' },
    { id: 'WL-1013', name: 'Pooja Desai', vertical: 'B2B App', source: 'Facebook', date: '2026-02-12', status: 'sold', value: '₹5,900' },
    { id: 'WL-1014', name: 'Suresh Pillai', vertical: 'B2C App', source: 'LinkedIn', date: '2026-02-12', status: 'sold', value: '₹3,200' },
    { id: 'WL-1015', name: 'Nisha Kapoor', vertical: 'Buy Leads', source: 'Instagram', date: '2026-02-11', status: 'new', value: '₹6,700' },
    { id: 'WL-1016', name: 'Manish Tiwari', vertical: 'IPM', source: 'Facebook', date: '2026-02-11', status: 'sold', value: '₹5,100' },
    { id: 'WL-1017', name: 'Ritu Agarwal', vertical: 'B2B App', source: 'Instagram', date: '2026-02-10', status: 'sold', value: '₹7,800' },
    { id: 'WL-1018', name: 'Sanjay Rao', vertical: 'B2C App', source: 'LinkedIn', date: '2026-02-10', status: 'pending', value: '₹2,700' },
    { id: 'WL-1019', name: 'Divya Menon', vertical: 'Buy Leads', source: 'Facebook', date: '2026-02-09', status: 'sold', value: '₹8,900' },
    { id: 'WL-1020', name: 'Tarun Saxena', vertical: 'IPM', source: 'Instagram', date: '2026-02-09', status: 'sold', value: '₹4,300' },
  ],

  // ── TODO: REPLACE WITH LARAVEL API ─────────────────────────────────────────
  // Endpoint : GET /api/app/b2b/features?from={date}&to={date}
  // Controller: App\Http\Controllers\B2BFeatureController@index
  // Returns  : [{ icon, name, users, pct, color }, ...]
  //            'users' = count of app subscribers who used this feature
  //            'pct'   = adoption % among all B2B app subscribers
  // Example  :
  //   const res = await fetch(`${API_BASE}/app/b2b/features?from=${from}&to=${to}`);
  //   DATA.b2bFeatures = await res.json();
  //   initDashboardGrids(); // re-render after fetch
  // ─────────────────────────────────────────────────────────────────────────────
  b2bFeatures: [
    {
      icon: '💍', name: 'Wedding Leads', users: 8920, pct: 89, color: '#C9B8F0', subscribers: [
        { name: 'Priya Sharma', phone: '98765-43210', plan: 'Premium', joined: '2026-01-15', status: 'Active' },
        { name: 'Rahul Mehta', phone: '91234-56789', plan: 'Basic', joined: '2026-01-20', status: 'Active' },
        { name: 'Ananya Patel', phone: '87654-32109', plan: 'Premium', joined: '2026-02-01', status: 'Active' },
        { name: 'Vikram Singh', phone: '76543-21098', plan: 'Basic', joined: '2026-02-05', status: 'Inactive' },
        { name: 'Deepika Nair', phone: '65432-10987', plan: 'Premium', joined: '2026-02-10', status: 'Active' },
      ]
    },
    {
      icon: '📋', name: 'My Leads', users: 7640, pct: 76, color: '#FFB3C6', subscribers: [
        { name: 'Arjun Kumar', phone: '54321-09876', plan: 'Premium', joined: '2026-01-12', status: 'Active' },
        { name: 'Sneha Gupta', phone: '43210-98765', plan: 'Basic', joined: '2026-01-18', status: 'Active' },
        { name: 'Rohan Verma', phone: '32109-87654', plan: 'Premium', joined: '2026-01-25', status: 'Active' },
        { name: 'Kavya Reddy', phone: '21098-76543', plan: 'Basic', joined: '2026-02-03', status: 'Inactive' },
        { name: 'Aditya Joshi', phone: '10987-65432', plan: 'Premium', joined: '2026-02-08', status: 'Active' },
      ]
    },
    {
      icon: '📦', name: 'Add Packages', users: 6820, pct: 68, color: '#B5EAD7', subscribers: [
        { name: 'Meera Iyer', phone: '98765-11111', plan: 'Premium', joined: '2026-01-10', status: 'Active' },
        { name: 'Kiran Bhat', phone: '87654-22222', plan: 'Basic', joined: '2026-01-22', status: 'Active' },
        { name: 'Pooja Desai', phone: '76543-33333', plan: 'Premium', joined: '2026-02-02', status: 'Active' },
        { name: 'Suresh Pillai', phone: '65432-44444', plan: 'Basic', joined: '2026-02-07', status: 'Inactive' },
        { name: 'Nisha Kapoor', phone: '54321-55555', plan: 'Premium', joined: '2026-02-12', status: 'Active' },
      ]
    },
    {
      icon: '📝', name: 'Wedding Bytes', users: 6100, pct: 61, color: '#FFD6A5', subscribers: [
        { name: 'Manish Tiwari', phone: '43210-66666', plan: 'Basic', joined: '2026-01-14', status: 'Active' },
        { name: 'Ritu Agarwal', phone: '32109-77777', plan: 'Premium', joined: '2026-01-28', status: 'Active' },
        { name: 'Sanjay Rao', phone: '21098-88888', plan: 'Basic', joined: '2026-02-04', status: 'Active' },
        { name: 'Divya Menon', phone: '10987-99999', plan: 'Premium', joined: '2026-02-09', status: 'Inactive' },
        { name: 'Tarun Saxena', phone: '98765-00000', plan: 'Basic', joined: '2026-02-14', status: 'Active' },
      ]
    },
    {
      icon: '🏛️', name: 'Find Venues', users: 5400, pct: 54, color: '#AED9E0', subscribers: [
        { name: 'Priya Sharma', phone: '98765-43210', plan: 'Basic', joined: '2026-01-16', status: 'Active' },
        { name: 'Arjun Kumar', phone: '54321-09876', plan: 'Premium', joined: '2026-01-21', status: 'Active' },
        { name: 'Meera Iyer', phone: '98765-11111', plan: 'Basic', joined: '2026-02-01', status: 'Active' },
        { name: 'Pooja Desai', phone: '76543-33333', plan: 'Premium', joined: '2026-02-06', status: 'Active' },
        { name: 'Ritu Agarwal', phone: '32109-77777', plan: 'Basic', joined: '2026-02-11', status: 'Inactive' },
      ]
    },
    {
      icon: '📖', name: 'Wedding Guide', users: 4900, pct: 49, color: '#C9B8F0', subscribers: [
        { name: 'Kavya Reddy', phone: '21098-76543', plan: 'Basic', joined: '2026-01-13', status: 'Active' },
        { name: 'Sneha Gupta', phone: '43210-98765', plan: 'Premium', joined: '2026-01-19', status: 'Active' },
        { name: 'Kiran Bhat', phone: '87654-22222', plan: 'Basic', joined: '2026-02-03', status: 'Active' },
        { name: 'Nisha Kapoor', phone: '54321-55555', plan: 'Premium', joined: '2026-02-08', status: 'Active' },
        { name: 'Tarun Saxena', phone: '98765-00000', plan: 'Basic', joined: '2026-02-13', status: 'Inactive' },
      ]
    },
    {
      icon: '📸', name: 'Photo Sharing', users: 4200, pct: 42, color: '#FFB3C6', subscribers: [
        { name: 'Rahul Mehta', phone: '91234-56789', plan: 'Basic', joined: '2026-01-17', status: 'Active' },
        { name: 'Vikram Singh', phone: '76543-21098', plan: 'Premium', joined: '2026-01-23', status: 'Active' },
        { name: 'Rohan Verma', phone: '32109-87654', plan: 'Basic', joined: '2026-02-02', status: 'Inactive' },
        { name: 'Aditya Joshi', phone: '10987-65432', plan: 'Premium', joined: '2026-02-07', status: 'Active' },
        { name: 'Sanjay Rao', phone: '21098-88888', plan: 'Basic', joined: '2026-02-12', status: 'Active' },
      ]
    },
    {
      icon: '💬', name: 'Get Quote', users: 7600, pct: 76, color: '#B5EAD7', subscribers: [
        { name: 'Ananya Patel', phone: '87654-32109', plan: 'Premium', joined: '2026-01-11', status: 'Active' },
        { name: 'Deepika Nair', phone: '65432-10987', plan: 'Basic', joined: '2026-01-24', status: 'Active' },
        { name: 'Suresh Pillai', phone: '65432-44444', plan: 'Premium', joined: '2026-02-04', status: 'Active' },
        { name: 'Manish Tiwari', phone: '43210-66666', plan: 'Basic', joined: '2026-02-09', status: 'Active' },
        { name: 'Divya Menon', phone: '10987-99999', plan: 'Premium', joined: '2026-02-15', status: 'Inactive' },
      ]
    },
    {
      icon: '📅', name: 'My Events', users: 3800, pct: 38, color: '#FFD6A5', subscribers: [
        { name: 'Priya Sharma', phone: '98765-43210', plan: 'Basic', joined: '2026-01-15', status: 'Active' },
        { name: 'Meera Iyer', phone: '98765-11111', plan: 'Premium', joined: '2026-01-26', status: 'Active' },
        { name: 'Kavya Reddy', phone: '21098-76543', plan: 'Basic', joined: '2026-02-05', status: 'Active' },
        { name: 'Ritu Agarwal', phone: '32109-77777', plan: 'Premium', joined: '2026-02-10', status: 'Inactive' },
        { name: 'Ananya Patel', phone: '87654-32109', plan: 'Basic', joined: '2026-02-16', status: 'Active' },
      ]
    },
    {
      icon: '📁', name: 'My Folder', users: 3200, pct: 32, color: '#AED9E0', subscribers: [
        { name: 'Arjun Kumar', phone: '54321-09876', plan: 'Basic', joined: '2026-01-18', status: 'Active' },
        { name: 'Sneha Gupta', phone: '43210-98765', plan: 'Premium', joined: '2026-01-27', status: 'Active' },
        { name: 'Kiran Bhat', phone: '87654-22222', plan: 'Basic', joined: '2026-02-06', status: 'Active' },
        { name: 'Nisha Kapoor', phone: '54321-55555', plan: 'Premium', joined: '2026-02-11', status: 'Active' },
        { name: 'Tarun Saxena', phone: '98765-00000', plan: 'Basic', joined: '2026-02-17', status: 'Inactive' },
      ]
    },
    {
      icon: '📰', name: 'Wedding News', users: 2900, pct: 29, color: '#C9B8F0', subscribers: [
        { name: 'Rohan Verma', phone: '32109-87654', plan: 'Basic', joined: '2026-01-20', status: 'Active' },
        { name: 'Vikram Singh', phone: '76543-21098', plan: 'Premium', joined: '2026-01-29', status: 'Active' },
        { name: 'Aditya Joshi', phone: '10987-65432', plan: 'Basic', joined: '2026-02-07', status: 'Active' },
        { name: 'Sanjay Rao', phone: '21098-88888', plan: 'Premium', joined: '2026-02-12', status: 'Inactive' },
        { name: 'Divya Menon', phone: '10987-99999', plan: 'Basic', joined: '2026-02-17', status: 'Active' },
      ]
    },
    {
      icon: '👥', name: 'Add Team', users: 2100, pct: 21, color: '#FFB3C6', subscribers: [
        { name: 'Deepika Nair', phone: '65432-10987', plan: 'Premium', joined: '2026-01-22', status: 'Active' },
        { name: 'Pooja Desai', phone: '76543-33333', plan: 'Basic', joined: '2026-01-30', status: 'Active' },
        { name: 'Suresh Pillai', phone: '65432-44444', plan: 'Premium', joined: '2026-02-08', status: 'Active' },
        { name: 'Manish Tiwari', phone: '43210-66666', plan: 'Basic', joined: '2026-02-13', status: 'Inactive' },
        { name: 'Rahul Mehta', phone: '91234-56789', plan: 'Premium', joined: '2026-02-18', status: 'Active' },
      ]
    },
  ],

  // ── TODO: REPLACE WITH LARAVEL API ─────────────────────────────────────────
  // Endpoint : GET /api/app/b2c/features?from={date}&to={date}
  // Controller: App\Http\Controllers\B2CFeatureController@index
  // Returns  : [{ icon, name, users, pct, color }, ...]
  //            'users' = count of app subscribers who used this feature
  //            'pct'   = adoption % among all B2C app subscribers
  // Example  :
  //   const res = await fetch(`${API_BASE}/app/b2c/features?from=${from}&to=${to}`);
  //   DATA.b2cFeatures = await res.json();
  //   initDashboardGrids(); // re-render after fetch
  // ─────────────────────────────────────────────────────────────────────────────
  b2cFeatures: [
    {
      icon: '✉️', name: 'E-Invite & Live Stream', users: 8200, pct: 82, color: '#C9B8F0', subscribers: [
        { name: 'Priya Sharma', phone: '98765-43210', plan: 'Premium', joined: '2026-01-15', status: 'Active' },
        { name: 'Ananya Patel', phone: '87654-32109', plan: 'Basic', joined: '2026-01-22', status: 'Active' },
        { name: 'Meera Iyer', phone: '98765-11111', plan: 'Premium', joined: '2026-02-01', status: 'Active' },
        { name: 'Pooja Desai', phone: '76543-33333', plan: 'Basic', joined: '2026-02-06', status: 'Inactive' },
        { name: 'Ritu Agarwal', phone: '32109-77777', plan: 'Premium', joined: '2026-02-11', status: 'Active' },
      ]
    },
    {
      icon: '📖', name: 'Wedding Guide', users: 7100, pct: 71, color: '#FFB3C6', subscribers: [
        { name: 'Rahul Mehta', phone: '91234-56789', plan: 'Basic', joined: '2026-01-16', status: 'Active' },
        { name: 'Vikram Singh', phone: '76543-21098', plan: 'Premium', joined: '2026-01-23', status: 'Active' },
        { name: 'Kiran Bhat', phone: '87654-22222', plan: 'Basic', joined: '2026-02-02', status: 'Active' },
        { name: 'Nisha Kapoor', phone: '54321-55555', plan: 'Premium', joined: '2026-02-07', status: 'Active' },
        { name: 'Tarun Saxena', phone: '98765-00000', plan: 'Basic', joined: '2026-02-12', status: 'Inactive' },
      ]
    },
    {
      icon: '💰', name: 'Wedding Budget', users: 6500, pct: 65, color: '#B5EAD7', subscribers: [
        { name: 'Deepika Nair', phone: '65432-10987', plan: 'Premium', joined: '2026-01-14', status: 'Active' },
        { name: 'Arjun Kumar', phone: '54321-09876', plan: 'Basic', joined: '2026-01-21', status: 'Active' },
        { name: 'Sneha Gupta', phone: '43210-98765', plan: 'Premium', joined: '2026-02-03', status: 'Active' },
        { name: 'Rohan Verma', phone: '32109-87654', plan: 'Basic', joined: '2026-02-08', status: 'Active' },
        { name: 'Aditya Joshi', phone: '10987-65432', plan: 'Premium', joined: '2026-02-13', status: 'Inactive' },
      ]
    },
    {
      icon: '✅', name: 'Check List', users: 6100, pct: 61, color: '#FFD6A5', subscribers: [
        { name: 'Kavya Reddy', phone: '21098-76543', plan: 'Basic', joined: '2026-01-13', status: 'Active' },
        { name: 'Suresh Pillai', phone: '65432-44444', plan: 'Premium', joined: '2026-01-20', status: 'Active' },
        { name: 'Manish Tiwari', phone: '43210-66666', plan: 'Basic', joined: '2026-02-04', status: 'Active' },
        { name: 'Sanjay Rao', phone: '21098-88888', plan: 'Premium', joined: '2026-02-09', status: 'Inactive' },
        { name: 'Divya Menon', phone: '10987-99999', plan: 'Basic', joined: '2026-02-14', status: 'Active' },
      ]
    },
    {
      icon: '🌴', name: 'Honeymoon Deals', users: 5400, pct: 54, color: '#AED9E0', subscribers: [
        { name: 'Priya Sharma', phone: '98765-43210', plan: 'Premium', joined: '2026-01-17', status: 'Active' },
        { name: 'Rahul Mehta', phone: '91234-56789', plan: 'Basic', joined: '2026-01-24', status: 'Active' },
        { name: 'Ananya Patel', phone: '87654-32109', plan: 'Premium', joined: '2026-02-05', status: 'Active' },
        { name: 'Meera Iyer', phone: '98765-11111', plan: 'Basic', joined: '2026-02-10', status: 'Active' },
        { name: 'Pooja Desai', phone: '76543-33333', plan: 'Premium', joined: '2026-02-15', status: 'Inactive' },
      ]
    },
    {
      icon: '👥', name: 'Guest Management', users: 7100, pct: 71, color: '#C9B8F0', subscribers: [
        { name: 'Vikram Singh', phone: '76543-21098', plan: 'Basic', joined: '2026-01-18', status: 'Active' },
        { name: 'Kiran Bhat', phone: '87654-22222', plan: 'Premium', joined: '2026-01-25', status: 'Active' },
        { name: 'Nisha Kapoor', phone: '54321-55555', plan: 'Basic', joined: '2026-02-02', status: 'Active' },
        { name: 'Tarun Saxena', phone: '98765-00000', plan: 'Premium', joined: '2026-02-07', status: 'Inactive' },
        { name: 'Deepika Nair', phone: '65432-10987', plan: 'Basic', joined: '2026-02-12', status: 'Active' },
      ]
    },
    {
      icon: '📰', name: 'Wedding News', users: 3800, pct: 38, color: '#FFB3C6', subscribers: [
        { name: 'Arjun Kumar', phone: '54321-09876', plan: 'Basic', joined: '2026-01-19', status: 'Active' },
        { name: 'Sneha Gupta', phone: '43210-98765', plan: 'Premium', joined: '2026-01-26', status: 'Active' },
        { name: 'Rohan Verma', phone: '32109-87654', plan: 'Basic', joined: '2026-02-03', status: 'Active' },
        { name: 'Aditya Joshi', phone: '10987-65432', plan: 'Premium', joined: '2026-02-08', status: 'Inactive' },
        { name: 'Kavya Reddy', phone: '21098-76543', plan: 'Basic', joined: '2026-02-13', status: 'Active' },
      ]
    },
    {
      icon: '👨‍👩‍👧', name: 'Add Family Member', users: 4200, pct: 42, color: '#B5EAD7', subscribers: [
        { name: 'Suresh Pillai', phone: '65432-44444', plan: 'Premium', joined: '2026-01-21', status: 'Active' },
        { name: 'Manish Tiwari', phone: '43210-66666', plan: 'Basic', joined: '2026-01-28', status: 'Active' },
        { name: 'Sanjay Rao', phone: '21098-88888', plan: 'Premium', joined: '2026-02-06', status: 'Active' },
        { name: 'Divya Menon', phone: '10987-99999', plan: 'Basic', joined: '2026-02-11', status: 'Inactive' },
        { name: 'Ritu Agarwal', phone: '32109-77777', plan: 'Premium', joined: '2026-02-16', status: 'Active' },
      ]
    },
  ],

  // ── TODO: REPLACE WITH LARAVEL API ─────────────────────────────────────────
  // Endpoint : GET /api/app/bq-stats?from={date}&to={date}
  // Controller: App\Http\Controllers\BQStatsController@index
  // Returns  : [
  //   { type:'bytes',    icon, title, generated, sold, pending, convRate, avgValue, topSource, revenue },
  //   { type:'quotes',   icon, title, generated, sold, pending, convRate, avgValue, topSource, revenue },
  //   { type:'packages', icon, title, generated, sold, pending, convRate, avgValue, topSource, revenue },
  // ]
  // 'generated' = total bytes/quotes/packages created by app users
  // 'sold'      = how many were converted/purchased
  // Example  :
  //   const res = await fetch(`${API_BASE}/app/bq-stats?from=${from}&to=${to}`);
  //   DATA.bqData = await res.json();
  //   renderBQCardsDash();
  // ─────────────────────────────────────────────────────────────────────────────
  bqData: [
    {
      type: 'bytes', icon: '📝', title: 'Wedding Bytes',
      generated: 3421, sold: 1892, pending: 1529,
      convRate: '55.3%', avgValue: '₹1,200',
      topSource: 'Instagram', revenue: '₹22.7L'
    },
    {
      type: 'quotes', icon: '💬', title: 'Get Quote',
      generated: 1876, sold: 943, pending: 933,
      convRate: '50.3%', avgValue: '₹3,800',
      topSource: 'LinkedIn', revenue: '₹35.8L'
    },
    {
      type: 'packages', icon: '📦', title: 'Packages',
      generated: 2104, sold: 1347, pending: 757,
      convRate: '64.0%', avgValue: '₹8,500',
      topSource: 'Facebook', revenue: '₹1.14Cr'
    },
  ]
};

// ===== STATE =====
let currentPage = 'dashboard';
let currentLeadFilter = 'all';
let currentBQFilter = 'all-bq';
let leadsPage = 1;
const LEADS_PER_PAGE = 8;
// TODO: Once you fetch leads from the API, replace this with:
//   let filteredLeads = [];
//   and populate it inside the fetch callback.
let filteredLeads = [...DATA.leads];
let charts = {};

// ===== NAVIGATION =====
function navigateTo(page, filter) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.page === page);
  });

  // Update pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  currentPage = page;

  // Update topbar
  const titles = {
    dashboard: ['Dashboard Overview', 'Real-time analytics across all verticals'],
    leads: ['Lead Details', 'All leads sourced from social media'],
    'b2b-features': ['B2B App Features', 'Feature usage analytics for B2B platform'],
    'b2c-features': ['B2C App Features', 'Feature usage analytics for B2C platform'],
    conversions: ['Conversion Analytics', 'Lead conversion rates and revenue'],
    'bytes-quotes': ['Bytes, Quotes & Packages', 'Generated vs sold performance'],
  };
  const t = titles[page] || ['Dashboard', ''];
  document.getElementById('pageTitle').textContent = t[0];
  document.getElementById('pageSubtitle').textContent = t[1];

  // Apply filter if provided
  if (filter) {
    if (page === 'leads') {
      applyLeadFilter(filter);
    } else if (page === 'bytes-quotes') {
      applyBQFilter(filter.replace('-gen', '').replace('-sold', ''));
    }
  }

  // Init page-specific content
  if (page === 'b2b-features') initB2BFeatures();
  if (page === 'b2c-features') initB2CFeatures();
  if (page === 'conversions') initConversionCharts();
  if (page === 'bytes-quotes') initBQPage();
  if (page === 'leads') renderLeadsTable();

  // Scroll to top
  document.querySelector('.main-content').scrollTo(0, 0);
}

// ===== LEAD FILTER =====
function applyLeadFilter(filter) {
  currentLeadFilter = filter;
  leadsPage = 1;

  // Update tabs
  document.querySelectorAll('#leadFilterTabs .ftab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === filter);
  });

  const vertMap = {
    'b2b': 'B2B App', 'b2b-sold': 'B2B App',
    'b2c': 'B2C App', 'b2c-sold': 'B2C App',
    'buyleads': 'Buy Leads', 'buyleads-sold': 'Buy Leads',
    'ipm': 'IPM', 'ipm-sold': 'IPM'
  };

  // TODO: When using the API, replace this client-side filter with a server-side call:
  //   Endpoint : GET /api/leads?from={date}&to={date}&vertical={vert}&status={status}
  //   Controller: App\Http\Controllers\LeadController@index
  //   Then: filteredLeads = apiResponse.data; renderLeadsTable();
  filteredLeads = DATA.leads.filter(l => {
    if (filter === 'all') return true;
    if (filter === 'sold') return l.status === 'sold';
    if (vertMap[filter]) {
      const vert = vertMap[filter];
      const isSoldFilter = filter.endsWith('-sold');
      return l.vertical === vert && (!isSoldFilter || l.status === 'sold');
    }
    return true;
  });

  renderLeadsTable();
}

function renderLeadsTable() {
  const search = document.getElementById('leadSearch')?.value?.toLowerCase() || '';
  let leads = filteredLeads.filter(l =>
    !search || l.name.toLowerCase().includes(search) ||
    l.id.toLowerCase().includes(search) ||
    l.vertical.toLowerCase().includes(search)
  );

  const total = leads.length;
  const totalPages = Math.ceil(total / LEADS_PER_PAGE);
  const start = (leadsPage - 1) * LEADS_PER_PAGE;
  const pageLeads = leads.slice(start, start + LEADS_PER_PAGE);

  const tbody = document.getElementById('leadsTableBody');
  if (!tbody) return;

  tbody.innerHTML = pageLeads.map(l => `
    <tr>
      <td><strong>${l.id}</strong></td>
      <td>${l.name}</td>
      <td><span class="badge-pill ${getVertPill(l.vertical)}">${l.vertical}</span></td>
      <td>${l.source}</td>
      <td>${l.date}</td>
      <td><span class="status-badge status-${l.status}">${capitalize(l.status)}</span></td>
      <td><strong>${l.value}</strong></td>
      <td><button class="page-btn" onclick="showLeadModal('${l.id}')">View</button></td>
    </tr>
  `).join('');

  document.getElementById('pageInfo').textContent = `Page ${leadsPage} of ${totalPages || 1}`;
  document.getElementById('prevPage').disabled = leadsPage <= 1;
  document.getElementById('nextPage').disabled = leadsPage >= totalPages;
}

function getVertPill(v) {
  const m = { 'B2B App': 'pink-pill', 'B2C App': 'lavender-pill', 'Buy Leads': 'mint-pill', 'IPM': 'peach-pill' };
  return m[v] || 'lavender-pill';
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ===== LEAD MODAL =====
function showLeadModal(id) {
  const lead = DATA.leads.find(l => l.id === id);
  if (!lead) return;
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div style="margin-bottom:20px">
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:4px">Lead ID</div>
      <div style="font-size:22px;font-weight:800">${lead.id}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      ${modalRow('👤 Name', lead.name)}
      ${modalRow('🏷️ Vertical', lead.vertical)}
      ${modalRow('📡 Source', lead.source)}
      ${modalRow('📅 Date', lead.date)}
      ${modalRow('💰 Value', lead.value)}
      ${modalRow('📊 Status', `<span class="status-badge status-${lead.status}">${capitalize(lead.status)}</span>`)}
    </div>
    <div style="margin-top:20px;padding:14px;background:var(--lavender-light);border-radius:10px;font-size:13px;color:var(--text-secondary)">
      <strong>📌 Notes:</strong> Lead sourced via ${lead.source} campaign. Follow-up scheduled within 24 hours.
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}
function modalRow(label, value) {
  return `<div style="background:var(--bg);padding:12px;border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">${label}</div>
    <div style="font-size:14px;font-weight:600">${value}</div>
  </div>`;
}

// ===== B2B FEATURES =====
function initB2BFeatures() {
  const grid = document.getElementById('b2bFeaturesGrid');
  if (!grid || grid.dataset.init) return;
  grid.dataset.init = '1';

  // TODO: REPLACE WITH LARAVEL API CALL
  // Endpoint : GET /api/app/b2b/features?from={date}&to={date}
  // Controller: App\Http\Controllers\B2BFeatureController@index
  // Example  :
  //   const { from, to } = getDateRange();
  //   const res = await fetch(`${API_BASE}/app/b2b/features?from=${from}&to=${to}`);
  //   DATA.b2bFeatures = await res.json();
  //   grid.innerHTML = DATA.b2bFeatures.map((f, i) => featureCard(f, i, 'b2b')).join('');
  //   return; // skip mock render below
  grid.innerHTML = DATA.b2bFeatures.map((f, i) => featureCard(f, i, 'b2b')).join('');
}

// ===== B2C FEATURES =====
function initB2CFeatures() {
  const grid = document.getElementById('b2cFeaturesGrid');
  if (!grid || grid.dataset.init) return;
  grid.dataset.init = '1';

  // TODO: REPLACE WITH LARAVEL API CALL
  // Endpoint : GET /api/app/b2c/features?from={date}&to={date}
  // Controller: App\Http\Controllers\B2CFeatureController@index
  // Example  :
  //   const { from, to } = getDateRange();
  //   const res = await fetch(`${API_BASE}/app/b2c/features?from=${from}&to=${to}`);
  //   DATA.b2cFeatures = await res.json();
  //   grid.innerHTML = DATA.b2cFeatures.map((f, i) => featureCard(f, i, 'b2c')).join('');
  //   return;
  grid.innerHTML = DATA.b2cFeatures.map((f, i) => featureCard(f, i, 'b2c')).join('');
}

function featureCard(f, idx, type) {
  return `<div class="feature-card" onclick="showFeatureModal('${type}',${idx})" style="cursor:pointer">
    <div class="fc-icon">${f.icon}</div>
    <div class="fc-name">${f.name}</div>
    <div class="fc-users">${f.users.toLocaleString()}</div>
    <div class="fc-label">Active Users — click to view subscribers</div>
    <div class="fc-bar"><div class="fc-fill" style="width:${f.pct}%;background:${f.color}"></div></div>
    <div style="font-size:11px;color:var(--text-muted);margin-top:4px">${f.pct}% adoption</div>
  </div>`;
}

// ===== FEATURE SUBSCRIBER MODAL =====
function showFeatureModal(type, idx) {
  const list = type === 'b2b' ? DATA.b2bFeatures : DATA.b2cFeatures;
  const f = list[idx];
  if (!f) return;
  const content = document.getElementById('modalContent');

  // TODO: REPLACE SUBSCRIBER LIST WITH LARAVEL API CALL
  // Endpoint : GET /api/app/{type}/features/{featureId}/subscribers?from={date}&to={date}&page={page}
  //            type = 'b2b' or 'b2c'
  //            featureId = the feature identifier (e.g., 'wedding-leads', 'get-quote')
  // Controller: App\Http\Controllers\FeatureSubscriberController@index
  // Returns  : { data: [{ name, phone, plan, joined, status }, ...], total, per_page }
  // Example  :
  //   const res = await fetch(`${API_BASE}/app/${type}/features/${f.id}/subscribers`);
  //   const json = await res.json();
  //   const subscribers = json.data;
  //   // Then build rows from subscribers instead of f.subscribers below
  // ─────────────────────────────────────────────────────────────────────────────
  const rows = f.subscribers.map(s => `
    <tr>
      <td>${s.name}</td>
      <td>${s.phone}</td>
      <td><span class="badge-pill ${s.plan === 'Premium' ? 'lavender-pill' : 'mint-pill'}">${s.plan}</span></td>
      <td>${s.joined}</td>
      <td><span class="status-badge ${s.status === 'Active' ? 'status-sold' : 'status-pending'}">${s.status}</span></td>
    </tr>
  `).join('');
  content.innerHTML = `
    <div style="margin-bottom:20px">
      <div style="font-size:24px;margin-bottom:6px">${f.icon}</div>
      <div style="font-size:20px;font-weight:800">${f.name}</div>
      <div style="font-size:13px;color:var(--text-muted);margin-top:4px">${f.users.toLocaleString()} active users &nbsp;•&nbsp; ${f.pct}% adoption</div>
    </div>
    <div style="font-size:13px;font-weight:700;margin-bottom:10px;color:var(--text-secondary)">📋 Subscriber Details</div>
    <div style="overflow-x:auto">
      <table class="data-table" style="min-width:100%">
        <thead><tr><th>Name</th><th>Phone</th><th>Plan</th><th>Joined</th><th>Status</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div style="margin-top:14px;padding:12px;background:var(--lavender-light);border-radius:10px;font-size:12px;color:var(--text-muted)">
      Showing 5 of ${f.users.toLocaleString()} subscribers. Export full list from Reports.
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}

// ===== BQ SUBSCRIBER MODAL =====
function showBQModal(type) {
  const d = DATA.bqData.find(x => x.type === type);
  if (!d) return;

  // TODO: REPLACE WITH LARAVEL API CALL
  // Endpoint : GET /api/app/bq/{type}/activity?from={date}&to={date}&page={page}
  //            type = 'bytes', 'quotes', or 'packages'
  // Controller: App\Http\Controllers\BQActivityController@index
  // Returns  : { data: [{ name, phone, action, date, status }, ...], total }
  //            'action' for bytes  = 'Viewed' | 'Shared' | 'Saved'
  //            'action' for quotes = 'Requested' | 'Sent'
  //            'status' = 'Converted' | 'Pending'
  // Example  :
  //   const res = await fetch(`${API_BASE}/app/bq/${type}/activity?from=${from}&to=${to}`);
  //   const json = await res.json();
  //   const subs = json.data; // use this instead of the mock array below
  // ─────────────────────────────────────────────────────────────────────────────
  const subs = [
    { name: 'Priya Sharma', phone: '98765-43210', action: type === 'bytes' ? 'Viewed' : 'Requested', date: '2026-02-18', status: 'Converted' },
    { name: 'Rahul Mehta', phone: '91234-56789', action: type === 'bytes' ? 'Shared' : 'Sent', date: '2026-02-17', status: 'Pending' },
    { name: 'Ananya Patel', phone: '87654-32109', action: type === 'bytes' ? 'Viewed' : 'Requested', date: '2026-02-16', status: 'Converted' },
    { name: 'Vikram Singh', phone: '76543-21098', action: type === 'bytes' ? 'Saved' : 'Sent', date: '2026-02-15', status: 'Pending' },
    { name: 'Deepika Nair', phone: '65432-10987', action: type === 'bytes' ? 'Viewed' : 'Requested', date: '2026-02-14', status: 'Converted' },
    { name: 'Arjun Kumar', phone: '54321-09876', action: type === 'bytes' ? 'Shared' : 'Sent', date: '2026-02-13', status: 'Converted' },
  ];
  const rows = subs.map(s => `
    <tr>
      <td>${s.name}</td>
      <td>${s.phone}</td>
      <td>${s.action}</td>
      <td>${s.date}</td>
      <td><span class="status-badge ${s.status === 'Converted' ? 'status-sold' : 'status-pending'}">${s.status}</span></td>
    </tr>
  `).join('');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div style="margin-bottom:20px">
      <div style="font-size:24px;margin-bottom:6px">${d.icon}</div>
      <div style="font-size:20px;font-weight:800">${d.title}</div>
      <div style="display:flex;gap:16px;margin-top:10px;flex-wrap:wrap">
        ${modalRow('📊 Generated', d.generated.toLocaleString())}
        ${modalRow('✅ Sold', d.sold.toLocaleString())}
        ${modalRow('🔄 Conversion', d.convRate)}
        ${modalRow('💵 Revenue', d.revenue)}
      </div>
    </div>
    <div style="font-size:13px;font-weight:700;margin-bottom:10px;color:var(--text-secondary)">👤 User Activity</div>
    <div style="overflow-x:auto">
      <table class="data-table" style="min-width:100%">
        <thead><tr><th>Name</th><th>Phone</th><th>Action</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div style="margin-top:14px;padding:12px;background:var(--lavender-light);border-radius:10px;font-size:12px;color:var(--text-muted)">
      Showing 6 of ${d.generated.toLocaleString()} interactions. Export full list from Reports.
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}

// ===== CONVERSION CHARTS =====
function initConversionCharts() {
  // TODO: REPLACE WITH LARAVEL API CALL
  // Endpoint : GET /api/conversions/summary?from={date}&to={date}
  // Controller: App\Http\Controllers\ConversionController@summary
  // Returns  : {
  //   byVertical: [{ vertical, generated, sold }, ...],
  //   revenueByMonth: [{ month, b2b_revenue, buyleads_revenue }, ...]
  // }
  // Example  :
  //   const res = await fetch(`${API_BASE}/conversions/summary?from=${from}&to=${to}`);
  //   const { byVertical, revenueByMonth } = await res.json();
  //   // Then feed byVertical into conversionBarChart datasets
  //   // and revenueByMonth into revenueChart datasets
  setTimeout(() => {
    if (charts.convBar) charts.convBar.destroy();
    charts.convBar = new Chart(document.getElementById('conversionBarChart'), {
      type: 'bar',
      data: {
        labels: ['B2B App', 'B2C App', 'Buy Leads', 'IPM'],
        datasets: [
          { label: 'Generated', data: [1284, 876, 2156, 643], backgroundColor: '#C9B8F055', borderColor: '#C9B8F0', borderWidth: 2, borderRadius: 6 },
          { label: 'Sold', data: [924, 534, 1186, 437], backgroundColor: '#B5EAD755', borderColor: '#5CB88A', borderWidth: 2, borderRadius: 6 }
        ]
      },
      options: { ...chartOpts('Leads'), plugins: { legend: { display: true } } }
    });

    if (charts.revenue) charts.revenue.destroy();
    charts.revenue = new Chart(document.getElementById('revenueChart'), {
      type: 'line',
      data: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [
          { label: 'B2B Revenue (L)', data: [28, 31, 35, 38, 36, 39], borderColor: '#FFB3C6', backgroundColor: '#FFB3C622', tension: 0.4, fill: true },
          { label: 'Buy Leads Revenue (L)', data: [38, 42, 45, 48, 47, 50], borderColor: '#B5EAD7', backgroundColor: '#B5EAD722', tension: 0.4, fill: true },
        ]
      },
      options: chartOpts('₹ Lakhs')
    });
  }, 100);
}

// ===== BQ PAGE =====
function initBQPage() {
  // TODO: REPLACE WITH LARAVEL API CALL
  // Endpoint : GET /api/app/bq-stats?from={date}&to={date}
  // Controller: App\Http\Controllers\BQStatsController@index
  // Returns  : same structure as DATA.bqData above
  // Example  :
  //   const res = await fetch(`${API_BASE}/app/bq-stats?from=${from}&to=${to}`);
  //   DATA.bqData = await res.json();
  //   renderBQCards(currentBQFilter);
  renderBQCards('all-bq');

  setTimeout(() => {
    if (charts.bqCompare) charts.bqCompare.destroy();
    charts.bqCompare = new Chart(document.getElementById('bqCompareChart'), {
      type: 'bar',
      data: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [
          { label: 'Bytes Generated', data: [2800, 3000, 3100, 3200, 3300, 3421], backgroundColor: '#C9B8F055', borderColor: '#C9B8F0', borderWidth: 2, borderRadius: 4 },
          { label: 'Bytes Sold', data: [1400, 1500, 1600, 1700, 1800, 1892], backgroundColor: '#B5EAD755', borderColor: '#5CB88A', borderWidth: 2, borderRadius: 4 },
          { label: 'Quotes Generated', data: [1400, 1500, 1600, 1700, 1800, 1876], backgroundColor: '#FFB3C655', borderColor: '#E8829A', borderWidth: 2, borderRadius: 4 },
          { label: 'Packages Sold', data: [900, 1000, 1100, 1150, 1250, 1347], backgroundColor: '#FFD6A555', borderColor: '#E8A04A', borderWidth: 2, borderRadius: 4 },
        ]
      },
      options: { ...chartOpts('Count'), plugins: { legend: { display: true } } }
    });
  }, 100);
}

function applyBQFilter(filter) {
  currentBQFilter = filter;
  document.querySelectorAll('#bqFilterTabs .ftab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === filter);
  });
  renderBQCards(filter);
}

function renderBQCards(filter) {
  const grid = document.getElementById('bqCardsGrid');
  if (!grid) return;
  const items = filter === 'all-bq' ? DATA.bqData : DATA.bqData.filter(d => d.type === filter);
  grid.innerHTML = items.map(d => bqCardHTML(d, true)).join('');
}

function renderBQCardsDash() {
  const grid = document.getElementById('dashBqGrid');
  if (!grid) return;
  // TODO: If you want the dashboard BQ cards to always reflect live data,
  // call the API here instead of reading from DATA.bqData:
  //   Endpoint: GET /api/app/bq-stats?from={date}&to={to}
  //   Then: DATA.bqData = await res.json(); before rendering.
  grid.innerHTML = DATA.bqData.map(d => bqCardHTML(d, true)).join('');
}

function bqCardHTML(d, clickable) {
  const onclick = clickable ? `onclick="showBQModal('${d.type}')" style="cursor:pointer"` : '';
  return `
    <div class="bq-card" ${onclick}>
      <div class="bq-header">
        <span class="bq-icon">${d.icon}</span>
        <span class="bq-title">${d.title}</span>
      </div>
      <div class="bq-row"><span class="bq-row-label">📊 Generated</span><span class="bq-row-val" style="color:#7B9EE8">${d.generated.toLocaleString()}</span></div>
      <div class="bq-row"><span class="bq-row-label">✅ Sold</span><span class="bq-row-val" style="color:var(--mint-dark)">${d.sold.toLocaleString()}</span></div>
      <div class="bq-row"><span class="bq-row-label">⏳ Pending</span><span class="bq-row-val" style="color:var(--peach-dark)">${d.pending.toLocaleString()}</span></div>
      <div class="bq-row"><span class="bq-row-label">🔄 Conversion</span><span class="bq-row-val">${d.convRate}</span></div>
      <div class="bq-row"><span class="bq-row-label">💰 Avg Value</span><span class="bq-row-val">${d.avgValue}</span></div>
      <div class="bq-row"><span class="bq-row-label">📡 Top Source</span><span class="bq-row-val">${d.topSource}</span></div>
      <div class="bq-row"><span class="bq-row-label">💵 Revenue</span><span class="bq-row-val" style="color:var(--lavender-dark)">${d.revenue}</span></div>
      ${clickable ? '<div style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:8px">Click to view user activity ↗</div>' : ''}
    </div>
  `;
}

// ===== CHART OPTIONS =====
function chartOpts(yLabel) {
  return {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      x: { grid: { color: '#EEE8FF' }, ticks: { font: { family: 'Inter', size: 11 } } },
      y: { grid: { color: '#EEE8FF' }, ticks: { font: { family: 'Inter', size: 11 } }, title: { display: false } }
    }
  };
}

// ===== DASHBOARD GRIDS INIT =====
function initDashboardGrids() {
  // TODO: This function should call all three APIs in parallel on page load.
  // Recommended pattern using Promise.all:
  //
  //   const { from, to } = getDateRange();
  //   const [b2bRes, b2cRes, bqRes] = await Promise.all([
  //     fetch(`${API_BASE}/app/b2b/features?from=${from}&to=${to}`),
  //     fetch(`${API_BASE}/app/b2c/features?from=${from}&to=${to}`),
  //     fetch(`${API_BASE}/app/bq-stats?from=${from}&to=${to}`),
  //   ]);
  //   DATA.b2bFeatures = await b2bRes.json();
  //   DATA.b2cFeatures = await b2cRes.json();
  //   DATA.bqData      = await bqRes.json();
  //   // Then render all three grids:
  //   b2bGrid.innerHTML = DATA.b2bFeatures.map((f,i) => featureCard(f,i,'b2b')).join('');
  //   b2cGrid.innerHTML = DATA.b2cFeatures.map((f,i) => featureCard(f,i,'b2c')).join('');
  //   renderBQCardsDash();
  //
  // Helper to read current date picker values:
  // function getDateRange() {
  //   return {
  //     from: document.getElementById('dateFrom').value,
  //     to:   document.getElementById('dateTo').value,
  //   };
  // }

  // B2B grid (currently using mock data)
  const b2bGrid = document.getElementById('dashB2bGrid');
  if (b2bGrid && !b2bGrid.dataset.init) {
    b2bGrid.dataset.init = '1';
    b2bGrid.innerHTML = DATA.b2bFeatures.map((f, i) => featureCard(f, i, 'b2b')).join('');
  }
  // B2C grid (currently using mock data)
  const b2cGrid = document.getElementById('dashB2cGrid');
  if (b2cGrid && !b2cGrid.dataset.init) {
    b2cGrid.dataset.init = '1';
    b2cGrid.innerHTML = DATA.b2cFeatures.map((f, i) => featureCard(f, i, 'b2c')).join('');
  }
  // BQ grid (currently using mock data)
  renderBQCardsDash();
}

// ===== EVENTS =====
document.addEventListener('DOMContentLoaded', () => {
  // ===== COLLAPSIBLE NAV GROUP =====
  const navGroupToggle = document.getElementById('navGroupToggle');
  const navSub = document.getElementById('navSub');
  const navArrow = document.getElementById('navArrow');

  navGroupToggle?.addEventListener('click', () => {
    const isOpen = navSub.classList.toggle('open');
    navArrow.classList.toggle('open', isOpen);
    navGroupToggle.setAttribute('aria-expanded', isOpen);
  });

  // ===== MOBILE SIDEBAR =====
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarClose = document.getElementById('sidebarClose');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openSidebar);
  sidebarClose?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  // Sidebar nav — close sidebar on mobile after navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(item.dataset.page);
      if (window.innerWidth <= 900) closeSidebar();
    });
  });


  // Clickable stat cards
  document.querySelectorAll('.stat-card.clickable').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.classList.contains('clickable-num')) return;
      navigateTo(card.dataset.target, card.dataset.filter);
    });
  });

  // Clickable numbers in stat cards
  document.querySelectorAll('.clickable-num').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      navigateTo(el.dataset.target, el.dataset.filter);
    });
  });

  // Conversion cards
  document.querySelectorAll('.conv-card.clickable').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.classList.contains('clickable-num')) return;
      navigateTo(card.dataset.target, card.dataset.filter);
    });
  });

  // Feature overview cards (kept for sidebar pages)
  document.querySelectorAll('.feature-overview-card.clickable').forEach(card => {
    card.addEventListener('click', () => navigateTo(card.dataset.target));
  });

  // Lead filter tabs
  document.querySelectorAll('#leadFilterTabs .ftab').forEach(tab => {
    tab.addEventListener('click', () => applyLeadFilter(tab.dataset.filter));
  });

  // BQ filter tabs
  document.querySelectorAll('#bqFilterTabs .ftab').forEach(tab => {
    tab.addEventListener('click', () => applyBQFilter(tab.dataset.filter));
  });

  // Lead search
  document.getElementById('leadSearch')?.addEventListener('input', () => renderLeadsTable());

  // Pagination
  document.getElementById('prevPage')?.addEventListener('click', () => {
    if (leadsPage > 1) { leadsPage--; renderLeadsTable(); }
  });
  document.getElementById('nextPage')?.addEventListener('click', () => {
    const total = Math.ceil(filteredLeads.length / LEADS_PER_PAGE);
    if (leadsPage < total) { leadsPage++; renderLeadsTable(); }
  });

  // Modal close
  document.getElementById('modalClose')?.addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('open');
  });
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) {
      document.getElementById('modalOverlay').classList.remove('open');
    }
  });

  // Date picker Apply button
  document.getElementById('applyDateBtn')?.addEventListener('click', () => {
    const from = document.getElementById('dateFrom').value;
    const to = document.getElementById('dateTo').value;

    // TODO: PLUG IN ALL API CALLS HERE when Apply is clicked.
    // This is the central place to re-fetch everything for the selected date range.
    // Recommended:
    //   1. Show a loading spinner on each grid/card section
    //   2. Call all APIs in parallel (see initDashboardGrids TODO above)
    //   3. Also re-fetch leads: GET /api/leads?from=${from}&to=${to}
    //   4. Also re-fetch dashboard stat cards: GET /api/dashboard/stats?from=${from}&to=${to}
    //      Controller: App\Http\Controllers\DashboardController@stats
    //      Returns: { b2b_leads, b2c_leads, buy_leads, ipm_leads, total_revenue, ... }
    //   5. Hide spinner and re-render all sections

    // Visual feedback (remove this once real API calls are in place)
    document.querySelectorAll('.stat-value').forEach(el => {
      el.style.opacity = '0.5';
      setTimeout(() => { el.style.opacity = '1'; }, 400);
    });
    console.log('TODO: Fetch all data from Laravel API for date range:', from, 'to', to);
  });

  // Init dashboard grids
  initDashboardGrids();

  // Init leads table
  renderLeadsTable();
});
