/**
 * Editor - Create and Update Posts
 */

// API endpoint
const API_URL = '/api/posts';

// Get post ID from URL (for editing)
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const isEditMode = !!postId;

// DOM elements
const editorTitle = document.getElementById('editor-title');
const postForm = document.getElementById('post-form');
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const authorInput = document.getElementById('author');
const contentInput = document.getElementById('content');
const charCount = document.getElementById('char-count');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const cancelBtn = document.getElementById('cancel-btn');
const formLoading = document.getElementById('form-loading');

/**
 * Initialize editor
 */
async function initEditor() {
  if (isEditMode) {
    editorTitle.textContent = 'Edit Post';
    submitText.textContent = 'Update Post';
    await loadPost();
  }

  // Character counter
  contentInput.addEventListener('input', updateCharCount);
  updateCharCount();

  // Form submission
  postForm.addEventListener('submit', handleSubmit);

  // Cancel button
  cancelBtn.addEventListener('click', () => {
    if (confirm('Discard changes?')) {
      window.location.href = isEditMode ? `/post.html?id=${postId}` : '/';
    }
  });
}

/**
 * Load post data for editing
 */
async function loadPost() {
  try {
    const response = await fetch(`${API_URL}?id=${postId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to load post');
    }

    const post = data.data;
    titleInput.value = post.title;
    categoryInput.value = post.category;
    authorInput.value = post.author;
    contentInput.value = post.content;
    updateCharCount();

  } catch (err) {
    console.error('Error loading post:', err);
    alert('Error loading post: ' + err.message);
    window.location.href = '/';
  }
}

/**
 * Handle form submission
 */
async function handleSubmit(e) {
  e.preventDefault();

  // Validation
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title) {
    alert('Please enter a title');
    titleInput.focus();
    return;
  }

  if (content.length < 50) {
    alert('Content must be at least 50 characters');
    contentInput.focus();
    return;
  }

  // Prepare data
  const postData = {
    title,
    category: categoryInput.value,
    author: authorInput.value.trim() || 'Anonymous',
    content
  };

  try {
    showLoading();

    const url = isEditMode ? `${API_URL}?id=${postId}` : API_URL;
    const method = isEditMode ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to save post');
    }

    // Success - redirect to post view
    const savedPostId = data.data._id;
    alert(isEditMode ? 'Post updated successfully!' : 'Post created successfully!');
    window.location.href = `/post.html?id=${savedPostId}`;

  } catch (err) {
    console.error('Error saving post:', err);
    hideLoading();
    alert('Error saving post: ' + err.message);
  }
}

/**
 * Update character counter
 */
function updateCharCount() {
  const count = contentInput.value.length;
  charCount.textContent = count.toLocaleString();
  
  // Visual feedback
  if (count < 50) {
    charCount.style.color = 'var(--danger)';
  } else {
    charCount.style.color = 'var(--text-tertiary)';
  }
}

/**
 * UI State Management
 */
function showLoading() {
  formLoading.style.display = 'block';
  submitBtn.disabled = true;
  cancelBtn.disabled = true;
  titleInput.disabled = true;
  categoryInput.disabled = true;
  authorInput.disabled = true;
  contentInput.disabled = true;
}

function hideLoading() {
  formLoading.style.display = 'none';
  submitBtn.disabled = false;
  cancelBtn.disabled = false;
  titleInput.disabled = false;
  categoryInput.disabled = false;
  authorInput.disabled = false;
  contentInput.disabled = false;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initEditor);
