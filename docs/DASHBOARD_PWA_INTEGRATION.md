# Dashboard PWA Integration Guide

## ✅ PWA Implementation Status: COMPLETE

The PWA functionality has been successfully implemented and tested. All required files are generated automatically during the build process and ready for integration.

## Overview
This document explains how to integrate PWA (Progressive Web App) functionality with the external dashboard application. The landing page domain now serves PWA files specifically scoped for the `/dashboard/` path using `next-pwa`.

## Generated Files

After running `npm run build`, the following PWA files are automatically generated:

### Service Worker
- **URL**: `/dashboard-sw.js`
- **Scope**: `/dashboard/`
- **Features**:
  - Precaches all Next.js application assets
  - Network-first strategy for dashboard URLs with 10s timeout
  - 24-hour cache expiration
  - Maximum 50 cache entries

### Web App Manifest
- **URL**: `/dashboard-manifest.json`
- **Configuration**:
  - App name: "Pigeon Map Dashboard"
  - Start URL: `/dashboard/`
  - Scope: `/dashboard/`
  - Display: standalone
  - Theme color: #3b82f6 (blue)
  - Background color: #ffffff (white)

### PWA Initialization Script
- **URL**: `/dashboard-pwa.js`
- **Features**:
  - Automatic service worker registration
  - Install prompt handling
  - Update notifications
  - Standalone mode detection

### Icons
- `/dashboard-icon-192.png` (192x192px)
- `/dashboard-icon-512.png` (512x512px)

## Integration Steps

### 1. Include PWA Files in Dashboard HTML

Add these elements to the `<head>` section of your dashboard application:

```html
<!-- Web App Manifest -->
<link rel="manifest" href="/dashboard-manifest.json">

<!-- PWA Meta Tags -->
<meta name="theme-color" content="#3b82f6">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Dashboard">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" href="/dashboard-icon-192.png">
<link rel="apple-touch-icon" sizes="192x192" href="/dashboard-icon-192.png">
<link rel="apple-touch-icon" sizes="512x512" href="/dashboard-icon-512.png">

<!-- PWA Initialization Script -->
<script src="/dashboard-pwa.js" defer></script>
```

### 2. Optional: Add Install Button

You can add an "Install App" button to your dashboard:

```html
<button id="install-button" style="display: none;">
  Install Dashboard App
</button>

<script>
// Show install button when PWA is installable
window.showInstallButton = function() {
  document.getElementById('install-button').style.display = 'block';
};

// Handle install button click
document.getElementById('install-button').addEventListener('click', function() {
  if (window.installPWA) {
    window.installPWA();
  }
});
</script>
```

### 3. Check PWA Status

You can check if the app is running as PWA:

```javascript
if (window.isPWAInstalled && window.isPWAInstalled()) {
  console.log('Running as installed PWA');
  // Hide install button, show PWA-specific UI
} else {
  console.log('Running in browser');
  // Show install button if available
}
```

### 3. Access PWA Instance
The auto-init script creates a global `dashboardPWA` instance:

```javascript
// Check if app is installed
if (window.dashboardPWA.isAppInstalled()) {
  console.log('Running as installed PWA');
}

// Cache pigeon data for offline use
await window.dashboardPWA.cachePigeonData(pigeonData);

// Retrieve cached data when offline
const cachedData = await window.dashboardPWA.getCachedPigeonData();

// Check network status
const isOnline = window.dashboardPWA.getNetworkStatus();
```

## Features Included

### ✅ Offline Functionality
- Caches critical dashboard resources
- Provides offline fallbacks
- Manages cache lifecycle automatically

### ✅ App Installation
- Shows install prompt when available
- Handles app installation events
- Supports "Add to Home Screen"

### ✅ Background Sync
- Syncs data when connection is restored
- Handles offline form submissions
- Queues actions for later execution

### ✅ Push Notifications
- Ready for push notification setup
- Handles notification clicks
- Manages notification permissions

### ✅ Network Status
- Shows online/offline indicators
- Handles network changes gracefully
- Provides visual feedback to users

### ✅ Update Management
- Detects service worker updates
- Shows update notifications
- Handles seamless updates

## Customization

### Modify Manifest
Edit `/public/dashboard/manifest.json` or the API endpoint at `/src/app/dashboard/manifest/route.ts` to customize:

- App name and description
- Theme colors
- App shortcuts
- File handlers
- Share targets

### Extend Service Worker
The service worker code is in `/src/app/dashboard/sw.js/route.ts`. You can add:

- Custom caching strategies
- API request interception
- Background processing
- Custom notification handling

### Customize PWA Features
The initialization script at `/public/dashboard/pwa-init.js` can be modified to:

- Change install button styling
- Add custom offline indicators
- Implement app-specific caching
- Handle dashboard-specific events

## Testing

### 1. Local Testing
```bash
# Serve the built application
npm run build
npm run start

# Test PWA features
# - Open Chrome DevTools → Application → Service Workers
# - Check "Offline" to test offline functionality
# - Use "Add to Home Screen" to test installation
```

### 2. PWA Audit
```bash
# Use Lighthouse to audit PWA compliance
npx lighthouse http://localhost:3000/dashboard --view
```

### 3. Service Worker Testing
```javascript
// Test service worker in browser console
navigator.serviceWorker.getRegistrations().then(console.log);

// Test cache
caches.keys().then(console.log);

// Test offline functionality
// - Go offline in DevTools
// - Navigate around dashboard
// - Check network requests
```

## Security Considerations

### Service Worker Scope
- Service worker is scoped to `/dashboard/` only
- Cannot access or cache landing page resources
- Isolated from main site functionality

### Content Security Policy
Ensure your dashboard's CSP allows:
```
script-src 'self' 'unsafe-inline';
connect-src 'self';
manifest-src 'self';
```

### HTTPS Requirement
- Service workers require HTTPS in production
- Use `localhost` for development testing
- Ensure SSL certificates are properly configured

## Performance Optimization

### Cache Strategy
The service worker uses a "Cache First" strategy for:
- Static assets (images, icons)
- App shell resources
- Previously visited pages

And "Network First" for:
- API data
- Dynamic content
- User-specific data

### Resource Hints
Add these to your dashboard HTML for better performance:
```html
<link rel="preload" href="/dashboard/sw.js" as="script">
<link rel="preload" href="/assets/logo192.png" as="image">
<link rel="dns-prefetch" href="//api.pigeon-map.digging.pl">
```

## Troubleshooting

### Common Issues

1. **Service Worker Not Registering**
   - Check browser console for errors
   - Verify HTTPS is used (except localhost)
   - Ensure correct file paths

2. **Manifest Not Loading**
   - Verify Content-Type is `application/manifest+json`
   - Check for JSON syntax errors
   - Ensure proper CORS headers

3. **Install Prompt Not Showing**
   - Check PWA criteria in Chrome DevTools
   - Verify manifest is valid
   - Ensure service worker is registered

4. **Caching Issues**
   - Clear browser cache and data
   - Update service worker version
   - Check cache names in DevTools

### Debug Commands
```javascript
// Check service worker status
navigator.serviceWorker.getRegistrations()
  .then(regs => console.log('Registrations:', regs));

// Check cache contents
caches.keys()
  .then(names => console.log('Cache names:', names));

// Force service worker update
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(reg => reg.update()));
```

## Support

For issues or questions regarding PWA integration:
1. Check browser DevTools → Application tab
2. Review console errors
3. Test with Lighthouse PWA audit
4. Verify all endpoints are accessible

---

**Generated for Pigeon Map Dashboard PWA Integration**  
*Last updated: July 27, 2025*
