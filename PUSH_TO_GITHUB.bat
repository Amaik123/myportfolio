@echo off
echo ==================================
echo   GitHub Upload Helper
echo ==================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed!
    echo Please download and install Git from: https://git-scm.com
    echo After installing, restart and run this script again.
    pause
    exit /b
)

echo [OK] Git is installed
echo.

REM Check if already initialized
if exist ".git" (
    echo [OK] Git repository already initialized
) else (
    echo Initializing Git repository...
    git init
    echo [OK] Git repository initialized
)

echo.
echo ==================================
echo   Follow These Steps:
echo ==================================
echo.
echo STEP 1: Create a GitHub Repository
echo --------------------------------
echo 1. Go to: https://github.com/new
echo 2. Repository name: portfolio-website
echo 3. Description: Professional portfolio - Azure Certified AI ^& Cloud Solutions Architect
echo 4. Make it Public
echo 5. DO NOT check 'Initialize with README'
echo 6. Click 'Create repository'
echo.
echo Press any key after creating the repository...
pause >nul
echo.

set /p USERNAME="Enter your GitHub username: "

echo.
echo ==================================
echo   Commands to Run:
echo ==================================
echo.
echo Run these commands in this order:
echo.
echo 1. git add .
echo 2. git commit -m "Initial commit - Complete portfolio website"
echo 3. git branch -M main
echo 4. git remote add origin https://github.com/%USERNAME%/portfolio-website.git
echo 5. git push -u origin main
echo.
echo.
echo IMPORTANT: 
echo - When asked for password, use your GitHub Personal Access Token
echo - Create token at: https://github.com/settings/tokens
echo - Select 'repo' scope when creating the token
echo.
echo.

set /p PROCEED="Do you want me to run these commands now? (Y/N): "

if /i "%PROCEED%"=="Y" (
    echo.
    echo Running git add...
    git add .
    
    echo.
    echo Creating commit...
    git commit -m "Initial commit - Complete portfolio website"
    
    echo.
    echo Setting branch to main...
    git branch -M main
    
    echo.
    echo Adding remote origin...
    git remote add origin https://github.com/%USERNAME%/portfolio-website.git
    
    echo.
    echo Pushing to GitHub...
    echo You will be asked for your credentials:
    echo - Username: %USERNAME%
    echo - Password: [Use your Personal Access Token]
    echo.
    git push -u origin main
    
    echo.
    echo ==================================
    echo   Upload Complete!
    echo ==================================
    echo.
    echo Your repository is now at:
    echo https://github.com/%USERNAME%/portfolio-website
    echo.
    echo Next step: Deploy to Vercel
    echo 1. Go to: https://vercel.com
    echo 2. Sign in with GitHub
    echo 3. Import your repository
    echo 4. Click Deploy!
    echo.
) else (
    echo.
    echo Manual commands saved above. Run them one by one.
    echo.
)

pause
