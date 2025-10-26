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

    .expand-button:focus {
      outline: 2px solid var(--color-brand-primary);
      outline-offset: 2px;
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
      max-height: 500px;
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
