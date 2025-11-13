# Discussion Comment Feed Widget

A customizable widget for Canvas LMS that displays cycling student discussion comments alongside video lectures. Perfect for asynchronous online courses to showcase peer engagement and insights.

## Features

- 🔄 **Auto-cycling comments** - Automatically rotates through discussion board comments
- ⏯️ **Playback controls** - Pause, play, and navigate through comments manually
- ⚙️ **Configurable timing** - Adjust cycle interval (5-60 seconds)
- 🎨 **Clean, modern UI** - Responsive design that integrates seamlessly with Canvas
- 🔒 **Secure** - Uses Canvas API with token authentication
- 📱 **Responsive** - Works on desktop, tablet, and mobile devices

## Quick Start

### Option 1: Mock Data (Testing)

1. Open `demo.html` in a web browser
2. The widget will load with sample comments automatically
3. Perfect for testing the UI and functionality

### Option 2: Canvas Integration

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
| `canvasUrl` | string | '' | Your Canvas instance URL (e.g., 'https://canvas.instructure.com') |
| `accessToken` | string | '' | Canvas API access token |
| `courseId` | string | '' | Canvas course ID |
| `discussionId` | string | '' | Discussion topic ID |
| `cycleInterval` | number | 15000 | Time between comments in milliseconds |
| `maxComments` | number | 50 | Maximum number of comments to load |
| `mockData` | boolean | false | Use mock data instead of Canvas API (for testing) |

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

### Basic Setup with Mock Data

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

### Canvas API Integration

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

## Security Considerations

⚠️ **Important**: Never commit your Canvas access token to version control!

- Store tokens in environment variables or secure configuration
- Use read-only tokens with minimal permissions
- Rotate tokens regularly
- Consider using server-side proxy for API calls in production

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Comments Not Loading

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