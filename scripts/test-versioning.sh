#!/bin/bash

# Test script for version management system
echo "🧪 Testing Version Management System"
echo "===================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test function
test_version() {
    local description="$1"
    local expected="$2"
    
    echo -e "\n${YELLOW}Testing: $description${NC}"
    
    # Get current versions
    PKG_VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
    PWA_VERSION=$(grep 'SW_VERSION = ' public/dashboard-pwa.js | sed 's/.*"\([^"]*\)".*/\1/')
    CACHE_VERSION=$(grep 'cacheName.*v[0-9]' next.config.js | head -1 | sed 's/.*v\([^"]*\)".*/\1/')
    
    echo "  Package.json: $PKG_VERSION"
    echo "  PWA Script:   $PWA_VERSION"
    echo "  Cache Names:  $CACHE_VERSION"
    
    # Check if all versions match
    if [[ "$PKG_VERSION" == "$PWA_VERSION" && "$PWA_VERSION" == "$CACHE_VERSION" ]]; then
        echo -e "  ${GREEN}✅ All versions synchronized!${NC}"
        return 0
    else
        echo -e "  ${RED}❌ Version mismatch detected!${NC}"
        return 1
    fi
}

# Show current state
echo -e "\n📊 Current Version State:"
test_version "Initial state check" ""

# Test version injection without increment
echo -e "\n🔄 Testing version injection..."
npm run version:inject > /dev/null 2>&1

test_version "After version injection" ""

# Test git tags
echo -e "\n🏷️  Git Tags:"
git tag --sort=-version:refname | head -5

# Test build process
echo -e "\n🏗️  Testing build process..."
if npm run build:clean > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
fi

echo -e "\n🎉 Version management system test completed!"

# Show available commands
echo -e "\n📋 Available Commands:"
echo "  npm run version         # Patch increment"
echo "  npm run version:minor   # Minor increment" 
echo "  npm run version:major   # Major increment"
echo "  npm run version:inject  # Inject without increment"
echo "  npm run build           # Build with version injection"
