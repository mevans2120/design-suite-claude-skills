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
      text-transform: capitalize;
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
