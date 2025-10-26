import { LitElement, html, css, unsafeCSS } from 'lit';
import './styles/global.css';
import './components/sidebar-nav.js';
import './views/projects-list.js';
import './views/project-detail.js';

class DesignDashboardApp extends LitElement {
  static properties = {
    route: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #0a0a0a;
      color: #f3f4f6;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
  `;

  constructor() {
    super();
    this.route = window.location.pathname;

    // Simple routing
    window.addEventListener('popstate', () => {
      this.route = window.location.pathname;
    });
  }

  _renderView() {
    if (this.route.startsWith('/project/')) {
      const projectId = this.route.split('/').pop();
      return html`<project-detail-view .projectId="${projectId}"></project-detail-view>`;
    }

    return html`<projects-list-view></projects-list-view>`;
  }

  render() {
    return this._renderView();
  }
}

customElements.define('design-dashboard-app', DesignDashboardApp);

// Mount app
document.getElementById('app').innerHTML = '<design-dashboard-app></design-dashboard-app>';
