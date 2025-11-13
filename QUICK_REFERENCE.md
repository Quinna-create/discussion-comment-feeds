# Quick Reference: Widget Configuration

## Current Configuration

All widgets are configured to fetch from Replit backend:

```javascript
window.discussionWidgetConfig = {
    replitApiUrl: 'https://c76efa4a-f1cb-493a-bbce-a2170f4456b4-00-2qw4tixq4jmr9.kirk.replit.dev',
    cycleInterval: 15000,  // 15 seconds
    maxComments: 50
};
```

## Three Ways to Use the Widget

### 1. With Replit Backend (Production - Recommended)
**Security: ✅ Secure** - Tokens stay on server

```javascript
window.discussionWidgetConfig = {
    replitApiUrl: 'YOUR_REPLIT_URL',
    cycleInterval: 15000,
    maxComments: 50
};
```

**Setup:** See `REPLIT_BACKEND.md`

---

### 2. With Mock Data (Testing Only)
**Security: ✅ Safe** - No real data

```javascript
window.discussionWidgetConfig = {
    mockData: true,
    cycleInterval: 10000
};
```

**Use:** Open `test-mock.html` or any widget with this config

---

### 3. Direct Canvas API (Not Recommended)
**Security: ⚠️ Exposes Token** - Avoid in production

```javascript
window.discussionWidgetConfig = {
    canvasUrl: 'https://school.instructure.com',
    accessToken: 'YOUR_TOKEN',
    courseId: '12345',
    discussionId: '67890',
    cycleInterval: 15000,
    maxComments: 50
};
```

**Warning:** Only use for testing!

---

## File Locations

| File | Purpose | Configuration |
|------|---------|---------------|
| `index.html` | Main page with docs | Replit API |
| `demo.html` | Demo page | Replit API |
| `discussion-widget.html` | Embeddable widget | Replit API |
| `docs/discussion-widget.html` | GitHub Pages version | Replit API |
| `test-mock.html` | Testing with mock data | Mock Data |
| `simple-posting-widget.html` | Local posting (not Canvas) | localStorage |

---

## Expected Replit API Response

Your Replit backend should return one of these formats:

### Format 1: Simple Array
```json
[
  {
    "text": "Comment content",
    "author": "Student Name",
    "timestamp": "2024-01-15T10:30:00Z"
  }
]
```

### Format 2: Nested Object
```json
{
  "comments": [
    {
      "message": "Comment content",
      "user_name": "Student Name",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

Widget automatically normalizes both formats.

---

## Common Issues & Quick Fixes

### Issue: "Loading comments..." never goes away

**Possible Causes:**
1. Replit backend not running
2. Wrong Replit URL in config
3. CORS not enabled on backend
4. API returning wrong format

**Quick Test:**
```bash
# Test if backend is accessible
curl YOUR_REPLIT_URL
```

**Fix:**
1. Open Replit URL in browser - should see JSON
2. Check browser console for errors (F12)
3. Verify `app.use(cors())` in backend code
4. Test with mock data: `mockData: true`

---

### Issue: Widget shows but no styling

**Fix:**
```html
<!-- Make sure CSS is linked -->
<link rel="stylesheet" href="widget-style.css">
```

---

### Issue: Comments show HTML tags

**Status:** Should not happen - widget strips HTML automatically

If it does, check:
- Widget script is loaded: `<script src="widget-script.js"></script>`
- No JavaScript errors in console

---

## Quick Commands

### Test Widget Locally
```bash
# Start local server
python3 -m http.server 8080

# Open in browser
http://localhost:8080/test-mock.html
```

### Test Replit API
```bash
# Check if backend returns JSON
curl YOUR_REPLIT_URL

# Should see JSON response with comments
```

### Update Configuration
Edit the `<script>` section before `widget-script.js`:
```javascript
window.discussionWidgetConfig = {
    replitApiUrl: 'YOUR_NEW_URL',
    cycleInterval: 20000  // 20 seconds
};
```

---

## Documentation Quick Links

| Document | What's Inside |
|----------|---------------|
| `REPLIT_BACKEND.md` | Complete backend setup guide |
| `IMPLEMENTATION_SUMMARY.md` | What was done and why |
| `README.md` | Full documentation |
| `QUICKSTART.md` | 5-minute setup guide |

---

## Need Help?

1. **Backend Issues** → See `REPLIT_BACKEND.md`
2. **Widget Issues** → See `README.md` troubleshooting
3. **Canvas Issues** → See `CANVAS_INTEGRATION.md`
4. **Test First** → Open `test-mock.html` to verify widget works

---

**Remember:** Always use Replit backend in production for security! 🔒
