# Replit Backend Setup

This directory contains a sample backend server that acts as a secure proxy between the Discussion Comment Feed Widget and Canvas LMS.

## Why Use a Backend?

**Security**: Canvas API tokens stay on the server and are never exposed in the browser. This prevents token theft and unauthorized access to your Canvas account.

**Benefits**:
- Tokens stored securely in environment variables
- Can implement rate limiting and caching
- Better control over data transformation
- Can add authentication if needed

## Quick Setup on Replit

### 1. Create a New Repl

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Choose "Node.js" template
4. Name it (e.g., "canvas-discussion-proxy")

### 2. Install Dependencies

In the Replit shell, run:
```bash
npm install express cors node-fetch
```

### 3. Create `index.js`

```javascript
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // Enable CORS for widget access

// Configuration from environment variables
const CANVAS_URL = process.env.CANVAS_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const COURSE_ID = process.env.COURSE_ID;
const DISCUSSION_ID = process.env.DISCUSSION_ID;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Canvas Discussion Proxy is running' });
});

// Main endpoint to fetch discussion comments
app.get('/', async (req, res) => {
  try {
    // Get courseId and discussionId from query parameters (sent by widget)
    // Fall back to environment variables if not provided
    const courseId = req.query.courseId || COURSE_ID;
    const discussionId = req.query.discussionId || DISCUSSION_ID;
    
    // Validate configuration
    if (!CANVAS_URL || !ACCESS_TOKEN) {
      return res.status(500).json({ 
        error: 'Server configuration incomplete. Check environment variables.' 
      });
    }
    
    if (!courseId || !discussionId) {
      return res.status(400).json({ 
        error: 'courseId and discussionId are required as query parameters or environment variables.' 
      });
    }

    // Fetch from Canvas API
    const apiUrl = `${CANVAS_URL}/api/v1/courses/${courseId}/discussion_topics/${discussionId}/entries`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Canvas API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    // Flatten nested replies
    const flattenComments = (entries) => {
      let allComments = [];
      for (const entry of entries) {
        allComments.push({
          text: entry.message,
          author: entry.user_name || 'Anonymous',
          timestamp: entry.created_at,
          id: entry.id
        });
        
        if (entry.replies && entry.replies.length > 0) {
          allComments = allComments.concat(flattenComments(entry.replies));
        }
      }
      return allComments;
    };
    
    const comments = flattenComments(data);
    
    // Sort by creation date (oldest first)
    comments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    res.json(comments);
    
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ 
      error: 'Failed to fetch comments from Canvas',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Canvas Discussion Proxy running on port ${PORT}`);
  console.log(`Canvas URL: ${CANVAS_URL}`);
  console.log(`Course ID: ${COURSE_ID}`);
  console.log(`Discussion ID: ${DISCUSSION_ID}`);
});
```

### 4. Set Environment Variables

In your Replit project, go to "Secrets" (lock icon in sidebar) and add:

| Key | Value | Example |
|-----|-------|---------|
| `CANVAS_URL` | Your Canvas instance URL | `https://canvas.instructure.com` |
| `ACCESS_TOKEN` | Your Canvas API token | `1234~abcdef...` |
| `COURSE_ID` | Canvas course ID | `12345` |
| `DISCUSSION_ID` | Discussion topic ID | `67890` |

### 5. Run the Server

Click "Run" in Replit. Your server will start and you'll see:
```
Canvas Discussion Proxy running on port 3000
```

### 6. Get Your Replit URL

Once running, Replit will show your app's URL (e.g., `https://canvas-discussion-proxy.username.repl.co`).

### 7. Update Widget Configuration

In your widget HTML, update the configuration:

```javascript
window.discussionWidgetConfig = {
    replitApiUrl: 'https://your-repl-url.username.repl.co',
    courseId: 'YOUR_COURSE_ID',      // Required: Canvas course ID
    discussionId: 'YOUR_DISCUSSION_ID', // Required: Discussion topic ID
    cycleInterval: 15000,
    maxComments: 50
};
```

## Testing Your Backend

### Test in Browser

Open your Replit URL in a browser. You should see JSON data with comments:

```json
[
  {
    "text": "Great discussion!",
    "author": "Student Name",
    "timestamp": "2024-01-15T10:30:00Z",
    "id": 12345
  }
]
```

### Test with curl

```bash
curl https://your-repl-url.username.repl.co
```

## Troubleshooting

### "Server configuration incomplete"

- Check that all environment variables are set in Replit Secrets
- Restart the Repl after adding secrets

### "Failed to fetch comments from Canvas"

- Verify your Canvas URL is correct
- Check that your access token is valid
- Ensure the course ID and discussion ID are correct
- Verify the discussion exists and has comments

### CORS Errors in Browser

- Make sure `app.use(cors())` is in your `index.js`
- Restart the Repl after making changes

### Widget Shows "Loading comments..." Forever

- Check browser console for errors
- Verify the Replit URL in widget config is correct
- Test the Replit URL directly in browser to confirm it works

## Keeping Replit Running

Free Replit projects sleep after inactivity. Options:

1. **Upgrade to Replit Hacker plan** - Always-on projects
2. **Use UptimeRobot** - Ping your Repl every 5 minutes to keep it awake
3. **Self-host** - Deploy to Heroku, Railway, or other hosting service

## Alternative: Deploy to Other Platforms

You can also deploy this backend to:
- **Heroku** - Easy deployment, free tier available
- **Railway** - Modern hosting, simple setup
- **Vercel** - Serverless functions
- **Your own server** - Full control

Just copy the `index.js` code and set the same environment variables.

## Security Best Practices

1. **Never commit tokens** - Always use environment variables
2. **Use read-only tokens** - Create Canvas tokens with minimal permissions
3. **Rotate regularly** - Change your Canvas token every few months
4. **Add rate limiting** - Prevent abuse with express-rate-limit
5. **Add caching** - Reduce Canvas API calls with node-cache

## Support

For issues with:
- **Widget**: See main README.md
- **Canvas integration**: Check Canvas API documentation
- **Replit setup**: Visit Replit documentation
