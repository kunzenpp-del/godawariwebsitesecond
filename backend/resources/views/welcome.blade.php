<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Godawari Printing Solution - API</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0A1628 0%, #1B2A4A 100%);
            color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .container {
            text-align: center;
            padding: 40px;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: #F5A623;
        }
        p {
            font-size: 1.1rem;
            color: #B0B8C1;
            margin-bottom: 30px;
        }
        .links {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        a {
            display: inline-block;
            padding: 12px 24px;
            background: #F5A623;
            color: #0A1628;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s;
        }
        a:hover {
            background: #FFC107;
            transform: translateY(-2px);
        }
        a.secondary {
            background: transparent;
            border: 2px solid #F5A623;
            color: #F5A623;
        }
        a.secondary:hover {
            background: #F5A623;
            color: #0A1628;
        }
        .status {
            margin-top: 40px;
            padding: 20px;
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            background: #10B981;
            color: #fff;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🖨️ Godawari Printing Solution</h1>
        <p>E-Commerce Backend API is running successfully!</p>
        
        <div class="links">
            <a href="/admin">Admin Panel</a>
            <a href="/api/products" class="secondary">API: Products</a>
            <a href="/api/categories" class="secondary">API: Categories</a>
        </div>
        
        <div class="status">
            <span class="status-badge">✓ Laravel {{ app()->version() }}</span>
            <p style="margin-top: 15px; font-size: 0.9rem;">
                API Documentation: <code style="background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px;">/api/*</code>
            </p>
        </div>
    </div>
</body>
</html>
