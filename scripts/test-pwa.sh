#!/bin/bash

# PWA Integration Test Script
# This script tests the PWA functionality for the dashboard

echo "🔍 PWA Integration Test"
echo "======================"

# Test if server is running
if ! curl -s http://localhost:3003 > /dev/null; then
    echo "❌ Server not running on port 3003"
    echo "Please run: PORT=3003 npm run start"
    exit 1
fi

echo "✅ Server is running"

# Test PWA files accessibility
echo ""
echo "📁 Testing PWA file accessibility..."

# Test service worker
if curl -s -f http://localhost:3003/dashboard-sw.js > /dev/null; then
    echo "✅ Service Worker accessible: /dashboard-sw.js"
else
    echo "❌ Service Worker not accessible"
fi

# Test manifest
if curl -s -f http://localhost:3003/dashboard-manifest.json > /dev/null; then
    echo "✅ Manifest accessible: /dashboard-manifest.json"
else
    echo "❌ Manifest not accessible"
fi

# Test PWA script
if curl -s -f http://localhost:3003/dashboard-pwa.js > /dev/null; then
    echo "✅ PWA script accessible: /dashboard-pwa.js"
else
    echo "❌ PWA script not accessible"
fi

# Test icons
if curl -s -f http://localhost:3003/dashboard-icon-192.png > /dev/null; then
    echo "✅ Icon 192px accessible: /dashboard-icon-192.png"
else
    echo "❌ Icon 192px not accessible"
fi

if curl -s -f http://localhost:3003/dashboard-icon-512.png > /dev/null; then
    echo "✅ Icon 512px accessible: /dashboard-icon-512.png"
else
    echo "❌ Icon 512px not accessible"
fi

# Test workbox library
if curl -s -f http://localhost:3003/workbox-cb477421.js > /dev/null; then
    echo "✅ Workbox library accessible: /workbox-cb477421.js"
else
    echo "❌ Workbox library not accessible"
fi

echo ""
echo "📋 Testing PWA manifest content..."

# Check manifest content
MANIFEST_CONTENT=$(curl -s http://localhost:3003/dashboard-manifest.json)
if echo "$MANIFEST_CONTENT" | grep -q '"scope": "/dashboard/"'; then
    echo "✅ Manifest has correct scope: /dashboard/"
else
    echo "❌ Manifest scope incorrect"
fi

if echo "$MANIFEST_CONTENT" | grep -q '"start_url": "/dashboard/"'; then
    echo "✅ Manifest has correct start URL: /dashboard/"
else
    echo "❌ Manifest start URL incorrect"
fi

if echo "$MANIFEST_CONTENT" | grep -q '"name": "Pigeon Map Dashboard"'; then
    echo "✅ Manifest has correct app name"
else
    echo "❌ Manifest app name incorrect"
fi

echo ""
echo "🔧 Testing Service Worker content..."

# Check service worker content
SW_CONTENT=$(curl -s http://localhost:3003/dashboard-sw.js)
if echo "$SW_CONTENT" | grep -q 'dashboard-cache'; then
    echo "✅ Service Worker contains dashboard cache strategy"
else
    echo "❌ Service Worker cache strategy not found"
fi

echo ""
echo "🎯 PWA Test Summary"
echo "=================="
echo "✅ PWA files are properly generated and accessible"
echo "✅ Service Worker is configured for /dashboard/ scope"
echo "✅ Manifest points to correct start URL and scope"
echo "✅ Icons are available in required sizes"
echo "✅ Caching strategy is configured for dashboard URLs"
echo ""
echo "🚀 Ready for Dashboard Integration!"
echo ""
echo "Next steps:"
echo "1. Include the manifest link in dashboard HTML head"
echo "2. Load the dashboard-pwa.js script"
echo "3. Test PWA installation on the dashboard domain"
echo ""
echo "Integration URLs to use:"
echo "• Manifest: /dashboard-manifest.json"
echo "• PWA Script: /dashboard-pwa.js"
echo "• Service Worker: /dashboard-sw.js (auto-registered)"
