/**
 * Single Post View - Display, Edit, Delete
 */

// API endpoint
const API_URL = '/api/posts';

// DOM elements
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorText = document.getElementById('error-text');
const postContent = document.getElementById('post-content');
const postCategory = document.getElementById('post-category');
const postTitle = document.getElementById('post-title');
const postAuthor = document.getElementById('post-author');
const postDate = document.getElementById('post-date');
const postBody = document.getElementById('post-body');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');

// Get post ID from URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

/**
 * Fetch and display single post
 */
async function fetchPost() {
  if (!postId) {
    showError('No post ID provided');
    return;
  }

  try {
    showLoading();

    const response = await fetch(`${API_URL}?id=${postId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch post');
    }

    hideLoading();
    renderPost(data.data);
    showPost();

  } catch (err) {
    console.error('Error fetching post:', err);
    hideLoading();
    showError(err.message);
  }
}

/**
 * Render post content
 */
function renderPost(post) {
  postCategory.textContent = post.category;
  postTitle.textContent = post.title;
  postAuthor.textContent = `By ${post.author}`;
  postDate.textContent = formatDate(post.createdAt);
  
  // Convert newlines to paragraphs
  const paragraphs = post.content.split('\n').filter(p => p.trim());
  postBody.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');

  // Set up action buttons
  editBtn.addEventListener('click', () => editPost(post._id));
  deleteBtn.addEventListener('click', () => deletePost(post._id));
}

/**
 * Navigate to editor for editing
 */
function editPost(id) {
  window.location.href = `/editor.html?id=${id}`;
}

/**
 * Delete post with confirmation
 */
async function deletePost(id) {
  if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    return;
  }

  try {
    deleteBtn.disabled = true;
    deleteBtn.innerHTML = '<span class="spinner"></span> Deleting...';

    const response = await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete post');
    }

    // Redirect to home after successful deletion
    alert('Post deleted successfully!');
    window.location.href = '/';

  } catch (err) {
    console.error('Error deleting post:', err);
    alert('Error deleting post: ' + err.message);
    deleteBtn.disabled = false;
    deleteBtn.innerHTML = '<span class="btn-icon">🗑️</span> Delete Post';
  }
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * UI State Management
 */
function showLoading() {
  loading.style.display = 'block';
  error.style.display = 'none';
  postContent.style.display = 'none';
}

function hideLoading() {
  loading.style.display = 'none';
}

function showError(message) {
  errorText.textContent = message;
  error.style.display = 'block';
}

function showPost() {
  postContent.style.display = 'block';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', fetchPost);
