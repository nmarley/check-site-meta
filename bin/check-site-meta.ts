#!/usr/bin/env node

import { spawn, spawnSync, type ChildProcess } from "child_process";
import open from "open";

const VERSION = "0.1.0";
const PORT = 3050;

console.log(`\n   ▲ Check Site Meta ${ VERSION }`);

const nextProcess = spawn("node", ["./.next/standalone/server.js"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: {
    ...process.env,
    PORT: String(PORT),
  },
});

nextProcess.stdout.on("data", (data) => {
  const message = String(data)

  if (message.startsWith("   ▲ Next.js ")) {
    process.stdout.write(message.replace("Next.js", "Using Next.js"));
    return
  }
  if (message.startsWith("   - Local:")) {
    process.stdout.write(
      `   - Local: http://localhost:${ PORT }
   - Starting... 🚀\n\n`
    );
    return
  }

  // Detect when the server is ready
  if (message.includes(`✓ Ready in`)) {
    setTimeout(() => {
      console.log(` → Opening browser at http://localhost:${ PORT }`);
      open(`http://localhost:${ PORT }`);
    }, 10);
  }

  process.stdout.write(`${ data }`);
});

// Read and modify stderr (warnings/errors)
nextProcess.stderr.on("data", (data) => {
  process.stderr.write(`[ERROR] ${ data }`);
});

// Handle process exit
nextProcess.on("exit", (code) => {
  if (code === 0) {
    console.log("\n✅ Next.js server is running!");
  } else {
    console.error("\n❌ Next.js server failed to start.");
  }
});

const cleanup = () => {
  console.log(`\n → Stopping server on port ${ PORT }...`);
  nextProcess.kill("SIGTERM"); // Gracefully stop child process
  process.exit();
};

process.on("SIGINT", cleanup); // Ctrl + C
process.on("SIGTERM", cleanup); // Kill command