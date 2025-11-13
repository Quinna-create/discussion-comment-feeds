# Canvas API Format Update

## What Changed

The widget now fully supports the Replit backend API format that returns Canvas API-style responses with a `view` array.

## API Endpoint

The widget now automatically appends `/api/discussions` to the Replit API URL if it's not already present.

**Before:**
```
https://canvas-discuss-quinna2.replit.app?courseId=196700&discussionId=6735506
```

**Now (automatically constructed):**
```
https://canvas-discuss-quinna2.replit.app/api/discussions?courseId=196700&topicId=6735506
```

## Query Parameters

The widget now uses `topicId` instead of `discussionId` when calling the `/api/discussions` endpoint, but you can still use `discussionId` in the widget configuration - it will be automatically converted.

## Response Format

The widget now handles the Canvas API format with a `view` array:

```json
{
  "view": [
    {
      "id": 1,
      "message": "This is a comment",
      "user": {
        "display_name": "Student Name",
        "avatar_image_url": "https://example.com/avatar.jpg"
      },
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Widget Configuration

No changes needed to your existing configuration! The widget is backward compatible:

```javascript
window.discussionWidgetConfig = {
    replitApiUrl: 'https://canvas-discuss-quinna2.replit.app',
    courseId: '196700',
    discussionId: '6735506',  // Still works!
    cycleInterval: 15000,
    maxComments: 50
};
```

## Embed Code Example

You can now use the embed code suggested by Replit (see `embed-example.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Discussion Widget</title>
</head>
<body>
  <div id="canvas-discussion-widget"></div>
  
  <script>
    const API_URL = 'https://canvas-discuss-quinna2.replit.app/api/discussions';
    
    fetch(`${API_URL}?courseId=196700&topicId=6735506`)
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('canvas-discussion-widget');
        const posts = data.view || [];
        
        if (posts.length === 0) {
          container.innerHTML = '<p style="color: #6b7280;">No posts yet.</p>';
          return;
        }
        
        container.innerHTML = posts.map(post => `
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <div style="display: flex; gap: 12px;">
              <img src="${post.user.avatar_image_url || 'https://via.placeholder.com/32'}" 
                   alt="${post.user.display_name}" 
                   style="width: 32px; height: 32px; border-radius: 50%;">
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <strong>${post.user.display_name}</strong>
                  <small style="color: #6b7280;">${new Date(post.created_at).toLocaleDateString()}</small>
                </div>
                <div>${post.message}</div>
              </div>
            </div>
          </div>
        `).join('');
      })
      .catch(error => {
        console.error('Error loading discussion:', error);
        document.getElementById('canvas-discussion-widget').innerHTML = 
          '<p style="color: #ef4444;">Failed to load discussion posts.</p>';
      });
  </script>
</body>
</html>
```

## Backward Compatibility

The widget still supports all previous response formats:
- Simple arrays: `[{text: "...", author: "..."}]`
- Nested in `comments`: `{comments: [...]}`
- Nested in `data`: `{data: [...]}`
- **NEW:** Canvas API format with `view`: `{view: [...]}`

## Testing

To test with the new format, see:
- `test-canvas-api-format.html` - Tests Canvas API format with mock data
- `embed-example.html` - Shows the Replit-suggested embed code

Both files are included in the repository for reference.
