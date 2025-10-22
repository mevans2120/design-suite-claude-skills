# Design Suite Project Structure

This document explains the organization of the design suite repository.

## Directory Structure

```
design-suite-claude-skills/
├── design-research/          # Design research skill
│   └── SKILL.md
├── design-concepts/          # Design concepts skill
│   └── SKILL.md
├── design-production/        # Production design skill
│   └── SKILL.md
├── design-qa/               # Design QA skill
│   └── SKILL.md
├── outputs/                 # Project outputs (gitignored)
│   └── [project-id]/       # One directory per project
│       ├── research/       # Research phase deliverables
│       ├── concepts/       # Concept phase deliverables
│       ├── production/     # Production phase deliverables
│       └── qa/            # QA phase deliverables
├── dashboard/              # Design dashboard application
│   └── src/
│       ├── data/          # Dashboard data store
│       │   └── projects.json
│       ├── helpers/       # Utility functions
│       │   └── update-dashboard.js
│       ├── components/    # UI components (to be built)
│       ├── pages/         # Page components (to be built)
│       └── styles/        # CSS styles (to be built)
├── templates/             # Deliverable templates
│   ├── persona-template.md
│   ├── design-principles-template.md
│   └── qa-report-template.md
├── briefs/               # Project briefs
│   └── design-dashboard-brief.md
├── memory-bank/          # Project memory and context
├── hybrid-memory-bank-plugin/  # Memory bank plugin (submodule)
└── .claude/             # Claude Code configuration
    ├── commands/
    └── hooks/
```

## Workflow

### 1. Research Phase
Invoke `design-research` skill to:
- Conduct user research
- Create personas
- Define design principles
- Document key insights

**Outputs**: Saved to `outputs/[project-id]/research/`

### 2. Concepts Phase
Invoke `design-concepts` skill to:
- Create wireframes or mockups
- Develop visual concepts
- Create mood boards
- Present multiple directions

**Outputs**: Saved to `outputs/[project-id]/concepts/`

### 3. Production Phase
Invoke `design-production` skill to:
- Create detailed specs
- Build design system components
- Generate production assets
- Create developer handoff docs

**Outputs**: Saved to `outputs/[project-id]/production/`

### 4. QA Phase
Invoke `design-qa` skill to:
- Review implementation
- Compare against specs
- Test accessibility
- Document issues

**Outputs**: Saved to `outputs/[project-id]/qa/`

## Dashboard Integration

Each skill can update the dashboard by requiring the helper:

```javascript
const { addDeliverable, updateProject } = require('../dashboard/src/helpers/update-dashboard.js');

// After creating a deliverable
addDeliverable('project-id', {
  type: 'personas',
  skill: 'design-research',
  title: 'User Personas',
  summary: 'Brief summary of deliverable...',
  filePath: '/outputs/project-id/research/personas.md'
});
```

## Current Projects

- **design-dashboard**: The design dashboard application itself (meta!)
  - Status: Research
  - Using this project to validate the design skills workflow

## Templates

Located in `/templates/`, these provide starting points for common deliverables:
- `persona-template.md`
- `design-principles-template.md`
- `qa-report-template.md`

Skills can reference these templates or create deliverables from scratch.
