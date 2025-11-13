# Quick Start Guide

Get your Discussion Feed Widget running in 5 minutes!

## 🚀 Fastest Way to Test

1. **Download** `demo.html` from this repository
2. **Open** it in your web browser
3. **Watch** as student comments cycle automatically in a clean bubble design

That's it! No server needed, no configuration required.

## 📦 Deploy to Canvas (3 Steps)

### Step 1: Get Your Files
Download these files from this repository:
- `discussion-widget.html` (the main widget)
- `demo.html` (for testing)

### Step 2: Configure Your Video & API
Edit `discussion-widget.html` and update:

**Your Video URL** (line ~180):
```html
<source src="YOUR_VIDEO_URL.mp4" type="video/mp4">
```

**Your API URL** (line ~268 or use the settings panel):
```javascript
let apiUrl = 'YOUR_REPLIT_API_URL';
```

### Step 3: Upload to Canvas
1. Go to your Canvas course → **Files**
2. Upload `discussion-widget.html`
3. Right-click the file → **Copy Link**
4. Create a new **Page** in Canvas
5. Switch to **HTML Editor** (`</>` button)
6. Add this code:
```html
<iframe src="YOUR_COPIED_LINK" 
        width="100%" 
        height="700" 
        style="border: none;">
</iframe>
```
7. **Save** and you're done!

## 🎯 What You Get

- ✅ Clean bubble design with auto-cycling comments
- ✅ Smooth transitions with pulsing border animations
- ✅ Students see what classmates are saying
- ✅ Encourages engagement with course content
- ✅ Works on desktop and mobile
- ✅ No server maintenance required

## ⚙️ API Setup (Replit)

Your Replit app should return JSON like this:

```json
[
  {
    "author": "Student Name",
    "content": "This is a great explanation!",
    "timestamp": "2025-11-13T01:00:00Z"
  }
]
```

**Need CORS?** Add this to your Replit app:
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
```

## 🎨 Customization

### Change Colors
Edit the CSS section (around line 20-30):
```css
/* Main blue color */
#0066cc → YOUR_COLOR

/* Highlight color */
#e3f2fd → YOUR_HIGHLIGHT_COLOR
```

### Change Cycle Speed
In the settings panel or edit line ~269:
```javascript
let cycleInterval = 5000; // milliseconds (5 seconds)
```

### Hide Settings Panel
Add this CSS:
```css
.settings {
    display: none;
}
```

## 📱 Mobile Support

The widget automatically adjusts for mobile:
- Video and feed stack vertically
- Touch-friendly controls
- Optimized scrolling

## 🔧 Troubleshooting

**Problem: Posts not loading?**
- ✓ Check API URL is correct
- ✓ Check Replit app is running
- ✓ Look at browser console (F12) for errors

**Problem: Video not playing?**
- ✓ Check video URL is correct
- ✓ Try MP4 format (best compatibility)
- ✓ Verify video allows embedding

**Problem: Not working in Canvas?**
- ✓ Must use HTTPS for Canvas
- ✓ Check Canvas allows iframes
- ✓ Try uploading to Canvas Files

## 📚 Need More Help?

- **Full Documentation**: See `README.md`
- **Canvas Integration**: See `CANVAS_INTEGRATION.md`
- **Security Info**: See `SECURITY.md`
- **API Issues**: Check your Replit app logs

## 💡 Pro Tips

1. **Test First**: Always use `demo.html` locally before deploying
2. **Backup**: Keep a copy of your configured widget file
3. **Iterate**: Start with default settings, adjust based on feedback
4. **Engage**: Ask students to post during lectures
5. **Monitor**: Check which posts get the most attention

## 🎓 Example Use Cases

- **Lecture Questions**: Students ask questions while watching
- **Key Takeaways**: Students share what they learned
- **Timestamps**: Students note important moments ("Great example at 12:30!")
- **Peer Learning**: Students help each other understand concepts
- **Engagement Tracking**: See which topics generate discussion

## 🚨 Remember

- The widget itself is just HTML/CSS/JavaScript
- It's **secure** and **self-contained**
- No installation or server required
- Works in any modern browser
- Compatible with Canvas LMS

---

**Ready to start?** Download `demo.html` and open it in your browser right now! 🎉
