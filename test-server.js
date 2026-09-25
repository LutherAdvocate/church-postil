// test-server.js
import path from 'node:path';
import { pathToFileURL } from 'node:url';

console.log("🔄 Booting up root production bundle diagnostic...");

// Converts the Windows path cleanly into a safe URL format for Node
const bundlePath = path.resolve(process.cwd(), '.output/server/index.mjs');
const bundleUrl = pathToFileURL(bundlePath).href;

import(bundleUrl)
  .then(() => console.log("✅ Nitro Server initialized successfully!"))
  .catch((err) => {
    console.error("\n❌ RAW SERVER CRASH DETECTED:");
    console.error(err);
  });
