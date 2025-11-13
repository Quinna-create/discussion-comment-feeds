# Troubleshooting: Widget Shows Demo Data Instead of Real Comments

## Problem
The widget displays correctly on GitHub Pages and in Canvas embeds, but it's showing backup demo data instead of actual discussion posts from Canvas.

## Root Cause
The Replit backend server at `https://canvas-discuss-quinna2.replit.app` is not responding or is unavailable. When the widget cannot reach the backend, it automatically falls back to demo data so the widget continues to function.

## How to Check If Backend Is Running

### 1. Test the Backend URL Directly

Open this URL in your browser:
```
https://canvas-discuss-quinna2.replit.app?courseId=196700&discussionId=6735506
```

**What you should see:**
- ✅ **JSON data with comments** - Backend is working!
- ❌ **Error or blank page** - Backend is not running

### 2. Check Browser Console

Open the widget page and press F12 to open Developer Tools. Look at the Console tab:

**If backend is down, you'll see:**
```
❌ Replit API Error: Network error: Cannot reach backend server
Failed to fetch from: https://canvas-discuss-quinna2.replit.app
⚠️ Backend unavailable - showing demo data. Check console for details.
```

**If backend is working, you'll see:**
```
✅ Successfully loaded X comments from Replit API
```

## Solutions

### Solution 1: Wake Up Your Replit Server

Free Replit projects go to sleep after inactivity. To wake it up:

1. **Visit your Repl directly**: Go to https://replit.com and open your project
2. **Click "Run"** to start the server
3. **Verify it's running**: You should see a message like "Canvas Discussion Proxy running on port 3000"
4. **Test the URL**: Open the backend URL in a browser to verify it returns JSON
5. **Refresh your widget**: The widget should now show real comments!

### Solution 2: Keep Replit Running

Free Replit servers sleep after 1 hour of inactivity. Options to keep it running:

#### Option A: Upgrade to Replit Hacker Plan ($7/month)
- Always-on hosting
- Never sleeps
- Best for production use

#### Option B: Use UptimeRobot (Free)
1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add a new monitor for your Replit URL
3. Set it to ping every 5 minutes
4. This keeps your Repl awake (within free tier limits)

#### Option C: Deploy to Alternative Hosting
Deploy the backend to:
- **Railway.app** - Free tier with always-on hosting
- **Render.com** - Free tier available
- **Heroku** - Free tier (with limitations)
- **Your own server** - Full control

### Solution 3: Verify Backend Configuration

If the backend is running but still showing demo data:

1. **Check Environment Variables** in your Replit project:
   - `CANVAS_URL` - Your Canvas instance URL
   - `ACCESS_TOKEN` - Valid Canvas API token
   - `COURSE_ID` - Your course ID (should be 196700)
   - `DISCUSSION_ID` - Your discussion ID (should be 6735506)

2. **Check Backend Logs** in Replit console for errors

3. **Verify Canvas API Access**:
   - Token has proper permissions
   - Course and discussion IDs are correct
   - Discussion has actual comments/posts

### Solution 4: Test with Different Configuration

You can temporarily test if the issue is with the backend by using mock data:

Edit `docs/discussion-widget.html` and change the configuration:
```javascript
window.discussionWidgetConfig = {
    mockData: true,  // Use mock data for testing
    cycleInterval: 15000
};
```

This will show demo data intentionally while you fix the backend.

## Verification Steps

After fixing the backend:

1. **Open the backend URL in browser** - Should return JSON
2. **Check browser console** - Should show "Successfully loaded X comments"
3. **Watch the widget** - Should display real comments from your Canvas discussion
4. **Look for the warning banner** - Should NOT show "Backend unavailable"

## Current Configuration

Your widgets are configured with:
- **Backend URL**: `https://canvas-discuss-quinna2.replit.app`
- **Course ID**: `196700`
- **Discussion ID**: `6735506`

Make sure your Replit backend is:
1. Running (not sleeping)
2. Configured with correct Canvas credentials
3. Accessible from the internet (CORS enabled)

## Quick Test Command

Run this in your terminal to test the backend:
```bash
curl "https://canvas-discuss-quinna2.replit.app?courseId=196700&discussionId=6735506"
```

Expected output: JSON array with comment data

## Need More Help?

1. Check `REPLIT_BACKEND.md` for complete backend setup guide
2. Review backend logs in Replit console
3. Ensure CORS is enabled (`app.use(cors())` in backend code)
4. Verify Canvas API token is valid and has read permissions

## Summary

✅ **Widget is working correctly** - It's displaying and cycling comments
✅ **Configuration is correct** - Course ID and Discussion ID are set
❌ **Backend is not responding** - Server needs to be running

**Next Step**: Visit your Replit project and click "Run" to start the backend server.
