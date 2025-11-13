// Comment storage
let comments = [];

// Load comments from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadComments();
    renderComments();
});

// Handle form submission
document.getElementById('commentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const commentText = document.getElementById('commentText').value.trim();
    
    if (username && commentText) {
        addComment(username, commentText);
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('commentText').value = '';
    }
});

// Add a new comment
function addComment(username, text) {
    const comment = {
        id: Date.now(),
        username: username,
        text: text,
        timestamp: new Date().toISOString()
    };
    
    comments.unshift(comment); // Add to beginning of array
    saveComments();
    renderComments();
}

// Save comments to localStorage
function saveComments() {
    localStorage.setItem('discussionComments', JSON.stringify(comments));
}

// Load comments from localStorage
function loadComments() {
    const stored = localStorage.getItem('discussionComments');
    if (stored) {
        comments = JSON.parse(stored);
    }
}

// Render all comments
function renderComments() {
    const commentsList = document.getElementById('commentsList');
    
    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="empty-state">
                <p>No comments yet. Be the first to comment!</p>
            </div>
        `;
        return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${escapeHtml(comment.username)}</span>
                <span class="comment-timestamp">${formatTimestamp(comment.timestamp)}</span>
            </div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
        </div>
    `).join('');
}

// Format timestamp to readable format
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
