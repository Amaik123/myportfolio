# 🚀 Deployment Guide - Vercel (Recommended)

## Why Vercel?
- Built by the creators of Next.js
- Zero configuration needed
- Automatic deployments
- Free SSL & Custom domains
- Perfect for Next.js projects

---

## Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Sign up with GitHub (recommended)

2. **Import Your Project**
   - Click "Add New Project"
   - Click "Import Git Repository"
   - If you haven't pushed to GitHub yet, see Option 2 below
   - If already on GitHub, select your repository

3. **Configure Project**
   - Vercel will auto-detect Next.js
   - Project name: `aakash-portfolio` (or your choice)
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at: `your-project-name.vercel.app`

5. **Add Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration steps

---

### Option 2: Deploy via Vercel CLI (For Advanced Users)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   cd c:\Users\Aakash\Downloads\vanta-main\vanta-main
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name: `aakash-portfolio`
   - Directory: `./` (press Enter)
   - Override settings? **N**

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

---

## 📱 Testing on Mobile After Deployment

Once deployed, you'll get a URL like:
- `https://aakash-portfolio.vercel.app`
- `https://your-project-name.vercel.app`

**Test on your phone:**
1. Open the URL on your mobile browser
2. Add to home screen for app-like experience
3. Test all interactions and scrolling

---

## 🔄 Automatic Deployments (If using GitHub)

### Push to GitHub First:

1. **Initialize Git (if not already done)**
   ```bash
   cd c:\Users\Aakash\Downloads\vanta-main\vanta-main
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   ```

2. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New Repository"
   - Name: `portfolio-website`
   - Don't initialize with README (you already have files)
   - Click "Create Repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
   git branch -M main
   git push -u origin main
   ```

4. **Connect to Vercel**
   - In Vercel dashboard, import the GitHub repository
   - Every push to `main` branch will auto-deploy!

---

## 🎨 Environment Variables (If Needed)

If you have any API keys or secrets:

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add variables:
   - Name: `NEXT_PUBLIC_API_KEY`
   - Value: `your-api-key`
   - Environment: Production, Preview, Development

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All content is updated with your information ✅ (Already done!)
- [ ] Images are optimized
- [ ] No console errors in browser
- [ ] Test locally: `npm run build` then `npm start`
- [ ] Check package.json has correct scripts:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
  ```

---

## 🌐 Alternative Free Options

### **Netlify** (Good Alternative)
- Go to [netlify.com](https://netlify.com)
- Drag and drop your `vanta-main` folder
- Or connect via GitHub
- Free tier: 100GB bandwidth/month

### **Railway** (Good for full-stack)
- Go to [railway.app](https://railway.app)
- Connect GitHub
- Auto-deploys
- Free tier: $5 credits/month

### **Render** (Static sites)
- Go to [render.com](https://render.com)
- Connect GitHub
- Free tier: 100GB bandwidth/month

---

## 📊 Post-Deployment

**Your Live URLs will be:**
- Main URL: `https://your-project.vercel.app`
- Preview URLs: Auto-generated for each branch/PR

**Share Your Portfolio:**
- Update your LinkedIn with the live URL
- Add to your GitHub profile README
- Share with potential employers
- Test on multiple devices (mobile, tablet, desktop)

---

## 🚨 Troubleshooting

**Build fails?**
- Check terminal for errors
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first

**Images not loading?**
- Check image paths (use `/` for public folder)
- Verify images are in the `public` folder

**Styles broken?**
- Clear browser cache
- Check CSS module imports
- Verify all style files are included

**404 errors?**
- Check page file names
- Verify routing in pages directory
- Clear Vercel cache and redeploy

---

## 🎉 You're Ready!

Once deployed, your portfolio will be:
- ✅ Live on the internet
- ✅ Accessible from any device
- ✅ Automatically HTTPS secured
- ✅ Globally distributed via CDN
- ✅ Auto-deployed on every GitHub push

**Deploy now and share your amazing portfolio with the world!** 🚀

---

## 📞 Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- Vercel Support: Available in dashboard

---

**Pro Tip:** Once deployed, you can update your portfolio by:
1. Making changes locally
2. Committing to GitHub
3. Vercel auto-deploys! ✨
