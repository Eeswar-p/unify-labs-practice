# 🎯 DAY6 Setup Instructions - Quick Start Guide

Follow these step-by-step instructions to complete your Git & GitHub setup.

---

## ⚡ Quick Setup (15-20 minutes)

### Step 1: Install Git (5 minutes)

1. **Download Git:**
   - Visit: https://git-scm.com/
   - Click "Download for Windows" (or your OS)
   - Run the installer

2. **Use these settings during installation:**
   - ✅ Add Git to PATH
   - ✅ Use Git from command line and 3rd party software
   - ✅ Use bundled OpenSSH
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use MinTTY (default terminal)
   - ✅ Enable Git Credential Manager

3. **Verify installation:**
   ```bash
   # Open Git Bash or PowerShell
   git --version
   ```
   You should see: `git version 2.40.0` or similar

---

### Step 2: Configure Git (2 minutes)

Open Git Bash or PowerShell and run:

```bash
# Set your name (replace with your actual name)
git config --global user.name "Your Full Name"

# Set your email (use the same email as your GitHub account)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global --list
```

**Expected output:**
```
user.name=Your Full Name
user.email=your.email@example.com
```

---

### Step 3: Create GitHub Account (5 minutes)

1. **Go to GitHub:**
   - Visit: https://github.com/
   - Click "Sign up"

2. **Fill in details:**
   - Email address
   - Password (strong and unique)
   - Username (professional, lowercase)
   - Verify you're human

3. **Verify email:**
   - Check your email inbox
   - Click the verification link
   - Complete GitHub setup wizard

---

### Step 4: Generate Personal Access Token (3 minutes)

GitHub requires tokens instead of passwords for Git operations.

1. **Navigate to settings:**
   - Click your profile picture (top-right)
   - Click **Settings**

2. **Generate token:**
   - Scroll down → Click **Developer settings**
   - Click **Personal access tokens** → **Tokens (classic)**
   - Click **Generate new token** → **Generate new token (classic)**

3. **Configure token:**
   - **Note:** "Git Practice Token"
   - **Expiration:** 90 days (for practice)
   - **Scopes:** Check ✅ **repo** (full repo access)
   - Click **Generate token** (green button at bottom)

4. **SAVE YOUR TOKEN:**
   ```
   ⚠️ CRITICAL: Copy the token NOW!
   You'll only see it once!
   ```
   - Copy the token (starts with `ghp_`)
   - Save it in:
     - Password manager (recommended)
     - Secure notes app
     - Text file (temporary, delete after saving elsewhere)

---

### Step 5: Create Your First Repository (5 minutes)

#### A. Create Local Repository

Open Git Bash or PowerShell:

```bash
# Navigate to your projects folder
cd d:/Projects/unify-labs-practice

# Create git-practice folder
mkdir git-practice
cd git-practice

# Initialize Git repository
git init
```

You should see: `Initialized empty Git repository in...`

#### B. Create README File

```bash
# Create README.md
echo "# My First Git Repository" > README.md

# Or create it manually in VS Code:
code README.md
```

Add this content to README.md:

```markdown
# My First Git Repository

## About
Learning Git and GitHub!

## Date
March 4, 2026

## Author
Your Name
```

#### C. Make Your First Commit

```bash
# Check status
git status

# Stage the file
git add README.md

# Commit with message
git commit -m "Initial commit: Add README"

# View commit history
git log
```

#### D. Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com/
   - Click the **+** icon (top-right)
   - Click **New repository**

2. **Configure repository:**
   - **Repository name:** `git-practice`
   - **Description:** "My first Git repository"
   - **Visibility:** Public (or Private if you prefer)
   - **DO NOT** check "Initialize with README"
   - Click **Create repository**

#### E. Connect Local to GitHub

GitHub will show you commands. Copy and run them:

```bash
# Add remote repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/git-practice.git

# Verify remote
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub (first time)
git push -u origin main
```

**When prompted for credentials:**
- **Username:** Your GitHub username
- **Password:** Paste your Personal Access Token (NOT your GitHub password!)

#### F. Verify Success

1. Refresh your GitHub repository page
2. You should see your README.md file
3. Success! 🎉

---

## ✅ Verification Checklist

Mark these off as you complete:

- [ ] Git installed (`git --version` works)
- [ ] Git configured (name and email set)
- [ ] GitHub account created and verified
- [ ] Personal Access Token generated and saved
- [ ] `git-practice` folder created
- [ ] Git initialized (`git init`)
- [ ] README.md created
- [ ] First commit made
- [ ] GitHub repository created
- [ ] Local linked to remote
- [ ] Code pushed to GitHub
- [ ] Can see README on GitHub

---

## 🚨 Common Issues & Solutions

### Issue 1: "git: command not found"
**Solution:** Restart your terminal after installing Git, or add Git to PATH

### Issue 2: "Permission denied"
**Solution:** Make sure you're using your Personal Access Token, not your password

### Issue 3: "Authentication failed"
**Solution:** 
- Regenerate your token
- Ensure token has 'repo' permissions
- Copy/paste carefully (no extra spaces)

### Issue 4: "Repository not found"
**Solution:** Check your GitHub username in the remote URL:
```bash
git remote -v
# Should show: https://github.com/YOUR-USERNAME/git-practice.git
```

### Issue 5: Push rejected
**Solution:**
```bash
git pull --rebase origin main
git push
```

---

## 📝 Practice Exercises

After setup, try these:

### Exercise 1: Add a new file
```bash
echo "# About Me" > about.md
git add about.md
git commit -m "Add about.md"
git push
```

### Exercise 2: Edit README
```bash
# Edit README.md in VS Code, then:
git add README.md
git commit -m "Update README"
git push
```

### Exercise 3: Check history
```bash
git log
git log --oneline
```

---

## 🎓 What You Learned Today

✅ Git basics and version control concepts  
✅ Git installation and configuration  
✅ GitHub account setup and authentication  
✅ Repository initialization (`git init`)  
✅ Staging changes (`git add`)  
✅ Committing changes (`git commit`)  
✅ Linking local and remote repositories  
✅ Pushing code to GitHub (`git push`)  

---

## 🔗 Quick Reference

### Most Important Commands
```bash
git status              # What's changed?
git add .               # Stage all changes
git commit -m "message" # Save snapshot
git push                # Upload to GitHub
git pull                # Download from GitHub
```

### First-Time Setup
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Start New Project
```bash
mkdir project-name
cd project-name
git init
```

### Connect to GitHub
```bash
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

---

## 🚀 Next Steps

After completing DAY6:

1. **Practice daily:** Make small commits regularly
2. **Explore GitHub:** Check out trending repositories
3. **Learn branching:** Create feature branches
4. **Collaborate:** Fork a project and make a pull request
5. **Read documentation:** [Pro Git Book](https://git-scm.com/book)

---

## 📞 Need Help?

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **Git Cheat Sheet:** https://education.github.com/git-cheat-sheet-education.pdf
- **Stack Overflow:** Search for your error message

---

**Congratulations on completing DAY6! 🎉**

You now have the foundation for modern software development version control!
