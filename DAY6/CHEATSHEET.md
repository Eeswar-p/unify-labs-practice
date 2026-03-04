# 📝 Git Commands Cheat Sheet

Quick reference guide for essential Git commands.

---

## 🚀 Getting Started

### Initial Setup (One-Time)
```bash
# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Check configuration
git config --global --list

# Set default editor
git config --global core.editor "code --wait"

# Enable color output
git config --global color.ui auto
```

---

## 📦 Repository Setup

### Create New Repository
```bash
# Initialize in current directory
git init

# Initialize with specific name
git init my-project
```

### Clone Existing Repository
```bash
# Clone from GitHub
git clone https://github.com/username/repo.git

# Clone to specific folder
git clone https://github.com/username/repo.git my-folder

# Clone specific branch
git clone -b branch-name https://github.com/username/repo.git
```

---

## 📊 Basic Commands

### Check Status
```bash
# Full status
git status

# Short status
git status -s
```

### Stage Changes
```bash
# Stage specific file
git add filename.txt

# Stage all files
git add .

# Stage all files in directory
git add folder/

# Stage by pattern
git add *.js

# Interactive staging
git add -p
```

### Commit Changes
```bash
# Commit with message
git commit -m "Your commit message"

# Commit all tracked files (skip staging)
git commit -a -m "Commit message"

# Amend last commit
git commit --amend -m "New message"

# Commit with detailed message
git commit
# Opens editor for multi-line message
```

### View History
```bash
# Full commit history
git log

# Condensed (one line per commit)
git log --oneline

# Show last N commits
git log -5

# Show changes in commits
git log -p

# Show commits with graph
git log --graph --oneline

# Show commits by author
git log --author="Name"

# Show commits in date range
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-12-31"
```

### View Changes
```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged

# Show changes in specific file
git diff filename.txt

# Show changes between commits
git diff commit1 commit2
```

---

## 🌐 Remote Repositories

### Remote Management
```bash
# Add remote repository
git remote add origin https://github.com/user/repo.git

# View remotes
git remote -v

# Show remote details
git remote show origin

# Rename remote
git remote rename origin upstream

# Remove remote
git remote remove origin

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git
```

### Push & Pull
```bash
# Push to remote
git push

# Push first time (set upstream)
git push -u origin main

# Push all branches
git push --all

# Force push (dangerous!)
git push --force

# Pull from remote
git pull

# Pull with rebase
git pull --rebase

# Fetch without merging
git fetch
```

---

## 🌿 Branching & Merging

### Branch Management
```bash
# List branches
git branch

# List all branches (including remote)
git branch -a

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch (shortcut)
git checkout -b feature-name

# Rename branch
git branch -m old-name new-name

# Delete branch
git branch -d feature-name

# Force delete branch
git branch -D feature-name

# Delete remote branch
git push origin --delete feature-name
```

### Merging
```bash
# Merge branch into current branch
git merge feature-name

# Merge without fast-forward
git merge --no-ff feature-name

# Abort merge (if conflicts)
git merge --abort
```

---

## ⏪ Undoing Changes

### Unstage Files
```bash
# Unstage specific file
git restore --staged filename.txt

# Unstage all files
git restore --staged .

# Old syntax (still works)
git reset HEAD filename.txt
```

### Discard Changes
```bash
# Discard changes in working directory
git restore filename.txt

# Discard all changes
git restore .

# Old syntax
git checkout -- filename.txt
```

### Reset Commits
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (unstage changes)
git reset HEAD~1

# Undo last commit (discard changes) ⚠️
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard commit-hash
```

### Revert Commits
```bash
# Create new commit that undoes changes
git revert commit-hash

# Revert last commit
git revert HEAD
```

---

## 🏷️ Tags

```bash
# List tags
git tag

# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Tag specific commit
git tag v1.0.0 commit-hash

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push --tags

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```

---

## 🔍 Searching

```bash
# Search in files
git grep "search term"

# Search in specific file type
git grep "search" -- "*.js"

# Show line numbers
git grep -n "search term"

# Search commit messages
git log --grep="bug fix"

# Search changes
git log -S "function name"
```

---

## 💾 Stashing

```bash
# Stash changes
git stash

# Stash with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply last stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Apply and remove stash
git stash pop

# Drop stash
git stash drop stash@{0}

# Clear all stashes
git stash clear

# Show stash contents
git stash show -p stash@{0}
```

---

## 🔧 Advanced Commands

### Rebase
```bash
# Rebase current branch
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Continue rebase after resolving conflicts
git rebase --continue

# Abort rebase
git rebase --abort
```

### Cherry-pick
```bash
# Apply specific commit to current branch
git cherry-pick commit-hash

# Cherry-pick multiple commits
git cherry-pick commit1 commit2

# Cherry-pick without committing
git cherry-pick -n commit-hash
```

### Submodules
```bash
# Add submodule
git submodule add https://github.com/user/repo.git path/to/submodule

# Initialize submodules
git submodule init

# Update submodules
git submodule update

# Clone with submodules
git clone --recursive https://github.com/user/repo.git
```

---

## 🛠️ Configuration

### Local vs Global Config
```bash
# Set global config
git config --global key value

# Set local config (current repo only)
git config --local key value

# View all config
git config --list

# View specific value
git config user.name
```

### Useful Configurations
```bash
# Set default branch name
git config --global init.defaultBranch main

# Enable credential helper (Windows)
git config --global credential.helper manager

# Enable credential helper (macOS)
git config --global credential.helper osxkeychain

# Set merge tool
git config --global merge.tool vimdiff

# Aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

---

## 🎯 Common Workflows

### Feature Branch Workflow
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to remote
git push -u origin feature/new-feature

# 4. Merge into main (after review)
git checkout main
git merge feature/new-feature

# 5. Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Hotfix Workflow
```bash
# 1. Create hotfix branch from main
git checkout main
git checkout -b hotfix/critical-bug

# 2. Fix and commit
git add .
git commit -m "Fix critical bug"

# 3. Merge into main
git checkout main
git merge hotfix/critical-bug

# 4. Tag the fix
git tag -a v1.0.1 -m "Hotfix for critical bug"

# 5. Push
git push origin main --tags

# 6. Clean up
git branch -d hotfix/critical-bug
```

---

## 📋 .gitignore Patterns

```gitignore
# Ignore specific file
secret.txt

# Ignore all files with extension
*.log

# Ignore directory
node_modules/

# Ignore files in all subdirectories
**/temp

# Negate (don't ignore)
!important.log

# Ignore files in root only
/root-only.txt

# Comments
# This is a comment
```

---

## 🚨 Emergency Commands

```bash
# Undo everything (⚠️ DANGER)
git reset --hard HEAD

# Recover deleted branch
git reflog
git checkout -b recovered-branch commit-hash

# Find lost commits
git fsck --lost-found

# Recover deleted commit
git reflog
git cherry-pick commit-hash
```

---

## 💡 Pro Tips

1. **Commit often:** Small commits are easier to understand and revert
2. **Write good messages:** Explain what and why, not how
3. **Pull before push:** Avoid conflicts
4. **Use branches:** Keep main stable
5. **Review before commit:** Use `git diff` and `git status`
6. **Backup important work:** Push to remote regularly

---

## 📱 Quick Reference

| Command | Description |
|---------|-------------|
| `git status` | Check what changed |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit staged changes |
| `git push` | Upload to remote |
| `git pull` | Download from remote |
| `git log` | View commit history |
| `git branch` | List branches |
| `git checkout -b name` | Create & switch branch |
| `git merge name` | Merge branch |
| `git stash` | Temporarily save changes |

---

**Keep this cheat sheet handy! 📌**

Print it out or bookmark this file for quick reference when working with Git.
