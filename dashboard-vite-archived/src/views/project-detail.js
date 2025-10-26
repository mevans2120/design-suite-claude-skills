import { LitElement, html, css } from 'lit';
import '../components/sidebar-nav.js';
import '../components/deliverable-card.js';
import '../components/context-section.js';

class ProjectDetailView extends LitElement {
  static properties = {
    project: { type: Object },
    projectId: { type: String },
    loading: { type: Boolean }
  };

  constructor() {
    super();
    this.project = null;
    this.projectId = '';
    this.loading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadProject();
  }

  async _loadProject() {
    try {
      const response = await fetch('/src/data/projects.json');
      const data = await response.json();
      this.project = data.projects.find(p => p.id === this.projectId);
      if (!this.project) {
        console.error('Project not found:', this.projectId);
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      this.loading = false;
    }
  }

  _handleViewFile(e) {
    const { filePath } = e.detail;
    console.log('View file:', filePath);
    // In a real implementation, this would open a file viewer modal
    alert(`Opening file: ${filePath}\n\nIn production, this would open an inline file viewer.`);
  }

  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: flex;
      min-height: 100vh;
    }

    .main {
      margin-left: var(--sidebar-width);
      flex: 1;
      padding: 0 40px 40px;
      max-width: calc(var(--content-max-width) + var(--sidebar-width));
    }

    .project-header {
      padding: 40px 0 0;
      margin-bottom: 40px;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 16px;
      text-transform: capitalize;
    }

    .status-badge.research {
      background: var(--color-status-research-bg);
      color: var(--color-status-research);
    }

    .status-badge.concepts {
      background: var(--color-status-concepts-bg);
      color: var(--color-status-concepts);
    }

    .status-badge.production {
      background: var(--color-status-production-bg);
      color: var(--color-status-production);
    }

    .status-badge.qa {
      background: var(--color-status-qa-bg);
      color: var(--color-status-qa);
    }

    h1 {
      font-size: 40px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 12px;
    }

    .description {
      font-size: 18px;
      color: var(--color-text-secondary);
      max-width: 800px;
      line-height: 1.6;
    }

    .goals-section {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 32px;
      margin-bottom: 32px;
    }

    .goals-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 16px;
    }

    .goals-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .goal-item {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-radius: 6px;
      font-size: 14px;
      color: var(--color-text-primary);
    }

    .goal-bullet {
      color: var(--color-brand-primary);
      font-weight: 600;
    }

    .deliverables-section {
      margin-top: 40px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .count {
      font-size: 14px;
      color: var(--color-text-tertiary);
    }

    .deliverables-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: var(--color-text-secondary);
    }

    .error {
      text-align: center;
      padding: 80px 20px;
      color: var(--color-text-secondary);
    }

    .error-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 8px;
    }
  `;

  render() {
    if (this.loading) {
      return html`
        <div class="layout">
          <sidebar-nav currentRoute="/project/${this.projectId}"></sidebar-nav>
          <main class="main">
            <div class="loading">Loading project...</div>
          </main>
        </div>
      `;
    }

    if (!this.project) {
      return html`
        <div class="layout">
          <sidebar-nav currentRoute="/project/${this.projectId}"></sidebar-nav>
          <main class="main">
            <div class="error">
              <div class="error-title">Project not found</div>
              <p>The project you're looking for doesn't exist.</p>
            </div>
          </main>
        </div>
      `;
    }

    return html`
      <div class="layout">
        <sidebar-nav currentRoute="/project/${this.projectId}"></sidebar-nav>

        <main class="main">
          <header class="project-header">
            <div class="status-badge ${this.project.status}">
              ${this.project.status} Phase
            </div>
            <h1>${this.project.name}</h1>
            <p class="description">${this.project.description}</p>
          </header>

          ${this.project.designGoals && this.project.designGoals.length > 0 ? html`
            <div class="goals-section">
              <h2 class="goals-title">Design Goals</h2>
              <div class="goals-list">
                ${this.project.designGoals.map(goal => html`
                  <div class="goal-item">
                    <span class="goal-bullet">•</span>
                    <span>${goal}</span>
                  </div>
                `)}
              </div>
            </div>
          ` : ''}

          ${this.project.designPrinciples && this.project.designPrinciples.length > 0 ? html`
            <context-section
              title="Design Principles"
              .items=${this.project.designPrinciples}
              itemType="principles"
            ></context-section>
          ` : ''}

          ${this.project.keyInsights && this.project.keyInsights.length > 0 ? html`
            <context-section
              title="Key Insights"
              .items=${this.project.keyInsights}
              itemType="insights"
            ></context-section>
          ` : ''}

          <section class="deliverables-section">
            <div class="section-header">
              <h2 class="section-title">Deliverables</h2>
              <span class="count">${this.project.deliverables?.length || 0} items</span>
            </div>

            ${this.project.deliverables && this.project.deliverables.length > 0 ? html`
              <div class="deliverables-grid">
                ${this.project.deliverables
                  .filter(d => d.visible !== false)
                  .map(deliverable => html`
                    <deliverable-card
                      .deliverable=${deliverable}
                      @view-file=${this._handleViewFile}
                    ></deliverable-card>
                  `)}
              </div>
            ` : html`
              <p style="color: var(--color-text-secondary)">No deliverables yet</p>
            `}
          </section>
        </main>
      </div>
    `;
  }
}

customElements.define('project-detail-view', ProjectDetailView);
