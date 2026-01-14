# Start Backend Server in new window (compatible with PowerShell 5.1)
$backendPath = "C:\Users\dell\OneDrive\Documents\CAO\backend"
Start-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","Set-Location -Path '$backendPath'; npm run dev" -WindowStyle Normal

# Wait 3 seconds for backend to start
Start-Sleep -Seconds 3

# Start Frontend Server in new window (compatible with PowerShell 5.1)
$frontendPath = "C:\Users\dell\OneDrive\Documents\CAO\frontend"
Start-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","Set-Location -Path '$frontendPath'; npm run dev" -WindowStyle Normal

Write-Host "✅ Both servers are starting..."
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:3002 (or 3001)"
