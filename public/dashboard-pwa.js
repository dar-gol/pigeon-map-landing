// PWA initialization script
// This script registers the service worker on all pages but with dashboard scope

(function () {
  "use strict";

  const SW_VERSION = "0.2.2"; // Auto-updated by version-manager.js
  const DEBUG = !window.location.host.includes("digging.pl"); // Debug tylko lokalnie

  function log(message, ...args) {
    if (DEBUG) console.log(`[PWA v${SW_VERSION}]`, message, ...args);
  }

  // Check for service worker support
  if (!("serviceWorker" in navigator)) {
    log("Service Worker not supported");
    return;
  }

  // Register service worker
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/dashboard-sw.js", {
        scope: "/",
        updateViaCache: "none",
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
              console.log("[PWA] New service worker ready - forcing update");
              // Automatically skip waiting and take control
              newWorker.postMessage({ type: "SKIP_WAITING" });

              // Reload page after short delay
              setTimeout(() => {
                console.log("[PWA] Reloading page for service worker update");
                window.location.reload();
              }, 1000);
            }
          });
        });

        // Force immediate update check
        registration
          .update()
          .then(() => {
            console.log("[PWA] Manual update check completed");
          })
          .catch((error) => {
            console.log("[PWA] Update check failed:", error);
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
