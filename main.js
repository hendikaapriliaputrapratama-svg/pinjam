// Aplikasi Utama Sistem Peminjaman Alat Sekolah
class SistemPeminjaman {
    constructor() {
        this.currentUser = null;
        this.alat = [];
        this.peminjaman = [];
        this.init();
    }

    init() {
        // Cek session saat aplikasi dimulai
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        } else {
            this.showLoginPage();
        }
    }

    showLoginPage() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="login-container">
                <div class="login-card">
                    <h1>📚 Sistem Peminjaman Alat</h1>
                    <p class="subtitle">Sekolah Kami</p>
                    
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="nisn">NISN</label>
                            <input 
                                type="text" 
                                id="nisn" 
                                placeholder="Masukkan NISN Anda"
                                pattern="[0-9]{10}"
                                required
                            >
                        </div>
                        
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Masukkan password"
                                required
                            >
                        </div>

                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>

                    <div id="loginMessage" class="message"></div>
                </div>
            </div>
        `;

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    async handleLogin() {
        const nisn = document.getElementById('nisn').value;
        const password = document.getElementById('password').value;
        const messageDiv = document.getElementById('loginMessage');

        try {
            // Validasi NISN format
            if (!/^\d{10}$/.test(nisn)) {
                throw new Error('NISN harus 10 digit angka');
            }

            // Simulasi API call ke backend
            const response = await this.authenticateUser(nisn, password);
            
            if (response.success) {
                this.currentUser = response.user;
                localStorage.setItem('user', JSON.stringify(response.user));
                messageDiv.className = 'message success';
                messageDiv.textContent = '✓ Login berhasil!';
                
                setTimeout(() => {
                    this.showDashboard();
                }, 1000);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            messageDiv.className = 'message error';
            messageDiv.textContent = '✗ ' + error.message;
        }
    }

    async authenticateUser(nisn, password) {
        // TODO: Ganti dengan API call ke backend
        // Simulasi data siswa terintegrasi sekolah
        const users = {
            '1234567890': { id: 1, nisn: '1234567890', nama: 'Ahmad Rifki', kelas: '12 IPA 1', role: 'siswa', password: 'password' },
            '1234567891': { id: 2, nisn: '1234567891', nama: 'Siti Nurhaliza', kelas: '12 IPA 1', role: 'siswa', password: 'password' },
            '9999999999': { id: 3, nisn: '9999999999', nama: 'Guru Admin', kelas: '-', role: 'admin', password: 'password' },
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                const user = users[nisn];
                if (user && user.password === password) {
                    const { password, ...userWithoutPassword } = user;
                    resolve({ success: true, user: userWithoutPassword });
                } else {
                    resolve({ success: false, message: 'NISN atau password salah' });
                }
            }, 500);
        });
    }

    showDashboard() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="dashboard">
                <nav class="navbar">
                    <div class="navbar-brand">
                        <h2>⚙️ Peminjaman Alat Sekolah</h2>
                    </div>
                    <div class="navbar-user">
                        <span>👤 ${this.currentUser.nama}</span>
                        <button id="logoutBtn" class="btn btn-secondary">Logout</button>
                    </div>
                </nav>

                <div class="container">
                    <div class="sidebar">
                        <ul class="menu">
                            <li><a href="#" data-page="dashboard" class="menu-item active">📊 Dashboard</a></li>
                            <li><a href="#" data-page="alat" class="menu-item">🔧 Daftar Alat</a></li>
                            <li><a href="#" data-page="peminjaman" class="menu-item">📋 Peminjaman Saya</a></li>
                            ${this.currentUser.role === 'admin' ? '<li><a href="#" data-page="admin" class="menu-item">👨‍💼 Manajemen Admin</a></li>' : ''}
                        </ul>
                    </div>

                    <div class="content">
                        <div id="content-area"></div>
                    </div>
                </div>
            </div>
        `;

        // Event listeners
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigatePage(e.target.dataset.page);
            });
        });

        // Load halaman default
        this.navigatePage('dashboard');
    }

    navigatePage(page) {
        const contentArea = document.getElementById('content-area');
        
        // Update active menu
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        switch(page) {
            case 'dashboard':
                this.showDashboardContent(contentArea);
                break;
            case 'alat':
                this.showAlatContent(contentArea);
                break;
            case 'peminjaman':
                this.showPeminjamanContent(contentArea);
                break;
            case 'admin':
                if (this.currentUser.role === 'admin') {
                    this.showAdminContent(contentArea);
                }
                break;
        }
    }

    showDashboardContent(container) {
        container.innerHTML = `
            <div class="dashboard-content">
                <h1>Selamat Datang, ${this.currentUser.nama}!</h1>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>📚 Total Alat</h3>
                        <p class="stat-number">15</p>
                    </div>
                    <div class="stat-card">
                        <h3>📤 Sedang Dipinjam</h3>
                        <p class="stat-number">3</p>
                    </div>
                    <div class="stat-card">
                        <h3>✅ Dikembalikan</h3>
                        <p class="stat-number">12</p>
                    </div>
                </div>

                <div class="recent-activities">
                    <h2>Aktivitas Terbaru</h2>
                    <ul>
                        <li>Peminjaman Proyektor - 2026-02-14 09:00</li>
                        <li>Pengembalian Mikroskop - 2026-02-13 14:30</li>
                        <li>Peminjaman Laptop - 2026-02-12 08:15</li>
                    </ul>
                </div>
            </div>
        `;
    }

    showAlatContent(container) {
        container.innerHTML = `
            <div class="alat-content">
                <div class="content-header">
                    <h1>📚 Daftar Alat Sekolah</h1>
                    ${this.currentUser.role === 'admin' ? '<button id="addAlatBtn" class="btn btn-primary">+ Tambah Alat</button>' : ''}
                </div>

                <div class="search-box">
                    <input type="text" id="searchAlat" placeholder="Cari alat...">
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Alat</th>
                            <th>Kategori</th>
                            <th>Kondisi</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Proyektor</td>
                            <td>Elektronik</td>
                            <td>✅ Baik</td>
                            <td><span class="badge badge-available">Tersedia</span></td>
                            <td><button class="btn btn-small">Pinjam</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Mikroskop</td>
                            <td>Laboratorium</td>
                            <td>✅ Baik</td>
                            <td><span class="badge badge-borrowed">Dipinjam</span></td>
                            <td><button class="btn btn-small" disabled>Pinjam</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Laptop</td>
                            <td>Elektronik</td>
                            <td>✅ Baik</td>
                            <td><span class="badge badge-available">Tersedia</span></td>
                            <td><button class="btn btn-small">Pinjam</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    showPeminjamanContent(container) {
        container.innerHTML = `
            <div class="peminjaman-content">
                <h1>📋 Riwayat Peminjaman Saya</h1>

                <div class="tabs">
                    <button class="tab-btn active" data-tab="active">Sedang Dipinjam</button>
                    <button class="tab-btn" data-tab="history">Riwayat</button>
                </div>

                <div id="active-tab" class="tab-content active">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Alat</th>
                                <th>Tanggal Pinjam</th>
                                <th>Batas Kembali</th>
                                <th>Denda</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Proyektor</td>
                                <td>2026-02-10</td>
                                <td>2026-02-17</td>
                                <td>Rp 0</td>
                                <td><button class="btn btn-success">Kembalikan</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="history-tab" class="tab-content">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Alat</th>
                                <th>Dipinjam</th>
                                <th>Dikembalikan</th>
                                <th>Denda</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mikroskop</td>
                                <td>2026-02-05</td>
                                <td>2026-02-09</td>
                                <td>Rp 0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Tab functionality
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(`${e.target.dataset.tab}-tab`).classList.add('active');
            });
        });
    }

    showAdminContent(container) {
        container.innerHTML = `
            <div class="admin-content">
                <h1>👨‍💼 Manajemen Administrator</h1>
                
                <div class="admin-tabs">
                    <button class="admin-tab-btn active" data-tab="manage-alat">Kelola Alat</button>
                    <button class="admin-tab-btn" data-tab="manage-users">Kelola Siswa</button>
                    <button class="admin-tab-btn" data-tab="reports">Laporan</button>
                </div>

                <div id="manage-alat" class="admin-tab-content active">
                    <h2>Kelola Daftar Alat</h2>
                    <button class="btn btn-primary">+ Tambah Alat Baru</button>
                    <!-- Tabel manajemen alat -->
                </div>

                <div id="manage-users" class="admin-tab-content">
                    <h2>Kelola Pengguna</h2>
                    <!-- Tabel manajemen pengguna -->
                </div>

                <div id="reports" class="admin-tab-content">
                    <h2>Laporan & Statistik</h2>
                    <!-- Laporan -->
                </div>
            </div>
        `;

        // Admin tab functionality
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.tab).classList.add('active');
            });
        });
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUser = null;
        this.showLoginPage();
    }
}

// Inisialisasi aplikasi
const app = new SistemPeminjaman();
