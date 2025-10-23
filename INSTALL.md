# Installation Guide

## Quick Start

```bash
# Clone the repository
git clone https://github.com/mevans2120/design-suite-claude-skills.git
cd design-suite-claude-skills

# Install globally (recommended)
./install.sh

# Or use in this project only
# Skills are already configured in .claude/skills/
```

## What Gets Installed

### 4 Design Skills
- **design-research** - User research, personas, design principles, insights
- **design-concepts** - Mood boards, wireframes, concept variations (3 by default)
- **design-production** - Design specs, component guides, tokens, implementation-ready deliverables
- **design-qa** - UX/accessibility review and evaluation

### Installation Options

#### Option 1: Global Installation (Recommended)

Install skills globally so they're available in any project:

```bash
chmod +x install.sh
./install.sh
```

This creates symlinks in `~/.claude/skills/`:
- `~/.claude/skills/design-research`
- `~/.claude/skills/design-concepts`
- `~/.claude/skills/design-production`
- `~/.claude/skills/design-qa`

**Verify installation:**
```bash
ls -la ~/.claude/skills/design-*
```

**Health check (recommended):**
```bash
./verify-skills.sh
```

This checks that all symlinks are working correctly and points to the right locations.

#### Option 2: Project-Only Installation

Skills are already configured in this project's `.claude/skills/` directory as symlinks. Just clone and use:

```bash
cd design-suite-claude-skills
# Skills are automatically available via .claude/skills/
```

## Usage

### In Claude Code

Open any project in Claude Code and invoke the skills:

```bash
claude code
> design-research
> design-concepts
> design-production
> design-qa
```

Or use the Skill tool in conversations:
- "Run the design-research skill to create personas"
- "Use design-concepts to generate wireframes"
- "Have design-production create the component specs"

### Skill Workflow

**Complete Design Process:**
1. **Research** → Create personas, insights, principles
2. **Concepts** → Generate mood boards and 3 wireframe variations
3. **Production** → Create design specs and component guides
4. **QA** → Review for UX and accessibility

## Example Projects

### Design Dashboard (Included)

A complete example showing all 4 skills in action:

```bash
cd outputs/design-dashboard/

# Research phase deliverables
ls research/
# → personas.md, key-insights.md, design-principles.md

# Concepts phase deliverables
ls concepts/
# → mood-board.html, wireframe-*.html, concept-summary.md

# Production phase deliverables
ls production/
# → design-specification.md, component-implementation-guide.md, design-tokens.js

# Generated roadmaps
ls ../../roadmaps/
# → design-dashboard-roadmap.md, .html, .json
```

## Feature Registry & Roadmaps

This repo includes extracted features from the Design Dashboard example:

```bash
# Feature registry with dependencies
cat design-dashboard-registry.csv

# Generated roadmaps
cat roadmaps/design-dashboard-roadmap.md    # Markdown format
open roadmaps/design-dashboard-roadmap.html # Dark-themed HTML
cat roadmaps/design-dashboard-roadmap.json  # JSON for dashboards
```

## Integration with Project Suite

These design skills work alongside the Project Management Suite skills:

**Optional: Install Project Suite** (for advanced features)
```bash
cd ..
git clone https://github.com/mevans2120/project-suite-claude-skills.git
cd project-suite-claude-skills
./install.sh
```

**Combined Workflow:**
1. **design-research** → Research insights
2. **design-concepts** → Wireframes
3. **design-production** → Specs
4. **project-planner** → Extract features from specs → Roadmap
5. **project-analyzer** → Verify implementation
6. **project-manager** → Create GitHub issues
7. **design-qa** → Review final implementation

## Customization

### Modify Skill Behavior

Each skill's behavior is defined in its `SKILL.md` file:

```bash
# Edit research skill
vim design-research/SKILL.md

# Edit concepts skill (default: 3 wireframes)
vim design-concepts/SKILL.md

# Edit production skill
vim design-production/SKILL.md

# Edit QA skill
vim design-qa/SKILL.md
```

### Create Project-Specific Skills

```bash
# Copy a skill as template
cp -r design-concepts my-custom-skill

# Edit the SKILL.md
vim my-custom-skill/SKILL.md

# Link it
ln -s $(pwd)/my-custom-skill ~/.claude/skills/
```

## Uninstall

### Remove Global Installation

```bash
rm ~/.claude/skills/design-research
rm ~/.claude/skills/design-concepts
rm ~/.claude/skills/design-production
rm ~/.claude/skills/design-qa
```

### Remove Repository

```bash
cd ..
rm -rf design-suite-claude-skills
```

## Troubleshooting

### Skills Not Showing Up

**Check symlinks:**
```bash
ls -la ~/.claude/skills/
```

**Re-run installer:**
```bash
./install.sh
```

### Broken Symlinks

**Symptoms of broken symlinks:**
- Skills work in some projects but not others
- "Skill not found" errors in Claude Code
- `ls -la ~/.claude/skills/design-*` shows red text or "No such file or directory"
- Symlink points to a location that doesn't exist

**How to detect broken symlinks:**
```bash
./verify-skills.sh
```

**What breaks symlinks:**
- Moving the design-suite-claude-skills repo to a different location
- Deleting the repo
- Renaming the repo directory
- Changing your home directory path

**How to fix:**
```bash
cd /path/to/design-suite-claude-skills
./install.sh
```

This will recreate all symlinks to point to the current repo location.

### Permission Denied

```bash
chmod +x install.sh
./install.sh
```

### Outputs Not Being Created

Check that Claude Code has write permissions:
```bash
ls -la outputs/
# Should show writable directory
```

Create outputs directory if missing:
```bash
mkdir -p outputs
```

### Skill Not Found in Conversation

Make sure you're using the skill name exactly:
- ✅ `design-research` (correct)
- ❌ `design research` (wrong - no space)
- ❌ `research` (wrong - missing prefix)

## Requirements

- **Claude Code**: Latest version (install from claude.com/claude-code)
- **Node.js**: Not required for skills (only for optional roadmap generation)
- **Git**: For cloning the repository

## Support

- **Issues**: https://github.com/mevans2120/design-suite-claude-skills/issues
- **Discussions**: https://github.com/mevans2120/design-suite-claude-skills/discussions

## License

MIT License - see LICENSE file for details
