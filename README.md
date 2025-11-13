# Discussion Comment Feed Widget

A customizable widget for Canvas LMS that displays cycling student discussion comments alongside video lectures. Perfect for asynchronous online courses to showcase peer engagement and insights.

## Features

- 🔄 **Auto-cycling comments** - Automatically rotates through discussion board comments
- 💬 **Clean bubble design** - Modern, distraction-free interface with pulsing border animations
- 🎨 **Dynamic sizing** - Bubble adapts to content length (approximately 600x200 pixels)
- 🔒 **Secure** - Connects to Canvas via Replit backend proxy (no exposed API tokens)
- 📱 **Responsive** - Works on desktop, tablet, and mobile devices

## Architecture

This widget uses a **secure proxy architecture**:
1. **Replit Backend** - Handles Canvas API authentication securely on the server
2. **Widget Frontend** - Fetches comments from Replit API (no Canvas tokens exposed in browser)
3. **Canvas LMS** - Source of discussion comments

This is more secure than embedding Canvas API tokens directly in the frontend code.

## Quick Start

### Option 1: Use with Replit Backend (Recommended)

1. Open `index.html` or `demo.html` in a web browser
2. The widget fetches comments from the Replit backend server
3. The Replit server connects to Canvas and returns formatted comments
4. **No Canvas API token needed in the frontend!**

### Option 2: Mock Data (Offline Testing)

1. Edit the configuration in your HTML file:
```javascript
window.discussionWidgetConfig = {
    mockData: true,
    cycleInterval: 10000
};
```

2. Open the file in a web browser to see sample comments

### Option 3: Direct Canvas API Access (Less Secure)

Only use this if you can't use the Replit backend:

1. **Get Canvas API Token**
   - Log into your Canvas account
   - Go to Account → Settings
   - Scroll to "Approved Integrations"
   - Click "+ New Access Token"
   - Give it a purpose (e.g., "Discussion Widget")
   - Copy the generated token

2. **Find Your IDs**
   - Course ID: In Canvas URL: `canvas.instructure.com/courses/{COURSE_ID}`
   - Discussion ID: Open a discussion, ID is in the URL: `/discussion_topics/{DISCUSSION_ID}`

3. **Configure the Widget**
   - Copy `config-example.html` and edit with your settings
   - Or add configuration directly to your HTML (see below)

## GitHub Pages Deployment

This repository is configured for GitHub Pages deployment, making it easy to host the widget and embed it in Canvas.

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: Select **main** and **/docs** folder
   - Click **Save**
4. GitHub will provide a URL like: `https://your-username.github.io/discussion-comment-feeds/`

### Access Your Widget

Once deployed, your widget will be available at:
```
https://your-username.github.io/discussion-comment-feeds/discussion-widget.html
```

### Embed in Canvas Using GitHub Pages

After deploying to GitHub Pages, embed the widget in Canvas using an iframe:

```html
<iframe src="https://your-username.github.io/discussion-comment-feeds/discussion-widget.html" 
        width="100%" 
        height="600px" 
        frameborder="0"
        style="border: none;">
</iframe>
```

**Note:** Replace `your-username` with your actual GitHub username.

## Installation in Canvas

### Method 1: Embed in Canvas Page

1. In Canvas, edit the page where you want the widget
2. Switch to HTML editor (click "</>" icon)
3. Add the following code:

```html
<script>
// Configuration
window.discussionWidgetConfig = {
    canvasUrl: 'https://your-institution.instructure.com',
    accessToken: 'YOUR_ACCESS_TOKEN',
    courseId: 'YOUR_COURSE_ID',
    discussionId: 'YOUR_DISCUSSION_ID',
    cycleInterval: 15000, // milliseconds
    maxComments: 50
};
</script>

<link rel="stylesheet" href="https://your-host.com/widget-style.css">
<div id="discussion-widget" class="widget-container">
    <!-- Widget HTML content -->
</div>
<script src="https://your-host.com/widget-script.js"></script>
```

### Method 2: IFrame Embed

1. Host the widget files on a web server
2. In Canvas, use the HTML editor to add an iframe:

```html
<iframe src="https://your-host.com/discussion-widget.html?courseId=123&discussionId=456" 
        width="100%" 
        height="400px" 
        frameborder="0">
</iframe>
```

### Method 3: Canvas App Integration

For more advanced integration, you can create a Canvas LTI (Learning Tools Interoperability) app. See `docs/lti-integration.md` for details.

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `replitApiUrl` | string | '' | **Recommended**: Replit backend API URL (secure proxy to Canvas) |
| `canvasUrl` | string | '' | Your Canvas instance URL (e.g., 'https://canvas.instructure.com') - for direct access |
| `accessToken` | string | '' | Canvas API access token - for direct access (not recommended) |
| `courseId` | string | '' | **Required** for both Replit API and direct Canvas access |
| `discussionId` | string | '' | **Required** for both Replit API and direct Canvas access |
| `cycleInterval` | number | 15000 | Time between comments in milliseconds |
| `maxComments` | number | 50 | Maximum number of comments to load |
| `mockData` | boolean | false | Use mock data instead of API (for offline testing) |

## File Structure

```
discussion-comment-feeds/
├── discussion-widget.html    # Main widget HTML
├── widget-style.css          # Widget styles
├── widget-script.js          # Widget JavaScript logic
├── config-example.html       # Example configuration file
├── demo.html                 # Standalone demo
├── README.md                 # This file
└── docs/
    ├── canvas-setup.md       # Detailed Canvas setup guide
    ├── lti-integration.md    # LTI integration guide
    └── api-reference.md      # API reference
```

## Usage Examples

### Recommended: Replit Backend Integration (Secure)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Discussion Widget</title>
    <link rel="stylesheet" href="widget-style.css">
</head>
<body>
    <div id="discussion-widget" class="widget-container">
        <!-- Widget content from discussion-widget.html -->
    </div>
    
    <script>
    // Fetch comments from Replit backend (secure - no exposed tokens)
    window.discussionWidgetConfig = {
        replitApiUrl: 'https://canvas-discuss-quinna2.replit.app',
        courseId: '196700',      // Required: Canvas course ID
        discussionId: '6735506', // Required: Discussion topic ID
        cycleInterval: 15000, // 15 seconds
        maxComments: 50
    };
    </script>
    <script src="widget-script.js"></script>
</body>
</html>
```

### Mock Data (Offline Testing)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Discussion Widget Demo</title>
    <link rel="stylesheet" href="widget-style.css">
</head>
<body>
    <div id="discussion-widget" class="widget-container">
        <!-- Widget content from discussion-widget.html -->
    </div>
    
    <script>
    // Use mock data for demo
    window.discussionWidgetConfig = {
        mockData: true,
        cycleInterval: 10000 // 10 seconds
    };
    </script>
    <script src="widget-script.js"></script>
</body>
</html>
```

### Direct Canvas API Integration (Not Recommended - Exposes Token)

```javascript
window.discussionWidgetConfig = {
    canvasUrl: 'https://myschool.instructure.com',
    accessToken: '1234~abcdef...',
    courseId: '12345',
    discussionId: '67890',
    cycleInterval: 15000, // 15 seconds
    maxComments: 30
};
```

## Setting Up the Replit Backend

The Replit backend acts as a secure proxy between the widget and Canvas LMS. Here's how to set it up:

### Backend Requirements

Your Replit server should:
1. Fetch comments from Canvas API using your Canvas credentials
2. Return comments in a JSON format the widget can understand
3. Enable CORS to allow the widget to fetch data

### Expected API Response Format

The widget expects the Replit API to return comments in one of these formats:

**Format 1: Simple Array**
```json
[
  {
    "text": "This is a comment",
    "author": "Student Name",
    "timestamp": "2024-01-15T10:30:00Z"
  }
]
```

**Format 2: Nested Object**
```json
{
  "comments": [
    {
      "message": "This is a comment",
      "user_name": "Student Name",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

The widget will automatically normalize these formats.

### Sample Replit Backend (Node.js/Express)

```javascript
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // Enable CORS

const CANVAS_URL = process.env.CANVAS_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const COURSE_ID = process.env.COURSE_ID;
const DISCUSSION_ID = process.env.DISCUSSION_ID;

app.get('/', async (req, res) => {
  try {
    const apiUrl = `${CANVAS_URL}/api/v1/courses/${COURSE_ID}/discussion_topics/${DISCUSSION_ID}/entries`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    
    const data = await response.json();
    
    // Transform Canvas data to simple format
    const comments = data.map(entry => ({
      text: entry.message,
      author: entry.user_name || 'Anonymous',
      timestamp: entry.created_at
    }));
    
    res.json(comments);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Update Your Configuration

Once your Replit backend is running, update the widget configuration:

```javascript
window.discussionWidgetConfig = {
    replitApiUrl: 'YOUR_REPLIT_URL_HERE',  // e.g., 'https://your-project.username.repl.co'
    courseId: 'YOUR_COURSE_ID',            // Required: Canvas course ID
    discussionId: 'YOUR_DISCUSSION_ID',    // Required: Discussion topic ID
    cycleInterval: 15000,
    maxComments: 50
};
```

## Security Considerations

⚠️ **Important**: The Replit backend architecture is recommended for security!

**Benefits of Using Replit Backend:**
- Canvas API tokens stay on the server (never exposed in browser)
- You can implement rate limiting and caching
- Better control over data transformation
- Can add authentication if needed

**Direct Canvas API (Not Recommended):**
- Exposes your Canvas token in the frontend JavaScript
- Anyone viewing page source can steal your token
- Use only for testing or single-user scenarios

**Best Practices:**
- Store tokens in environment variables on Replit
- Use read-only tokens with minimal permissions
- Rotate tokens regularly
- Implement caching to reduce API calls
- Add rate limiting to prevent abuse

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Comments Not Loading from Replit Backend

1. **Check if Replit server is running**
   - Open the Replit URL in a browser
   - You should see JSON data or a response

2. **Verify CORS is enabled**
   - The Replit server must allow cross-origin requests
   - Add `app.use(cors())` in Express or equivalent

3. **Check API response format**
   - Open browser DevTools → Network tab
   - Look for the API request and check the response
   - Ensure it matches expected format (see "Expected API Response Format" above)

4. **Test with mock data**
   - Set `mockData: true` in config to verify the widget works
   - If mock data works, the issue is with the API connection

### Comments Not Loading from Direct Canvas API

1. Check browser console for errors
2. Verify Canvas URL, course ID, and discussion ID are correct
3. Ensure access token is valid and has proper permissions
4. Check CORS settings if hosting on external server

### Widget Not Displaying

1. Ensure all CSS and JS files are properly linked
2. Check that Canvas allows external resources (if hosting externally)
3. Verify HTML structure matches the expected format

### Styling Issues in Canvas

Canvas may have CSS that conflicts with the widget. Add `!important` to critical styles or use more specific selectors.

## Customization

### Changing Colors

Edit `widget-style.css`:

```css
.widget-header {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

### Adjusting Layout

Modify the CSS to match your course theme:

```css
.widget-container {
    max-width: 800px; /* Adjust width */
    border-radius: 12px; /* Adjust corners */
}
```

### Custom Comment Filtering

Edit `widget-script.js` to filter comments by criteria:

```javascript
// In fetchCanvasComments method
allComments = allComments.filter(comment => {
    // Your custom filter logic
    return comment.message.length > 50; // Example: only long comments
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review documentation in `/docs`

## Roadmap

- [ ] Support for multiple discussion boards
- [ ] Comment filtering by rating/likes
- [ ] Search functionality
- [ ] Export comments feature
- [ ] Analytics dashboard
- [ ] Dark mode theme
- [ ] Accessibility improvements (WCAG 2.1 AA)

## Credits

Created for educators building engaging asynchronous online courses in Canvas LMS.