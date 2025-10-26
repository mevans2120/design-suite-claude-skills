import { LitElement, html, css } from 'lit';

export class DeliverableCard extends LitElement {
  static properties = {
    deliverable: { type: Object },
    textPreview: { type: String, state: true }
  };

  constructor() {
    super();
    this.textPreview = null;
  }

  async updated(changedProperties) {
    if (changedProperties.has('deliverable') && this.deliverable) {
      await this._loadTextPreview();
    }
  }

  async _loadTextPreview() {
    const { filePath, visualAssets } = this.deliverable;

    // Skip if has visual assets or no file path
    if (visualAssets?.colorPalette || visualAssets?.preview || !filePath) {
      return;
    }

    // Only load for text/markdown files
    if (!filePath.match(/\.(md|txt)$/i)) {
      return;
    }

    try {
      // Convert absolute paths to relative from dashboard root
      // /outputs/... needs to become ../outputs/...
      let fetchPath = filePath;
      if (filePath.startsWith('/outputs/')) {
        fetchPath = '..' + filePath;
      }

      const response = await fetch(fetchPath);
      if (!response.ok) return;

      const text = await response.text();
      // Get first ~300 characters of content, skip frontmatter and heading markers
      const content = text
        .replace(/^---[\s\S]*?---\n/, '') // Remove YAML frontmatter
        .replace(/^#+\s+/gm, '') // Remove markdown headers
        .trim();
      this.textPreview = content.substring(0, 400);
    } catch (error) {
      // Silently fail - will show placeholder
      console.log('Failed to load preview for:', filePath, error);
      this.textPreview = null;
    }
  }

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

    .text-preview {
      padding: 20px;
      font-size: 13px;
      line-height: 1.6;
      color: var(--color-text-secondary);
      text-align: left;
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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

    .view-button:focus {
      outline: 2px solid var(--color-brand-primary);
      outline-offset: 2px;
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
    if (visualAssets?.preview && typeof visualAssets.preview === 'string' && visualAssets.preview.startsWith('/')) {
      return html`<img src="${visualAssets.preview}" alt="${this.deliverable.title}" />`;
    }

    // Text preview
    if (this.textPreview) {
      return html`<div class="text-preview">${this.textPreview}...</div>`;
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
