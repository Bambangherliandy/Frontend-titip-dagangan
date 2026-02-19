export default function Navbar() {
  function handleLogout() {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  }
}
