#!/usr/bin/env node

/**
 * postToolUse hook for git status
 * Can be extended to update memory or track git state
 */

const { readStdin, writeResponse } = require('./wrapper');

async function main() {
  try {
    // Read input from stdin
    const context = await readStdin();

    // For now, just acknowledge git status was run
    // Can be extended to parse git status output and update memory
    writeResponse({
      message: 'Git status check completed',
      success: true
    });
  } catch (error) {
    // Don't fail on hook errors - just log and continue
    console.error('PostToolUse hook error:', error);
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
