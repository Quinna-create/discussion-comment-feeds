# discussion-comment-feeds

A widget for displaying discussion comments synchronized with video playback, designed to be embedded in Canvas via HTTPS iframe.

## Quick Start

### GitHub Pages Deployment

The discussion widget is published via GitHub Pages and can be accessed at:

**https://Quinna-create.github.io/discussion-comment-feeds/discussion-widget.html**

#### Enabling GitHub Pages

To enable GitHub Pages for this repository (one-time setup):

1. Go to the repository **Settings** on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/docs`
4. Click **Save**
5. Wait a few minutes for the site to be published

Once enabled, the widget will be accessible at the URL above and can be embedded in Canvas or other platforms using an HTTPS iframe.

### Widget Features

The discussion widget (`discussion-widget.html`) includes:

- **Video Player**: Displays video content with a placeholder source (`YOUR_VIDEO_URL.mp4`) that should be updated
- **API Integration**: Fetches discussion comments from a configurable API endpoint
  - Default API: `https://c76efa4a-f1cb-493a-bbce-a2170f4456b4-00-2qw4tixq4jmr9.kirk.replit.dev`
- **Settings UI**: Allows users to configure:
  - API URL (stored in localStorage)
  - Cycle interval for refreshing comments (stored in localStorage)
- **HTTPS Support**: All external URLs use HTTPS for secure embedding

### Embedding in Canvas

Once GitHub Pages is enabled, embed the widget in Canvas using an iframe:

```html
<iframe src="https://Quinna-create.github.io/discussion-comment-feeds/discussion-widget.html" width="100%" height="600" frameborder="0"></iframe>
```

### Important Notes

- **CORS Requirements**: Ensure your API endpoint allows CORS requests from the GitHub Pages origin (`https://Quinna-create.github.io`)
- **Video Source**: Update the video source URL in the widget to point to your HTTPS video file
- **API Endpoint**: The default API endpoint can be changed in the widget's settings interface