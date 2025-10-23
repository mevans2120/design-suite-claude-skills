# Design Suite - Claude Skills

End-to-end digital product design workflow: research → concepts → production → QA.

**Part of a complete product development toolkit:**
- **[Design Suite](https://github.com/mevans2120/design-suite-claude-skills)** ← You are here
- **[Dev Suite](https://github.com/mevans2120/dev-suite-claude-skills)** - Development workflow skills
- **[Project Suite](https://github.com/mevans2120/project-suite-claude-skills)** - Project management skills

## Installation

```bash
git clone https://github.com/mevans2120/design-suite-claude-skills.git
cd design-suite-claude-skills
./install.sh

# Verify installation
./verify-skills.sh
```

Installs globally to `~/.claude/skills/` - See [INSTALL.md](INSTALL.md) for details.

## Skills

### design-research
User research, personas, design principles, insights, roadmaps.

**Outputs:** personas.md, design-principles.md, key-insights.md, design-roadmap.md

### design-concepts
Mood boards, wireframes, 3 concept variations (default).

**Outputs:** mood-board.html, wireframe-*.html, concept-summary.md

### design-production
Production-ready specs, component guides, design tokens, implementation docs.

**Outputs:** design-specification.md, component-implementation-guide.md, design-tokens.js

### design-qa
UX/accessibility review, implementation validation, issue tracking.

**Outputs:** qa-report.md, issues.csv, recommendations.md

## Workflow

```
Research → Concepts → Production → Implementation → QA
   ↓          ↓            ↓              ↓          ↓
personas   wireframes   specs        (dev builds) review
insights   mood boards  tokens                    issues
principles variations   components
```

## Usage

Invoke directly:
```bash
> design-research
> design-concepts
> design-production
> design-qa
```

Or in conversations:
```
"Run design-research to create personas from this data"
"Use design-concepts to generate 3 wireframe variations"
"Have design-production create the component specs"
"Run design-qa on staging.example.com"
```

## Example Output

See complete example in `outputs/design-dashboard/`:
- Research deliverables: personas, principles, insights
- Concepts deliverables: mood board, 3 wireframes, summary
- Production deliverables: design spec (1000+ lines), component guide, tokens
- Extracted features: 33 features with dependencies and roadmaps

## Integration with Other Suites

### With Dev Suite
1. design-production creates specs
2. Dev Suite implements features
3. design-qa validates implementation

### With Project Suite
1. design-production creates specs
2. project-planner extracts features → roadmap
3. project-manager creates GitHub issues
4. project-analyzer verifies production

**Combined workflow:**
```
design-research → design-concepts → design-production
                                         ↓
                              project-planner (extract features)
                                         ↓
                              project-manager (create issues)
                                         ↓
                                 (dev implements)
                                         ↓
                              project-analyzer (verify)
                                         ↓
                                    design-qa (review)
```

## Feature Extraction

Generate roadmaps from design specs:

```bash
# Uses project-planner (from Project Suite)
node generate-roadmap.js

# Creates:
# - roadmaps/design-dashboard-roadmap.md
# - roadmaps/design-dashboard-roadmap.html
# - roadmaps/design-dashboard-roadmap.json
```

## Customization

Edit `SKILL.md` files to customize behavior:
- Modify methodology (default: Jobs-to-be-Done)
- Change deliverable formats
- Add company-specific guidelines
- Adjust concept variations (default: 3)

## Requirements

- Claude Code
- Node.js (optional, only for roadmap generation)

## License

MIT
