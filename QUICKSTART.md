# Quick Start Guide for Instructors

This is a 5-minute guide to get the Discussion Comment Feed Widget working in your Canvas course.

## What You'll Need
- Canvas instructor/admin access
- A discussion board with student comments
- 5-10 minutes

## Step 1: Try the Demo (1 minute)

1. Download or clone this repository
2. Open `demo.html` in your web browser
3. You'll see sample student comments cycling automatically
4. Test the controls (pause, next, previous)

This shows you exactly what students will see!

## Step 2: Get Canvas Credentials (3 minutes)

### Get Your API Token
1. Log into Canvas
2. Click **Account** → **Settings**
3. Scroll to "Approved Integrations"
4. Click **+ New Access Token**
5. Purpose: "Discussion Widget"
6. Click **Generate Token**
7. **COPY THE TOKEN** (you can't see it again!)

### Find Your IDs
1. **Course ID**: Go to your course → look at URL
   - `canvas.instructure.com/courses/12345` → Course ID is `12345`

2. **Discussion ID**: Open your discussion → look at URL
   - `discussion_topics/67890` → Discussion ID is `67890`

## Step 3: Add to Canvas (2 minutes)

1. In Canvas, go to the page where you want the widget
2. Click **Edit**
3. Click the **HTML Editor** button (`</>` icon)
4. Copy and paste this code:

```html
<script>
window.discussionWidgetConfig = {
    canvasUrl: 'https://YOUR-SCHOOL.instructure.com',
    accessToken: 'YOUR_TOKEN_HERE',
    courseId: 'YOUR_COURSE_ID',
    discussionId: 'YOUR_DISCUSSION_ID',
    cycleInterval: 15000,
    maxComments: 50
};
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Quinna-create/discussion-comment-feeds@main/widget-style.css">
<div id="discussion-widget" class="widget-container">
    <div class="widget-header">
        <h3>Student Discussion Comments</h3>
        <div class="widget-controls">
            <button id="pauseBtn" class="control-btn" title="Pause/Resume">
                <span id="pauseIcon">⏸</span>
            </button>
            <button id="prevBtn" class="control-btn" title="Previous Comment">⏮</button>
            <button id="nextBtn" class="control-btn" title="Next Comment">⏭</button>
        </div>
    </div>
    <div class="comment-display">
        <div id="commentContent" class="comment-content">
            <div class="loading">Loading comments...</div>
        </div>
        <div class="comment-meta">
            <span id="authorName" class="author-name"></span>
            <span id="commentDate" class="comment-date"></span>
        </div>
        <div class="progress-indicator">
            <span id="currentIndex">0</span> / <span id="totalComments">0</span>
        </div>
    </div>
    <div class="widget-footer">
        <label for="cycleInterval">Cycle Interval (seconds):</label>
        <input type="number" id="cycleInterval" min="5" max="60" value="15">
    </div>
</div>
<script src="https://cdn.jsdelivr.net/gh/Quinna-create/discussion-comment-feeds@main/widget-script.js"></script>
```

5. Replace these values:
   - `YOUR-SCHOOL.instructure.com` → Your Canvas URL
   - `YOUR_TOKEN_HERE` → Your API token
   - `YOUR_COURSE_ID` → Your course ID
   - `YOUR_DISCUSSION_ID` → Your discussion ID

6. Click **Save**

## Done! 🎉

View your page to see student comments cycling!

## Troubleshooting

**"Loading comments..." never goes away**
- Check browser console (F12) for errors
- Verify your IDs and token are correct
- Make sure the discussion has comments

**Comments show HTML code**
- This shouldn't happen - the widget strips HTML automatically
- If it does, report it as a bug

**Widget looks broken**
- Canvas might block external CSS/JS
- Try uploading the files to Canvas Files instead
- Update the URLs in the code above

## Security Note

⚠️ Your access token gives access to your Canvas account. 

**For testing:** Using the token directly (as above) is fine.

**For production:** Consider these options:
1. Create a dedicated "Discussion Widget" Canvas user with read-only access
2. Set token expiration dates
3. Use a server-side proxy (see docs/canvas-setup.md)

## Need More Help?

- Read the full `README.md`
- Check `docs/canvas-setup.md` for detailed setup
- See `docs/api-reference.md` for customization
- Open an issue on GitHub

## Customization

Want to change colors? Edit the CSS:
```css
.widget-header {
    background: linear-gradient(135deg, #YOUR-COLOR1 0%, #YOUR-COLOR2 100%);
}
```

Want different timing?
```javascript
cycleInterval: 20000,  // 20 seconds instead of 15
```

Want more/fewer comments?
```javascript
maxComments: 100,  // Show up to 100 comments
```

---

**Enjoy showcasing your students' insights!** 🎓
