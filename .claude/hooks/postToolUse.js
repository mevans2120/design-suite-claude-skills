#!/usr/bin/env node

/**
 * postToolUse hook for git operations
 * Updates memory after git commits/pushes
 */

const { readStdin, writeResponse } = require('./wrapper');

async function main() {
  try {
    // Read input from stdin
    const context = await readStdin();

    // For now, just acknowledge the git operation
    // Can be extended to update memory bank in the future
    writeResponse({
      message: 'Git operation completed',
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
