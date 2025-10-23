# Digital Product Design Skills Suite

A comprehensive set of Claude skills for end-to-end digital product design workflows, from user research through quality assurance.

## Overview

This suite contains four specialized skills that cover the complete design lifecycle:

1. **Design - Research**: User research, personas, design principles, roadmaps
2. **Design - Concepts**: Visual explorations, mood boards, prototypes
3. **Design - Production**: Production-ready specs, Figma files, design systems
4. **Design - QA**: Implementation validation, issue tracking, quality assurance

## Quick Start

### Installation

**Simple one-command install:**
```bash
git clone https://github.com/mevans2120/design-suite-claude-skills.git
cd design-suite-claude-skills
./install.sh
```

This installs all 4 skills globally to `~/.claude/skills/`

**See [INSTALL.md](INSTALL.md) for detailed installation options and troubleshooting.**

### Basic Usage Examples

```
"Use the design-research skill to create personas from this user interview data"

"Create three concept directions for a mobile checkout flow"

"Generate production-ready design specs for this approved concept"

"Review this staging site against the design specifications"
```

## Skill Details

### Design - Research

**Purpose**: Conducts UX research and creates strategic design artifacts

**Key Deliverables**:
- Personas (markdown)
- Customer segments (markdown)
- Design principles (markdown)
- Design roadmaps (markdown)
- Research discussion guides (markdown)

**When to use**:
- Starting a new project or feature
- Need to understand user needs and behaviors
- Planning user research studies
- Creating design strategy documents

**Methodology**: Jobs-to-be-Done framework

### Design - Concepts

**Purpose**: Explores visual directions and validates design approaches

**Key Deliverables**:
- UI design concepts (HTML/React)
- Mood boards (HTML)
- Interactive prototypes (React)
- Concept comparison documents (markdown)

**When to use**:
- After research, before detailed production work
- Need to explore multiple visual directions
- Want to validate approach with stakeholders
- Creating design presentations

**Fidelity Levels**: Low-fi wireframes to high-fi mockups

### Design - Production

**Purpose**: Creates production-ready design specifications and assets

**Key Deliverables**:
- Figma files (via Figma API)
- High-fidelity prototypes (React)
- Design specifications (markdown)
- Animation files (Lottie JSON)
- Design system documentation (markdown)

**When to use**:
- After concept approval
- Ready for developer handoff
- Building or extending design systems
- Need complete, implementable specifications

**Quality Focus**: Pixel-perfect, state-complete, developer-ready

### Design - QA

**Purpose**: Validates implementation against design specifications

**Key Deliverables**:
- Design QA reports (markdown)
- Issue tracking spreadsheets (CSV)
- Specification improvement recommendations (markdown)

**When to use**:
- Reviewing staging or production sites
- Pre-launch quality checks
- Identifying implementation discrepancies
- Improving design documentation

**Review Areas**: Visual design, interactions, responsive behavior, accessibility

## How Skills Work Together

### Typical Workflow

```
1. Research Phase
   └─ design-research: Create personas, principles, roadmap

2. Concept Phase  
   └─ design-concepts: Explore 2-3 visual directions
   └─ Stakeholder review & approval

3. Production Phase
   └─ design-production: Create detailed specs and assets
   └─ Developer handoff

4. Implementation Phase
   └─ Engineering builds

5. QA Phase
   └─ design-qa: Review implementation
   └─ Log issues and validate fixes
```

### Skill Integration

Skills reference each other when helpful:

- **Concepts** reads **Research** artifacts (personas, principles)
- **Production** builds on approved **Concepts**
- **QA** validates against **Production** specifications
- All skills can coordinate with PM suite for project management

### Independent Usage

Each skill can also work independently:

- Run research without concepts
- Create concepts without prior research (if context provided)
- Generate production specs from scratch
- QA review without access to original design files

## Best Practices

### For Best Results

1. **Provide Context**: Share existing research, brand guidelines, requirements
2. **Be Specific**: Clear goals lead to better outputs
3. **Iterate**: Use skills multiple times, refining based on feedback
4. **Use Real Content**: Don't rely on Lorem Ipsum - use realistic data
5. **Review Outputs**: Always review generated artifacts before sharing
6. **Follow the Flow**: Trust the process - research before concepts, concepts before production

### Common Patterns

**Pattern 1: New Feature Design**
```
1. "Use design-research to analyze these user interviews and create personas"
2. "Based on those personas, use design-concepts to create 3 visual directions for [feature]"
3. "Take Concept 2 and use design-production to create complete specs"
```

**Pattern 2: Redesign Project**
```
1. "Use design-research to analyze our current app and competitor apps"
2. "Create design principles based on that research"
3. "Use design-concepts to explore new directions following those principles"
```

**Pattern 3: Implementation Review**
```
1. "Use design-qa to review https://staging.example.com against these design specs"
2. "Create a prioritized issue list for engineering"
3. "After fixes, use design-qa again to validate"
```

## File Organization

All skills output to `/mnt/user-data/outputs/` with descriptive naming:

```
/mnt/user-data/outputs/
├── personas.md
├── design-principles.md
├── design-roadmap.md
├── concept-direction-1.html
├── concept-direction-2.jsx
├── moodboard.html
├── prototype-production.jsx
├── design-spec.md
├── design-system.md
├── design-qa-report.md
└── design-qa-issues.csv
```

## Integration with PM Suite

These design skills are built to work alongside project management skills:

### Shared Terminology
- Both suites use consistent terms (user stories, features, sprints)
- Compatible artifact formats (markdown, structured data)

### Handoff Points
- **Design → PM**: Roadmaps, specifications, timelines
- **PM → Design**: Requirements, priorities, constraints

### Coordination Patterns
When users mention PM-related terms (sprint, backlog, release), skills suggest coordination with PM suite if available.

## Customization

### Adapting Skills to Your Process

You can customize these skills by:

1. **Editing SKILL.md files**: Modify methodology, add company-specific guidelines
2. **Adding examples**: Include your company's best-practice examples
3. **Adjusting deliverable formats**: Change output formats to match your tools
4. **Extending tool usage**: Add integrations with your design/PM tools

### Brand Guidelines Integration

To integrate your brand guidelines:

1. Upload brand guideline documents to Claude
2. Reference them when using skills: "Create concepts following our brand guidelines [uploaded file]"
3. Skills will automatically incorporate brand constraints

## Troubleshooting

### Common Issues

**Issue**: Skills creating generic outputs not specific to my project
**Solution**: Provide more context - research data, user needs, technical constraints

**Issue**: Multiple skills trying to activate at once
**Solution**: Explicitly name which skill you want: "Use design-research skill to..."

**Issue**: Outputs not matching my expected format
**Solution**: Specify format in request: "Create a markdown document..." or "Create a React prototype..."

**Issue**: Skills not integrating with PM suite
**Solution**: Mention both contexts: "Create a design roadmap that aligns with our sprint planning"

## Support & Feedback

### Getting Help

- Check individual SKILL.md files for detailed documentation
- Look at examples in each skill for guidance
- Start with smaller requests to understand skill behavior

### Providing Feedback

After using skills in real projects:
- Note what worked well vs. what didn't
- Identify gaps in methodology or deliverables
- Document any confusing instructions
- Share successful usage patterns

This feedback loop helps improve skills over time.

## Technical Details

### Requirements

- Claude Pro, Max, Team, or Enterprise
- Code execution enabled
- Skill loading enabled

### Tools Used

Skills leverage these Claude capabilities:
- `web_search` - Industry research, competitor analysis
- `web_fetch` - Analyzing websites and apps
- `view` - Reading uploaded files and documents
- `create_file` - Generating deliverables
- `bash_tool` - Advanced operations (Figma API, etc.)

### File Formats

**Inputs** (skills can read):
- Markdown (.md)
- Text (.txt)
- HTML (.html)
- CSV (.csv)
- Images (PNG, JPG)
- PDFs (extracted text)

**Outputs** (skills create):
- Markdown (.md) - Documentation, specs, reports
- HTML (.html) - Mood boards, static mockups
- React (.jsx) - Interactive prototypes
- CSV (.csv) - Issue tracking
- JSON (.json) - Lottie animations, data exports

## Version History

**v1.0** (October 2025)
- Initial release
- Four core skills: Research, Concepts, Production, QA
- Jobs-to-be-Done methodology
- Figma API integration (Production)
- Loose integration with PM suite

## Roadmap

Future enhancements under consideration:
- Accessibility-specific skill (WCAG deep-dive)
- Design system management skill
- User testing facilitation skill
- Analytics integration for data-driven research
- Tighter PM suite integration
- API integrations (Figma, Sketch, Adobe XD)

## License

[Your license here]

## Contributing

To contribute improvements:
1. Test skills on real projects
2. Document issues or enhancement ideas
3. Submit detailed feedback
4. Share successful patterns and examples

## Acknowledgments

Built on Anthropic's Claude Skills system.
Inspired by real-world product design workflows.
Optimized through iterative testing and refinement.

---

**Ready to get started?** Try this:

```
"I'm designing a mobile app for [your use case]. 
Use design-research to help me understand what users need."
```
