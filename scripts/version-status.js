#!/usr/bin/env node
/**
 * Version status checker and monitor
 * Shows current version state across all files
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Color codes
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getPackageVersion() {
  const packagePath = path.join(__dirname, "package.json");
  if (!fs.existsSync(packagePath)) return "N/A";

  const packageContent = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  return packageContent.version;
}

function getPWAVersion() {
  const pwaPath = path.join(__dirname, "public/dashboard-pwa.js");
  if (!fs.existsSync(pwaPath)) return "N/A";

  const content = fs.readFileSync(pwaPath, "utf8");
  const match = content.match(/const SW_VERSION = "([^"]+)"/);
  return match ? match[1] : "N/A";
}

function getCacheVersions() {
  const configPath = path.join(__dirname, "next.config.js");
  if (!fs.existsSync(configPath)) return [];

  const content = fs.readFileSync(configPath, "utf8");
  const matches = content.match(/cacheName: "([^"]+)"/g);

  if (!matches) return [];

  return matches.map((match) => {
    const cacheName = match.match(/cacheName: "([^"]+)"/)[1];
    const versionMatch = cacheName.match(/-v([\d.]+)$/);
    return {
      cache: cacheName,
      version: versionMatch ? versionMatch[1] : "no-version",
    };
  });
}

function getGitInfo() {
  try {
    const currentBranch = execSync("git branch --show-current", {
      encoding: "utf8",
    }).trim();
    const lastCommit = execSync('git log -1 --format="%h %s"', {
      encoding: "utf8",
    }).trim();
    const tags = execSync("git tag --sort=-version:refname", {
      encoding: "utf8",
    })
      .trim()
      .split("\n")
      .slice(0, 3);

    return { currentBranch, lastCommit, tags };
  } catch (error) {
    return { currentBranch: "N/A", lastCommit: "N/A", tags: [] };
  }
}

function checkVersionConsistency() {
  const packageVersion = getPackageVersion();
  const pwaVersion = getPWAVersion();
  const cacheVersions = getCacheVersions();

  const allVersions = [
    packageVersion,
    pwaVersion,
    ...cacheVersions.map((c) => c.version),
  ];
  const uniqueVersions = [
    ...new Set(allVersions.filter((v) => v !== "N/A" && v !== "no-version")),
  ];

  return {
    isConsistent: uniqueVersions.length <= 1,
    versions: uniqueVersions,
    packageVersion,
    pwaVersion,
    cacheVersions,
  };
}

function showStatus() {
  log("\n🔍 Version Status Report", "cyan");
  log("========================", "cyan");

  const consistency = checkVersionConsistency();
  const gitInfo = getGitInfo();

  // Version consistency
  if (consistency.isConsistent) {
    log(`✅ All versions synchronized: ${consistency.packageVersion}`, "green");
  } else {
    log("❌ Version mismatch detected!", "red");
    log(`   Package.json: ${consistency.packageVersion}`, "yellow");
    log(`   PWA Script:   ${consistency.pwaVersion}`, "yellow");
    consistency.cacheVersions.forEach((cache) => {
      log(`   ${cache.cache}: ${cache.version}`, "yellow");
    });
  }

  // File details
  log("\n📁 File Versions:", "blue");
  log(`   📦 package.json:      ${consistency.packageVersion}`, "white");
  log(`   🔧 dashboard-pwa.js:  ${consistency.pwaVersion}`, "white");

  if (consistency.cacheVersions.length > 0) {
    log("   ⚙️  next.config.js caches:", "white");
    consistency.cacheVersions.forEach((cache) => {
      log(`      • ${cache.cache}`, "white");
    });
  }

  // Git information
  log("\n🌿 Git Information:", "magenta");
  log(`   Branch: ${gitInfo.currentBranch}`, "white");
  log(`   Last commit: ${gitInfo.lastCommit}`, "white");

  if (gitInfo.tags.length > 0) {
    log("   Recent tags:", "white");
    gitInfo.tags.forEach((tag) => {
      log(`      • ${tag}`, "white");
    });
  }

  // Build information
  const buildPath = path.join(__dirname, ".next");
  const hasBuild = fs.existsSync(buildPath);

  log("\n🏗️  Build Status:", "yellow");
  log(`   Build exists: ${hasBuild ? "✅ Yes" : "❌ No"}`, "white");

  if (hasBuild) {
    try {
      const buildStats = fs.statSync(buildPath);
      const buildAge = Math.round(
        (Date.now() - buildStats.mtime.getTime()) / (1000 * 60)
      );
      log(`   Last build: ${buildAge} minutes ago`, "white");
    } catch (error) {
      log("   Last build: Unknown", "white");
    }
  }

  // Recommendations
  log("\n💡 Recommendations:", "cyan");

  if (!consistency.isConsistent) {
    log("   🔄 Run: npm run version:inject", "yellow");
  }

  if (!hasBuild) {
    log("   🏗️  Run: npm run build", "yellow");
  }

  const currentVersion = consistency.packageVersion;
  if (currentVersion !== "N/A") {
    const parts = currentVersion.split(".").map(Number);
    log(`   📈 Next patch: ${parts[0]}.${parts[1]}.${parts[2] + 1}`, "white");
    log(`   📈 Next minor: ${parts[0]}.${parts[1] + 1}.0`, "white");
    log(`   📈 Next major: ${parts[0] + 1}.0.0`, "white");
  }

  log("\n🚀 Quick Commands:", "green");
  log("   npm run version:build       # Patch + Build (ONE COMMAND!)", "white");
  log(
    "   npm run version:deploy      # Patch + Build + Deploy (FULL WORKFLOW!)",
    "white"
  );
  log("   npm run version:build:minor # Minor + Build", "white");
  log("   npm run version:build:major # Major + Build", "white");
  log("   npm run version             # Patch increment only", "white");

  log("");
}

function showWatch() {
  log("👀 Watching for version changes... (Press Ctrl+C to stop)", "cyan");

  const filesToWatch = [
    "package.json",
    "public/dashboard-pwa.js",
    "next.config.js",
  ];

  filesToWatch.forEach((file) => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      fs.watchFile(fullPath, { interval: 1000 }, () => {
        console.clear();
        log(`🔄 Change detected in ${file}`, "yellow");
        showStatus();
      });
    }
  });

  // Initial status
  showStatus();
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--watch") || args.includes("-w")) {
    showWatch();
  } else {
    showStatus();
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  getPackageVersion,
  getPWAVersion,
  getCacheVersions,
  checkVersionConsistency,
};
