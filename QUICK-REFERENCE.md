# Design Skills - Quick Reference Guide

## Skill Selection

**Need to...**

| Understand users | → `design-research` |
| Explore visual directions | → `design-concepts` |
| Create detailed specs | → `design-production` |
| Validate implementation | → `design-qa` |

## Common Commands

### Design - Research

```
"Use design-research to create personas from these user interviews"

"Analyze this competitor research and create design principles"

"Create a design roadmap based on these user pain points"

"Plan a user research study to understand [problem]"
```

### Design - Concepts

```
"Use design-concepts to create 3 visual directions for [feature]"

"Create a mood board for a [type] app targeting [audience]"

"Build an interactive prototype for [user flow]"

"Show me concept options for [design challenge]"
```

### Design - Production

```
"Use design-production to create complete specs for this approved concept"

"Generate a design system for [project]"

"Create production-ready components for [feature]"

"Build a high-fidelity prototype with all states"
```

### Design - QA

```
"Use design-qa to review [URL] against these design specs"

"Check this staging site for design implementation issues"

"Validate accessibility on [screen/flow]"

"Create an issue report comparing [site] to [design file]"
```

## Typical Workflows

### Workflow 1: New Feature (Complete)
```
1. "Use design-research to analyze [context] and create personas"
2. "Based on those personas, use design-concepts to explore 3 directions for [feature]"
3. "Take direction 2 and use design-production to create detailed specs"
4. [Engineering implements]
5. "Use design-qa to review [staging URL] against those specs"
```

### Workflow 2: Quick Exploration
```
1. "Use design-concepts to create a prototype for [idea]"
2. [Get feedback]
3. "Use design-production to detail out this concept"
```

### Workflow 3: Implementation Review
```
1. "Use design-qa to review [URL] against [design file]"
2. [Engineering fixes issues]
3. "Use design-qa again to validate the fixes"
```

### Workflow 4: Research to Strategy
```
1. "Use design-research to analyze these user interviews"
2. "Create design principles from that research"
3. "Create a design roadmap prioritizing opportunities"
```

## Output Expectations

| Skill | Primary Output | Location |
|-------|---------------|----------|
| Research | `.md` documents | `/mnt/user-data/outputs/` |
| Concepts | `.html` or `.jsx` files | `/mnt/user-data/outputs/` |
| Production | `.jsx` prototypes, `.md` specs | `/mnt/user-data/outputs/` |
| QA | `.md` reports, `.csv` issues | `/mnt/user-data/outputs/` |

## Pro Tips

### Getting Better Results

✅ **DO**: Provide context (user needs, constraints, existing work)
✅ **DO**: Upload relevant files (research data, brand guidelines)
✅ **DO**: Be specific about what you need
✅ **DO**: Iterate based on initial outputs

❌ **DON'T**: Expect perfect outputs without any context
❌ **DON'T**: Skip research phase (unless concept exploration only)
❌ **DON'T**: Use Lorem Ipsum - always provide realistic content

### Skill Combinations

**Research + Concepts**: "Use design-research then design-concepts to..."
**Concepts + Production**: "Create concepts, then detail the winning direction"
**Production + QA**: "Build specs, then later review implementation against them"

### Explicit vs. Automatic

**Explicit** (recommended when starting):
```
"Use design-research skill to..."
```

**Automatic** (once comfortable):
```
"Create personas from this data"
```
Skills auto-activate based on request context.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Output too generic | Provide more context and constraints |
| Wrong skill activated | Explicitly name the skill you want |
| Missing deliverable | Check `/mnt/user-data/outputs/` directory |
| Need different format | Specify: "as markdown" or "as React prototype" |

## Integration with PM Skills

When coordinating with PM suite:

```
"Use design-research and [PM skill] to create a feature roadmap"

"Review sprint priorities against design research insights"

"Create design specs aligned with [PM deliverable]"
```

## File Naming Conventions

Skills create files with descriptive names:

```
personas.md
customer-segments.md
design-principles.md
design-roadmap.md
concept-[name].jsx
moodboard-[name].html
prototype-production.jsx
design-spec.md
design-system.md
design-qa-report.md
design-qa-issues.csv
```

## Quick Wins

**5-minute tasks**:
- Create personas from interview data
- Generate design principles
- QA review one screen

**15-minute tasks**:
- Create 2-3 concept directions
- Build interactive prototype
- Complete QA report

**30-minute tasks**:
- Full research synthesis
- Production-ready design system
- Comprehensive QA with issue tracking

## Getting Help

1. Check `README.md` for full documentation
2. Review individual `SKILL.md` files
3. Look at examples in each skill
4. Start small and iterate

## Most Important

🎯 **Start with research** - Understanding users drives better design
🎯 **Use real content** - Placeholder text hides problems
🎯 **Specify fidelity** - Match detail level to your question
🎯 **Iterate** - First output is starting point, not final
🎯 **Provide context** - More context = better results

---

**Keep this guide handy** - it's your fastest path to productive skill usage! 🚀
