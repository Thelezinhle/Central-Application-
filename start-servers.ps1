# Start Backend Server in new window
Start-Process PowerShell -ArgumentList {
    Set-Location "C:\Users\dell\OneDrive\Documents\CAO\backend"
    npm run dev
} -WindowStyle Normal -Title "CAO Backend"

# Wait 3 seconds for backend to start
Start-Sleep -Seconds 3

# Start Frontend Server in new window
Start-Process PowerShell -ArgumentList {
    Set-Location "C:\Users\dell\OneDrive\Documents\CAO\frontend"
    npm run dev
} -WindowStyle Normal -Title "CAO Frontend"

Write-Host "✅ Both servers are starting..."
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:3002 (or 3001)"
