# Discussion Widget Copies

This document lists all the discussion widget copies that have been created.

## Configuration

All widgets are configured with:
- **Course ID**: 196700
- **Replit API URL**: https://canvas-discuss-quinna2.replit.app
- **Cycle Interval**: 15 seconds
- **Max Comments**: 50

## Widget Files

| File Name | Discussion ID | URL Pattern |
|-----------|---------------|-------------|
| discussion-widget-1.html | 6738162 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-1.html` |
| discussion-widget-2.html | 6738164 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-2.html` |
| discussion-widget-3.html | 6738172 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-3.html` |
| discussion-widget-4.html | 6738173 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-4.html` |
| discussion-widget-5.html | 6738174 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-5.html` |
| discussion-widget-6.html | 6738177 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-6.html` |
| discussion-widget-7.html | 6738178 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-7.html` |
| discussion-widget-8.html | 6738180 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-8.html` |
| discussion-widget-9.html | 6738187 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-9.html` |
| discussion-widget-10.html | 6738188 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-10.html` |
| discussion-widget-11.html | 6738189 | `https://your-username.github.io/discussion-comment-feeds/discussion-widget-11.html` |

## How to Use

### Method 1: GitHub Pages (Recommended)

If you have GitHub Pages enabled, you can embed these widgets directly in Canvas using iframes:

```html
<iframe src="https://your-username.github.io/discussion-comment-feeds/discussion-widget-1.html" 
        width="100%" 
        height="400px" 
        frameborder="0"
        style="border: none;">
</iframe>
```

Replace `your-username` with your actual GitHub username and change the number to use different widgets.

### Method 2: Direct Link

You can also link directly to these files:
```
https://your-username.github.io/discussion-comment-feeds/discussion-widget-1.html
```

### Method 3: Local Testing

Open any of these files directly in a web browser to test the widget locally. The widget will attempt to fetch comments from the Replit backend server.

## Notes

- Each widget is configured to fetch comments from a different discussion board
- All widgets use the same Replit backend server for secure API access
- The widgets will automatically cycle through comments every 15 seconds
- Each widget is independent and can be embedded separately in different Canvas pages
