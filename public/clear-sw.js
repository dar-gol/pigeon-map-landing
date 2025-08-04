// Automatically clear any existing service workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    console.log("Found", registrations.length, "service worker registrations");

    for (let registration of registrations) {
      registration.unregister().then(function (success) {
        if (success) {
          console.log("Service Worker unregistered successfully");
        } else {
          console.log("Service Worker failed to unregister");
        }
      });
    }

    // Clear all caches
    if ("caches" in window) {
      caches.keys().then(function (names) {
        names.forEach(function (name) {
          caches.delete(name);
          console.log("Cache cleared:", name);
        });
      });
    }
  });
}

// Force reload after clearing
setTimeout(function () {
  if (window.location.hash !== "#cleared") {
    window.location.hash = "#cleared";
    window.location.reload(true);
  }
}, 1000);
