// Module Autentikasi
class AuthModule {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    // Login dengan NISN
    async loginWithNISN(nisn, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nisn, password })
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                this.token = data.token;
                this.user = data.user;
                return { success: true, user: data.user };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Logout
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.token = null;
        this.user = null;
    }

    // Cek autentikasi
    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    // Get token
    getToken() {
        return this.token;
    }

    // Get user
    getUser() {
        return this.user;
    }
}
