/**
 * Discussion Comment Feed Widget
 * Cycles through Canvas discussion board comments
 */

class DiscussionWidget {
    constructor(config = {}) {
        // Configuration
        this.config = {
            canvasUrl: config.canvasUrl || '',
            accessToken: config.accessToken || '',
            courseId: config.courseId || '',
            discussionId: config.discussionId || '',
            cycleInterval: config.cycleInterval || 15000, // milliseconds
            maxComments: config.maxComments || 50,
            mockData: config.mockData || false, // For testing without Canvas API
            replitApiUrl: config.replitApiUrl || '' // Replit proxy API URL (alternative to direct Canvas access)
        };

        // State
        this.comments = [];
        this.currentIndex = 0;
        this.isPaused = false;
        this.intervalId = null;

        // DOM elements
        this.elements = {
            commentContent: document.getElementById('commentContent'),
            authorName: document.getElementById('authorName'),
            commentDate: document.getElementById('commentDate'),
            currentIndex: document.getElementById('currentIndex'),
            totalComments: document.getElementById('totalComments'),
            pauseBtn: document.getElementById('pauseBtn'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            cycleInterval: document.getElementById('cycleInterval')
        };

        this.init();
    }

    async init() {
        // No longer need to setup event listeners for buttons
        await this.loadComments();
        if (this.comments.length > 0) {
            this.displayComment(0);
            this.startCycling();
        }
    }

    setupEventListeners() {
        // Removed button event listeners since we no longer have visible controls
        // The widget now auto-cycles without user intervention
    }

    async loadComments() {
        try {
            if (this.config.mockData) {
                // Load mock data for testing
                console.log('Widget configured to use mock data');
                this.comments = this.generateMockComments();
            } else if (this.config.replitApiUrl) {
                // Load from Replit proxy API (preferred method)
                console.log('Attempting to fetch from Replit API:', this.config.replitApiUrl);
                console.log('Course ID:', this.config.courseId, 'Discussion ID:', this.config.discussionId);
                try {
                    this.comments = await this.fetchFromReplitAPI();
                    console.log('Successfully loaded', this.comments.length, 'comments from Replit API');
                    if (this.comments.length === 0) {
                        console.warn('API returned 0 comments. Check if the discussion has any posts.');
                    }
                } catch (apiError) {
                    console.error('❌ Replit API Error:', apiError.message);
                    console.error('Failed to fetch from:', this.config.replitApiUrl);
                    console.error('Troubleshooting steps:');
                    console.error('  1. Verify the Replit backend URL is correct and accessible');
                    console.error('  2. Check that the backend server is running');
                    console.error('  3. Ensure CORS is enabled on the backend');
                    console.error('  4. Test the URL directly in your browser');
                    this.comments = this.generateMockComments();
                    this.showInfo('⚠️ Backend unavailable - showing demo data. Check console for details.');
                }
            } else {
                // Fallback: Load directly from Canvas API
                console.log('Attempting to fetch directly from Canvas API');
                this.comments = await this.fetchCanvasComments();
                console.log('Successfully loaded', this.comments.length, 'comments from Canvas API');
            }
            
            this.elements.totalComments.textContent = this.comments.length;
            
        } catch (error) {
            console.error('❌ Error loading comments:', error);
            console.error('All data sources failed. Troubleshooting:');
            console.error('  - If using Replit API: verify the backend is running and accessible');
            console.error('  - If using Canvas API: check your Canvas URL, access token, and IDs');
            console.error('  - For testing: set mockData: true in configuration');
            // Final fallback to mock data
            this.comments = this.generateMockComments();
            this.elements.totalComments.textContent = this.comments.length;
            this.showInfo('⚠️ Configuration error - showing demo data. Check console for details.');
        }
    }

    async fetchCanvasComments() {
        const { canvasUrl, accessToken, courseId, discussionId, maxComments } = this.config;

        if (!canvasUrl || !accessToken || !courseId || !discussionId) {
            throw new Error('Missing required Canvas configuration');
        }

        const url = `${canvasUrl}/api/v1/courses/${courseId}/discussion_topics/${discussionId}/entries`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Canvas API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Flatten nested replies and format comments
        const allComments = this.flattenComments(data);
        
        // Sort by creation date (oldest first for chronological order)
        allComments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        
        // Limit number of comments
        return allComments.slice(0, maxComments);
    }

    async fetchFromReplitAPI() {
        const { replitApiUrl, courseId, discussionId, maxComments } = this.config;

        if (!replitApiUrl) {
            throw new Error('Replit API URL not configured');
        }

        if (!courseId || !discussionId) {
            throw new Error('courseId and discussionId are required when using Replit API');
        }

        try {
            // Build URL with query parameters
            const url = new URL(replitApiUrl);
            url.searchParams.append('courseId', courseId);
            url.searchParams.append('discussionId', discussionId);

            console.log('Fetching from URL:', url.toString());

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Unable to read error response');
                throw new Error(`Replit API returned ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('API response received:', data);
            
            // Handle different response formats from Replit API
            let comments = [];
            
            if (Array.isArray(data)) {
                comments = data;
            } else if (data.comments && Array.isArray(data.comments)) {
                comments = data.comments;
            } else if (data.data && Array.isArray(data.data)) {
                comments = data.data;
            } else if (data.error) {
                throw new Error(`Backend error: ${data.error}`);
            } else {
                throw new Error('Unexpected API response format. Expected an array or object with comments/data property.');
            }

            // Normalize comment format
            const normalizedComments = comments.map(comment => ({
                message: comment.text || comment.message || comment.comment || '',
                author: comment.author || comment.username || comment.user_name || 'Anonymous',
                created_at: comment.timestamp || comment.created_at || new Date().toISOString(),
                id: comment.id || Math.random().toString(36)
            }));

            // Sort by creation date (oldest first for chronological order)
            normalizedComments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            
            // Limit number of comments
            return normalizedComments.slice(0, maxComments);
        } catch (error) {
            // Provide more specific error messages
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                throw new Error('Network error: Cannot reach backend server. The URL may be incorrect or the server may be down.');
            } else if (error.message.includes('Invalid URL')) {
                throw new Error('Invalid Replit API URL format. Please check the configuration.');
            }
            throw error;
        }
    }

    flattenComments(entries, parentAuthor = null) {
        let allComments = [];
        
        for (const entry of entries) {
            // Add main comment
            allComments.push({
                message: entry.message,
                author: entry.user_name || entry.user?.display_name || 'Anonymous',
                created_at: entry.created_at,
                id: entry.id
            });
            
            // Add replies recursively
            if (entry.replies && entry.replies.length > 0) {
                allComments = allComments.concat(
                    this.flattenComments(entry.replies, entry.user_name)
                );
            }
        }
        
        return allComments;
    }

    generateMockComments() {
        // Mock data for testing
        return [
            {
                message: "This lecture really helped me understand the concept of asynchronous programming. The examples were clear and practical.",
                author: "Sarah Johnson",
                created_at: "2024-01-15T10:30:00Z"
            },
            {
                message: "I appreciate how the instructor broke down complex topics into manageable pieces. Looking forward to applying these concepts in my project.",
                author: "Michael Chen",
                created_at: "2024-01-15T14:20:00Z"
            },
            {
                message: "The callback examples in the video made so much sense! I finally understand why we need promises.",
                author: "Emily Rodriguez",
                created_at: "2024-01-16T09:15:00Z"
            },
            {
                message: "Great explanation of the event loop. The visualization really helped clarify how JavaScript handles asynchronous operations.",
                author: "James Wilson",
                created_at: "2024-01-16T16:45:00Z"
            },
            {
                message: "I had to pause and rewatch the section on async/await several times, but now it clicks! Thanks for the thorough explanation.",
                author: "Lisa Anderson",
                created_at: "2024-01-17T11:00:00Z"
            },
            {
                message: "The real-world examples of API calls were extremely helpful. I can see how this applies to my web development work.",
                author: "David Park",
                created_at: "2024-01-17T13:30:00Z"
            },
            {
                message: "This video answered all my questions about error handling in asynchronous code. Very comprehensive coverage.",
                author: "Rachel Green",
                created_at: "2024-01-18T08:20:00Z"
            },
            {
                message: "The comparison between callbacks, promises, and async/await was exactly what I needed. Each approach makes sense now.",
                author: "Tom Martinez",
                created_at: "2024-01-18T15:10:00Z"
            }
        ];
    }

    displayComment(index) {
        if (index < 0 || index >= this.comments.length) {
            return;
        }

        this.currentIndex = index;
        const comment = this.comments[index];

        // Strip HTML tags for security and clean display
        const cleanMessage = this.stripHtml(comment.message);
        
        // Get the bubble element for animation
        const bubble = document.querySelector('.comment-bubble');
        
        // Update DOM with fade effect
        this.elements.commentContent.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.commentContent.innerHTML = cleanMessage;
            this.elements.authorName.textContent = comment.author;
            this.elements.commentDate.textContent = this.formatDate(comment.created_at);
            this.elements.currentIndex.textContent = index + 1;
            this.elements.commentContent.style.opacity = '1';
            
            // Add pulsing animation to bubble
            if (bubble) {
                bubble.classList.remove('pulse-animation');
                // Trigger reflow to restart animation
                void bubble.offsetWidth;
                bubble.classList.add('pulse-animation');
            }
        }, 200);
    }

    stripHtml(html) {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    startCycling() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
            if (!this.isPaused) {
                this.showNext();
            }
        }, this.config.cycleInterval);
    }

    stopCycling() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    togglePause() {
        // Method kept for backward compatibility but no longer used
        this.isPaused = !this.isPaused;
    }

    showNext() {
        const nextIndex = (this.currentIndex + 1) % this.comments.length;
        this.displayComment(nextIndex);
    }

    showPrevious() {
        // Method kept for backward compatibility but no longer used
        const prevIndex = (this.currentIndex - 1 + this.comments.length) % this.comments.length;
        this.displayComment(prevIndex);
    }

    updateCycleInterval(milliseconds) {
        // Method kept for backward compatibility but no longer used
        this.config.cycleInterval = milliseconds;
        if (!this.isPaused) {
            this.startCycling();
        }
    }

    showError(message) {
        this.elements.commentContent.innerHTML = `
            <div class="error" style="color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 4px; margin: 10px 0;">
                <strong>Error:</strong> ${message}
                <br><br>
                <small style="color: #666;">
                    <strong>Troubleshooting:</strong><br>
                    • Ensure the Replit backend server is running<br>
                    • Check that the API URL is correct<br>
                    • Verify CORS is enabled on the backend<br>
                    • Try using mock data for testing (set mockData: true in config)
                </small>
            </div>
        `;
    }

    showInfo(message) {
        // Display an informational banner without blocking the widget
        const infoBanner = document.createElement('div');
        infoBanner.className = 'info-banner';
        infoBanner.style.cssText = 'color: #856404; background: #fff3cd; border: 2px solid #ffc107; padding: 12px 15px; border-radius: 6px; margin-bottom: 15px; font-size: 14px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        infoBanner.innerHTML = `${message}`;
        
        // Insert at the top of the widget container
        const widgetContainer = document.querySelector('.widget-container');
        const existingBanner = widgetContainer.querySelector('.info-banner');
        if (existingBanner) {
            existingBanner.remove();
        }
        widgetContainer.insertBefore(infoBanner, widgetContainer.firstChild);
        
        // Log to console as well
        console.warn(message);
    }
}

// Initialize widget when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if configuration is provided via window object
    const config = window.discussionWidgetConfig || { mockData: true };
    
    // Initialize the widget
    window.discussionWidget = new DiscussionWidget(config);
});
