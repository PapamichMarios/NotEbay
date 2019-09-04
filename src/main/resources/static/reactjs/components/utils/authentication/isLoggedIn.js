export default function isAuthenticated() {
    return localStorage.getItem('loggedIn') === 'true';
}