<?php
// ============================================================
// ADMIN DASHBOARD (admin/dashboard.php)
// ============================================================
// Yeh admin ka main page hai jahan saari loan applications list hoti hain
// Admin yahan applications dekh, filter, aur view kar sakta hai
// ============================================================

// Login check karo (agar admin login nahi hai to login page par bhej do)
require_once '../includes/config.php';
checkLogin();

// ----- FILTERING -----
// Status ke hisaab se filter kar sakte hain
$filter_status = isset($_GET['status']) ? clean_input($_GET['status']) : '';
$search_query = isset($_GET['search']) ? clean_input($_GET['search']) : '';

// ----- BUILD SQL QUERY -----
$sql = "SELECT id, full_name, father_name, cnic_number, phone_number, 
               city, province, loan_type, loan_amount, status, submitted_at 
        FROM loan_applications WHERE 1=1";

// Agar status filter laga hai
if (!empty($filter_status) && in_array($filter_status, ['Pending', 'Approved', 'Rejected'])) {
    $sql .= " AND status = '" . $filter_status . "'";
}

// Agar search query hai (name, CNIC, ya phone se search kar sakte hain)
if (!empty($search_query)) {
    $sql .= " AND (full_name LIKE '%" . $search_query . "%' 
             OR cnic_number LIKE '%" . $search_query . "%' 
             OR phone_number LIKE '%" . $search_query . "%')";
}

// Latest pehle dikhao
$sql .= " ORDER BY submitted_at DESC";

// Query execute karo
$result = $conn->query($sql);
$applications = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }
}

// ----- STATISTICS (Cards ke liye) -----
$stats = [
    'total' => 0,
    'pending' => 0,
    'approved' => 0,
    'rejected' => 0
];

$stats_result = $conn->query("SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
    SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as approved,
    SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
    FROM loan_applications");

if ($stats_result) {
    $stats = $stats_result->fetch_assoc();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Akhuwat Loan</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    
    <style>
        body {
            background: #f5f7fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .navbar-admin {
            background: linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%);
            color: white;
            padding: 15px 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .navbar-admin h4 {
            margin: 0;
            font-weight: 600;
        }
        
        .navbar-admin .admin-info {
            color: rgba(255,255,255,0.9);
            font-size: 0.9rem;
        }
        
        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .stat-card .icon {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .stat-card .number {
            font-size: 2rem;
            font-weight: 700;
            color: #2c3e50;
        }
        
        .stat-card .label {
            color: #6c757d;
            font-size: 0.9rem;
            margin-top: 5px;
        }
        
        .stat-card.total .icon { color: #1a7a3c; }
        .stat-card.pending .icon { color: #ffc107; }
        .stat-card.approved .icon { color: #28a745; }
        .stat-card.rejected .icon { color: #dc3545; }
        
        .applications-table {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-top: 30px;
        }
        
        .table thead {
            background: #e8f5e9;
            color: #1a7a3c;
        }
        
        .table th {
            font-weight: 600;
            border: none;
        }
        
        .status-badge {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .status-Pending {
            background: #fff3cd;
            color: #856404;
        }
        
        .status-Approved {
            background: #d4edda;
            color: #155724;
        }
        
        .status-Rejected {
            background: #f8d7da;
            color: #721c24;
        }
        
        .btn-view {
            background: #1a7a3c;
            color: white;
            padding: 5px 15px;
            border-radius: 5px;
            font-size: 0.85rem;
            text-decoration: none;
        }
        
        .btn-view:hover {
            background: #0f5228;
            color: white;
        }
        
        .filter-form {
            background: white;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .no-data {
            text-align: center;
            padding: 40px;
            color: #6c757d;
        }
        
        .no-data .icon {
            font-size: 4rem;
            margin-bottom: 15px;
            opacity: 0.5;
        }
    </style>
</head>
<body>

<!-- ========== ADMIN NAVBAR ========== -->
<nav class="navbar-admin d-flex justify-content-between align-items-center">
    <div>
        <h4>🏦 Akhuwat Loan Admin Panel</h4>
        <div class="admin-info">
            Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?> | 
            <?php echo date('d M Y, h:i A'); ?>
        </div>
    </div>
    <div>
        <a href="dashboard.php" class="btn btn-light btn-sm me-2">Dashboard</a>
        <a href="logout.php" class="btn btn-danger btn-sm">Logout</a>
    </div>
</nav>

<!-- ========== MAIN CONTENT ========== -->
<div class="container-fluid p-4">
    
    <!-- Page Title -->
    <h3 class="mb-4">📊 Loan Applications Dashboard</h3>
    
    <!-- ===== STATISTICS CARDS ===== -->
    <div class="row">
        
        <!-- Total Applications -->
        <div class="col-md-3 mb-3">
            <div class="stat-card total">
                <div class="icon">📋</div>
                <div class="number"><?php echo $stats['total']; ?></div>
                <div class="label">Total Applications</div>
            </div>
        </div>
        
        <!-- Pending -->
        <div class="col-md-3 mb-3">
            <div class="stat-card pending">
                <div class="icon">⏳</div>
                <div class="number"><?php echo $stats['pending']; ?></div>
                <div class="label">Pending</div>
            </div>
        </div>
        
        <!-- Approved -->
        <div class="col-md-3 mb-3">
            <div class="stat-card approved">
                <div class="icon">✅</div>
                <div class="number"><?php echo $stats['approved']; ?></div>
                <div class="label">Approved</div>
            </div>
        </div>
        
        <!-- Rejected -->
        <div class="col-md-3 mb-3">
            <div class="stat-card rejected">
                <div class="icon">❌</div>
                <div class="number"><?php echo $stats['rejected']; ?></div>
                <div class="label">Rejected</div>
            </div>
        </div>
    </div>
    
    <!-- ===== FILTER & SEARCH FORM ===== -->
    <div class="filter-form">
        <form method="GET" action="" class="row g-3 align-items-end">
            
            <!-- Status Filter -->
            <div class="col-md-3">
                <label class="form-label">Status Filter</label>
                <select name="status" class="form-select">
                    <option value="">All Status</option>
                    <option value="Pending" <?php echo $filter_status === 'Pending' ? 'selected' : ''; ?>>Pending</option>
                    <option value="Approved" <?php echo $filter_status === 'Approved' ? 'selected' : ''; ?>>Approved</option>
                    <option value="Rejected" <?php echo $filter_status === 'Rejected' ? 'selected' : ''; ?>>Rejected</option>
                </select>
            </div>
            
            <!-- Search -->
            <div class="col-md-6">
                <label class="form-label">Search (Name, CNIC, Phone)</label>
                <input type="text" 
                       name="search" 
                       class="form-control" 
                       placeholder="Search karein..."
                       value="<?php echo htmlspecialchars($search_query); ?>">
            </div>
            
            <!-- Buttons -->
            <div class="col-md-3">
                <button type="submit" class="btn btn-success me-2">
                    🔍 Filter
                </button>
                <a href="dashboard.php" class="btn btn-secondary">
                    🔄 Reset
                </a>
            </div>
        </form>
    </div>
    
    <!-- ===== APPLICATIONS TABLE ===== -->
    <div class="applications-table">
        
        <?php if (empty($applications)): ?>
            <!-- No applications found -->
            <div class="no-data">
                <div class="icon">📭</div>
                <h5>Koi application nahi mili</h5>
                <p>Abhi tak koi loan application submit nahi hui hai.</p>
            </div>
        <?php else: ?>
            
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>CNIC</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Loan Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($applications as $app): ?>
                        <tr>
                            <td>#<?php echo $app['id']; ?></td>
                            <td>
                                <strong><?php echo htmlspecialchars($app['full_name']); ?></strong>
                                <br>
                                <small class="text-muted">s/o <?php echo htmlspecialchars($app['father_name']); ?></small>
                            </td>
                            <td><?php echo htmlspecialchars($app['cnic_number']); ?></td>
                            <td><?php echo htmlspecialchars($app['phone_number']); ?></td>
                            <td><?php echo htmlspecialchars($app['city']); ?>, <?php echo htmlspecialchars($app['province']); ?></td>
                            <td><?php echo htmlspecialchars($app['loan_type']); ?></td>
                            <td>Rs. <?php echo number_format($app['loan_amount']); ?></td>
                            <td>
                                <span class="status-badge status-<?php echo $app['status']; ?>">
                                    <?php echo $app['status']; ?>
                                </span>
                            </td>
                            <td>
                                <small><?php echo date('d M Y', strtotime($app['submitted_at'])); ?></small>
                            </td>
                            <td>
                                <a href="view_application.php?id=<?php echo $app['id']; ?>" 
                                   class="btn-view">
                                    View
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
        <?php endif; ?>
        
    </div>
    
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
