# 🚀 DAY6 - Git & GitHub Setup Guide

Welcome to Day 6! Today you'll learn the fundamentals of Git version control and GitHub collaboration.

## 📋 Learning Objectives

By the end of this module, you will:
- ✅ Understand what Git and GitHub are
- ✅ Install and configure Git on your local machine
- ✅ Create and manage a GitHub account
- ✅ Generate and use Personal Access Tokens
- ✅ Initialize your first Git repository
- ✅ Make commits and push code to GitHub
- ✅ Understand basic Git workflow

---

## 📚 What is Git?

**Git** is a distributed version control system that helps you:
- Track changes in your code over time
- Collaborate with other developers
- Revert to previous versions if needed
- Work on multiple features simultaneously (branches)
- Keep a complete history of your project

**GitHub** is a cloud-based hosting service for Git repositories that adds:
- Remote backup of your code
- Collaboration features (Pull Requests, Issues)
- Project management tools
- Code review capabilities
- Social coding features

---

## 📦 Step 1: Local Git Setup

### 1.1 Download and Install Git

**Windows:**
1. Visit [git-scm.com](https://git-scm.com/)
2. Click "Download for Windows"
3. Run the installer
4. Use recommended settings (or customize as needed)
5. Important settings:
   - ✅ Use Git from the command line and 3rd party software
   - ✅ Use bundled OpenSSH
   - ✅ Use the OpenSSL library
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use MinTTY terminal
   - ✅ Default (fast-forward or merge)
   - ✅ Git Credential Manager

**macOS:**
```bash
# Install using Homebrew
brew install git

# Or download from git-scm.com
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

### 1.2 Verify Installation

Open **Git Bash** (Windows) or **Terminal** (macOS/Linux):

```bash
git --version
```

Expected output: `git version 2.40.0` (or higher)

### 1.3 Configure Git Identity

Set your global username and email (used in all commits):

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use same email as GitHub)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global --list
```

### 1.4 Optional: Configure Default Editor

```bash
# Set VS Code as default editor
git config --global core.editor "code --wait"

# Or use nano (simple terminal editor)
git config --global core.editor "nano"
```

### 1.5 Optional: Enable Color Output

```bash
git config --global color.ui auto
```

---

## 🐙 Step 2: GitHub Account Setup

### 2.1 Create GitHub Account

1. Visit [github.com](https://github.com)
2. Click **Sign up**
3. Enter your email address
4. Create a strong password
5. Choose a username (lowercase, no spaces)
6. Verify your account via email
7. Complete the setup wizard

**Tips for choosing a username:**
- Professional (you might share it with employers)
- Easy to remember and type
- Reflects your name or brand
- Avoid special characters

### 2.2 Generate Personal Access Token (PAT)

GitHub no longer accepts passwords for Git operations. You need a Personal Access Token.

**Steps to create a PAT:**

1. Log in to GitHub
2. Click your profile picture → **Settings**
3. Scroll down and click **Developer settings** (bottom left)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Give your token a descriptive name (e.g., "Git Practice Token")
7. Set expiration (recommended: 90 days for learning, longer for production)
8. Select scopes/permissions:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (Optional: for GitHub Actions)
9. Click **Generate token**
10. **IMPORTANT:** Copy the token immediately (you won't see it again!)

### 2.3 Save Your Token Securely

**Options for storing your token:**

1. **Password Manager** (Recommended)
   - 1Password
   - LastPass
   - Bitwarden
   
2. **Secure Notes App**
   - Apple Notes (locked note)
   - Microsoft OneNote
   - Google Keep

3. **Git Credential Manager** (Windows)
   - Automatically installed with Git for Windows
   - Stores credentials securely in Windows Credential Manager

**⚠️ Never:**
- Commit tokens to Git repositories
- Share tokens publicly
- Store in plain text files
- Email tokens to yourself

---

## 🎯 Step 3: Your First Repository

### 3.1 Create Local Repository

Open Git Bash or Terminal:

```bash
# Navigate to your projects folder
cd d:/Projects/unify-labs-practice

# Create a new folder for practice
mkdir git-practice
cd git-practice

# Initialize Git repository
git init

# Verify initialization
ls -la
# You should see a .git folder
```

**What just happened?**
- `git init` created a `.git` folder containing all Git metadata
- Your folder is now a Git repository
- Git will track changes to files in this folder

### 3.2 Create README.md

Create a README file:

```bash
# Using echo command (quick method)
echo "# My First Git Repository" > README.md

# Or create manually in your editor
```

**Edit README.md** with your favorite editor:

```markdown
# My First Git Repository

## About
This is my first repository created while learning Git and GitHub.

## What I Learned
- How to install and configure Git
- How to create a GitHub account
- How to generate Personal Access Tokens
- How to initialize a Git repository
- How to make commits and push to GitHub

## Date Created
March 4, 2026

## Author
Your Name
```

### 3.3 Check Repository Status

```bash
git status
```

Output will show:
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present
```

### 3.4 Stage Changes

```bash
# Add README.md to staging area
git add README.md

# Check status again
git status
```

Now it shows:
```
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
```

### 3.5 Commit Changes

```bash
# Commit with a descriptive message
git commit -m "Initial commit: Add README"

# View commit history
git log
```

**Commit message best practices:**
- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- First line should be 50 characters or less
- Explain *what* and *why*, not *how*

### 3.6 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon in top-right → **New repository**
3. Repository name: `git-practice`
4. Description: "My first Git repository for learning version control"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README (you already have one)
7. Click **Create repository**

### 3.7 Link Local to Remote

GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/git-practice.git

# Verify remote was added
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Authentication:**
- Username: Your GitHub username
- Password: **Use your Personal Access Token** (not your GitHub password)

### 3.8 Verify on GitHub

1. Refresh your GitHub repository page
2. You should see your README.md file
3. The commit message should appear
4. Click on the README to see it rendered

---

## 🔄 Basic Git Workflow

### Daily Git Commands

```bash
# 1. Check what changed
git status

# 2. Stage changes
git add .                    # Stage all changes
git add filename.txt         # Stage specific file
git add folder/              # Stage entire folder

# 3. Commit changes
git commit -m "Descriptive message"

# 4. View history
git log                      # Detailed history
git log --oneline            # Condensed history

# 5. Push to GitHub
git push

# 6. Pull latest changes
git pull
```

### Understanding Git States

**Modified** → **Staged** → **Committed** → **Pushed**

1. **Working Directory** (Modified)
   - Files you're currently editing
   - Changes not tracked yet

2. **Staging Area** (Staged)
   - Changes marked for next commit
   - Use `git add` to stage

3. **Local Repository** (Committed)
   - Changes saved to local Git history
   - Use `git commit` to commit

4. **Remote Repository** (Pushed)
   - Changes uploaded to GitHub
   - Use `git push` to push

---

## 📝 Practice Exercises

### Exercise 1: Make More Changes

```bash
# Add a new file
echo "# About Me" > about.md
echo "I'm learning Git!" >> about.md

# Stage and commit
git add about.md
git commit -m "Add about.md file"

# Push to GitHub
git push
```

### Exercise 2: Edit Existing File

```bash
# Edit README.md (add a new section)
echo "\n## Skills\n- Git\n- GitHub" >> README.md

# Check what changed
git diff

# Stage, commit, push
git add README.md
git commit -m "Update README: Add skills section"
git push
```

### Exercise 3: Check History

```bash
# View all commits
git log

# View condensed history
git log --oneline

# View last 3 commits
git log -3

# View commits with changes
git log -p
```

### Exercise 4: View Remote Repository

```bash
# Check remote URL
git remote -v

# Get info about remote
git remote show origin
```

---

## 🛠️ Common Git Commands Reference

### Repository Setup
```bash
git init                     # Initialize new repository
git clone <url>              # Clone existing repository
git remote add origin <url>  # Add remote repository
```

### Basic Workflow
```bash
git status                   # Check repository status
git add <file>               # Stage specific file
git add .                    # Stage all changes
git commit -m "message"      # Commit staged changes
git push                     # Push to remote
git pull                     # Pull from remote
```

### History & Information
```bash
git log                      # View commit history
git log --oneline            # Condensed history
git diff                     # Show unstaged changes
git diff --staged            # Show staged changes
git show <commit>            # Show specific commit
```

### Undo Changes
```bash
git restore <file>           # Discard changes in working directory
git restore --staged <file>  # Unstage file
git reset HEAD~1             # Undo last commit (keep changes)
git reset --hard HEAD~1      # Undo last commit (discard changes)
```

### Branching
```bash
git branch                   # List branches
git branch <name>            # Create branch
git checkout <branch>        # Switch branch
git checkout -b <name>       # Create and switch branch
git merge <branch>           # Merge branch
git branch -d <branch>       # Delete branch
```

---

## 🎓 Git Best Practices

### Commit Messages
✅ **Good:**
- "Add user authentication feature"
- "Fix login button alignment"
- "Update API endpoint for user profile"

❌ **Bad:**
- "Updates"
- "Fixed stuff"
- "asdfasdf"

### When to Commit
- **Commit often** - Small, logical chunks
- **One feature per commit** - Makes review easier
- **Before big changes** - Safe point to return to
- **After fixing a bug** - Document the fix
- **End of work session** - Save your progress

### What NOT to Commit
❌ Never commit:
- Passwords or API keys
- Personal access tokens
- Database credentials
- Large binary files (videos, compiled code)
- Dependencies (node_modules, vendor)
- OS-specific files (.DS_Store, Thumbs.db)
- IDE configuration files

Use `.gitignore` file to exclude these.

---

## 🚨 Troubleshooting

### Problem: Git not recognized
**Solution:**
```bash
# Windows: Restart terminal after installation
# Or add Git to PATH manually
```

### Problem: Permission denied (publickey)
**Solution:**
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/username/repo.git
```

### Problem: Authentication failed
**Solution:**
- Ensure you're using Personal Access Token, not password
- Check token has 'repo' permissions
- Regenerate token if needed

### Problem: Conflict during push
**Solution:**
```bash
# Pull first, then push
git pull --rebase origin main
git push
```

### Problem: Accidentally committed sensitive data
**Solution:**
1. Remove from repository immediately
2. Change the exposed credentials
3. Consider using `git filter-branch` or BFG Repo-Cleaner
4. Force push (dangerous, use carefully)

---

## 📚 Additional Resources

### Learning Resources
- [Pro Git Book (Free)](https://git-scm.com/book/en/v2) - Comprehensive Git guide
- [GitHub Learning Lab](https://lab.github.com/) - Interactive tutorials
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf) - Quick reference
- [Visualizing Git](https://git-school.github.io/visualizing-git/) - Visual learning tool

### Git GUIs (Optional)
- **GitKraken** - Powerful, visual Git client
- **GitHub Desktop** - Simple, official GitHub app
- **SourceTree** - Free Git GUI from Atlassian
- **VS Code** - Built-in Git integration

### Useful GitHub Features
- **GitHub Issues** - Track bugs and feature requests
- **Pull Requests** - Code review and collaboration
- **GitHub Actions** - CI/CD automation
- **GitHub Pages** - Host static websites
- **GitHub Gists** - Share code snippets

---

## ✅ Completion Checklist

Mark these off as you complete them:

### Setup
- [ ] Git installed and verified (`git --version`)
- [ ] Global user.name configured
- [ ] Global user.email configured
- [ ] GitHub account created
- [ ] Personal Access Token generated and saved securely

### First Repository
- [ ] Created `git-practice` folder
- [ ] Initialized Git repository (`git init`)
- [ ] Created README.md file
- [ ] Staged changes (`git add`)
- [ ] Made first commit (`git commit`)
- [ ] Created GitHub repository
- [ ] Linked local to remote (`git remote add`)
- [ ] Pushed to GitHub (`git push`)

### Understanding
- [ ] Understand what Git is and why it's useful
- [ ] Know the basic Git workflow (add → commit → push)
- [ ] Can check repository status
- [ ] Can view commit history
- [ ] Understand difference between local and remote

---

## 🎉 Next Steps

After completing DAY6, you're ready to:
1. **DAY7**: Learn Git branching and merging
2. **DAY8**: Collaborate with others on GitHub
3. **DAY9**: Advanced Git workflows (rebase, cherry-pick, stash)
4. **DAY10**: Set up CI/CD with GitHub Actions

**Keep practicing!** The more you use Git, the more comfortable you'll become.

---

## 📖 Quick Start Command Summary

```bash
# Initial Setup (One Time)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Create Repository (One Time Per Project)
mkdir git-practice
cd git-practice
git init
echo "# My Project" > README.md

# Daily Workflow (Repeat Often)
git status                           # What changed?
git add .                            # Stage all changes
git commit -m "Descriptive message"  # Save snapshot
git push                             # Upload to GitHub

# First Time Push
git remote add origin https://github.com/username/repo.git
git branch -M main
git push -u origin main
```

---

**Happy Git-ing! 🚀**

Remember: Everyone makes mistakes with Git at first. Don't be afraid to experiment, and don't worry if you break something - that's how you learn!
