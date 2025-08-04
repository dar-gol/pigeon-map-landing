// PWA Start URL Redirect Handler
// This script ensures PWA opens on the correct start_url

(function () {
  "use strict";

  // Check if app is running as PWA
  function isPWA() {
    return true;
    return (
      (window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true
    );
  }

  // Check if we need to redirect (only first time in session)
  function shouldRedirect() {
    const currentPath = window.location.pathname;

    // Don't redirect if already redirected in this session
    if (sessionStorage.getItem("pwa-redirected")) {
      return false;
    }

    // Don't redirect if already on login/register pages
    if (currentPath.includes("/login") || currentPath.includes("/register")) {
      return false;
    }

    // Redirect from root or locale paths
    const isRoot = currentPath === "/";
    const isLocale = currentPath.match(/^\/[a-z]{2}(\/.*)?$/);

    return isPWA() && (isRoot || isLocale);
  }

  // Perform redirect to login
  function redirectToLogin() {
    console.log("[PWA Redirect] Redirecting to login");
    sessionStorage.setItem("pwa-redirected", "true");
    window.location.href = "/login";
  }

  // Main logic - simple!
  if (shouldRedirect()) {
    redirectToLogin();
  }

  console.log("[PWA Redirect] Script loaded", {
    isPWA: isPWA(),
    currentPath: window.location.pathname,
    redirected: !!sessionStorage.getItem("pwa-redirected"),
  });
})();
