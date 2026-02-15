// Developer Tools untuk Debugging dan Testing
class DeveloperTools {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createDevToolsPanel();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
    }

    createDevToolsPanel() {
        const panel = document.createElement('div');
        panel.id = 'devtools-panel';
        panel.className = 'devtools-panel hidden';
        panel.innerHTML = `
            <div class="devtools-header">
                <h3>🛠️ Developer Tools</h3>
                <button id="devtools-close" class="devtools-close">&times;</button>
            </div>
            
            <div class="devtools-tabs">
                <button class="devtools-tab-btn active" data-tab="console">Console</button>
                <button class="devtools-tab-btn" data-tab="storage">Storage</button>
                <button class="devtools-tab-btn" data-tab="api">API Tester</button>
                <button class="devtools-tab-btn" data-tab="info">Info</button>
            </div>

            <div class="devtools-content">
                <!-- Console Tab -->
                <div id="console-tab" class="devtools-tab active">
                    <div id="console-output" class="console-output"></div>
                    <input type="text" id="console-input" placeholder="Ketik perintah JS..." class="console-input">
                </div>

                <!-- Storage Tab -->
                <div id="storage-tab" class="devtools-tab">
                    <h4>localStorage</h4>
                    <div id="localStorage-view" class="storage-view"></div>
                    <button id="clear-storage" class="btn btn-danger">Hapus Semua</button>
                </div>

                <!-- API Tester Tab -->
                <div id="api-tab" class="devtools-tab">
                    <h4>Test API</h4>
                    <div class="api-tester">
                        <select id="api-method">
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>DELETE</option>
                        </select>
                        <input type="text" id="api-url" placeholder="URL API" class="api-input">
                        <textarea id="api-body" placeholder="Request Body (JSON)"></textarea>
                        <button id="api-send" class="btn btn-primary">Kirim</button>
                        <div id="api-response" class="api-response"></div>
                    </div>
                </div>

                <!-- Info Tab -->
                <div id="info-tab" class="devtools-tab">
                    <h4>Informasi Sistem</h4>
                    <div id="system-info" class="system-info"></div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        
        // Toggle button
        const toggleBtn = document.getElementById('devtools-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    }

    setupEventListeners() {
        const closeBtn = document.getElementById('devtools-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggle());
        }

        // Console input
        const consoleInput = document.getElementById('console-input');
        if (consoleInput) {
            consoleInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.executeConsoleCommand(e.target.value);
                    e.target.value = '';
                }
            });
        }

        // Storage
        const clearStorageBtn = document.getElementById('clear-storage');
        if (clearStorageBtn) {
            clearStorageBtn.addEventListener('click', () => {
                localStorage.clear();
                this.updateStorageView();
                this.log('✓ Semua data localStorage dihapus', 'success');
            });
        }

        // API Tester
        const apiSendBtn = document.getElementById('api-send');
        if (apiSendBtn) {
            apiSendBtn.addEventListener('click', () => this.testAPI());
        }

        // Tab switching
        document.querySelectorAll('.devtools-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.devtools-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.devtools-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(`${e.target.dataset.tab}-tab`).classList.add('active');
            });
        });

        // Initial views
        this.updateStorageView();
        this.updateSystemInfo();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+I untuk buka DevTools
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    toggle() {
        const panel = document.getElementById('devtools-panel');
        this.isOpen = !this.isOpen;
        panel.classList.toggle('hidden');
        if (this.isOpen) {
            this.log('DevTools dibuka', 'info');
        }
    }

    log(message, type = 'log') {
        const output = document.getElementById('console-output');
        if (!output) return;

        const logEntry = document.createElement('div');
        logEntry.className = `console-log console-${type}`;
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        output.appendChild(logEntry);
        output.scrollTop = output.scrollHeight;
    }

    executeConsoleCommand(command) {
        const output = document.getElementById('console-output');
        if (!output) return;

        // Log command
        const commandLog = document.createElement('div');
        commandLog.className = 'console-command';
        commandLog.textContent = `> ${command}`;
        output.appendChild(commandLog);

        try {
            const result = eval(command);
            this.log(`→ ${JSON.stringify(result)}`, 'result');
        } catch (error) {
            this.log(`✗ Error: ${error.message}`, 'error');
        }

        output.scrollTop = output.scrollHeight;
    }

    updateStorageView() {
        const storageView = document.getElementById('localStorage-view');
        if (!storageView) return;

        storageView.innerHTML = '';
        
        if (localStorage.length === 0) {
            storageView.innerHTML = '<p>localStorage kosong</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'storage-table';
        table.innerHTML = '<thead><tr><th>Key</th><th>Value</th></tr></thead>';

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            const row = table.insertRow();
            row.innerHTML = `
                <td>${key}</td>
                <td><pre>${JSON.stringify(JSON.parse(value), null, 2)}</pre></td>
            `;
        }

        storageView.appendChild(table);
    }

    async testAPI() {
        const method = document.getElementById('api-method').value;
        const url = document.getElementById('api-url').value;
        const body = document.getElementById('api-body').value;
        const responseDiv = document.getElementById('api-response');

        if (!url) {
            this.log('URL harus diisi', 'error');
            return;
        }

        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (body && method !== 'GET') {
                options.body = body;
            }

            const response = await fetch(url, options);
            const data = await response.json();

            responseDiv.innerHTML = `
                <div class="api-result success">
                    <strong>Status: ${response.status}</strong>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;

            this.log(`API Request berhasil: ${method} ${url}`, 'success');
        } catch (error) {
            responseDiv.innerHTML = `
                <div class="api-result error">
                    <strong>Error:</strong>
                    <pre>${error.message}</pre>
                </div>
            `;
            this.log(`API Request gagal: ${error.message}`, 'error');
        }
    }

    updateSystemInfo() {
        const infoDiv = document.getElementById('system-info');
        if (!infoDiv) return;

        const info = {
            'User Agent': navigator.userAgent,
            'Browser': navigator.appName,
            'Platform': navigator.platform,
            'Language': navigator.language,
            'Online': navigator.onLine ? 'Ya' : 'Tidak',
            'localStorage': `${localStorage.length} item(s)`,
            'Waktu Loading': performance.now().toFixed(2) + ' ms',
            'URL': window.location.href
        };

        infoDiv.innerHTML = Object.entries(info)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');
    }
}

// Inisialisasi DevTools saat halaman loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DeveloperTools();
    });
} else {
    new DeveloperTools();
}
