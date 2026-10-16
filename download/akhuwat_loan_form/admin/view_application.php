<?php
// ============================================================
// VIEW APPLICATION DETAILS (admin/view_application.php)
// ============================================================
// Yeh page ek single application ki mukammal details dikhata hai
// Admin yahan application ki status (Approve/Reject) bhi change kar sakta hai
// ============================================================

// Login check karo
require_once '../includes/config.php';
checkLogin();

// ----- APPLICATION ID GET KARO URL SE -----
$app_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($app_id === 0) {
    // Agar ID nahi hai to dashboard par bhej do
    header("Location: dashboard.php");
    exit();
}

// ----- STATUS UPDATE KARNE KA LOGIC -----
// Agar admin ne "Approve" ya "Reject" button daba diya
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
    
    $new_status = clean_input($_POST['new_status']);
    $app_id = (int)$_POST['app_id'];
    
    // Validate status
    if (in_array($new_status, ['Pending', 'Approved', 'Rejected'])) {
        
        // Database mein status update karo
        $update_sql = "UPDATE loan_applications SET status = ? WHERE id = ?";
        $stmt = $conn->prepare($update_sql);
        $stmt->bind_param("si", $new_status, $app_id);
        
        if ($stmt->execute()) {
            $success_msg = "✅ Application ka status update ho gaya: " . $new_status;
        } else {
            $error_msg = "❌ Status update nahi hua: " . $stmt->error;
        }
        
        $stmt->close();
    }
}

// ----- APPLICATION DETAILS DATABASE SE LAO -----
$sql = "SELECT * FROM loan_applications WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $app_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // Application nahi mili
    header("Location: dashboard.php");
    exit();
}

$application = $result->fetch_assoc();
$stmt->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application #<?php echo $app_id; ?> - Admin</title>
    
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
        }
        
        .navbar-admin h4 {
            margin: 0;
            font-weight: 600;
        }
        
        .detail-card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 20px;
        }
        
        .section-header {
            color: #1a7a3c;
            font-weight: 600;
            border-bottom: 2px solid #e8f5e9;
            padding-bottom: 8px;
            margin-bottom: 20px;
            margin-top: 0;
        }
        
        .detail-row {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 600;
            color: #6c757d;
            width: 200px;
            min-width: 200px;
        }
        
        .detail-value {
            color: #2c3e50;
            flex: 1;
        }
        
        .document-image {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .document-image:hover {
            transform: scale(1.02);
        }
        
        .document-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
        }
        
        .document-card h6 {
            color: #1a7a3c;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .status-badge {
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .status-Pending { background: #fff3cd; color: #856404; }
        .status-Approved { background: #d4edda; color: #155724; }
        .status-Rejected { background: #f8d7da; color: #721c24; }
        
        .btn-approve {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 25px;
            font-weight: 600;
        }
        
        .btn-reject {
            background: #dc3545;
            color: white;
            border: none;
            padding: 10px 25px;
            font-weight: 600;
        }
        
        .btn-pending {
            background: #ffc107;
            color: #212529;
            border: none;
            padding: 10px 25px;
            font-weight: 600;
        }
        
        .alert-success-custom {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .alert-error-custom {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .photo-large {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid #1a7a3c;
        }
        
        .profile-section {
            text-align: center;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>

<!-- ========== NAVBAR ========== -->
<nav class="navbar-admin d-flex justify-content-between align-items-center">
    <div>
        <h4>🏦 Application Details #<?php echo $app_id; ?></h4>
        <small style="opacity: 0.9;">Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?></small>
    </div>
    <div>
        <a href="dashboard.php" class="btn btn-light btn-sm me-2">← Back to Dashboard</a>
        <a href="logout.php" class="btn btn-danger btn-sm">Logout</a>
    </div>
</nav>

<div class="container-fluid p-4">
    
    <?php if (isset($success_msg)): ?>
        <div class="alert-success-custom"><?php echo $success_msg; ?></div>
    <?php endif; ?>
    
    <?php if (isset($error_msg)): ?>
        <div class="alert-error-custom"><?php echo $error_msg; ?></div>
    <?php endif; ?>
    
    <div class="row">
        
        <!-- ===== LEFT COLUMN: Personal & Loan Details ===== -->
        <div class="col-lg-8">
            
            <!-- Personal Information Card -->
            <div class="detail-card">
                <h4 class="section-header">👤 Personal Information</h4>
                
                <!-- Profile Photo -->
                <div class="profile-section">
                    <?php if (!empty($application['photo_path']) && file_exists('../' . $application['photo_path'])): ?>
                        <img src="../<?php echo htmlspecialchars($application['photo_path']); ?>" 
                             alt="Profile Photo" 
                             class="photo-large">
                    <?php else: ?>
                        <div class="photo-large d-flex align-items-center justify-content-center bg-light">
                            <span style="font-size: 4rem;">👤</span>
                        </div>
                    <?php endif; ?>
                    <h5 class="mt-3 mb-0"><?php echo htmlspecialchars($application['full_name']); ?></h5>
                    <small class="text-muted">Application ID: #<?php echo $application['id']; ?></small>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="detail-row">
                            <div class="detail-label">Father Name:</div>
                            <div class="detail-value"><?php echo htmlspecialchars($application['father_name']); ?></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">CNIC Number:</div>
                            <div class="detail-value"><?php echo htmlspecialchars($application['cnic_number']); ?></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">Phone:</div>
                            <div class="detail-value"><?php echo htmlspecialchars($application['phone_number']); ?></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">Email:</div>
                            <div class="detail-value">
                                <?php echo !empty($application['email']) ? htmlspecialchars($application['email']) : '<em class="text-muted">Not provided</em>'; ?>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-row">
                            <div class="detail-label">Age Above 18:</div>
                            <div class="detail-value"><?php echo htmlspecialchars($application['age_above_18']); ?></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">Gender:</div>
                            <div class="detail-value"><?php echo htmlspecialchars($application['gender']); ?></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">Marital Status:</div>
                            <div class="detail-value"><?php echo htmlspecialchars($application['marital_status']); ?></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">Submitted:</div>
                            <div class="detail-value"><?php echo date('d M Y, h:i A', strtotime($application['submitted_at'])); ?></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Address & Loan Details -->
            <div class="detail-card">
                <h4 class="section-header">📍 Address & Loan Details</h4>
                <div class="detail-row">
                    <div class="detail-label">Complete Address:</div>
                    <div class="detail-value"><?php echo htmlspecialchars($application['address']); ?></div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">City:</div>
                    <div class="detail-value"><?php echo htmlspecialchars($application['city']); ?></div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Province:</div>
                    <div class="detail-value"><?php echo htmlspecialchars($application['province']); ?></div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Loan Type:</div>
                    <div class="detail-value"><?php echo htmlspecialchars($application['loan_type']); ?></div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Loan Amount:</div>
                    <div class="detail-value"><strong>Rs. <?php echo number_format($application['loan_amount']); ?></strong></div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Loan Purpose:</div>
                    <div class="detail-value"><?php echo htmlspecialchars($application['loan_purpose']); ?></div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Monthly Income:</div>
                    <div class="detail-value">
                        <?php echo !empty($application['monthly_income']) ? 'Rs. ' . number_format($application['monthly_income']) : '<em class="text-muted">Not provided</em>'; ?>
                    </div>
                </div>
            </div>
            
            <!-- Documents -->
            <div class="detail-card">
                <h4 class="section-header">📎 Uploaded Documents</h4>
                <div class="row">
                    
                    <!-- CNIC Front -->
                    <div class="col-md-4 mb-3">
                        <div class="document-card">
                            <h6>CNIC Front</h6>
                            <?php if (!empty($application['cnic_front_path']) && file_exists('../' . $application['cnic_front_path'])): ?>
                                <a href="../<?php echo htmlspecialchars($application['cnic_front_path']); ?>" target="_blank">
                                    <img src="../<?php echo htmlspecialchars($application['cnic_front_path']); ?>" 
                                         alt="CNIC Front" 
                                         class="document-image">
                                </a>
                            <?php else: ?>
                                <div class="text-muted">Not uploaded</div>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <!-- CNIC Back -->
                    <div class="col-md-4 mb-3">
                        <div class="document-card">
                            <h6>CNIC Back</h6>
                            <?php if (!empty($application['cnic_back_path']) && file_exists('../' . $application['cnic_back_path'])): ?>
                                <a href="../<?php echo htmlspecialchars($application['cnic_back_path']); ?>" target="_blank">
                                    <img src="../<?php echo htmlspecialchars($application['cnic_back_path']); ?>" 
                                         alt="CNIC Back" 
                                         class="document-image">
                                </a>
                            <?php else: ?>
                                <div class="text-muted">Not uploaded</div>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <!-- Utility Bill -->
                    <div class="col-md-4 mb-3">
                        <div class="document-card">
                            <h6>Utility Bill</h6>
                            <?php if (!empty($application['utility_bill_path']) && file_exists('../' . $application['utility_bill_path'])): ?>
                                <a href="../<?php echo htmlspecialchars($application['utility_bill_path']); ?>" target="_blank">
                                    <?php 
                                    // Agar PDF hai to PDF icon, warna image
                                    $ext = strtolower(pathinfo($application['utility_bill_path'], PATHINFO_EXTENSION));
                                    if ($ext === 'pdf'): 
                                    ?>
                                        <div style="font-size: 4rem;">📄</div>
                                        <small>View PDF</small>
                                    <?php else: ?>
                                        <img src="../<?php echo htmlspecialchars($application['utility_bill_path']); ?>" 
                                             alt="Utility Bill" 
                                             class="document-image">
                                    <?php endif; ?>
                                </a>
                            <?php else: ?>
                                <div class="text-muted">Not uploaded (optional)</div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
        <!-- ===== RIGHT COLUMN: Status & Actions ===== -->
        <div class="col-lg-4">
            
            <!-- Status Card -->
            <div class="detail-card">
                <h4 class="section-header">📊 Application Status</h4>
                
                <div class="text-center mb-3">
                    <span class="status-badge status-<?php echo $application['status']; ?>" style="font-size: 1rem; padding: 12px 24px;">
                        <?php echo $application['status']; ?>
                    </span>
                </div>
                
                <!-- Status Update Form -->
                <form method="POST" action="">
                    <input type="hidden" name="app_id" value="<?php echo $application['id']; ?>">
                    <input type="hidden" name="update_status" value="1">
                    
                    <p class="text-muted text-center mb-3">
                        Status change karne ke liye niche button dabaen:
                    </p>
                    
                    <div class="d-grid gap-2">
                        <button type="submit" 
                                name="new_status" 
                                value="Approved" 
                                class="btn btn-approve"
                                <?php echo $application['status'] === 'Approved' ? 'disabled' : ''; ?>>
                            ✅ Approve Application
                        </button>
                        
                        <button type="submit" 
                                name="new_status" 
                                value="Rejected" 
                                class="btn btn-reject"
                                <?php echo $application['status'] === 'Rejected' ? 'disabled' : ''; ?>>
                            ❌ Reject Application
                        </button>
                        
                        <button type="submit" 
                                name="new_status" 
                                value="Pending" 
                                class="btn btn-pending"
                                <?php echo $application['status'] === 'Pending' ? 'disabled' : ''; ?>>
                            ⏳ Set Pending
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Quick Info Card -->
            <div class="detail-card">
                <h4 class="section-header">📞 Quick Contact</h4>
                <div class="text-center">
                    <p><strong><?php echo htmlspecialchars($application['full_name']); ?></strong></p>
                    <p class="mb-2">📱 <a href="tel:<?php echo htmlspecialchars($application['phone_number']); ?>">
                        <?php echo htmlspecialchars($application['phone_number']); ?>
                    </a></p>
                    <?php if (!empty($application['email'])): ?>
                        <p class="mb-0">📧 <a href="mailto:<?php echo htmlspecialchars($application['email']); ?>">
                            <?php echo htmlspecialchars($application['email']); ?>
                        </a></p>
                    <?php endif; ?>
                </div>
            </div>
            
        </div>
        
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
