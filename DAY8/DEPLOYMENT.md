# 🚀 Deployment Guide - Portfolio Website

This guide provides step-by-step instructions for deploying your portfolio website to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you've completed these steps:

- [ ] **Personalize Content**
  - [ ] Replace "Your Name" with your actual name
  - [ ] Update email, phone, and location
  - [ ] Add your profile photo (`assets/images/profile.jpg`)
  - [ ] Add project screenshots
  - [ ] Update project descriptions and links
  - [ ] Add your social media links

- [ ] **Test Functionality**
  - [ ] Dark mode toggle works
  - [ ] Mobile menu opens/closes
  - [ ] Form validation works correctly
  - [ ] All links navigate properly
  - [ ] Smooth scrolling functions
  - [ ] Images load correctly (or fallbacks appear)

- [ ] **Validate Code**
  - [ ] HTML passes [W3C Validator](https://validator.w3.org/)
  - [ ] CSS passes [CSS Validator](https://jigsaw.w3.org/css-validator/)
  - [ ] No console errors in browser DevTools

- [ ] **Optimize Performance**
  - [ ] Compress images (use TinyPNG or Squoosh)
  - [ ] Add `loading="lazy"` to images
  - [ ] Check Lighthouse score (aim for 90+)

- [ ] **Git Commits**
  - [ ] Made 15+ atomic commits
  - [ ] Commit messages are descriptive
  - [ ] All changes are committed

---

## 🌐 Deployment Option 1: GitHub Pages

**Recommended for:** Beginners, free hosting, easy setup

### Step 1: Create GitHub Repository

```bash
# Navigate to your project folder
cd DAY8

# Initialize Git (if not already initialized)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Portfolio website with dark mode"

# Create repository on GitHub.com (click "New Repository")
# Then connect local to remote:
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/yourusername/portfolio`
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** Select `main`
   - **Folder:** Select `/ (root)`
5. Click **Save**

### Step 3: Wait for Deployment

- GitHub will build and deploy your site (takes 1-3 minutes)
- Your site will be available at: `https://yourusername.github.io/portfolio/`
- You'll see a green checkmark when deployment is complete

### Step 4: Custom Domain (Optional)

#### Add Custom Domain
1. In GitHub Pages settings, enter your custom domain (e.g., `yourname.com`)
2. Create a `CNAME` file in your repository root:
   ```
   yourname.com
   ```
3. Configure DNS with your domain provider:
   - **A Records** point to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **Or CNAME Record** (for subdomain):
     ```
     www.yourname.com -> yourusername.github.io
     ```

4. Wait for DNS propagation (can take up to 48 hours, usually <1 hour)
5. Enable HTTPS in GitHub Pages settings

---

## 🚀 Deployment Option 2: Vercel

**Recommended for:** Fast deployment, automatic rebuilds, serverless functions

### Step 1: Install Vercel CLI

```bash
# Install Vercel globally
npm install -g vercel

# Or use without installing
npx vercel
```

### Step 2: Deploy

```bash
# Navigate to your project
cd DAY8

# Login to Vercel
vercel login

# Deploy
vercel
```

### Step 3: Follow Prompts

```
? Set up and deploy "DAY8"? [Y/n] Y
? Which scope do you want to deploy to? Your Account
? Link to existing project? [y/N] N
? What's your project's name? portfolio
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

### Step 4: Production Deployment

```bash
# For production deployment
vercel --prod
```

**Your site is live at:** `https://portfolio-yourusername.vercel.app`

### Vercel Custom Domain

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your custom domain
5. Configure DNS as instructed by Vercel

---

## 🎨 Deployment Option 3: Netlify

**Recommended for:** Drag-and-drop simplicity, continuous deployment

### Method A: Drag & Drop (Easiest)

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up/Login
3. Drag your `DAY8` folder into the deployment area
4. Site is live instantly at: `https://random-name-12345.netlify.app`

### Method B: Git Integration (Recommended)

1. Push your code to GitHub (see GitHub Pages Step 1)
2. Go to [app.netlify.com](https://app.netlify.com/)
3. Click **Add new site** → **Import an existing project**
4. Connect to GitHub and select your repository
5. Configure build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `/` or leave empty
6. Click **Deploy site**

### Netlify Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain name
4. Follow DNS configuration instructions

---

## 🔧 Deployment Option 4: Own Server (VPS/Hosting)

**Recommended for:** Full control, shared hosting, VPS

### For Shared Hosting (cPanel, Bluehost, etc.)

1. **Compress your files:**
   ```bash
   # Create a ZIP file of your project
   zip -r portfolio.zip DAY8/
   ```

2. **Upload via FTP or File Manager:**
   - Login to cPanel
   - Go to File Manager
   - Navigate to `public_html` or `www`
   - Upload `portfolio.zip`
   - Extract the archive

3. **Set Permissions:**
   - Ensure all files are readable (644 for files, 755 for directories)

4. **Your site is live at:** `https://yourdomain.com`

### For VPS (DigitalOcean, Linode, AWS)

1. **SSH into your server:**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

3. **Upload your files:**
   ```bash
   # On your local machine
   scp -r DAY8/* user@your-server-ip:/var/www/html/
   ```

4. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Update `root` directive:
   ```nginx
   root /var/www/html;
   ```

5. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

6. **Configure SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 🔒 HTTPS & SSL

### Why HTTPS is Important
- **Security:** Encrypts data between user and server
- **SEO:** Google ranks HTTPS sites higher
- **Trust:** Visitors see the padlock icon
- **Required for:** Modern web features (geolocation, PWA, etc.)

### Enable HTTPS

#### GitHub Pages
- Automatic HTTPS (via Let's Encrypt)
- Enable in Settings → Pages → "Enforce HTTPS"

#### Vercel & Netlify
- Automatic HTTPS for all domains
- No configuration needed

#### Custom Server
```bash
# Use Certbot (Let's Encrypt)
sudo certbot --nginx -d yourdomain.com
```

---

## 📊 Post-Deployment

### 1. Test Your Live Site

Visit your live URL and check:
- [ ] All pages load correctly
- [ ] Dark mode toggle works
- [ ] Mobile menu functions
- [ ] Form validation works
- [ ] Images display properly
- [ ] Smooth scrolling functions
- [ ] No console errors (open DevTools)

### 2. Test on Multiple Devices

- [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Tablet (iPad, Android)
- [ ] Mobile (iPhone, Android)
- [ ] Different screen sizes

### 3. Run Performance Tests

```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/

# Lighthouse (in Chrome DevTools)
# F12 → Lighthouse tab → Analyze page load

# WebPageTest
https://www.webpagetest.org/
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

### 4. Validate HTML/CSS

- **HTML:** https://validator.w3.org/?uri=YOUR_URL
- **CSS:** https://jigsaw.w3.org/css-validator/?uri=YOUR_URL

### 5. Add to Search Engines

#### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your site
3. Verify ownership
4. Submit sitemap (create `sitemap.xml`)

#### Create Sitemap (Optional)
Create `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 🎯 SEO Optimization

### Update Meta Tags

In `index.html`:
```html
<head>
  <meta name="description" content="Your actual description here (150-160 chars)">
  <meta name="keywords" content="web developer, portfolio, your name">
  <meta property="og:title" content="Your Name - Web Developer">
  <meta property="og:description" content="Your description">
  <meta property="og:image" content="https://yourdomain.com/assets/images/og-image.jpg">
  <meta property="og:url" content="https://yourdomain.com">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

### Add robots.txt
Create `robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 📈 Analytics (Optional)

### Google Analytics 4
1. Create account at [analytics.google.com](https://analytics.google.com/)
2. Get your Measurement ID (e.g., `G-XXXXXXXXXX`)
3. Add to `index.html` before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto-deploy on push)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Vercel/Netlify
- Automatically deploys on every git push
- No configuration needed

---

## 🆘 Troubleshooting

### Issue: Site not loading
- **Check:** GitHub Pages enabled? Correct branch selected?
- **Solution:** Wait 1-3 minutes, check Actions tab for build status

### Issue: Dark mode not persisting
- **Check:** Browser blocks LocalStorage?
- **Solution:** Enable cookies/storage in browser settings

### Issue: Images not showing
- **Check:** File paths correct? Images uploaded?
- **Solution:** Ensure `assets/images/` folder exists with images

### Issue: Form not submitting
- **Check:** Form action attribute set?
- **Solution:** Add Formspree or backend integration

### Issue: CSS not loading
- **Check:** File path in `<link>` tag correct?
- **Solution:** Ensure `css/styles.css` exists, check for typos

---

## ✅ Deployment Checklist

Final checklist before going live:

- [ ] All personal information updated
- [ ] Profile photo added
- [ ] Project screenshots added
- [ ] All links working (no `#` placeholders)
- [ ] Dark mode toggle works
- [ ] Mobile responsive on all devices
- [ ] Form validation working
- [ ] W3C HTML validation passed
- [ ] W3C CSS validation passed
- [ ] Lighthouse score 90+ on all metrics
- [ ] Meta tags updated for SEO
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Analytics added (if desired)
- [ ] README updated with live URL
- [ ] 15+ Git commits with good messages
- [ ] Repository public on GitHub

---

## 🎉 You're Live!

Congratulations! Your portfolio is now deployed and accessible worldwide.

**Share your portfolio:**
- Add to your resume
- Share on LinkedIn
- Add to GitHub profile README
- Share on Twitter/social media
- Submit to portfolio directories

---

**Last Updated:** March 4, 2026
