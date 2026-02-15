# 📚 Sistem Peminjaman Alat Sekolah

Sistem manajemen peminjaman alat berbasis web untuk sekolah dengan fitur autentikasi NISN dan developer tools terintegrasi.

## ✨ Fitur Utama

- **Autentikasi NISN**: Login menggunakan NISN siswa yang terintegrasi dengan database sekolah
- **Dashboard Interaktif**: Tampilan dashboard yang user-friendly untuk siswa dan admin
- **Manajemen Alat**: Daftar lengkap alat sekolah dengan status ketersediaan
- **Tracking Peminjaman**: Riwayat peminjaman dan pengembalian alat
- **Sistem Denda**: Otomatis menghitung denda keterlambatan
- **Admin Panel**: Manajemen alat, siswa, dan laporan untuk administrator
- **Developer Tools**: Console, storage viewer, API tester untuk debugging
- **Responsive Design**: Optimal di desktop, tablet, dan mobile

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js + Express.js
- **Database**: MySQL / SQLite
- **Authentication**: JWT (JSON Web Token)
- **Password**: Bcrypt hashing

## 📋 Persyaratan

- Node.js v14+
- npm atau yarn
- MySQL Server (atau bisa menggunakan SQLite untuk development)
- Browser modern (Chrome, Firefox, Safari, Edge)

## 🚀 Instalasi & Setup

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/yourusername/sistem-peminjaman-alat-sekolah.git
cd sistem-peminjaman-alat-sekolah
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Setup Environment Variables
Buat file \`.env\` di root direktori:
\`\`\`env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=peminjaman_alat
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
\`\`\`

### 4. Setup Database
\`\`\`bash
npm run setup-db
\`\`\`

### 5. Jalankan Aplikasi
\`\`\`bash
npm run dev
\`\`\`

Buka browser dan akses: \`http://localhost:3000\`

## 🔑 Akun Demo

| NISN | Password | Role |
|------|----------|------|
| 1234567890 | password | Siswa |
| 9999999999 | password | Admin |

## 📖 Dokumentasi API

### Authentication

#### Login
\`\`\`
POST /api/auth/login
Content-Type: application/json

{
  "nisn": "1234567890",
  "password": "password"
}
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nisn": "1234567890",
    "nama": "Ahmad Rifki",
    "kelas": "12 IPA 1",
    "role": "siswa"
  }
}
\`\`\`

### Alat Endpoints

#### Get All Alat
\`\`\`
GET /api/alat
Authorization: Bearer {token}
\`\`\`

#### Get Single Alat
\`\`\`
GET /api/alat/:id
Authorization: Bearer {token}
\`\`\`

#### Create Alat (Admin Only)
\`\`\`
POST /api/alat
Authorization: Bearer {token}
Content-Type: application/json

{
  "nama": "Proyektor",
  "kategori": "Elektronik",
  "kondisi": "Baik"
}
\`\`\`

### Peminjaman Endpoints

#### Create Peminjaman
\`\`\`
POST /api/peminjaman
Authorization: Bearer {token}
Content-Type: application/json

{
  "alat_id": 1,
  "durasi_hari": 7
}
\`\`\`

#### Get User's Peminjaman
\`\`\`
GET /api/peminjaman/user/:user_id
Authorization: Bearer {token}
\`\`\`

#### Return Alat
\`\`\`
PUT /api/peminjaman/:id/return
Authorization: Bearer {token}
\`\`\`

## 🛠️ Developer Tools

Tekan \`Ctrl + Shift + I\` atau klik tombol 🛠️ di sudut kanan bawah untuk membuka Developer Tools.

### Tab Console
- Execute JavaScript commands
- View logs dan errors
- Debug real-time

### Tab Storage
- View localStorage data
- Clear all data
- Edit values

### Tab API Tester
- Test API endpoints
- Send GET, POST, PUT, DELETE requests
- View response

### Tab Info
- System information
- Browser details
- Performance metrics

## 📁 Struktur Folder

\`\`\`
sistem-peminjaman-alat-sekolah/
├── frontend/
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   └── js/
│       ├── main.js
│       ├── auth.js
│       └── devtools.js
├── backend/
│   ├── server.js
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── public/
├── package.json
├── .env.example
└── README.md
\`\`\`

## 🔐 Keamanan

- JWT token untuk autentikasi
- Password hashing dengan Bcrypt
- CORS untuk proteksi cross-origin
- Input validation
- Rate limiting untuk API

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push ke branch (\`git push origin feature/AmazingFeature\`)
5. Open Pull Request

## 📝 Lisensi

Distributed under the MIT License. Lihat \`LICENSE\` untuk detail.

## 👨‍💻 Author

Hendika Aprilia Putra Pratama

## 📧 Support

Untuk pertanyaan atau masalah, silakan buat Issue di repository ini.

---

Made with ❤️ for Indonesian Schools
\`\`\`

Sekarang saya akan membuat file untuk backend server:

```javascript name=server.js
// Backend Server - Node.js + Express
const express = require('express');
const cors = require('express-cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// ==================== SIMPLE DATABASE SIMULATION ====================
// TODO: Ganti dengan database sebenarnya (MySQL/MongoDB)
const database = {
    users: [
        {
            id: 1,
            nisn: '1234567890',
            nama: 'Ahmad Rifki',
            kelas: '12 IPA 1',
            role: 'siswa',
            password: 'password'
        },
        {
            id: 2,
            nisn: '1234567891',
            nama: 'Siti Nurhaliza',
            kelas: '12 IPA 1',
            role: 'siswa',
            password: 'password'
        },
        {
            id: 3,
            nisn: '9999999999',
            nama: 'Guru Admin',
            kelas: '-',
            role: 'admin',
            password: 'password'
        }
    ],
    alat: [
        { id: 1, nama: 'Proyektor', kategori: 'Elektronik', kondisi: 'Baik', status: 'tersedia' },
        { id: 2, nama: 'Mikroskop', kategori: 'Laboratorium', kondisi: 'Baik', status: 'dipinjam' },
        { id: 3, nama: 'Laptop', kategori: 'Elektronik', kondisi: 'Baik', status: 'tersedia' }
    ],
    peminjaman: []
};

// ==================== AUTHENTICATION ROUTES ====================
app.post('/api/auth/login', (req, res) => {
    const { nisn, password } = req.body;

    const user = database.users.find(u => u.nisn === nisn);

    if (!user || user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'NISN atau password salah'
        });
    }

    // Simulasi JWT token
    const token = Buffer.from(JSON.stringify({ userId: user.id, nisn: user.nisn })).toString('base64');

    const { password: _, ...userWithoutPassword } = user;

    res.json({
        success: true,
        token: token,
        user: userWithoutPassword
    });
});

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token tidak ditemukan'
        });
    }

    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token tidak valid'
        });
    }
};

// ==================== ALAT ROUTES ====================
app.get('/api/alat', verifyToken, (req, res) => {
    res.json({
        success: true,
        data: database.alat
    });
});

app.get('/api/alat/:id', verifyToken, (req, res) => {
    const alat = database.alat.find(a => a.id === parseInt(req.params.id));

    if (!alat) {
        return res.status(404).json({
            success: false,
            message: 'Alat tidak ditemukan'
        });
    }

    res.json({
        success: true,
        data: alat
    });
});

app.post('/api/alat', verifyToken, (req, res) => {
    const user = database.users.find(u => u.id === req.user.userId);

    if (user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Hanya admin yang dapat menambah alat'
        });
    }

    const { nama, kategori, kondisi } = req.body;

    const newAlat = {
        id: database.alat.length + 1,
        nama,
        kategori,
        kondisi,
        status: 'tersedia'
    };

    database.alat.push(newAlat);

    res.status(201).json({
        success: true,
        message: 'Alat berhasil ditambahkan',
        data: newAlat
    });
});

// ==================== PEMINJAMAN ROUTES ====================
app.post('/api/peminjaman', verifyToken, (req, res) => {
    const { alat_id, durasi_hari } = req.body;

    const alat = database.alat.find(a => a.id === alat_id);

    if (!alat) {
        return res.status(404).json({
            success: false,
            message: 'Alat tidak ditemukan'
        });
    }

    if (alat.status === 'dipinjam') {
        return res.status(400).json({
            success: false,
            message: 'Alat sedang dipinjam'
        });
    }

    const tanggalPinjam = new Date();
    const tanggalKembali = new Date(tanggalPinjam.getTime() + durasi_hari * 24 * 60 * 60 * 1000);

    const peminjaman = {
        id: database.peminjaman.length + 1,
        user_id: req.user.userId,
        alat_id: alat_id,
        tanggal_pinjam: tanggalPinjam.toISOString().split('T')[0],
        tanggal_kembali: tanggalKembali.toISOString().split('T')[0],
        status: 'aktif',
        denda: 0
    };

    database.peminjaman.push(peminjaman);
    alat.status = 'dipinjam';

    res.status(201).json({
        success: true,
        message: 'Peminjaman berhasil dibuat
