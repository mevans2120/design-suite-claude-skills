#!/bin/bash

# Design Suite Skills - Symlink Health Check
# Verifies that globally installed skills are working correctly

set -e

SKILLS_DIR="$HOME/.claude/skills"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔍 Design Suite Skills - Health Check"
echo "======================================"
echo ""
echo "Checking skills in: $SKILLS_DIR"
echo "Repo location: $REPO_DIR"
echo ""

# Array of skills to check
SKILLS=("design-research" "design-concepts" "design-production" "design-qa")

# Counters
TOTAL=0
HEALTHY=0
BROKEN=0
MISSING=0

for SKILL in "${SKILLS[@]}"; do
    TOTAL=$((TOTAL + 1))
    SKILL_PATH="$SKILLS_DIR/$SKILL"

    echo "Checking: $SKILL"

    # Check if symlink exists
    if [ ! -L "$SKILL_PATH" ]; then
        if [ -d "$SKILL_PATH" ]; then
            echo "  ⚠️  WARNING: Directory exists but is not a symlink"
            echo "      Location: $SKILL_PATH"
            BROKEN=$((BROKEN + 1))
        else
            echo "  ❌ MISSING: Symlink does not exist"
            echo "      Expected: $SKILL_PATH"
            MISSING=$((MISSING + 1))
        fi
        echo ""
        continue
    fi

    # Get where symlink points
    TARGET=$(readlink "$SKILL_PATH")

    # Check if target exists
    if [ ! -d "$SKILL_PATH" ]; then
        echo "  💔 BROKEN: Symlink exists but target is missing"
        echo "      Symlink: $SKILL_PATH"
        echo "      Points to: $TARGET"
        BROKEN=$((BROKEN + 1))
        echo ""
        continue
    fi

    # Check if SKILL.md exists
    if [ ! -f "$SKILL_PATH/SKILL.md" ]; then
        echo "  ⚠️  WARNING: SKILL.md is missing"
        echo "      Expected: $SKILL_PATH/SKILL.md"
        BROKEN=$((BROKEN + 1))
        echo ""
        continue
    fi

    # Check if it points to this repo
    if [[ "$TARGET" == "$REPO_DIR/$SKILL" ]] || [[ "$TARGET" == "../../$SKILL" ]]; then
        echo "  ✅ HEALTHY"
        echo "      Points to: $TARGET"
        FILE_SIZE=$(wc -c < "$SKILL_PATH/SKILL.md" | tr -d ' ')
        echo "      SKILL.md: $FILE_SIZE bytes"
        HEALTHY=$((HEALTHY + 1))
    else
        echo "  ⚠️  WARNING: Points to unexpected location"
        echo "      Current: $TARGET"
        echo "      Expected: $REPO_DIR/$SKILL"
        BROKEN=$((BROKEN + 1))
    fi

    echo ""
done

# Summary
echo "======================================"
echo "Summary:"
echo "  Total skills:   $TOTAL"
echo "  ✅ Healthy:     $HEALTHY"
echo "  💔 Broken:      $BROKEN"
echo "  ❌ Missing:     $MISSING"
echo ""

if [ $HEALTHY -eq $TOTAL ]; then
    echo "✨ All skills are healthy!"
    exit 0
elif [ $BROKEN -gt 0 ] || [ $MISSING -gt 0 ]; then
    echo "⚠️  Some skills need attention"
    echo ""
    echo "To fix, run:"
    echo "  cd $REPO_DIR"
    echo "  ./install.sh"
    exit 1
fi
