"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import CookieHelper from "@/lib/CookieHelper";

// Extend Navigator interface for iOS standalone detection
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export default function PWARedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log("[PWA Redirect] useEffect triggered with pathname:", pathname);

    // Wait for component to be fully mounted
    const timeoutId = setTimeout(() => {
      console.log("[PWA Redirect] Timeout executed, starting PWA check...");
      // Check if app is running as PWA
      function isPWA() {
        // Temporary: always return true for testing
        console.log("[PWA Redirect] isPWA check - returning true for testing");

        // Real PWA detection (commented out for testing):
        return (
          (window.matchMedia &&
            window.matchMedia("(display-mode: standalone)").matches) ||
          window.navigator.standalone === true
        );
      }

      // Check if user is logged in using CookieHelper
      function isLoggedIn() {
        const token = CookieHelper.token.get();
        return !!token && token.length > 0;
      }

      // Check if we need to redirect (only first time in session)
      function shouldRedirect() {
        // Don't redirect if already redirected in this session
        if (sessionStorage.getItem("pwa-redirected")) {
          console.log("[PWA Redirect] Already redirected in this session");
          return false;
        }

        // Don't redirect if already on login/register pages
        if (pathname.includes("/login") || pathname.includes("/register")) {
          console.log("[PWA Redirect] Already on auth page");
          return false;
        }

        // Don't redirect if user is already logged in
        if (isLoggedIn()) {
          console.log("[PWA Redirect] User is logged in");
          return true;
        }

        // Only redirect if running as PWA
        if (!isPWA()) {
          console.log("[PWA Redirect] Not running as PWA");
          return false;
        }

        // Redirect from root, locale, or dashboard paths when not authenticated
        const shouldRedirectFromPath =
          pathname === "/" ||
          pathname.match(/^\/[a-z]{2}(\/.*)?$/) ||
          pathname.startsWith("/dashboard/");

        console.log(
          "[PWA Redirect] Should redirect from path:",
          shouldRedirectFromPath
        );
        return shouldRedirectFromPath;
      }

      // Perform redirect
      function performRedirect() {
        console.log("[PWA Redirect] Redirecting to login from:", pathname);
        sessionStorage.setItem("pwa-redirected", "true");

        // Multiple attempts with increasing delays
        let attempts = 0;
        const maxAttempts = 3;

        const path = isLoggedIn() ? "/dashboard/map" : "/login";

        function attemptRedirect() {
          attempts++;
          console.log(`[PWA Redirect] Attempt ${attempts}/${maxAttempts}`);

          try {
            // Check if router is available and ready
            if (router && typeof router.replace === "function") {
              router.replace(path);
              console.log("[PWA Redirect] Router redirect initiated");
              return;
            }
          } catch (error) {
            console.log("[PWA Redirect] Router attempt failed:", error);
          }

          // If router failed and we haven't exceeded max attempts, try again
          if (attempts < maxAttempts) {
            setTimeout(attemptRedirect, attempts * 100);
          } else {
            // Final fallback
            console.log(
              "[PWA Redirect] All router attempts failed, using window.location"
            );
            window.location.replace(path);
          }
        }

        // Start with small delay
        setTimeout(attemptRedirect, 50);
      }

      // Main logic
      if (shouldRedirect()) {
        performRedirect();
      }

      console.log("[PWA Redirect] Component loaded", {
        isPWA: isPWA(),
        currentPath: pathname,
        redirected: !!sessionStorage.getItem("pwa-redirected"),
        isLoggedIn: isLoggedIn(),
        hasToken: !!CookieHelper.token.get(),
      });
    }, 50); // Small delay to ensure component is mounted

    return () => clearTimeout(timeoutId);
  }, [pathname, router]);

  // This component doesn't render anything
  return null;
}
