// auto-refresh.js - Auto refresh system for GitHub Pages
class AutoRefresh {
    constructor() {
        this.version = '1.0.0';
        this.lastUpdate = localStorage.getItem('lastUpdate') || Date.now();
        this.checkInterval = 30000; // 30 detik
        this.init();
    }

    init() {
        console.log(`🔄 AutoRefresh v${this.version} - Monitoring changes...`);
        
        // Check for updates every 30 seconds
        setInterval(() => this.checkForUpdates(), this.checkInterval);
        
        // Also check when page becomes visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) this.checkForUpdates();
        });

        // Store current version
        this.storeCurrentVersion();
    }

    storeCurrentVersion() {
        const currentVersion = {
            timestamp: Date.now(),
            version: this.version,
            page: window.location.pathname
        };
        localStorage.setItem('appVersion', JSON.stringify(currentVersion));
    }

    async checkForUpdates() {
        try {
            const response = await fetch(`/?t=${Date.now()}`);
            const html = await response.text();
            
            // Extract version from HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const versionMeta = doc.querySelector('meta[name="app-version"]');
            
            if (versionMeta) {
                const serverVersion = versionMeta.getAttribute('content');
                const localVersion = JSON.parse(localStorage.getItem('appVersion') || '{}');
                
                if (serverVersion !== localVersion.version) {
                    this.showUpdateNotification();
                }
            }
        } catch (error) {
            console.log('🔍 AutoRefresh: Checking for updates...');
        }
    }

    showUpdateNotification() {
        // Create update notification
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                cursor: pointer;
                animation: slideIn 0.5s ease;
                font-family: 'Segoe UI', sans-serif;
            ">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.2em;">🔄</span>
                    <div>
                        <strong>Update Tersedia!</strong>
                        <div style="font-size: 0.9em; opacity: 0.9;">Klik untuk refresh</div>
                    </div>
                </div>
            </div>
            <style>
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;
        
        notification.onclick = () => {
            localStorage.setItem('lastUpdate', Date.now());
            window.location.reload(true);
        };
        
        document.body.appendChild(notification);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }
}

// Initialize auto refresh
if (window.location.hostname.includes('github.io')) {
    document.addEventListener('DOMContentLoaded', () => {
        new AutoRefresh();
    });
}