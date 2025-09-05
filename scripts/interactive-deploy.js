#!/usr/bin/env node
/**
 * Interactive deploy script with build integration
 * Provides options for version increment, build, and deployment
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
  log("\n🚀 Interactive Deploy Script", "cyan");
  log("==============================", "cyan");
  log(
    "This script provides an interactive deployment process with build integration.",
    "white"
  );
  log("");
  log("Usage:", "yellow");
  log(
    "  npm run deploy:interactive     # Interactive mode (asks questions)",
    "white"
  );
  log("  npm run deploy                 # Standard deploy (no build)", "white");
  log(
    "  npm run version:deploy         # Version + Build + Deploy (automated)",
    "white"
  );
  log("");
  log("Interactive mode will ask:", "yellow");
  log("  1. Whether to run interactive build first", "white");
  log("  2. Deployment target (nodejs/static)", "white");
  log("  3. Whether to manage releases", "white");
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

    log("\n🚀 Interactive Deploy Process", "cyan");
    log("===============================", "cyan");
    log(`📦 Current version: ${currentVersion}`, "blue");
    log("");

    // Ask if user wants to run build first
    const runBuild = await askQuestion(
      rl,
      `${colors.yellow}❓ Do you want to run interactive build first? (Y/n): ${colors.reset}`
    );

    if (runBuild.toLowerCase() !== "n" && runBuild.toLowerCase() !== "no") {
      log("\n🏗️  Running interactive build...", "cyan");
      log("===================================", "cyan");

      try {
        execSync("npm run build", { stdio: "inherit" });
        log("\n✅ Build completed successfully!", "green");
      } catch (error) {
        log(`\n❌ Build failed: ${error.message}`, "red");
        const continueAnyway = await askQuestion(
          rl,
          `${colors.yellow}❓ Continue with deployment anyway? (y/N): ${colors.reset}`
        );

        if (
          continueAnyway.toLowerCase() !== "y" &&
          continueAnyway.toLowerCase() !== "yes"
        ) {
          log("\n👋 Deployment cancelled", "yellow");
          return;
        }
      }
    } else {
      log("\n⏭️  Skipping build process", "yellow");
    }

    // Ask about deployment target
    log("\n🎯 Deployment options:", "yellow");
    log("  1. Node.js deployment (full app)", "white");
    log("  2. Static deployment (static files only)", "white");
    log("");

    const deployType = await askQuestion(
      rl,
      `${colors.yellow}❓ Select deployment type (1=nodejs, 2=static) [1]: ${colors.reset}`
    );

    const isStaticDeploy =
      deployType.trim() === "2" || deployType.toLowerCase() === "static";
    let deployCommand = isStaticDeploy
      ? "./scripts/deploy-to-plesk.sh static"
      : "./scripts/deploy-to-plesk.sh nodejs && npm run releases:latest";

    // Ask about release management
    if (!isStaticDeploy) {
      const manageReleases = await askQuestion(
        rl,
        `${colors.yellow}❓ Manage releases after deployment? (Y/n): ${colors.reset}`
      );

      if (
        manageReleases.toLowerCase() === "n" ||
        manageReleases.toLowerCase() === "no"
      ) {
        deployCommand = "./scripts/deploy-to-plesk.sh nodejs";
      }
    }

    log(
      `\n🚀 Starting ${isStaticDeploy ? "static" : "Node.js"} deployment...`,
      "cyan"
    );
    log("================================================", "cyan");

    try {
      execSync(deployCommand, { stdio: "inherit" });

      const finalVersion = getCurrentVersion();
      log("\n✅ Deployment completed successfully!", "green");
      log(`🎉 Deployed version: ${finalVersion}`, "green");

      log("\n📋 Next steps:", "yellow");
      log("• Test the deployed application", "white");
      log("• Check logs: npm run logs", "white");
      log("• Verify releases: npm run releases", "white");
      log("• Push changes: git push origin --tags", "white");
    } catch (error) {
      log(`\n❌ Deployment failed: ${error.message}`, "red");
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
  log("\n\n👋 Deployment cancelled by user", "yellow");
  process.exit(0);
});

main().catch(console.error);
