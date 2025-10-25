# 🚀 Quick GitHub Upload Script
# Run this in PowerShell from your project directory

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  GitHub Upload Helper Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
Write-Host "Checking if Git is installed..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please download and install Git from: https://git-scm.com" -ForegroundColor Yellow
    Write-Host "After installing, restart PowerShell and run this script again." -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""

# Check if already a git repository
if (Test-Path ".git") {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Next Steps:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a new repository on GitHub:" -ForegroundColor White
Write-Host "   → Go to: https://github.com/new" -ForegroundColor Yellow
Write-Host "   → Repository name: portfolio-website" -ForegroundColor Yellow
Write-Host "   → Description: Professional portfolio - Azure Certified AI & Cloud Solutions Architect" -ForegroundColor Yellow
Write-Host "   → Make it Public" -ForegroundColor Yellow
Write-Host "   → DO NOT check 'Initialize with README'" -ForegroundColor Yellow
Write-Host "   → Click 'Create repository'" -ForegroundColor Yellow
Write-Host ""

Write-Host "2. After creating the repository, run these commands:" -ForegroundColor White
Write-Host ""

$username = Read-Host "Enter your GitHub username"

Write-Host ""
Write-Host "Copy and paste these commands one by one:" -ForegroundColor Green
Write-Host ""
Write-Host "git add ." -ForegroundColor Cyan
Write-Host "git commit -m `"Initial commit - Complete portfolio website`"" -ForegroundColor Cyan
Write-Host "git branch -M main" -ForegroundColor Cyan
Write-Host "git remote add origin https://github.com/$username/portfolio-website.git" -ForegroundColor Cyan
Write-Host "git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Important Notes:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "• When prompted for password, use your GitHub Personal Access Token" -ForegroundColor Yellow
Write-Host "  (GitHub no longer accepts passwords for git operations)" -ForegroundColor Yellow
Write-Host ""
Write-Host "• To create a token:" -ForegroundColor Yellow
Write-Host "  1. Go to: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "  2. Click 'Generate new token (classic)'" -ForegroundColor White
Write-Host "  3. Select 'repo' scope" -ForegroundColor White
Write-Host "  4. Generate and copy the token" -ForegroundColor White
Write-Host "  5. Use it as your password when pushing" -ForegroundColor White
Write-Host ""

Write-Host "Ready to start? (Press any key to close this window)" -ForegroundColor Green
pause
