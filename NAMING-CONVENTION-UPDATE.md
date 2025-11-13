# Naming Convention Update - Add Feature/Assignment Names

**Goal**: Update all skills to include feature/assignment names in folder and file naming conventions for better organization and discoverability.

---

## Current vs Proposed Naming

### design-research

**Current:**
```
docs/design/research-batch-1-102425/
├── personas.md
├── customer-segments.md
└── design-principles.md
```

**Proposed:**
```
docs/design/{feature-name}-research-{MMDDYY}/
├── {feature-name}-personas.md
├── {feature-name}-customer-segments.md
└── {feature-name}-design-principles.md
```

**Examples:**
- `docs/design/checkout-flow-research-102425/`
  - `checkout-flow-personas.md`
  - `checkout-flow-design-principles.md`
- `docs/design/dashboard-redesign-research-110525/`
  - `dashboard-redesign-personas.md`

---

### design-concepts

**Current:**
```
docs/design/concepts-batch-1-102425/
├── mood-board.html
├── concept-1-safe.html
├── concept-2-bold.html
└── overview.md
```

**Proposed:**
```
docs/design/{feature-name}-concepts-{MMDDYY}/
├── {feature-name}-mood-board.html
├── {feature-name}-concept-1-{variant-name}.html
├── {feature-name}-concept-2-{variant-name}.html
└── {feature-name}-overview.md
```

**Examples:**
- `docs/design/checkout-flow-concepts-102425/`
  - `checkout-flow-mood-board.html`
  - `checkout-flow-concept-1-single-page.jsx`
  - `checkout-flow-concept-2-wizard.jsx`
  - `checkout-flow-overview.md`

---

### design-production

**Current:**
```
docs/design/production-batch-1-102425/
├── design-specification.md
├── component-implementation-guide.md
├── design-tokens.js
└── animations/
    └── loading-spinner.json
```

**Proposed:**
```
docs/design/{feature-name}-production-{MMDDYY}/
├── {feature-name}-design-specification.md
├── {feature-name}-component-guide.md
├── {feature-name}-design-tokens.js
└── {feature-name}-animations/
    └── {animation-name}.json
```

**Examples:**
- `docs/design/checkout-flow-production-102425/`
  - `checkout-flow-design-specification.md`
  - `checkout-flow-component-guide.md`
  - `checkout-flow-design-tokens.js`
  - `checkout-flow-animations/payment-success.json`

---

### design-qa

**Current:**
```
docs/design/qa-batch-1-102425/
├── design-qa-report.md
├── design-qa-issues.csv
└── spec-improvements.md
```

**Proposed:**
```
docs/design/{feature-name}-qa-{MMDDYY}/
├── {feature-name}-qa-report.md
├── {feature-name}-issues.csv
└── {feature-name}-spec-improvements.md
```

**Examples:**
- `docs/design/checkout-flow-qa-102425/`
  - `checkout-flow-qa-report.md`
  - `checkout-flow-issues.csv`
  - `checkout-flow-spec-improvements.md`

---

## Benefits

1. **Discoverability**: Immediately see what feature/assignment files relate to
2. **No naming conflicts**: Multiple features can have same-named files
3. **Better organization**: Easy to find all artifacts for a specific feature
4. **Clearer timeline**: Date shows when work happened, name shows what it was for
5. **Batch iteration**: Same feature can have multiple batches (e.g., checkout-flow-concepts-102425, checkout-flow-concepts-110525)

---

## Feature Name Format

**Pattern:** `{feature-name}` in kebab-case

**Good examples:**
- `checkout-flow`
- `user-profile`
- `dashboard-redesign`
- `search-filters`
- `payment-modal`
- `nav-menu-mobile`

**Bad examples:**
- `CheckoutFlow` (use kebab-case, not PascalCase)
- `checkout_flow` (use hyphens, not underscores)
- `checkout flow` (no spaces)
- `checkout-flow-feature` (don't add redundant suffixes)

---

## Implementation Changes Needed

### design-research/SKILL.md

**Line 160 - Change:**
```markdown
`docs/design/research-batch-{number}-{MMDDYY}/`
```

**To:**
```markdown
`docs/design/{feature-name}-research-{MMDDYY}/`
```

**Line 163-164 - Change examples:**
```markdown
- First research batch on Oct 24, 2025: `docs/design/research-batch-1-102425/`
- Second research batch (new study): `docs/design/research-batch-2-110125/`
```

**To:**
```markdown
- Checkout flow research on Oct 24, 2025: `docs/design/checkout-flow-research-102425/`
- Dashboard redesign research on Nov 1, 2025: `docs/design/dashboard-redesign-research-110125/`
```

**Line 173-178 - Update folder structure:**
```markdown
docs/design/research-batch-1-102425/
├── personas.md
├── customer-segments.md
├── design-principles.md
├── design-roadmap.md
└── research-discussion-guide.md
```

**To:**
```markdown
docs/design/{feature-name}-research-{MMDDYY}/
├── {feature-name}-personas.md
├── {feature-name}-customer-segments.md
├── {feature-name}-design-principles.md
├── {feature-name}-design-roadmap.md
└── {feature-name}-research-discussion-guide.md
```

**Line 182+ - Update all Location/File entries to include feature name prefix**

---

### design-concepts/SKILL.md

**Line 381 - Change:**
```markdown
docs/design/concepts-batch-{number}-{MMDDYY}/
```

**To:**
```markdown
docs/design/{feature-name}-concepts-{MMDDYY}/
```

**Line 385-387 - Change examples:**
```markdown
- First concepts batch on Oct 24, 2025: `docs/design/concepts-batch-1-102425/`
- Second concepts batch (refinement) on Oct 30, 2025: `docs/design/concepts-batch-2-103025/`
- Third concepts batch on Nov 5, 2025: `docs/design/concepts-batch-3-110525/`
```

**To:**
```markdown
- Checkout flow concepts on Oct 24, 2025: `docs/design/checkout-flow-concepts-102425/`
- Checkout flow refinement on Oct 30, 2025: `docs/design/checkout-flow-concepts-103025/`
- Dashboard layout concepts on Nov 5, 2025: `docs/design/dashboard-layout-concepts-110525/`
```

**Line 397-402 - Update folder structure:**
```markdown
docs/design/concepts-batch-1-102425/
├── mood-board.html
├── concept-1-safe.html or .jsx
├── concept-2-bold.html or .jsx
├── concept-3-experimental.html or .jsx
└── overview.md
```

**To:**
```markdown
docs/design/{feature-name}-concepts-{MMDDYY}/
├── {feature-name}-mood-board.html
├── {feature-name}-concept-1-{variant}.html or .jsx
├── {feature-name}-concept-2-{variant}.html or .jsx
├── {feature-name}-concept-3-{variant}.html or .jsx
└── {feature-name}-overview.md
```

**Line 406+ - Update all Location/File entries**

---

### design-production/SKILL.md

**Line 410 - Change:**
```markdown
`docs/design/production-batch-{number}-{MMDDYY}/`
```

**To:**
```markdown
`docs/design/{feature-name}-production-{MMDDYY}/`
```

**Line 413-414 - Change examples:**
```markdown
- First production batch on Oct 24, 2025: `docs/design/production-batch-1-102425/`
- Second production batch (updates): `docs/design/production-batch-2-110525/`
```

**To:**
```markdown
- Checkout flow production specs on Oct 24, 2025: `docs/design/checkout-flow-production-102425/`
- Checkout flow updates on Nov 5, 2025: `docs/design/checkout-flow-production-110525/`
```

**Line 423-431 - Update folder structure:**
```markdown
docs/design/production-batch-1-102425/
├── design-specification.md
├── component-implementation-guide.md
├── design-tokens.js
├── design-system.md
├── prototype-production.jsx
└── animations/
    ├── loading-spinner.json
    └── success-checkmark.json
```

**To:**
```markdown
docs/design/{feature-name}-production-{MMDDYY}/
├── {feature-name}-design-specification.md
├── {feature-name}-component-guide.md
├── {feature-name}-design-tokens.js
├── {feature-name}-design-system.md
├── {feature-name}-prototype.jsx
└── {feature-name}-animations/
    ├── {animation-name}.json
    └── {animation-name}.json
```

**Line 444+ - Update all Location/File entries**

---

### design-qa/SKILL.md

**Line 243 - Change:**
```markdown
`docs/design/qa-batch-{number}-{MMDDYY}/`
```

**To:**
```markdown
`docs/design/{feature-name}-qa-{MMDDYY}/`
```

**Line 246-247 - Change examples:**
```markdown
- First QA review on Oct 24, 2025: `docs/design/qa-batch-1-102425/`
- Second QA review (post-fixes): `docs/design/qa-batch-2-110125/`
```

**To:**
```markdown
- Checkout flow QA review on Oct 24, 2025: `docs/design/checkout-flow-qa-102425/`
- Checkout flow post-fixes QA on Nov 1, 2025: `docs/design/checkout-flow-qa-110125/`
```

**Line 256-259 - Update folder structure:**
```markdown
docs/design/qa-batch-1-102425/
├── design-qa-report.md
├── design-qa-issues.csv
└── spec-improvements.md
```

**To:**
```markdown
docs/design/{feature-name}-qa-{MMDDYY}/
├── {feature-name}-qa-report.md
├── {feature-name}-issues.csv
└── {feature-name}-spec-improvements.md
```

**Line 267+ - Update all Location/File entries**

---

## Additional Guidance to Add

Add this section to each skill after the folder structure example:

```markdown
### Feature Name Guidelines

**Format:** Use kebab-case (lowercase with hyphens)

**Examples:**
- `checkout-flow` - E-commerce checkout process
- `user-profile` - User profile page/section
- `dashboard-redesign` - Dashboard redesign project
- `search-filters` - Search filtering feature
- `payment-modal` - Payment modal component
- `mobile-nav` - Mobile navigation

**Ask the user for the feature name** if not provided. Suggest a name based on their description if needed.
```

---

## Summary of Changes

1. Replace `batch-{number}` with `{feature-name}` in all folder patterns
2. Prefix all file names with `{feature-name}-`
3. Update all examples to use real feature names instead of batch numbers
4. Add feature name guidelines section to each skill
5. Update all `Location:` and `File:` specifications

---

## Backward Compatibility

This is a **breaking change** for existing outputs. Options:

1. **Clean break**: Update skills, accept new naming from now on
2. **Document migration**: Add note about old vs new naming
3. **Keep both**: Support both patterns (more complex)

**Recommendation**: Clean break - simpler and clearer going forward. Add note to README about naming convention change.

---

Ready to implement these changes?
