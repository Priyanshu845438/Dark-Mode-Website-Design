// Toast Notification System
class ToastManager {
    constructor() {
        this.container = null;
        this.toasts = new Map();
        this.init();
    }

    init() {
        // Create toast container if it doesn't exist
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    show(type, title, message, duration = 5000) {
        const toast = this.createToast(type, title, message, duration);
        this.container.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-dismiss (except for loading toasts)
        if (type !== 'loading' && duration > 0) {
            this.startProgressBar(toast, duration);
            setTimeout(() => {
                this.hide(toast);
            }, duration);
        }

        return toast;
    }

    createToast(type, title, message, duration) {
        const toastId = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="toastManager.hide(this.closest('.toast'))">
                <i class="fas fa-times"></i>
            </button>
            ${type !== 'loading' && duration > 0 ? '<div class="toast-progress"></div>' : ''}
        `;

        this.toasts.set(toastId, toast);
        return toast;
    }

    getIcon(type) {
        switch (type) {
            case 'success':
                return 'fas fa-check-circle';
            case 'error':
                return 'fas fa-exclamation-circle';
            case 'loading':
                return 'fas fa-spinner fa-spin';
            default:
                return 'fas fa-info-circle';
        }
    }

    startProgressBar(toast, duration) {
        const progressBar = toast.querySelector('.toast-progress');
        if (progressBar) {
            progressBar.style.width = '100%';
            progressBar.style.transition = `width ${duration}ms linear`;
            requestAnimationFrame(() => {
                progressBar.style.width = '0%';
            });
        }
    }

    hide(toast) {
        if (toast && toast.parentElement) {
            toast.classList.remove('show');
            toast.classList.add('hide');
            
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                    this.toasts.delete(toast.id);
                }
            }, 400);
        }
    }

    hideAll() {
        this.toasts.forEach(toast => {
            this.hide(toast);
        });
    }

    // Convenience methods
    success(title, message, duration = 5000) {
        return this.show('success', title, message, duration);
    }

    error(title, message, duration = 7000) {
        return this.show('error', title, message, duration);
    }

    loading(title, message) {
        return this.show('loading', title, message, 0);
    }

    // Update existing toast (useful for loading -> success/error transitions)
    update(toast, type, title, message, duration = 5000) {
        if (!toast) return;

        const icon = toast.querySelector('.toast-icon i');
        const titleEl = toast.querySelector('.toast-title');
        const messageEl = toast.querySelector('.toast-message');
        
        // Update content
        icon.className = this.getIcon(type);
        titleEl.textContent = title;
        messageEl.textContent = message;
        
        // Update toast class
        toast.className = `toast ${type} show`;
        
        // Handle progress bar for non-loading toasts
        if (type !== 'loading' && duration > 0) {
            let progressBar = toast.querySelector('.toast-progress');
            if (!progressBar) {
                progressBar = document.createElement('div');
                progressBar.className = 'toast-progress';
                toast.appendChild(progressBar);
            }
            
            this.startProgressBar(toast, duration);
            setTimeout(() => {
                this.hide(toast);
            }, duration);
        } else {
            // Remove progress bar for loading toasts
            const progressBar = toast.querySelector('.toast-progress');
            if (progressBar) {
                progressBar.remove();
            }
        }
    }
}

// Make ToastManager available globally
window.ToastManager = ToastManager;

// Initialize toast manager immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.toastManager = new ToastManager();
        console.log('✓ Toast manager initialized on DOM ready');
    });
} else {
    window.toastManager = new ToastManager();
    console.log('✓ Toast manager initialized immediately');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ToastManager;
}