<?php
// ==========================================
// CONFIGURACIÓN DEL PANEL
// ==========================================
$admin_password = '5264Lean.'; // CAMBIA ESTA CONTRASEÑA
$data_file = 'data.json';

// ==========================================
// PROTECCIÓN BÁSICA CON SESIÓN
// ==========================================
session_start();

// Cargar datos actuales
$data = json_decode(file_get_contents($data_file), true);

// ==========================================
// LOGIN
// ==========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    if ($_POST['password'] === $admin_password) {
        $_SESSION['logged_in'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $error = "❌ Contraseña incorrecta";
    }
}

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head><title>Login Admin LG Tattoo</title>
    <style>body{background:#0a0a0a;color:#f0ece6;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}
    .login-box{background:#181818;padding:40px;border-radius:12px;border:1px solid rgba(200,164,92,0.2);width:300px;text-align:center;}
    .login-box h2{color:#c8a45c;margin-bottom:20px;}
    input{width:100%;padding:12px;background:#1a1a1a;border:1px solid #2a2a2a;color:#fff;border-radius:8px;margin-bottom:15px;}
    button{width:100%;padding:12px;background:#c8a45c;border:none;border-radius:50px;font-weight:bold;cursor:pointer;}
    .error{color:#ff4d4d;margin-top:10px;font-size:0.9rem;}
    </style></head>
    <body>
        <div class="login-box">
            <h2>🔐 LG Admin</h2>
            <?php if(isset($error)) echo "<div class='error'>$error</div>"; ?>
            <form method="POST">
                <input type="password" name="password" placeholder="Contraseña" required>
                <button type="submit" name="login">Acceder</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// ==========================================
// PROCESAR ACCIONES DEL ADMIN
// ==========================================

// 1. Agregar imagen (Subida de archivo)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_image'])) {
    if (isset($_FILES['new_image']) && $_FILES['new_image']['error'] === 0) {
        $target_dir = "images/";
        if (!file_exists($target_dir)) mkdir($target_dir, 0777, true);
        
        $file_name = time() . '_' . basename($_FILES["new_image"]["name"]);
        $target_file = $target_dir . $file_name;
        
        if (move_uploaded_file($_FILES["new_image"]["tmp_name"], $target_file)) {
            $data['gallery'][] = "/" . $target_file;
            file_put_contents($data_file, json_encode($data, JSON_PRETTY_PRINT));
            $success = "✅ Imagen subida correctamente";
        } else {
            $error = "❌ Error al subir la imagen";
        }
    }
}

// 2. Eliminar imagen
if (isset($_GET['delete_img'])) {
    $index = intval($_GET['delete_img']);
    if (isset($data['gallery'][$index])) {
        // Intentar borrar el archivo físico también
        $file_path = $_SERVER['DOCUMENT_ROOT'] . $data['gallery'][$index];
        if (file_exists($file_path)) unlink($file_path);
        
        array_splice($data['gallery'], $index, 1);
        file_put_contents($data_file, json_encode($data, JSON_PRETTY_PRINT));
        header('Location: admin.php');
        exit;
    }
}

// 3. Agregar Testimonio
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_testimonial'])) {
    $name = trim($_POST['test_name']);
    $text = trim($_POST['test_text']);
    if (!empty($name) && !empty($text)) {
        $data['testimonials'][] = ['name' => $name, 'text' => $text];
        file_put_contents($data_file, json_encode($data, JSON_PRETTY_PRINT));
        $success = "✅ Testimonio agregado";
    }
}

// 4. Eliminar Testimonio
if (isset($_GET['delete_test'])) {
    $index = intval($_GET['delete_test']);
    if (isset($data['testimonials'][$index])) {
        array_splice($data['testimonials'], $index, 1);
        file_put_contents($data_file, json_encode($data, JSON_PRETTY_PRINT));
        header('Location: admin.php');
        exit;
    }
}

// ==========================================
// VISTA DEL PANEL ADMIN
// ==========================================
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Admin - LG Tattoo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body{background:#0a0a0a;color:#f0ece6;font-family:'Inter',sans-serif;padding:20px;}
        .container{max-width:900px;margin:0 auto;}
        h1{color:#c8a45c;border-bottom:1px solid #333;padding-bottom:10px;display:flex;justify-content:space-between;align-items:center;}
        .logout{color:#ff4d4d;text-decoration:none;font-size:0.9rem;}
        .card{background:#181818;padding:20px;border-radius:12px;border:1px solid rgba(200,164,92,0.2);margin-bottom:30px;}
        .card h2{font-size:1.2rem;color:#c8a45c;margin-top:0;}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:15px;margin-top:15px;}
        .img-item{position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;background:#222;}
        .img-item img{width:100%;height:100%;object-fit:cover;}
        .delete-btn{position:absolute;top:5px;right:5px;background:rgba(255,0,0,0.8);color:#fff;border:none;width:25px;height:25px;border-radius:50%;cursor:pointer;font-size:0.8rem;}
        .form-group{margin-bottom:15px;}
        input,textarea{width:100%;padding:10px;background:#1a1a1a;border:1px solid #2a2a2a;color:#fff;border-radius:8px;font-family:inherit;box-sizing:border-box;}
        textarea{min-height:80px;resize:vertical;}
        .btn{background:#c8a45c;color:#0a0a0a;border:none;padding:10px 20px;border-radius:50px;font-weight:bold;cursor:pointer;}
        .btn:hover{background:#d4b36a;}
        .msg{background:#2a2a2a;padding:10px;border-radius:8px;margin-bottom:15px;border-left:4px solid #c8a45c;}
        .msg.error{border-color:#ff4d4d;}
        .test-item{border-bottom:1px solid #2a2a2a;padding:10px 0;display:flex;justify-content:space-between;align-items:center;}
        .test-item strong{color:#c8a45c;display:block;}
        @media (max-width:600px){ .grid{grid-template-columns:repeat(auto-fill,minmax(90px,1fr));} }
    </style>
</head>
<body>
<div class="container">
    <h1>
        📂 Administración LG Tattoo
        <a href="?logout=true" class="logout" onclick="return confirm('¿Cerrar sesión?')"><i class="fas fa-sign-out-alt"></i> Salir</a>
    </h1>
    <?php if(isset($success)) echo "<div class='msg'>$success</div>"; ?>
    <?php if(isset($error)) echo "<div class='msg error'>$error</div>"; ?>

    <?php 
    // Cerrar sesión
    if(isset($_GET['logout'])) { session_destroy(); header('Location: admin.php'); exit; }
    ?>

    <!-- ============ SECCIÓN GALERÍA ============ -->
    <div class="card">
        <h2>🖼️ Galería de Imágenes</h2>
        <form method="POST" enctype="multipart/form-data" style="margin-bottom:20px;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <input type="file" name="new_image" accept="image/*" required style="flex:1; min-width:150px;">
                <button type="submit" name="add_image" class="btn"><i class="fas fa-upload"></i> Subir nueva foto</button>
            </div>
        </form>
        
        <div class="grid">
            <?php foreach($data['gallery'] as $index => $img): ?>
            <div class="img-item">
                <img src="<?php echo $img; ?>" alt="Trabajo">
                <a href="?delete_img=<?php echo $index; ?>" class="delete-btn" onclick="return confirm('¿Eliminar esta imagen?')"><i class="fas fa-times"></i></a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- ============ SECCIÓN TESTIMONIOS ============ -->
    <div class="card">
        <h2>💬 Testimonios</h2>
        <form method="POST" style="margin-bottom:20px;">
            <div class="form-group">
                <input type="text" name="test_name" placeholder="Nombre del cliente" required>
            </div>
            <div class="form-group">
                <textarea name="test_text" placeholder="Escribe el testimonio..." required></textarea>
            </div>
            <button type="submit" name="add_testimonial" class="btn"><i class="fas fa-plus"></i> Agregar Testimonio</button>
        </form>

        <div>
            <?php foreach($data['testimonials'] as $index => $test): ?>
            <div class="test-item">
                <div>
                    <strong><?php echo htmlspecialchars($test['name']); ?></strong>
                    <span style="font-size:0.9rem; color:#b0a89a;">"<?php echo htmlspecialchars($test['text']); ?>"</span>
                </div>
                <a href="?delete_test=<?php echo $index; ?>" style="color:#ff4d4d; text-decoration:none;" onclick="return confirm('¿Eliminar este testimonio?')"><i class="fas fa-trash"></i></a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>
</body>
</html>