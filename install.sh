#!/bin/bash

# Design Suite Skills - Global Installer
# Installs all 4 design skills to ~/.claude/skills/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_SKILLS_DIR="$HOME/.claude/skills"

echo "🎨 Design Suite Skills Installer"
echo "================================="
echo ""

# Create ~/.claude/skills if it doesn't exist
if [ ! -d "$CLAUDE_SKILLS_DIR" ]; then
    echo "📁 Creating $CLAUDE_SKILLS_DIR..."
    mkdir -p "$CLAUDE_SKILLS_DIR"
fi

# Array of skills to install
SKILLS=("design-research" "design-concepts" "design-production" "design-qa")

echo "Installing 4 design skills..."
echo ""

for SKILL in "${SKILLS[@]}"; do
    SOURCE_PATH="$SCRIPT_DIR/$SKILL"
    TARGET_PATH="$CLAUDE_SKILLS_DIR/$SKILL"

    if [ ! -d "$SOURCE_PATH" ]; then
        echo "⚠️  Warning: $SKILL directory not found, skipping..."
        continue
    fi

    # Remove existing symlink/directory if it exists
    if [ -L "$TARGET_PATH" ] || [ -d "$TARGET_PATH" ]; then
        echo "🔄 Updating $SKILL..."
        rm -rf "$TARGET_PATH"
    else
        echo "✓ Installing $SKILL..."
    fi

    # Create symlink
    ln -s "$SOURCE_PATH" "$TARGET_PATH"
done

echo ""
echo "✅ Installation complete!"
echo ""
echo "Installed skills:"
ls -la "$CLAUDE_SKILLS_DIR" | grep "design-" | awk '{print "  •", $9, "→", $11}'
echo ""
echo "Usage in Claude Code:"
echo "  > design-research"
echo "  > design-concepts"
echo "  > design-production"
echo "  > design-qa"
echo ""
echo "See INSTALL.md for detailed usage instructions."
