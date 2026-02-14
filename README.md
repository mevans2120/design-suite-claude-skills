# Design Suite - Claude Skills

Digital product design workflow: research → concepts → QA.

## Installation

```bash
git clone https://github.com/mevans2120/design-suite-claude-skills.git
cd design-suite-claude-skills

# Install globally (creates symlinks)
mkdir -p ~/.claude/skills
ln -s "$(pwd)/design-research" ~/.claude/skills/design-research
ln -s "$(pwd)/design-concepts" ~/.claude/skills/design-concepts
ln -s "$(pwd)/design-qa" ~/.claude/skills/design-qa
```

## Skills

### design-research
User research using Jobs-to-be-Done methodology. Creates personas, customer segments, design principles, and research discussion guides.

**Trigger phrases:** "user research", "persona", "target audience", "design principles", "jobs to be done", "competitive analysis"

### design-concepts
Conceptual design exploration using a Design Lens System. Conducts a Design Intent Interview, gathers diverse inspiration (beyond Dribbble), selects design lenses, and creates 3 meaningfully different concepts with mood boards.

**Trigger phrases:** "mockup", "wireframe", "concept", "mood board", "visual direction", "design options", "UI design", "prototype"

### design-qa
Systematic design quality assurance. Reviews implemented products against specs, checks accessibility/WCAG compliance, responsive behavior, and interaction states.

**Trigger phrases:** "design review", "design QA", "check implementation", "visual bugs", "before launch", "accessibility review"

## Workflow

```
Research → Concepts → (Build) → QA
   ↓          ↓                   ↓
personas   mood boards         review
insights   3 concepts          issues
principles lens system         a11y
```

## Usage

Skills load automatically based on conversation context. You can also ask directly:
```
"Create personas from this user data"
"Design 3 concept variations for the dashboard"
"Run a design QA review on staging"
```

## Customization

Edit `SKILL.md` files to customize behavior:
- Modify methodology (default: Jobs-to-be-Done for research)
- Adjust design lenses or add your own
- Add company-specific brand guidelines
- Change deliverable formats

## Requirements

- Claude Code (or Claude Pro/Max/Team/Enterprise)

## License

MIT
