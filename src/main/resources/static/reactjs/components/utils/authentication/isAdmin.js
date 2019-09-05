export default function isAuthenticated() {
    return localStorage.getItem('isAdmin') === 'true';
}