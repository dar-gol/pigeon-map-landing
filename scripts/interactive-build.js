#!/usr/bin/env node
/**
 * Interactive build script
 * Asks user if they want to increment version before build
 */

const readline = require("readline");
const { execSync } = require("child_process");
const fs = require("fs");

// Color codes for terminal output
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

function showHelp() {
  log("\n🚀 Interactive Build Script", "cyan");
  log("=============================", "cyan");
  log(
    "This script provides an interactive build process with optional version increment.",
    "white"
  );
  log("");
  log("Usage:", "yellow");
  log(
    "  npm run build              # Interactive mode (asks questions)",
    "white"
  );
  log(
    "  npm run build:auto         # Auto build with version injection",
    "white"
  );
  log(
    "  npm run build:clean        # Clean build without version injection",
    "white"
  );
  log("");
  log("Interactive mode will ask:", "yellow");
  log("  1. Whether to increment version (patch/minor/major)", "white");
  log("  2. Build type (standard with version injection or clean)", "white");
  log("");
  log("Available version types:", "yellow");
  log("  • patch  - Bug fixes (1.2.3 → 1.2.4)", "white");
  log("  • minor  - New features (1.2.3 → 1.3.0)", "white");
  log("  • major  - Breaking changes (1.2.3 → 2.0.0)", "white");
  log("");
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  return packageJson.version;
}

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  // Check for help flag
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    return;
  }

  const rl = createInterface();

  try {
    const currentVersion = getCurrentVersion();

    log("\n🚀 Interactive Build Process", "cyan");
    log("==============================", "cyan");
    log(`📦 Current version: ${currentVersion}`, "blue");
    log("");

    // Ask if user wants to increment version
    const incrementVersion = await askQuestion(
      rl,
      `${colors.yellow}❓ Do you want to increment version before build? (y/N): ${colors.reset}`
    );

    if (
      incrementVersion.toLowerCase() === "y" ||
      incrementVersion.toLowerCase() === "yes"
    ) {
      log("");
      log("📈 Version increment options:", "yellow");
      log("  1. patch  - Bug fixes (1.2.3 → 1.2.4)", "white");
      log("  2. minor  - New features (1.2.3 → 1.3.0)", "white");
      log("  3. major  - Breaking changes (1.2.3 → 2.0.0)", "white");
      log("");

      const versionType = await askQuestion(
        rl,
        `${colors.yellow}❓ Select version type (1=patch, 2=minor, 3=major) [1]: ${colors.reset}`
      );

      let selectedType = "patch";
      switch (versionType.trim()) {
        case "2":
        case "minor":
          selectedType = "minor";
          break;
        case "3":
        case "major":
          selectedType = "major";
          break;
        case "1":
        case "patch":
        case "":
        default:
          selectedType = "patch";
          break;
      }

      log(`\n🔄 Incrementing ${selectedType} version...`, "cyan");

      try {
        execSync(`node scripts/version-manager.js ${selectedType}`, {
          stdio: "inherit",
        });

        const newVersion = getCurrentVersion();
        log(`\n✅ Version updated: ${currentVersion} → ${newVersion}`, "green");
      } catch (error) {
        log(`\n❌ Version increment failed: ${error.message}`, "red");
        process.exit(1);
      }
    } else {
      log("\n⏭️  Skipping version increment", "yellow");
    }

    // Ask about build process
    log("\n🔨 Build options:", "yellow");
    log("  1. Standard build (with version injection)", "white");
    log("  2. Clean build (without version injection)", "white");
    log("");

    const buildType = await askQuestion(
      rl,
      `${colors.yellow}❓ Select build type (1=standard, 2=clean) [1]: ${colors.reset}`
    );

    const isCleanBuild =
      buildType.trim() === "2" || buildType.toLowerCase() === "clean";
    const buildCommand = isCleanBuild
      ? "next build"
      : "npm run version:inject && next build";

    log(
      `\n🏗️  Starting ${isCleanBuild ? "clean" : "standard"} build...`,
      "cyan"
    );
    log("=====================================", "cyan");

    try {
      execSync(buildCommand, { stdio: "inherit" });

      const finalVersion = getCurrentVersion();
      log("\n✅ Build completed successfully!", "green");
      log(`🎉 Final version: ${finalVersion}`, "green");

      log("\n📋 Next steps:", "yellow");
      log("• Test the application: npm start", "white");
      log("• Deploy: npm run deploy", "white");
      log("• Push changes: git push origin --tags", "white");
    } catch (error) {
      log(`\n❌ Build failed: ${error.message}`, "red");
      process.exit(1);
    }
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, "red");
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  log("\n\n👋 Build cancelled by user", "yellow");
  process.exit(0);
});

main().catch(console.error);
