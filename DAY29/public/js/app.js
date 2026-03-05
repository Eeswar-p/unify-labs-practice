/**
 * Main Blog Grid - Fetch and Display Posts
 */

// API endpoint
const API_URL = '/api/posts';

// DOM elements
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorText = document.getElementById('error-text');
const empty = document.getElementById('empty');
const postsGrid = document.getElementById('posts-grid');

/**
 * Fetch and display all blog posts
 */
async function fetchPosts() {
  try {
    showLoading();

    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch posts');
    }

    hideLoading();

    // Check if posts exist
    if (!data.data || data.data.length === 0) {
      showEmpty();
      return;
    }

    // Render posts
    renderPosts(data.data);
    showPosts();

  } catch (err) {
    console.error('Error fetching posts:', err);
    hideLoading();
    showError(err.message);
  }
}

/**
 * Render posts to the grid
 */
function renderPosts(posts) {
  postsGrid.innerHTML = posts.map(post => createPostCard(post)).join('');
}

/**
 * Create a single post card HTML
 */
function createPostCard(post) {
  const excerpt = getExcerpt(post.content, 150);
  const date = formatDate(post.createdAt);

  return `
    <article class="post-card" onclick="viewPost('${post._id}')">
      <div class="post-card-category">${escapeHtml(post.category)}</div>
      <h3 class="post-card-title">${escapeHtml(post.title)}</h3>
      <p class="post-card-excerpt">${escapeHtml(excerpt)}</p>
      <div class="post-card-meta">
        <span class="post-card-author">By ${escapeHtml(post.author)}</span>
        <span class="post-card-date">${date}</span>
      </div>
    </article>
  `;
}

/**
 * Navigate to single post view
 */
function viewPost(postId) {
  window.location.href = `/post.html?id=${postId}`;
}

/**
 * Get excerpt from content
 */
function getExcerpt(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
  empty.style.display = 'none';
  postsGrid.style.display = 'none';
}

function hideLoading() {
  loading.style.display = 'none';
}

function showError(message) {
  errorText.textContent = message;
  error.style.display = 'block';
}

function showEmpty() {
  empty.style.display = 'block';
}

function showPosts() {
  postsGrid.style.display = 'grid';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', fetchPosts);
