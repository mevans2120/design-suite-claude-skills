import { LitElement, html, css } from 'lit';

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
      margin-bottom: 4px;
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

    .back-nav {
      margin-bottom: 24px;
      padding: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--color-text-secondary);
      cursor: pointer;
      border-radius: 6px;
      font-size: 14px;
      transition: all var(--transition-normal);
    }

    .back-nav:hover {
      background: var(--color-bg-tertiary);
      color: var(--color-text-primary);
    }

    .footer {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid var(--color-border);
    }

    .footer-title {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
      padding: 0 8px;
    }

    .footer-link {
      display: block;
      padding: 6px 8px;
      font-size: 13px;
      color: var(--color-text-secondary);
      text-decoration: none;
      border-radius: 6px;
      transition: all var(--transition-normal);
      margin-bottom: 4px;
    }

    .footer-link:hover {
      background: var(--color-bg-tertiary);
      color: var(--color-brand-primary);
    }
  `;

  constructor() {
    super();
    this.currentRoute = '/';
    this.projectCounts = {
      all: 0,
      research: 0,
      concepts: 0,
      production: 0,
      qa: 0
    };
  }

  _handleNavClick(route) {
    window.history.pushState({}, '', route);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  _handleBackClick() {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    const isDetailView = this.currentRoute.startsWith('/project/');

    return html`
      <div class="logo">Design Suite</div>

      ${isDetailView ? html`
        <div class="back-nav" @click=${this._handleBackClick}>
          <span>←</span>
          <span>Back to Projects</span>
        </div>
      ` : ''}

      <nav>
        <div class="nav-section">
          <div class="nav-section-title">Workspace</div>
          <div
            class="nav-item ${this.currentRoute === '/' ? 'active' : ''}"
            @click=${() => this._handleNavClick('/')}
          >
            <span>All Projects</span>
            <span class="nav-item-count">${this.projectCounts.all}</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Phase</div>
          <div class="nav-item">
            <span>Research</span>
            <span class="nav-item-count">${this.projectCounts.research}</span>
          </div>
          <div class="nav-item">
            <span>Concepts</span>
            <span class="nav-item-count">${this.projectCounts.concepts}</span>
          </div>
          <div class="nav-item">
            <span>Production</span>
            <span class="nav-item-count">${this.projectCounts.production}</span>
          </div>
          <div class="nav-item">
            <span>QA</span>
            <span class="nav-item-count">${this.projectCounts.qa}</span>
          </div>
        </div>
      </nav>

      <div class="footer">
        <div class="footer-title">Related Tools</div>
        <a href="#" class="footer-link">PM Dashboard</a>
        <a href="#" class="footer-link">Engineering Dashboard</a>
      </div>
    `;
  }
}

customElements.define('sidebar-nav', SidebarNav);
