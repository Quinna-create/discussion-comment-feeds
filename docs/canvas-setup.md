# Canvas Setup Guide

This guide walks you through setting up the Discussion Comment Feed Widget in your Canvas course.

## Prerequisites

- Canvas LMS account with instructor or admin access
- A course with at least one discussion board
- Student comments on the discussion board

## Step 1: Create Canvas API Token

1. Log into Canvas
2. Click on **Account** in the left navigation
3. Click on **Settings**
4. Scroll down to **Approved Integrations**
5. Click **+ New Access Token**
6. Fill in the form:
   - **Purpose**: "Discussion Comment Widget"
   - **Expires**: Choose an expiration date (optional)
7. Click **Generate Token**
8. **Important**: Copy the token immediately - you won't be able to see it again!
9. Store the token securely (password manager recommended)

### Token Permissions

The widget needs read-only access to:
- Course information
- Discussion topics
- Discussion entries

Canvas tokens have full account access by default. For production use, consider creating a dedicated user with limited permissions.

## Step 2: Find Your Course and Discussion IDs

### Find Course ID

1. Navigate to your course in Canvas
2. Look at the URL in your browser
3. The course ID is the number after `/courses/`
   - Example: `https://canvas.instructure.com/courses/12345`
   - Course ID: `12345`

### Find Discussion ID

1. Open the discussion board you want to use
2. Look at the URL in your browser
3. The discussion ID is the number after `/discussion_topics/`
   - Example: `https://canvas.instructure.com/courses/12345/discussion_topics/67890`
   - Discussion ID: `67890`

## Step 3: Host the Widget Files

You have several options for hosting:

### Option A: GitHub Pages (Free)

1. Fork the repository or create a new GitHub repository
2. Upload `widget-style.css` and `widget-script.js`
3. Enable GitHub Pages in repository settings
4. Your files will be at: `https://yourusername.github.io/repository-name/`

### Option B: University Web Server

1. Upload files to your institution's web server
2. Note the public URL
3. Ensure CORS is enabled for Canvas domain

### Option C: Canvas File Storage

1. In Canvas, go to your course
2. Click **Files** in the left navigation
3. Upload `widget-style.css` and `widget-script.js`
4. Right-click each file → Properties → Copy URL
5. Use these URLs in your configuration

⚠️ **Note**: Canvas file URLs may change if files are moved. GitHub Pages or a dedicated server is more reliable.

## Step 4: Add Widget to Canvas Page

### Method 1: Direct Embed (Recommended)

1. In Canvas, navigate to the page where you want the widget
2. Click **Edit** on the page
3. Switch to **HTML Editor** (click the `</>` icon in the toolbar)
4. Add the configuration and widget HTML (see README.md for full code)

### Method 2: IFrame Embed

1. Create a complete HTML file with your configuration
2. Host it on a web server
3. In Canvas page HTML editor, add an iframe pointing to your hosted file

## Step 5: Test the Widget

1. Save the Canvas page and view it as a student would
2. Verify comments are loading correctly
3. Test the playback controls
4. Check on different devices

## Security Best Practices

⚠️ **Critical**: Never expose your access token publicly!

For production use:
1. Use server-side proxy to hide token
2. Create dedicated Canvas user with read-only access
3. Set token expiration dates
4. Rotate tokens regularly

## Support

If you encounter issues:
- Check browser console for JavaScript errors
- Verify Canvas API token and IDs are correct
- Review Canvas API documentation
- Open an issue on the GitHub repository
