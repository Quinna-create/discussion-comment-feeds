# Quick Start: Fix Your Widget

Your widget is showing demo data because your Replit backend server isn't running. Here's how to fix it in 5 minutes!

## The Fix (5 Minutes)

### Step 1: Go to Replit
Visit https://replit.com and log in

### Step 2: Find Your Project
Look for your Canvas discussion proxy project in your Repls

### Step 3: Click "Run"
Click the big green **"Run"** button to start the server

### Step 4: Verify It Works
Open this URL in a new tab:
```
https://canvas-discuss-quinna2.replit.app/?courseId=196700&discussionId=6735506
```

**You should see:** JSON data with Canvas comments  
**If you see an error:** The backend needs to be set up (see below)

### Step 5: Refresh Your Widget
Go to https://quinna-create.github.io/discussion-comment-feeds/discussion-widget.html

**You should see:**
- ✅ No warning banner
- ✅ Real Canvas discussion comments
- ✅ Console shows "Successfully loaded X comments"

---

## If You Need to Set Up the Backend

If you don't have a backend yet or it's not working, see:

👉 **HOW_TO_FIX_BACKEND.md** - Complete step-by-step guide including:
- Creating a new Repl
- Setting up the backend code
- Getting Canvas API credentials
- Configuring everything
- Testing and troubleshooting

---

## Current Status

### What's Working ✅
- Widget displays correctly on GitHub Pages
- Widget cycles through comments with nice animations
- Configuration has correct Course ID (196700) and Discussion ID (6735506)
- Warning system alerts you when backend is down

### What Needs Fixing ⚠️
- Replit backend server needs to be running
- Once started, widget will show real Canvas comments instead of demo data

---

## Documentation Quick Links

| Need to... | Read This |
|------------|-----------|
| Fix the backend right now | **HOW_TO_FIX_BACKEND.md** |
| Understand why it's showing demo data | **TROUBLESHOOTING.md** |
| Get a quick overview | **SOLUTION_SUMMARY.md** |
| Set up backend from scratch | **REPLIT_BACKEND.md** |
| Learn about the widget in general | **README.md** |

---

## Help! My Backend Still Doesn't Work

### Common Issues:

**1. "Cannot find module 'express'"**
- Run: `npm install express cors node-fetch` in Replit Shell

**2. "Server configuration incomplete"**
- Add Canvas credentials to Replit Secrets (lock icon 🔒)
- Need: `CANVAS_URL` and `ACCESS_TOKEN`

**3. "Canvas API returned 401"**
- Your Canvas token is invalid/expired
- Generate a new token in Canvas (Account → Settings)

**4. Backend stops after 1 hour**
- Free Repls sleep after inactivity
- Use UptimeRobot (free) or upgrade to Replit Hacker ($7/month)

See **HOW_TO_FIX_BACKEND.md** for detailed solutions!

---

## Visual Indicators

### When Backend is Down (Now):
```
⚠️ Backend unavailable - showing demo data. Check console for details.
[Yellow warning banner above widget]
[Demo comments: Sarah Johnson, Michael Chen, etc.]
```

### When Backend is Working (Goal):
```
[No warning banner - clean interface]
[Real Canvas discussion comments]
[Console: "Successfully loaded X comments"]
```

---

## Summary

🎯 **Goal:** Get real Canvas comments showing in the widget  
🔧 **Fix:** Start your Replit backend server  
📖 **Guide:** HOW_TO_FIX_BACKEND.md  
⏱️ **Time:** 5 minutes if backend exists, 15 minutes if creating from scratch  

**Let's get it working! Start with HOW_TO_FIX_BACKEND.md** 🚀
