# Component Implementation Guide - Lit Web Components

**Project**: Design Dashboard
**Framework**: Lit 3.x
**Date**: October 22, 2025

---

## Table of Contents

1. [Setup](#setup)
2. [Design Tokens Integration](#design-tokens-integration)
3. [Core Components](#core-components)
4. [Usage Examples](#usage-examples)
5. [Testing](#testing)

---

## Setup

### Project Initialization

```bash
# Create Vite + Lit project
npm create vite@latest design-dashboard -- --template lit

# Navigate and install
cd design-dashboard
npm install

# Install additional dependencies
npm install @lit/router
```

### Project Structure
```
src/
├── components/         # Reusable Lit components
├── views/             # Route views
├── styles/            # Design tokens, global styles
├── data/              # projects.json
└── main.js            # App entry
```

---

## Design Tokens Integration

### 1. Import Tokens

```javascript
// src/styles/design-tokens.js
import { tokens, generateCSSVariables } from '../../../outputs/design-dashboard/production/design-tokens.js';

// In your main app or base component
const styles = css`
  ${unsafeCSS(generateCSSVariables())}
`;
```

### 2. Use CSS Custom Properties

```javascript
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  static styles = css`
    .container {
      background: var(--color-bg-secondary);
      padding: var(--spacing-4);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
    }

    .title {
      font-size: var(--font-size-large);
      color: var(--color-text-primary);
      font-weight: 600;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h2 class="title">Hello World</h2>
      </div>
    `;
  }
}
```

---

## Core Components

### 1. Sidebar Navigation Component

**File**: `src/components/sidebar-nav.js`

```javascript
import { LitElement, html, css } from 'lit';
import { tokens } from '../styles/design-tokens.js';

export class SidebarNav extends LitElement {
  static properties = {
    currentRoute: { type: String },
    projectCounts: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      width: var(--sidebar-width, 240px);
      height: 100vh;
      background: var(--color-bg-secondary);
      border-right: 1px solid var(--color-border);
      padding: 24px 16px;
      position: fixed;
      left: 0;
      top: 0;
      overflow-y: auto;
    }

    .logo {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 32px;
      padding: 0 8px;
      color: var(--color-text-primary);
    }

    .nav-section {
      margin-bottom: 24px;
    }

    .nav-section-title {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      padding: 0 8px;
    }

    .nav-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      color: var(--color-text-primary);
      transition: background var(--transition-normal);
      text-decoration: none;
    }

    .nav-item:hover {
      background: var(--color-bg-tertiary);
    }

    .nav-item.active {
      background: var(--color-brand-primary);
      color: #ffffff;
    }

    .nav-item-count {
      font-size: 12px;
      color: var(--color-text-tertiary);
    }

    .nav-item.active .nav-item-count {
      color: rgba(255, 255, 255, 0.7);
    }
  `;

  constructor() {
    super();
    this.currentRoute = '/';
    this.projectCounts = {
      all: 0,
      active: 0,
      complete: 0
    };
  }

  render() {
    return html`
      <div class="logo">Design Suite</div>

      <nav>
        <div class="nav-section">
          <div class="nav-section-title">Workspace</div>
          <a href="/" class="nav-item ${this.currentRoute === '/' ? 'active' : ''}">
            <span>All Projects</span>
            <span class="nav-item-count">${this.projectCounts.all}</span>
          </a>
          <a href="/active" class="nav-item ${this.currentRoute === '/active' ? 'active' : ''}">
            <span>Active</span>
            <span class="nav-item-count">${this.projectCounts.active}</span>
          </a>
          <a href="/complete" class="nav-item ${this.currentRoute === '/complete' ? 'active' : ''}">
            <span>Complete</span>
            <span class="nav-item-count">${this.projectCounts.complete}</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Phase</div>
          <div class="nav-item">Research</div>
          <div class="nav-item">Concepts</div>
          <div class="nav-item">Production</div>
          <div class="nav-item">QA</div>
        </div>
      </nav>
    `;
  }
}

customElements.define('sidebar-nav', SidebarNav);
```

---

### 2. Project Card Component

**File**: `src/components/project-card.js`

```javascript
import { LitElement, html, css } from 'lit';

export class ProjectCard extends LitElement {
  static properties = {
    project: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 24px;
      cursor: pointer;
      transition: all 200ms ease;
    }

    .card:hover {
      border-color: var(--color-border-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .card:focus-within {
      outline: 2px solid var(--color-brand-primary);
      outline-offset: 2px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    .status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status.research {
      background: var(--color-status-research-bg);
      color: var(--color-status-research);
    }

    .status.concepts {
      background: var(--color-status-concepts-bg);
      color: var(--color-status-concepts);
    }

    .status.production {
      background: var(--color-status-production-bg);
      color: var(--color-status-production);
    }

    .status.qa {
      background: var(--color-status-qa-bg);
      color: var(--color-status-qa);
    }

    .description {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .meta {
      display: flex;
      gap: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
      font-size: 13px;
      color: var(--color-text-tertiary);
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .meta-value {
      color: var(--color-text-primary);
      font-weight: 500;
    }
  `;

  _handleClick() {
    this.dispatchEvent(new CustomEvent('project-click', {
      detail: { projectId: this.project.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.project) return html``;

    return html`
      <div class="card" @click=${this._handleClick} tabindex="0" role="button">
        <div class="header">
          <div>
            <h3 class="title">${this.project.name}</h3>
          </div>
          <span class="status ${this.project.status}">${this.project.status}</span>
        </div>

        <p class="description">${this.project.description}</p>

        <div class="meta">
          <div class="meta-item">
            <span>Deliverables:</span>
            <span class="meta-value">${this.project.deliverables?.length || 0}</span>
          </div>
          <div class="meta-item">
            <span>Updated:</span>
            <span class="meta-value">${this._formatDate(this.project.lastUpdated)}</span>
          </div>
        </div>
      </div>
    `;
  }

  _formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  }
}

customElements.define('project-card', ProjectCard);
```

---

### 3. Deliverable Card Component

**File**: `src/components/deliverable-card.js`

```javascript
import { LitElement, html, css } from 'lit';

export class DeliverableCard extends LitElement {
  static properties = {
    deliverable: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      overflow: hidden;
      transition: all 200ms ease;
    }

    .card:hover {
      border-color: var(--color-border-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    /* Visual Preview */
    .visual {
      width: 100%;
      height: 240px;
      background: var(--color-bg-primary);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    .visual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .visual-placeholder {
      color: var(--color-text-disabled);
      font-size: 14px;
    }

    .color-palette {
      display: flex;
      height: 100%;
    }

    .color-swatch {
      flex: 1;
      height: 100%;
    }

    /* Content */
    .content {
      padding: 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .skill-badge {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .skill-badge.design-research {
      background: var(--color-status-research-bg);
      color: var(--color-status-research);
    }

    .skill-badge.design-concepts {
      background: var(--color-status-concepts-bg);
      color: var(--color-status-concepts);
    }

    .skill-badge.design-production {
      background: var(--color-status-production-bg);
      color: var(--color-status-production);
    }

    .skill-badge.design-qa {
      background: var(--color-status-qa-bg);
      color: var(--color-status-qa);
    }

    .summary {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
      font-size: 13px;
      color: var(--color-text-tertiary);
    }

    .view-button {
      padding: 6px 12px;
      background: var(--color-brand-primary);
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: background var(--transition-normal);
    }

    .view-button:hover {
      background: var(--color-brand-primary-hover);
    }

    .view-button:active {
      background: var(--color-brand-primary-active);
      transform: scale(0.98);
    }
  `;

  _renderVisual() {
    const { visualAssets, type } = this.deliverable;

    // Color palette preview
    if (visualAssets?.colorPalette) {
      return html`
        <div class="color-palette">
          ${visualAssets.colorPalette.map(color => html`
            <div class="color-swatch" style="background: ${color};"></div>
          `)}
        </div>
      `;
    }

    // Image preview
    if (visualAssets?.preview && visualAssets.preview.startsWith('/')) {
      return html`<img src="${visualAssets.preview}" alt="${this.deliverable.title}" />`;
    }

    // Placeholder
    return html`<span class="visual-placeholder">Text Document</span>`;
  }

  _handleViewFile() {
    this.dispatchEvent(new CustomEvent('view-file', {
      detail: { filePath: this.deliverable.filePath },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.deliverable) return html``;

    return html`
      <div class="card">
        <div class="visual">
          ${this._renderVisual()}
        </div>

        <div class="content">
          <div class="header">
            <h3 class="title">${this.deliverable.title}</h3>
            <span class="skill-badge ${this.deliverable.skill}">
              ${this.deliverable.skill.replace('design-', '')}
            </span>
          </div>

          <p class="summary">${this.deliverable.summary}</p>

          <div class="footer">
            <span>Created ${this._formatDate(this.deliverable.createdDate)}</span>
            <button class="view-button" @click=${this._handleViewFile}>
              View File →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  }
}

customElements.define('deliverable-card', DeliverableCard);
```

---

### 4. Button Component

**File**: `src/components/button-component.js`

```javascript
import { LitElement, html, css } from 'lit';

export class ButtonComponent extends LitElement {
  static properties = {
    variant: { type: String },
    size: { type: String },
    disabled: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      font-family: var(--font-family-sans);
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      transition: all var(--transition-normal);
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    button:focus {
      outline: 2px solid var(--color-brand-primary);
      outline-offset: 2px;
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Variants */
    .primary {
      background: var(--color-brand-primary);
      color: #ffffff;
    }

    .primary:hover:not(:disabled) {
      background: var(--color-brand-primary-hover);
    }

    .primary:active:not(:disabled) {
      background: var(--color-brand-primary-active);
    }

    .secondary {
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
    }

    .secondary:hover:not(:disabled) {
      background: var(--color-bg-tertiary);
      border-color: var(--color-border-hover);
    }

    /* Sizes */
    .sm {
      padding: 4px 12px;
      font-size: 12px;
    }

    .md {
      padding: 6px 12px;
      font-size: 13px;
    }

    .lg {
      padding: 8px 16px;
      font-size: 14px;
    }
  `;

  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'md';
    this.disabled = false;
  }

  render() {
    return html`
      <button
        class="${this.variant} ${this.size}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }

  _handleClick(e) {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('button-click', {
        bubbles: true,
        composed: true
      }));
    }
  }
}

customElements.define('button-component', ButtonComponent);
```

---

### 5. Context Section (Collapsible)

**File**: `src/components/context-section.js`

```javascript
import { LitElement, html, css } from 'lit';

export class ContextSection extends LitElement {
  static properties = {
    title: { type: String },
    items: { type: Array },
    itemType: { type: String }, // 'principles' or 'insights'
    expanded: { type: Boolean },
    previewCount: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
    }

    .section {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 32px;
      margin-bottom: 32px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .expand-button {
      padding: 6px 12px;
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      color: var(--color-text-secondary);
      font-size: 13px;
      cursor: pointer;
      transition: all var(--transition-normal);
    }

    .expand-button:hover {
      background: var(--color-bg-tertiary);
      border-color: var(--color-border-hover);
    }

    /* Principles grid */
    .principles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }

    .principle-card {
      padding: 20px;
      background: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-radius: 6px;
    }

    .principle-title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--color-brand-primary);
    }

    .principle-description {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    /* Insights list */
    .insights-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .insight-item {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-radius: 6px;
    }

    .insight-number {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-brand-primary);
      color: #ffffff;
      border-radius: 50%;
      font-size: 12px;
      font-weight: 600;
    }

    .insight-text {
      font-size: 14px;
      color: var(--color-text-primary);
    }

    /* Collapse animation */
    .content {
      overflow: hidden;
      transition: max-height 300ms ease, opacity 200ms ease;
    }

    .content.collapsed {
      max-height: 500px; /* Adjust based on content */
    }

    .content.expanded {
      max-height: 5000px;
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.items = [];
    this.itemType = 'principles';
    this.expanded = false;
    this.previewCount = 3;
  }

  _toggleExpand() {
    this.expanded = !this.expanded;
  }

  _getDisplayItems() {
    return this.expanded ? this.items : this.items.slice(0, this.previewCount);
  }

  _renderPrinciples() {
    const displayItems = this._getDisplayItems();
    return html`
      <div class="principles-grid">
        ${displayItems.map(principle => html`
          <div class="principle-card">
            <h4 class="principle-title">${principle.title}</h4>
            <p class="principle-description">${principle.description}</p>
          </div>
        `)}
      </div>
    `;
  }

  _renderInsights() {
    const displayItems = this._getDisplayItems();
    return html`
      <div class="insights-list">
        ${displayItems.map((insight, index) => html`
          <div class="insight-item">
            <div class="insight-number">${index + 1}</div>
            <div class="insight-text">${insight}</div>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <div class="section">
        <div class="header">
          <h3 class="title">${this.title}</h3>
          ${this.items.length > this.previewCount ? html`
            <button class="expand-button" @click=${this._toggleExpand}>
              ${this.expanded ? 'Show Less' : `Show All (${this.items.length})`}
            </button>
          ` : ''}
        </div>

        <div class="content ${this.expanded ? 'expanded' : 'collapsed'}">
          ${this.itemType === 'principles'
            ? this._renderPrinciples()
            : this._renderInsights()}
        </div>
      </div>
    `;
  }
}

customElements.define('context-section', ContextSection);
```

---

## Usage Examples

### Projects List View

```javascript
// src/views/projects-list.js
import { LitElement, html, css } from 'lit';
import '../components/sidebar-nav.js';
import '../components/project-card.js';

class ProjectsListView extends LitElement {
  static properties = {
    projects: { type: Array },
    loading: { type: Boolean }
  };

  constructor() {
    super();
    this.projects = [];
    this.loading = true;
    this._loadProjects();
  }

  async _loadProjects() {
    try {
      const response = await fetch('/src/data/projects.json');
      const data = await response.json();
      this.projects = data.projects;
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      this.loading = false;
    }
  }

  _handleProjectClick(e) {
    const { projectId } = e.detail;
    window.location.href = `/project/${projectId}`;
  }

  static styles = css`
    .layout {
      display: flex;
      min-height: 100vh;
    }

    .main {
      margin-left: var(--sidebar-width);
      flex: 1;
      padding: 40px;
      max-width: 1400px;
    }

    .header {
      margin-bottom: 40px;
    }

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 8px;
    }

    .description {
      font-size: 16px;
      color: var(--color-text-secondary);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 24px;
    }
  `;

  render() {
    return html`
      <div class="layout">
        <sidebar-nav></sidebar-nav>

        <main class="main">
          <header class="header">
            <h1>All Projects</h1>
            <p class="description">
              Design projects tracked through research, concepts, production, and QA
            </p>
          </header>

          ${this.loading ? html`<p>Loading...</p>` : html`
            <div class="projects-grid">
              ${this.projects.map(project => html`
                <project-card
                  .project=${project}
                  @project-click=${this._handleProjectClick}
                ></project-card>
              `)}
            </div>
          `}
        </main>
      </div>
    `;
  }
}

customElements.define('projects-list-view', ProjectsListView);
```

### Project Detail View

```javascript
// src/views/project-detail.js
import { LitElement, html, css } from 'lit';
import '../components/sidebar-nav.js';
import '../components/deliverable-card.js';
import '../components/context-section.js';

class ProjectDetailView extends LitElement {
  static properties = {
    project: { type: Object },
    projectId: { type: String }
  };

  constructor() {
    super();
    this.project = null;
    this.projectId = window.location.pathname.split('/').pop();
    this._loadProject();
  }

  async _loadProject() {
    const response = await fetch('/src/data/projects.json');
    const data = await response.json();
    this.project = data.projects.find(p => p.id === this.projectId);
  }

  render() {
    if (!this.project) return html`<p>Loading...</p>`;

    return html`
      <div class="layout">
        <sidebar-nav></sidebar-nav>

        <main class="main">
          <header class="project-header">
            <div class="status-badge ${this.project.status}">
              ${this.project.status} Phase
            </div>
            <h1>${this.project.name}</h1>
            <p class="description">${this.project.description}</p>
          </header>

          <context-section
            title="Design Principles"
            .items=${this.project.designPrinciples}
            itemType="principles"
          ></context-section>

          <context-section
            title="Key Insights"
            .items=${this.project.keyInsights}
            itemType="insights"
          ></context-section>

          <section class="deliverables">
            <div class="section-header">
              <h2>Deliverables</h2>
              <span class="count">${this.project.deliverables.length} items</span>
            </div>

            <div class="deliverables-grid">
              ${this.project.deliverables.map(deliverable => html`
                <deliverable-card .deliverable=${deliverable}></deliverable-card>
              `)}
            </div>
          </section>
        </main>
      </div>
    `;
  }
}

customElements.define('project-detail-view', ProjectDetailView);
```

---

## Testing

### Unit Testing Components

```javascript
// test/project-card.test.js
import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/project-card.js';

describe('ProjectCard', () => {
  it('renders project name', async () => {
    const el = await fixture(html`
      <project-card
        .project=${{
          name: 'Test Project',
          description: 'Test description',
          status: 'concepts'
        }}
      ></project-card>
    `);

    const title = el.shadowRoot.querySelector('.title');
    expect(title.textContent).to.equal('Test Project');
  });

  it('emits project-click event when clicked', async () => {
    const el = await fixture(html`
      <project-card
        .project=${{ id: 'test-id', name: 'Test' }}
      ></project-card>
    `);

    let eventFired = false;
    el.addEventListener('project-click', (e) => {
      eventFired = true;
      expect(e.detail.projectId).to.equal('test-id');
    });

    el.shadowRoot.querySelector('.card').click();
    expect(eventFired).to.be.true;
  });
});
```

---

**End of Component Implementation Guide**

Next: Build these components and integrate into views!
