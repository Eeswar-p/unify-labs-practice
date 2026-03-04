// ============= DOM SELECTIONS =============
// Using both querySelector and getElementById to demonstrate selection methods

// Primary input for new tasks
const taskInput = document.getElementById('taskInput');

// Add button
const addBtn = document.getElementById('addBtn');

// Task list container
const taskList = document.getElementById('taskList');

// Empty state message
const emptyState = document.getElementById('emptyState');

// Filter buttons
const filterAllBtn = document.getElementById('filterAll');
const filterActiveBtn = document.getElementById('filterActive');
const filterCompletedBtn = document.getElementById('filterCompleted');
const clearCompletedBtn = document.getElementById('clearCompleted');

// Stats elements using querySelector (alternative selection method)
const totalCountEl = document.querySelector('#totalCount');
const completedCountEl = document.querySelector('#completedCount');
const remainingCountEl = document.querySelector('#remainingCount');
const progressPercentEl = document.querySelector('#progressPercent');

// ============= STATE & CONFIGURATION =============

let currentFilter = 'all'; // 'all', 'active', 'completed'

// ============= EVENT LISTENERS =============

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key in input field
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Focus input when page loads
document.addEventListener('DOMContentLoaded', () => {
    taskInput.focus();
    updateStats();
});

// Filter buttons
filterAllBtn.addEventListener('click', () => setFilter('all'));
filterActiveBtn.addEventListener('click', () => setFilter('active'));
filterCompletedBtn.addEventListener('click', () => setFilter('completed'));
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// Event delegation: Handle clicks on dynamically created task items
taskList.addEventListener('click', (e) => {
    // Click on task item to toggle completion
    if (e.target.classList.contains('task-content')) {
        const taskItem = e.target.closest('.task-item');
        toggleTaskCompletion(taskItem);
    }
    
    // Click on delete button
    if (e.target.classList.contains('btn-delete')) {
        e.stopPropagation(); // Prevent triggering parent click
        const taskItem = e.target.closest('.task-item');
        deleteTask(taskItem);
    }
});

// ============= MAIN FUNCTIONS =============

/**
 * Add a new task to the list
 * Demonstrates: createElement, appendChild, classList, addEventListener
 */
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Validation
    if (!taskText) {
        taskInput.focus();
        showValidationError();
        return;
    }
    
    if (taskText.length > 100) {
        alert('Task is too long! Keep it under 100 characters.');
        return;
    }
    
    // Create task item element
    const li = document.createElement('li');
    li.className = 'task-item';
    
    // Create task content span
    const span = document.createElement('span');
    span.className = 'task-content';
    span.textContent = taskText;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-delete';
    deleteBtn.innerHTML = '<span class="btn-icon">🗑️</span> Delete';
    
    // Append to task item
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    // Add task item to list using appendChild
    taskList.appendChild(li);
    
    // Clear input field
    taskInput.value = '';
    taskInput.focus();
    
    // Update UI
    updateStats();
    updateEmptyState();
    applyFilter();
    
    // Animation effect
    li.style.animation = 'slideIn 0.3s ease';
}

/**
 * Toggle task completion status
 * Demonstrates: classList.toggle, classList.contains
 */
function toggleTaskCompletion(taskItem) {
    taskItem.classList.toggle('completed');
    updateStats();
    applyFilter();
}

/**
 * Delete a task from the list
 * Demonstrates: remove() and removeChild()
 */
function deleteTask(taskItem) {
    taskItem.style.animation = 'slideIn 0.3s ease reverse';
    
    // Remove after animation (100ms delay)
    setTimeout(() => {
        taskItem.remove(); // Modern approach: remove()
        updateStats();
        updateEmptyState();
        applyFilter();
    }, 100);
}

/**
 * Clear all completed tasks
 */
function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll('.task-item.completed');
    
    if (completedTasks.length === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    completedTasks.forEach(task => {
        task.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => task.remove(), 100);
    });
    
    setTimeout(() => {
        updateStats();
        updateEmptyState();
        applyFilter();
    }, 150);
}

// ============= FILTER FUNCTIONALITY =============

/**
 * Set active filter
 * Demonstrates: classList operations and filter state management
 */
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active button using classList
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    if (filter === 'all') {
        filterAllBtn.classList.add('active');
    } else if (filter === 'active') {
        filterActiveBtn.classList.add('active');
    } else if (filter === 'completed') {
        filterCompletedBtn.classList.add('active');
    }
    
    applyFilter();
}

/**
 * Apply current filter to task list
 * Demonstrates: querySelectorAll, forEach, classList.contains, style manipulation
 */
function applyFilter() {
    const allTasks = document.querySelectorAll('.task-item');
    
    allTasks.forEach(task => {
        let shouldShow = false;
        const isCompleted = task.classList.contains('completed');
        
        if (currentFilter === 'all') {
            shouldShow = true;
        } else if (currentFilter === 'active') {
            shouldShow = !isCompleted;
        } else if (currentFilter === 'completed') {
            shouldShow = isCompleted;
        }
        
        // Show or hide task
        task.style.display = shouldShow ? 'flex' : 'none';
    });
}

// ============= STATISTICS & UI UPDATE =============

/**
 * Update task statistics
 * Demonstrates: querySelectorAll, textContent manipulation
 */
function updateStats() {
    const allTasks = document.querySelectorAll('.task-item');
    const completedTasks = document.querySelectorAll('.task-item.completed');
    
    const total = allTasks.length;
    const completed = completedTasks.length;
    const remaining = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    // Update stat displays using textContent
    totalCountEl.textContent = total;
    completedCountEl.textContent = completed;
    remainingCountEl.textContent = remaining;
    progressPercentEl.textContent = progress + '%';
}

/**
 * Show/hide empty state
 * Demonstrates: classList.toggle, querySelectorAll, length property
 */
function updateEmptyState() {
    const hasAnyTasks = document.querySelectorAll('.task-item').length > 0;
    
    if (hasAnyTasks) {
        emptyState.classList.add('hidden');
    } else {
        emptyState.classList.remove('hidden');
    }
}

/**
 * Show validation error effect
 */
function showValidationError() {
    taskInput.style.borderColor = 'var(--danger-color)';
    taskInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    setTimeout(() => {
        taskInput.style.borderColor = 'var(--border-color)';
        taskInput.style.boxShadow = '';
    }, 1500);
}

// ============= KEYBOARD SHORTCUTS =============

// Escape key to clear input
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        taskInput.value = '';
        taskInput.focus();
    }
});

// ============= EXAMPLE TASKS FOR DEMO =============

/**
 * Initialize with example tasks (uncomment to enable)
 * 
 * function initializeExamples() {
 *     const examples = [
 *         'Learn DOM manipulation',
 *         'Master querySelector',
 *         'Practice addEventListener',
 *         'Create dynamic elements',
 *         'Toggle CSS classes'
 *     ];
 *     
 *     examples.forEach((text, index) => {
 *         taskInput.value = text;
 *         addTask();
 *     });
 *     
 *     // Mark some as completed for demo
 *     const items = document.querySelectorAll('.task-item');
 *     if (items[0]) items[0].classList.add('completed');
 *     if (items[2]) items[2].classList.add('completed');
 *     
 *     updateStats();
 * }
 * 
 * // Uncomment to run on page load
 * // document.addEventListener('DOMContentLoaded', initializeExamples);
 */

// ============= DEBUGGING HELPERS =============

/**
 * Console methods for learning (open DevTools console)
 * Type these commands in the browser console to explore DOM manipulation
 * 
 * Helpful commands:
 * 
 * // Select elements
 * document.querySelector('#taskInput')
 * document.getElementById('taskList')
 * document.querySelectorAll('.task-item')
 * 
 * // Count tasks
 * document.querySelectorAll('.task-item').length
 * document.querySelectorAll('.task-item.completed').length
 * 
 * // Get all completed items
 * document.querySelectorAll('.task-item.completed')
 * 
 * // Add a class to all tasks
 * document.querySelectorAll('.task-item').forEach(item => {
 *     item.classList.add('highlight');
 * })
 * 
 * // Remove all tasks
 * document.querySelectorAll('.task-item').forEach(item => item.remove())
 */

// ============= PERSISTENCE NOTES =============

/**
 * ENHANCEMENT: Add localStorage for persistence
 * 
 * To save tasks to browser storage:
 * 
 * function saveTasks() {
 *     const tasks = [];
 *     document.querySelectorAll('.task-item').forEach(item => {
 *         tasks.push({
 *             text: item.querySelector('.task-content').textContent,
 *             completed: item.classList.contains('completed')
 *         });
 *     });
 *     localStorage.setItem('todoTasks', JSON.stringify(tasks));
 * }
 * 
 * function loadTasks() {
 *     const saved = localStorage.getItem('todoTasks');
 *     if (saved) {
 *         const tasks = JSON.parse(saved);
 *         tasks.forEach(task => {
 *             taskInput.value = task.text;
 *             addTask();
 *             if (task.completed) {
 *                 const lastTask = document.querySelectorAll('.task-item');
 *                 lastTask[lastTask.length - 1].classList.add('completed');
 *             }
 *         });
 *         updateStats();
 *     }
 * }
 */

console.log('🚀 To-Do List DOM Manipulation Ready!');
console.log('📝 Try entering a task in the input field above.');
console.log('💡 Open DevTools console to explore DOM methods.');
