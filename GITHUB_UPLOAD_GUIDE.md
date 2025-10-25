# 🚀 GitHub Upload Guide

## Step-by-Step Instructions to Push Your Portfolio to GitHub

---

## Prerequisites

Make sure you have:

- ✅ Git installed on your computer
- ✅ A GitHub account ([Sign up here](https://github.com) if you don't have one)

---

## Method 1: Using GitHub Desktop (Easiest for Beginners) ⭐

### Step 1: Download GitHub Desktop

1. Go to [desktop.github.com](https://desktop.github.com)
2. Download and install GitHub Desktop
3. Sign in with your GitHub account

### Step 2: Add Your Project

1. Open GitHub Desktop
2. Click **File** → **Add Local Repository**
3. Navigate to: `C:\Users\Aakash\Downloads\vanta-main\vanta-main`
4. If it says "This directory does not appear to be a Git repository":
   - Click "create a repository" instead
   - Repository Name: `portfolio-website`
   - Description: "My professional portfolio website - Azure Certified AI & Cloud Solutions Architect"
   - Keep "Initialize with README" unchecked
   - Click "Create Repository"

### Step 3: Prepare for Upload

1. In GitHub Desktop, you'll see all your files listed
2. Add a commit message: "Initial commit - Complete portfolio website"
3. Click "Commit to main"

### Step 4: Publish to GitHub

1. Click "Publish repository" button (top right)
2. Repository name: `portfolio-website`
3. Description: "Professional portfolio showcasing 6+ years of full-stack development expertise"
4. Keep "Keep this code private" unchecked (or check if you want it private)
5. Click "Publish Repository"

### Done! ✨

Your code is now on GitHub at: `https://github.com/YOUR_USERNAME/portfolio-website`

---

## Method 2: Using Command Line (For Advanced Users)

### Step 1: Create .gitignore file

First, make sure you have a .gitignore file to exclude unnecessary files.

### Step 2: Initialize Git and Commit

Open PowerShell and run:

```powershell
# Navigate to your project
cd C:\Users\Aakash\Downloads\vanta-main\vanta-main

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Complete portfolio website with Azure certifications"

# Rename branch to main (if needed)
git branch -M main
```

### Step 3: Create Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `portfolio-website`
4. Description: "Professional portfolio - Azure Certified AI & Cloud Solutions Architect"
5. Keep it **Public** (or Private if you prefer)
6. **DO NOT** check "Initialize with README" (you already have files)
7. Click **Create repository**

### Step 4: Push to GitHub

GitHub will show you commands. Copy them and run in PowerShell:

```powershell
# Add GitHub as remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# Push to GitHub
git push -u origin main
```

**If you get authentication error:**

- GitHub now requires Personal Access Token instead of password
- See "Creating a Personal Access Token" section below

### Done! ✨

Visit: `https://github.com/YOUR_USERNAME/portfolio-website`

---

## Creating a Personal Access Token (If Needed)

If you get authentication errors:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token** → **Generate new token (classic)**
3. Note: "Portfolio deployment token"
4. Expiration: 90 days (or No expiration)
5. Select scopes:
   - ✅ **repo** (all)
   - ✅ **workflow**
6. Click **Generate token**
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing

---

## What Files Will Be Uploaded?

Your repository will include:

- ✅ All source code files
- ✅ package.json and dependencies
- ✅ Public assets (images, logos)
- ✅ Configuration files
- ❌ node_modules (excluded via .gitignore)
- ❌ .next build folder (excluded via .gitignore)

---

## After Pushing to GitHub

### Option 1: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your `portfolio-website` repository
5. Click "Deploy"
6. Done! Your site will be live in 2-3 minutes ✨

### Option 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub
5. Select your `portfolio-website` repository
6. Click "Deploy"

---

## Updating Your Code Later

Once your code is on GitHub:

### Using GitHub Desktop:

1. Make changes to your files
2. Open GitHub Desktop
3. It will show all changes
4. Write a commit message (e.g., "Updated about page")
5. Click "Commit to main"
6. Click "Push origin"

### Using Command Line:

```powershell
git add .
git commit -m "Your commit message"
git push
```

---

## 🎯 Quick Checklist Before Pushing

- [ ] Stop the dev server (Ctrl+C if running)
- [ ] Make sure .gitignore exists
- [ ] All personal information is updated
- [ ] No sensitive data (API keys, passwords) in code
- [ ] Test build: `npm run build`
- [ ] Ready to push!

---

## Troubleshooting

**Problem: "Git is not recognized"**

- Solution: Install Git from [git-scm.com](https://git-scm.com)

**Problem: "Authentication failed"**

- Solution: Use Personal Access Token instead of password
- See "Creating a Personal Access Token" section above

**Problem: "Repository already exists"**

- Solution: Either delete the existing repo on GitHub, or use a different name

**Problem: "Large files warning"**

- Solution: Make sure node_modules is in .gitignore
- Run: `git rm -r --cached node_modules`

---

## 📞 Need Help?

- GitHub Docs: [docs.github.com](https://docs.github.com)
- GitHub Desktop Guide: [docs.github.com/desktop](https://docs.github.com/en/desktop)

---

## What's Next?

After pushing to GitHub:

1. ✅ Your code is safely backed up
2. ✅ You can deploy to Vercel/Netlify
3. ✅ You can share the repository link
4. ✅ Future updates are easy (just commit and push)

**Repository URL:** `https://github.com/YOUR_USERNAME/portfolio-website`

---

Good luck! Your portfolio will be live on the internet very soon! 🚀
