# Canvas LMS Integration Guide

This guide explains how to embed the Discussion Feed Widget into Canvas LMS.

## Method 1: Using Canvas Files (Recommended)

### Step 1: Upload the Widget
1. Go to your Canvas course
2. Navigate to **Files**
3. Upload `discussion-widget.html` to your Files area
4. Right-click the uploaded file and select **Copy Link**

### Step 2: Create a Page with the Widget
1. Go to **Pages** in your Canvas course
2. Click **+ Page**
3. Give your page a title (e.g., "Lecture 1 - Data Structures")
4. Switch to **HTML Editor** mode (click `</>` button)
5. Paste the following code:

```html
<iframe src="YOUR_WIDGET_FILE_URL" 
        width="100%" 
        height="700" 
        style="border: none; min-height: 700px;">
</iframe>
```

6. Replace `YOUR_WIDGET_FILE_URL` with the link you copied
7. Save and publish the page

## Method 2: Using External Hosting

If you host the widget on your own server:

### HTML Embed Code for Canvas
```html
<iframe src="https://your-server.com/discussion-widget.html" 
        width="100%" 
        height="700" 
        style="border: none; min-height: 700px;">
</iframe>
```

## Method 3: Inline HTML (Not Recommended)

You can embed the entire HTML directly in Canvas, but this makes updates difficult:

1. Copy the entire contents of `discussion-widget.html`
2. In Canvas Page editor, switch to HTML mode
3. Paste the code directly

## Customizing for Your Course

### Adding Your Video
In the widget HTML, locate this line:
```html
<source src="" type="video/mp4">
```

Replace the empty `src` with your video URL:
```html
<source src="https://your-video-url.mp4" type="video/mp4">
```

### Canvas Studio Videos
If using Canvas Studio:
1. Get the embed code from Canvas Studio
2. Replace the entire `<video>` section with the Studio embed code

### YouTube Videos
For YouTube videos, replace the video section with:
```html
<iframe width="100%" height="400" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>
```

## Configuring the API Connection

### Option 1: User-Configurable (Default)
The widget includes a settings panel where instructors/students can configure:
- API endpoint URL
- Cycle interval

Settings are saved in browser localStorage.

### Option 2: Hard-Coded Configuration
To pre-configure for all users, edit the JavaScript section:

```javascript
let apiUrl = 'https://your-actual-api-url.com';
let cycleInterval = 5000; // 5 seconds
```

Then optionally hide the settings panel by adding this CSS:
```css
.settings {
    display: none;
}
```

## Testing Your Integration

1. **Test the API Connection**: 
   - Open the widget page
   - Check if posts are loading
   - Look for error messages

2. **Test Video Playback**:
   - Click play on the video
   - Verify the video plays correctly

3. **Test Post Cycling**:
   - Play the video
   - Watch if posts cycle automatically
   - Pause the video to stop cycling

## Troubleshooting

### Posts Not Loading

**Problem**: Error message "Failed to fetch"

**Solutions**:
- Verify the API URL is correct
- Check if the API supports CORS (Cross-Origin Resource Sharing)
- Ensure the Replit app is running and accessible

### Video Not Playing

**Problem**: Video shows error or doesn't load

**Solutions**:
- Check video URL is correct and accessible
- Verify video format is supported (MP4 recommended)
- Ensure video hosting allows embedding

### Widget Not Displaying in Canvas

**Problem**: Iframe shows blank or error

**Solutions**:
- Check Canvas settings allow iframe embedding
- Verify the widget file URL is accessible
- Ensure Canvas security settings don't block the content
- Try uploading to Canvas Files instead of external hosting

### CORS Issues

If your API returns CORS errors, you need to configure your Replit app:

For Express.js apps, add:
```javascript
const cors = require('cors');
app.use(cors());
```

For other frameworks, add these headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## Canvas Permissions

To embed iframes in Canvas, you need:
- **Instructor** or **TA** role for the course
- Canvas must allow HTML editing (some institutions restrict this)
- Course must allow iframe embedding in Pages

## Best Practices

1. **Host on HTTPS**: Canvas works best with secure connections
2. **Test First**: Use `demo.html` to test locally before deploying
3. **Mobile Friendly**: The widget is responsive but test on mobile devices
4. **Accessibility**: Ensure videos have captions for accessibility
5. **Performance**: Large video files may cause slow loading
6. **Privacy**: Be aware of what data the API exposes

## Example: Complete Canvas Page

Here's a complete example of a Canvas page with the widget:

```html
<h2>Week 3: Advanced Data Structures</h2>

<p>Watch the lecture below while seeing discussion comments from your classmates appear alongside the video.</p>

<iframe src="https://canvas.instructure.com/courses/COURSE_ID/files/FILE_ID/preview" 
        width="100%" 
        height="700" 
        style="border: none; margin-bottom: 20px;">
</iframe>

<h3>Discussion Questions</h3>
<ul>
  <li>What are the key differences between arrays and linked lists?</li>
  <li>When would you choose one data structure over another?</li>
  <li>Can you think of real-world applications for these concepts?</li>
</ul>
```

## Support

For issues related to:
- **Widget functionality**: Check the GitHub repository
- **Canvas integration**: Contact your Canvas administrator
- **API connectivity**: Check your Replit app logs
