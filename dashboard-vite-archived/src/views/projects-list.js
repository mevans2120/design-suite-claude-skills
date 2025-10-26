import { LitElement, html, css } from 'lit';
import '../components/sidebar-nav.js';
import '../components/project-card.js';

class ProjectsListView extends LitElement {
  static properties = {
    projects: { type: Array },
    loading: { type: Boolean },
    projectCounts: { type: Object }
  };

  constructor() {
    super();
    this.projects = [];
    this.loading = true;
    this.projectCounts = {
      all: 0,
      research: 0,
      concepts: 0,
      production: 0,
      qa: 0
    };
    this._loadProjects();
  }

  async _loadProjects() {
    try {
      const response = await fetch('/src/data/projects.json');
      const data = await response.json();
      this.projects = data.projects;
      this._calculateCounts();
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      this.loading = false;
    }
  }

  _calculateCounts() {
    this.projectCounts = {
      all: this.projects.length,
      research: this.projects.filter(p => p.status === 'research').length,
      concepts: this.projects.filter(p => p.status === 'concepts').length,
      production: this.projects.filter(p => p.status === 'production').length,
      qa: this.projects.filter(p => p.status === 'qa').length
    };
  }

  _handleProjectClick(e) {
    const { projectId } = e.detail;
    window.history.pushState({}, '', `/project/${projectId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
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
      padding: 40px;
      max-width: calc(var(--content-max-width) + var(--sidebar-width));
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

    .loading {
      text-align: center;
      padding: 40px;
      color: var(--color-text-secondary);
    }

    .empty {
      text-align: center;
      padding: 80px 20px;
      color: var(--color-text-secondary);
    }

    .empty-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 8px;
    }
  `;

  render() {
    return html`
      <div class="layout">
        <sidebar-nav
          currentRoute="/"
          .projectCounts=${this.projectCounts}
        ></sidebar-nav>

        <main class="main">
          <header class="header">
            <h1>All Projects</h1>
            <p class="description">
              Design projects tracked through research, concepts, production, and QA
            </p>
          </header>

          ${this.loading ? html`
            <div class="loading">Loading projects...</div>
          ` : this.projects.length === 0 ? html`
            <div class="empty">
              <div class="empty-title">No projects yet</div>
              <p>Create your first design project to get started</p>
            </div>
          ` : html`
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
