# API Reference

## DiscussionWidget Class

The main class that manages the comment feed widget.

### Constructor

```javascript
new DiscussionWidget(config)
```

**Parameters:**
- `config` (Object): Configuration options

**Config Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `canvasUrl` | string | `''` | Canvas instance URL |
| `accessToken` | string | `''` | Canvas API access token |
| `courseId` | string | `''` | Canvas course ID |
| `discussionId` | string | `''` | Discussion topic ID |
| `cycleInterval` | number | `15000` | Milliseconds between comments |
| `maxComments` | number | `50` | Maximum comments to load |
| `mockData` | boolean | `false` | Use mock data for testing |

### Methods

#### init()

Initializes the widget, loads comments, and starts cycling.

```javascript
await widget.init()
```

#### loadComments()

Loads comments from Canvas API or mock data.

```javascript
await widget.loadComments()
```

#### displayComment(index)

Displays a specific comment by index.

```javascript
widget.displayComment(0) // Display first comment
```

**Parameters:**
- `index` (number): Comment index (0-based)

#### togglePause()

Toggles pause/resume state.

```javascript
widget.togglePause()
```

#### showNext()

Displays the next comment in the cycle.

```javascript
widget.showNext()
```

#### showPrevious()

Displays the previous comment in the cycle.

```javascript
widget.showPrevious()
```

#### updateCycleInterval(milliseconds)

Updates the cycling interval.

```javascript
widget.updateCycleInterval(20000) // Change to 20 seconds
```

**Parameters:**
- `milliseconds` (number): New interval in milliseconds

#### startCycling()

Starts automatic comment cycling.

```javascript
widget.startCycling()
```

#### stopCycling()

Stops automatic comment cycling.

```javascript
widget.stopCycling()
```

## Canvas API Integration

### Endpoints Used

#### Get Discussion Entries

```
GET /api/v1/courses/:course_id/discussion_topics/:topic_id/entries
```

**Response Format:**
```json
[
  {
    "id": 123,
    "user_id": 456,
    "user_name": "Student Name",
    "message": "<p>Comment text</p>",
    "created_at": "2024-01-15T10:30:00Z",
    "replies": [...]
  }
]
```

### Authentication

Uses Bearer token authentication:

```javascript
headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
}
```

## Events

The widget doesn't currently emit custom events, but you can extend it to do so:

```javascript
// Example extension
class ExtendedWidget extends DiscussionWidget {
    displayComment(index) {
        super.displayComment(index);
        
        // Emit custom event
        window.dispatchEvent(new CustomEvent('commentChanged', {
            detail: { index, comment: this.comments[index] }
        }));
    }
}

// Listen for events
window.addEventListener('commentChanged', (e) => {
    console.log('Comment changed:', e.detail);
});
```

## Error Handling

Errors are logged to console and displayed in the widget:

```javascript
try {
    await widget.loadComments();
} catch (error) {
    console.error('Error loading comments:', error);
    // Widget displays error message
}
```

## DOM Structure

Required HTML elements (must have these IDs):

```html
<div id="discussion-widget">
    <div id="commentContent"></div>
    <span id="authorName"></span>
    <span id="commentDate"></span>
    <span id="currentIndex"></span>
    <span id="totalComments"></span>
    <button id="pauseBtn">
        <span id="pauseIcon"></span>
    </button>
    <button id="prevBtn"></button>
    <button id="nextBtn"></button>
    <input id="cycleInterval" type="number">
</div>
```

## Browser Compatibility

Requires modern browser features:
- ES6 classes
- Async/await
- Fetch API
- DOM manipulation methods

Supported browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Customization Examples

### Custom Comment Filter

```javascript
class FilteredWidget extends DiscussionWidget {
    async loadComments() {
        await super.loadComments();
        
        // Filter comments by length
        this.comments = this.comments.filter(
            comment => comment.message.length > 100
        );
    }
}
```

### Custom Display Format

```javascript
class CustomWidget extends DiscussionWidget {
    displayComment(index) {
        const comment = this.comments[index];
        
        // Custom formatting
        this.elements.commentContent.innerHTML = `
            <blockquote>${this.stripHtml(comment.message)}</blockquote>
        `;
        
        // Call parent for other updates
        super.displayComment(index);
    }
}
```

### Analytics Integration

```javascript
class AnalyticsWidget extends DiscussionWidget {
    displayComment(index) {
        super.displayComment(index);
        
        // Track comment views
        if (window.ga) {
            ga('send', 'event', 'Widget', 'CommentView', `Comment ${index}`);
        }
    }
}
```
