# Discussion Comment Feeds Widget

A Canvas LMS widget that displays discussion board posts alongside video lectures, cycling through posts as the video plays.

## Features

- **Video Integration**: Displays video lectures with discussion posts side-by-side
- **Auto-Cycling**: Automatically cycles through discussion posts when video is playing
- **Configurable**: Customize API endpoint and cycling interval
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Refreshes posts periodically to show new discussions
- **Canvas Compatible**: Can be embedded in Canvas LMS as an iframe

## Quick Start

### Option 1: Direct Use in Canvas

1. Upload `discussion-widget.html` to your Canvas Files or host it on a web server
2. Add an iframe to your Canvas page:
   ```html
   <iframe src="YOUR_WIDGET_URL/discussion-widget.html" 
           width="100%" 
           height="700" 
           style="border: none;">
   </iframe>
   ```

### Option 2: Local Testing

1. Open `discussion-widget.html` in a web browser
2. The widget will automatically connect to the default API endpoint
3. Click "Update Settings" to configure your specific API URL

## Configuration

The widget includes built-in settings that can be adjusted:

- **API Endpoint URL**: The URL of your Replit app that provides discussion posts
  - Default: `https://c76efa4a-f1cb-493a-bbce-a2170f4456b4-00-2qw4tixq4jmr9.kirk.replit.dev`
  
- **Cycle Interval**: How long to display each post (in seconds)
  - Default: 5 seconds
  - Range: 1-60 seconds

Settings are saved in browser localStorage and persist across sessions.

## API Response Format

The widget expects the API to return JSON in one of these formats:

### Format 1: Array of posts
```json
[
  {
    "author": "Student Name",
    "content": "This is a discussion post...",
    "timestamp": "2025-11-13T01:00:00Z"
  }
]
```

### Format 2: Object with posts array
```json
{
  "posts": [
    {
      "author": "Student Name",
      "content": "This is a discussion post...",
      "timestamp": "2025-11-13T01:00:00Z"
    }
  ]
}
```

### Field Mapping

The widget supports various field names:
- **Author**: `author`, `user`, `username` (defaults to "Anonymous")
- **Content**: `content`, `message`, `text`, `body`
- **Timestamp**: `timestamp`, `date`, `created_at` (defaults to "Recently")

## Usage

1. **Add Your Video**: Replace the video source in the HTML with your lecture video URL
   ```html
   <source src="YOUR_VIDEO_URL.mp4" type="video/mp4">
   ```

2. **Configure API**: Update the API endpoint in the settings panel or directly in the HTML

3. **Embed in Canvas**: 
   - Go to your Canvas course page
   - Edit the page in HTML mode
   - Add an iframe pointing to your hosted widget
   - Adjust width/height as needed

## How It Works

1. When the page loads, it fetches discussion posts from the configured API
2. Posts are displayed in a scrollable feed next to the video
3. When the video starts playing, posts automatically cycle at the configured interval
4. The current post is highlighted for easy visibility
5. Posts are refreshed every 2 minutes to show new content
6. Cycling stops when the video is paused or ended

## Customization

### Styling

Edit the CSS in the `<style>` section to match your Canvas theme:
- Colors: Modify the color values (e.g., `#0066cc` for primary color)
- Layout: Adjust `grid-template-columns` for different video/feed ratios
- Animation: Change `cycleInterval` timing or animation effects

### Behavior

Modify JavaScript constants:
- `cycleInterval`: Default time between posts (milliseconds)
- Post refresh interval: Line with `setInterval(fetchDiscussionPosts, 120000)`

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

**Posts not loading?**
- Check that the API URL is correct
- Verify the API is accessible (not blocked by CORS)
- Check browser console for error messages

**Video not displaying?**
- Ensure the video URL is correct
- Verify the video format is supported (MP4 recommended)
- Check video hosting allows embedding

**Not working in Canvas?**
- Ensure the widget is hosted on HTTPS
- Check Canvas settings allow iframe embedding
- Verify no browser extensions are blocking the content

## License

MIT License - feel free to modify and use as needed.