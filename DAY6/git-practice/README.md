# My First Git Repository

## About
This is my first repository created while learning Git and GitHub as part of the Unify Labs Practice program.

## What I Learned
- ✅ How to install and configure Git
- ✅ How to create a GitHub account
- ✅ How to generate Personal Access Tokens (PAT)
- ✅ How to initialize a Git repository with `git init`
- ✅ How to make commits and push to GitHub
- ✅ Understanding the Git workflow: Working Directory → Staging Area → Local Repository → Remote Repository

## Technologies Used
- **Git** - Version control system
- **GitHub** - Code hosting platform
- **Git Bash** - Command line interface for Git

## Repository Setup Steps

### 1. Initialize Repository
```bash
git init
```

### 2. Create README
```bash
echo "# My First Git Repository" > README.md
```

### 3. Stage Changes
```bash
git add README.md
```

### 4. Commit Changes
```bash
git commit -m "Initial commit: Add README"
```

### 5. Link to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/git-practice.git
git branch -M main
git push -u origin main
```

## Git Commands I Know

| Command | Description |
|---------|-------------|
| `git init` | Initialize a new Git repository |
| `git status` | Check the status of your repository |
| `git add <file>` | Stage changes for commit |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit staged changes with a message |
| `git push` | Push commits to remote repository |
| `git pull` | Pull latest changes from remote |
| `git log` | View commit history |
| `git remote -v` | View remote repository URLs |

## Future Learning Goals
- [ ] Learn Git branching and merging
- [ ] Understand pull requests and code reviews
- [ ] Practice collaborative workflows
- [ ] Explore Git rebase and advanced commands
- [ ] Set up Git hooks for automation

## Date Created
March 4, 2026

## Author
**Your Name**  
Email: your.email@example.com  
GitHub: [@yourusername](https://github.com/yourusername)

## License
This project is for educational purposes only.

---

**🚀 Keep Learning! Keep Building! Keep Pushing!**
