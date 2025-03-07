#!/usr/bin/env node

import { spawn } from "child_process";
import open from "open";

const VERSION = "0.0.1";
const PORT = 3050;

const nextProcess = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: ["ignore", "pipe", "pipe"] });

nextProcess.stdout.on("data", (data) => {
  if (String(data).startsWith("   ▲ Next.js ")) {
    process.stdout.write(`   ▲ Check Site Meta ${ VERSION }\n`);
    return
  }
  if (String(data).startsWith("   - Local:")) {
    process.stdout.write(
      `   - Local: http://localhost:${ PORT }
   - Starting... 🚀\n\n`
    );
    return
  }

  // Detect when the server is ready
  if (String(data).includes(`✓ Ready in`)) {
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