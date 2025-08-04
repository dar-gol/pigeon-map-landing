// PWA initialization script
// This script registers the service worker on all pages but with dashboard scope

(function () {
  "use strict";

  // Check for service worker support
  if (!("serviceWorker" in navigator)) {
    console.log("[PWA] Service Worker not supported");
    return;
  }

  // Register service worker
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/dashboard-sw.js", {
        scope: "/",
      })
      .then(function (registration) {
        console.log(
          "[PWA] Service Worker registered successfully:",
          registration
        );

        // Check for updates
        registration.addEventListener("updatefound", function () {
          console.log("[PWA] New service worker version found");
          const newWorker = registration.installing;

          newWorker.addEventListener("statechange", function () {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("[PWA] New service worker ready");
              // Optionally show notification to user about update
            }
          });
        });
      })
      .catch(function (error) {
        console.log("[PWA] Service Worker registration failed:", error);
      });
  });

  // Listen for service worker messages
  navigator.serviceWorker.addEventListener("message", function (event) {
    console.log("[PWA] Message from service worker:", event.data);
  });

  // Add to home screen functionality
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", function (e) {
    console.log("[PWA] Install prompt available");
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Show install button if you have one
    if (window.showInstallButton) {
      window.showInstallButton();
    }
  });

  // Function to trigger install prompt (can be called from dashboard app)
  window.installPWA = function () {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choiceResult) {
        console.log("[PWA] User choice:", choiceResult.outcome);
        deferredPrompt = null;
      });
    }
  };

  // Check if app is running in standalone mode
  window.isPWAInstalled = function () {
    return (
      window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches
    );
  };

  console.log("[PWA] Dashboard PWA script loaded");
})();
