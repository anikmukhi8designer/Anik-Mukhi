
# Premium Portfolio - High Fidelity Replica

A minimalist, high-end editorial portfolio website designed with React, Framer Motion, and Tailwind CSS.

## 🚀 Quick Start for Antigravity Editing

The application is now configured to fetch its data dynamically from `content.json`. This makes it incredibly easy to update without touching the code.

### 1. Repository Setup
If you are starting from scratch:
```bash
# Initialize local repo
git init
git add .
git commit -m "Initial setup"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. How to Edit Content
Simply update the following file:
👉 **`content.json`**

In this file, you can update:
- **Site Info:** Name, Role, Location, Email.
- **About:** Intro text, Main copy, Skills.
- **Projects:** Title, Category, Images, Descriptions, External Links.
- **Experience:** Company names, Roles, and Dates (the site automatically recalculates your total years of mastery).

*Note: The `data.ts` file now serves as a backup/fallback only.*

### 3. Pushing Updates
After making your changes to `content.json`:
1. Save the file.
2. Run `git add content.json`
3. Run `git commit -m "Update portfolio content"`
4. Run `git push`

## 🎨 Tech Stack
- **Framework:** React 19
- **Animation:** Framer Motion 12
- **Styling:** Tailwind CSS
- **Data Source:** JSON (External Fetch)

## 🛠 Features
- **Dynamic Experience Calculation:** Sums up your professional years automatically based on the `experience` array.
- **Motion-First Design:** Smooth scroll reveals, clip-path reveals, and hover micro-interactions.
- **Preloader:** State-aware "Welcome" / "Welcome Back" greeting.
- **Custom Cursor:** Context-aware cursor that reacts to interactive elements.
