#!/usr/bin/env node
/**
 * Automatic version management script
 * - Increments version in package.json (patch, minor, major)
 * - Injects version into dashboard-pwa.js
 * - Updates cache names in next.config.js
 */

const fs = require("fs");
const path = require("path");

// Color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function incrementVersion(currentVersion, type = "patch") {
  const parts = currentVersion.split(".").map(Number);

  switch (type) {
    case "major":
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case "minor":
      parts[1]++;
      parts[2] = 0;
      break;
    case "patch":
    default:
      parts[2]++;
      break;
  }

  return parts.join(".");
}

function updatePackageJson(versionType) {
  const packagePath = path.join(__dirname, "../package.json");

  if (!fs.existsSync(packagePath)) {
    log("❌ package.json not found!", "red");
    process.exit(1);
  }

  const packageContent = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const oldVersion = packageContent.version;
  const newVersion = incrementVersion(oldVersion, versionType);

  packageContent.version = newVersion;

  fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2) + "\n");

  log(`📦 Package version: ${oldVersion} → ${newVersion}`, "green");
  return newVersion;
}

function updateDashboardPWA(version) {
  const pwaPath = path.join(__dirname, "../public/dashboard-pwa.js");

  if (!fs.existsSync(pwaPath)) {
    log("❌ dashboard-pwa.js not found!", "red");
    return false;
  }

  let content = fs.readFileSync(pwaPath, "utf8");

  // Replace version line
  const versionRegex = /const SW_VERSION = "[^"]*";/;
  const newVersionLine = `const SW_VERSION = "${version}";`;

  if (versionRegex.test(content)) {
    content = content.replace(versionRegex, newVersionLine);
    fs.writeFileSync(pwaPath, content);
    log(`🔧 Updated dashboard-pwa.js version to ${version}`, "cyan");
    return true;
  } else {
    log("⚠️  SW_VERSION line not found in dashboard-pwa.js", "yellow");
    return false;
  }
}

function updateDashboardSW(version) {
  const swPath = path.join(__dirname, "../public/dashboard-sw.js");

  if (!fs.existsSync(swPath)) {
    log("❌ dashboard-sw.js not found!", "red");
    return false;
  }

  let content = fs.readFileSync(swPath, "utf8");

  // Add version comment at the top to force browser to see it as new file
  const versionComment = `// Version: ${version} - Updated: ${new Date().toISOString()}\n`;

  // Remove old version comment if exists
  content = content.replace(/^\/\/ Version:.*\n/, "");

  // Add new version comment at the top
  content = versionComment + content;

  fs.writeFileSync(swPath, content);
  log(`🔧 Updated dashboard-sw.js with version ${version}`, "cyan");
  return true;
}

function updateNextConfig(version) {
  const configPath = path.join(__dirname, "../next.config.js");

  if (!fs.existsSync(configPath)) {
    log("❌ next.config.js not found!", "red");
    return false;
  }

  let content = fs.readFileSync(configPath, "utf8");

  // Update cache names with version
  const cacheNameRegex = /cacheName: "([^"]+)"/g;
  let updated = false;

  content = content.replace(cacheNameRegex, (match, cacheName) => {
    // Remove existing version suffix
    const baseName = cacheName.replace(/-v[\d.]+$/, "");
    const newCacheName = `${baseName}-v${version}`;
    updated = true;
    return `cacheName: "${newCacheName}"`;
  });

  if (updated) {
    fs.writeFileSync(configPath, content);
    log(
      `⚙️  Updated next.config.js cache names with version ${version}`,
      "magenta"
    );
    return true;
  } else {
    log("⚠️  No cache names found to update in next.config.js", "yellow");
    return false;
  }
}

function createGitTag(version) {
  const { execSync } = require("child_process");

  try {
    // Check if git is available and we're in a git repo
    execSync("git status", { stdio: "ignore" });

    // Create tag
    execSync(`git tag -a v${version} -m "Release version ${version}"`, {
      stdio: "ignore",
    });
    log(`🏷️  Created git tag: v${version}`, "blue");

    // Show available tags
    const tags = execSync("git tag --sort=-version:refname", {
      encoding: "utf8",
    })
      .trim()
      .split("\n")
      .slice(0, 5);
    log(`📋 Recent tags: ${tags.join(", ")}`, "blue");

    return true;
  } catch (error) {
    log(`⚠️  Git tagging failed: ${error.message}`, "yellow");
    return false;
  }
}

function showUsage() {
  log("\n🚀 Version Management Script", "cyan");
  log("================================", "cyan");
  log("Usage: node version-manager.js [type]", "white");
  log("");
  log("Version types:", "yellow");
  log("  patch   - Increment patch version (1.2.3 → 1.2.4) [default]", "white");
  log("  minor   - Increment minor version (1.2.3 → 1.3.0)", "white");
  log("  major   - Increment major version (1.2.3 → 2.0.0)", "white");
  log("");
  log("Examples:", "yellow");
  log("  npm run version          # patch increment", "white");
  log("  npm run version:minor    # minor increment", "white");
  log("  npm run version:major    # major increment", "white");
  log("");
}

function main() {
  const args = process.argv.slice(2);
  const versionType = args[0] || "patch";

  if (args.includes("--help") || args.includes("-h")) {
    showUsage();
    return;
  }

  if (!["patch", "minor", "major"].includes(versionType)) {
    log(`❌ Invalid version type: ${versionType}`, "red");
    showUsage();
    process.exit(1);
  }

  log("\n🔄 Starting version update process...", "cyan");
  log("=====================================", "cyan");

  try {
    // 1. Update package.json version
    const newVersion = updatePackageJson(versionType);

    // 2. Update dashboard-pwa.js
    updateDashboardPWA(newVersion);

    // 3. Update dashboard-sw.js
    updateDashboardSW(newVersion);

    // 4. Update next.config.js cache names
    updateNextConfig(newVersion);

    // 5. Create git tag (optional)
    createGitTag(newVersion);

    log("\n✅ Version update completed successfully!", "green");
    log(`🎉 New version: ${newVersion}`, "green");

    log("\n📋 Next steps:", "yellow");
    log("1. Run: npm run build", "white");
    log("2. Test the PWA functionality", "white");
    log("3. Deploy: npm run deploy", "white");
    log("4. Push tags: git push origin --tags", "white");
  } catch (error) {
    log(`\n❌ Error during version update: ${error.message}`, "red");
    process.exit(1);
  }
}

// Export for testing
if (require.main === module) {
  main();
}

module.exports = {
  incrementVersion,
  updatePackageJson,
  updateDashboardPWA,
  updateDashboardSW,
  updateNextConfig,
};
