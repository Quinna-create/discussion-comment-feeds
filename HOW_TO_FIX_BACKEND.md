# How to Fix Your Replit Backend

Yes! You can fix the backend directly through Replit. This guide will walk you through the process.

## Quick Answer

**Yes, you can fix it through Replit!** Just follow these steps:

1. Go to https://replit.com and log in
2. Find your Canvas discussion proxy project
3. Click the **"Run"** button
4. Your backend will start and the widget will show real comments!

---

## Detailed Step-by-Step Guide

### Step 1: Access Your Replit Project

1. **Go to Replit**: Open https://replit.com in your browser
2. **Log in** with your account
3. **Find your project**: Look for your Canvas proxy project (it might be named something like "canvas-discussion-proxy" or similar)

### Step 2: Check If Backend Code Exists

Once you open your project, check if you have these files:

- ✅ `index.js` or `main.js` - The backend server code
- ✅ `package.json` - Dependencies (express, cors, node-fetch)
- ✅ `.replit` - Replit configuration

**If you DON'T have these files yet**, you'll need to create the backend first (see "Creating Backend From Scratch" below).

**If you DO have these files**, continue to Step 3.

### Step 3: Check Environment Variables (Secrets)

Your backend needs Canvas credentials to work:

1. **Click the lock icon** 🔒 in the left sidebar (labeled "Secrets")
2. **Verify these environment variables exist**:
   - `CANVAS_URL` - Your Canvas instance URL (e.g., `https://canvas.instructure.com`)
   - `ACCESS_TOKEN` - Your Canvas API token
   - `COURSE_ID` - Optional (can be `196700` or leave blank)
   - `DISCUSSION_ID` - Optional (can be `6735506` or leave blank)

**If secrets are missing**, see "Setting Up Canvas Credentials" below.

### Step 4: Start the Backend

1. **Click the green "Run" button** at the top of the Replit interface
2. **Wait for it to start** - You should see output like:
   ```
   Canvas Discussion Proxy running on port 3000
   Canvas URL: https://canvas.instructure.com
   Course ID: 196700
   Discussion ID: 6735506
   ```
3. **Check for errors** - If you see error messages, see "Troubleshooting Errors" below

### Step 5: Test Your Backend

Once running, Replit will show a "Webview" with your backend URL. Test it:

1. **Copy your Replit URL** from the webview (should look like: `https://your-project.username.replit.dev`)
2. **Open in new tab** with your course and discussion IDs:
   ```
   https://your-project.username.replit.dev/?courseId=196700&discussionId=6735506
   ```
3. **You should see JSON data** with comments from Canvas

**If you see JSON data** ✅ - Your backend is working!
**If you see an error** ❌ - See "Troubleshooting Errors" below

### Step 6: Update Widget Configuration (If Needed)

If your Replit URL is different from what's in the widget:

1. **Edit `docs/discussion-widget.html`** in your GitHub repository
2. **Update the `replitApiUrl`**:
   ```javascript
   window.discussionWidgetConfig = {
       replitApiUrl: 'YOUR_NEW_REPLIT_URL_HERE',
       courseId: '196700',
       discussionId: '6735506',
       cycleInterval: 15000,
       maxComments: 50
   };
   ```
3. **Commit and push** the changes
4. **Wait for GitHub Pages to update** (usually 1-2 minutes)

### Step 7: Verify the Widget Works

1. **Open your GitHub Pages widget**: https://quinna-create.github.io/discussion-comment-feeds/discussion-widget.html
2. **Press F12** to open Developer Console
3. **Look for success message**:
   ```
   ✅ Successfully loaded X comments from Replit API
   ```
4. **Check the widget** - Should show real Canvas comments (no warning banner)

---

## Creating Backend From Scratch

If you don't have a backend yet, here's how to create one:

### 1. Create a New Repl

1. Go to https://replit.com
2. Click **"Create Repl"**
3. Choose **"Node.js"** template
4. Name it: `canvas-discussion-proxy`
5. Click **"Create Repl"**

### 2. Install Dependencies

In the Replit Shell (bottom panel), run:
```bash
npm install express cors node-fetch
```

### 3. Create `index.js`

Click **"+ Create file"** and name it `index.js`. Paste this code:

```javascript
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // Enable CORS for widget access

// Configuration from environment variables
const CANVAS_URL = process.env.CANVAS_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const COURSE_ID = process.env.COURSE_ID;
const DISCUSSION_ID = process.env.DISCUSSION_ID;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Canvas Discussion Proxy is running' });
});

// Main endpoint to fetch discussion comments
app.get('/', async (req, res) => {
  try {
    // Get courseId and discussionId from query parameters
    const courseId = req.query.courseId || COURSE_ID;
    const discussionId = req.query.discussionId || DISCUSSION_ID;
    
    // Validate configuration
    if (!CANVAS_URL || !ACCESS_TOKEN) {
      return res.status(500).json({ 
        error: 'Server configuration incomplete. Check environment variables.' 
      });
    }
    
    if (!courseId || !discussionId) {
      return res.status(400).json({ 
        error: 'courseId and discussionId are required as query parameters.' 
      });
    }

    // Fetch from Canvas API
    const apiUrl = `${CANVAS_URL}/api/v1/courses/${courseId}/discussion_topics/${discussionId}/entries`;
    
    console.log('Fetching from Canvas:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Canvas API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    // Flatten nested replies
    const flattenComments = (entries) => {
      let allComments = [];
      for (const entry of entries) {
        allComments.push({
          text: entry.message,
          author: entry.user_name || 'Anonymous',
          timestamp: entry.created_at,
          id: entry.id
        });
        
        if (entry.replies && entry.replies.length > 0) {
          allComments = allComments.concat(flattenComments(entry.replies));
        }
      }
      return allComments;
    };
    
    const comments = flattenComments(data);
    
    // Sort by creation date (oldest first)
    comments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    console.log(`Returning ${comments.length} comments`);
    res.json(comments);
    
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ 
      error: 'Failed to fetch comments from Canvas',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Canvas Discussion Proxy running on port ${PORT}`);
  console.log(`Canvas URL: ${CANVAS_URL}`);
  console.log(`Course ID: ${COURSE_ID}`);
  console.log(`Discussion ID: ${DISCUSSION_ID}`);
});
```

### 4. Set Up Canvas Credentials

Now you need to get your Canvas API credentials:

#### A. Get Canvas API Token

1. **Log into Canvas** (your institution's Canvas site)
2. **Go to Account → Settings**
3. **Scroll to "Approved Integrations"**
4. **Click "+ New Access Token"**
5. **Purpose**: "Discussion Widget Backend"
6. **Expiration**: Leave blank (no expiration) or set a date
7. **Click "Generate Token"**
8. **COPY THE TOKEN** - You won't see it again!

#### B. Find Your Course and Discussion IDs

1. **Course ID**: 
   - Open your Canvas course
   - Look at the URL: `canvas.instructure.com/courses/196700`
   - Course ID is `196700`

2. **Discussion ID**:
   - Open the discussion topic in Canvas
   - Look at the URL: `.../discussion_topics/6735506`
   - Discussion ID is `6735506`

#### C. Add Secrets to Replit

1. **Click the lock icon** 🔒 in Replit (left sidebar)
2. **Add these secrets**:

   | Key | Value |
   |-----|-------|
   | `CANVAS_URL` | Your Canvas URL (e.g., `https://canvas.instructure.com`) |
   | `ACCESS_TOKEN` | The token you copied from Canvas |
   | `COURSE_ID` | `196700` (optional) |
   | `DISCUSSION_ID` | `6735506` (optional) |

### 5. Run and Test

1. **Click "Run"** button
2. **Check console output** - Should show "Canvas Discussion Proxy running"
3. **Click "Open in new tab"** from the webview
4. **Add query parameters**: `?courseId=196700&discussionId=6735506`
5. **You should see JSON** with Canvas comments!

### 6. Update Your Widget

Copy your Replit URL and update `docs/discussion-widget.html` in GitHub as shown in Step 6 above.

---

## Setting Up Canvas Credentials

If you need to add or update Canvas credentials:

### Getting a Canvas API Token

1. **Log into Canvas**
2. **Click your profile picture** → Account → Settings
3. **Scroll to "Approved Integrations"**
4. **Click "+ New Access Token"**
5. **Fill in**:
   - Purpose: `Discussion Widget Backend`
   - Expiration: Leave blank or set future date
6. **Click "Generate Token"**
7. **COPY the token immediately** (you won't see it again!)

### Adding Token to Replit

1. **In your Replit project**, click the lock icon 🔒 (Secrets)
2. **Click "New Secret"**
3. **Add each required variable**:
   ```
   Key: CANVAS_URL
   Value: https://your-institution.instructure.com
   
   Key: ACCESS_TOKEN
   Value: [paste your token here]
   
   Key: COURSE_ID (optional)
   Value: 196700
   
   Key: DISCUSSION_ID (optional)
   Value: 6735506
   ```
4. **Click "Add Secret"** for each one

### Important Security Notes

- ⚠️ **Never share your Canvas token** with anyone
- ⚠️ **Never commit tokens to Git** (Replit Secrets keeps them secure)
- ✅ **Tokens stay on the server** and are never exposed to browsers
- 🔄 **Rotate tokens regularly** for security

---

## Troubleshooting Errors

### Error: "Cannot find module 'express'"

**Solution**: Install dependencies:
```bash
npm install express cors node-fetch
```

### Error: "Server configuration incomplete"

**Solution**: Check your Secrets (lock icon):
- Make sure `CANVAS_URL` and `ACCESS_TOKEN` are set
- Verify no typos in the keys
- Restart the Repl after adding secrets

### Error: "Canvas API returned 401"

**Solution**: Your Canvas token is invalid or expired:
1. Generate a new token in Canvas (Account → Settings)
2. Update the `ACCESS_TOKEN` secret in Replit
3. Restart the Repl

### Error: "Canvas API returned 404"

**Solution**: Course ID or Discussion ID is wrong:
1. Double-check the IDs in Canvas URLs
2. Make sure the discussion exists and you have access
3. Update `COURSE_ID` and `DISCUSSION_ID` if needed

### Error: "CORS policy" in browser console

**Solution**: Make sure CORS is enabled in your backend:
```javascript
app.use(cors());  // This line should be near the top of index.js
```

### Backend stops after 1 hour

**Solution**: Free Replit projects sleep. Options:
1. **Upgrade to Replit Hacker** ($7/month) - Always-on
2. **Use UptimeRobot** (free):
   - Sign up at uptimerobot.com
   - Add your Replit URL as a monitor
   - Set to ping every 5 minutes
3. **Deploy elsewhere**: Railway.app, Render.com, etc.

---

## Keeping Your Backend Running

### Option 1: Replit Hacker Plan ($7/month)

**Best for**: Production use

1. Upgrade at https://replit.com/pricing
2. Your Repl will never sleep
3. Faster performance and more resources

### Option 2: UptimeRobot (Free)

**Best for**: Budget-conscious users

1. Sign up at https://uptimerobot.com
2. Click **"+ Add New Monitor"**
3. Configure:
   - Monitor Type: HTTP(s)
   - Friendly Name: Canvas Discussion Proxy
   - URL: Your Replit URL
   - Monitoring Interval: 5 minutes
4. Save - it will keep your Repl awake!

### Option 3: Alternative Hosting

**Best for**: Full control

Deploy to:
- **Railway.app** - Free tier, easy deployment
- **Render.com** - Free tier available
- **Heroku** - Familiar platform
- **Your own server** - Complete control

Just copy your `index.js` code and set the same environment variables.

---

## Quick Reference Commands

### Test Backend Locally in Replit
```bash
# In Replit Shell
node index.js
```

### Test Backend from Command Line
```bash
curl "YOUR_REPLIT_URL/?courseId=196700&discussionId=6735506"
```

### Check Replit Logs
Look at the Console panel in Replit for output and errors.

---

## Summary

**Yes, you can absolutely fix the backend through Replit!**

### Quick Steps:
1. ✅ Go to Replit.com and open your project
2. ✅ Make sure `index.js` exists with the backend code
3. ✅ Add Canvas credentials to Secrets (lock icon)
4. ✅ Click "Run" button
5. ✅ Test the URL with `?courseId=196700&discussionId=6735506`
6. ✅ Update widget configuration if URL changed
7. ✅ Refresh your GitHub Pages widget

### Need Help?
- See `REPLIT_BACKEND.md` for full backend setup guide
- See `TROUBLESHOOTING.md` for general widget troubleshooting
- Check Replit console for error messages
- Verify Canvas token is valid

**Once your backend is running, the widget will automatically display real Canvas discussion posts!**
