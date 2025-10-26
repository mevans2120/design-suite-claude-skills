(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis,I=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,R=Symbol(),q=new WeakMap;let X=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==R)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(I&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&q.set(e,t))}return t}toString(){return this.cssText}};const ot=o=>new X(typeof o=="string"?o:o+"",void 0,R),$=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((s,r,i)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[i+1],o[0]);return new X(e,o,R)},at=(o,t)=>{if(I)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),r=O.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,o.appendChild(s)}},B=I?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ot(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:nt,defineProperty:ct,getOwnPropertyDescriptor:lt,getOwnPropertyNames:dt,getOwnPropertySymbols:pt,getPrototypeOf:ht}=Object,T=globalThis,W=T.trustedTypes,ut=W?W.emptyScript:"",vt=T.reactiveElementPolyfillSupport,E=(o,t)=>o,N={toAttribute(o,t){switch(t){case Boolean:o=o?ut:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},tt=(o,t)=>!nt(o,t),F={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:tt};Symbol.metadata??=Symbol("metadata"),T.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=F){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&ct(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:i}=lt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){const d=r?.call(this);i?.call(this,a),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??F}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const t=ht(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,s=[...dt(e),...pt(e)];for(const r of s)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(B(r))}else t!==void 0&&e.push(B(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const i=(s.converter?.toAttribute!==void 0?s.converter:N).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const i=s.getPropertyOptions(r),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:N;this._$Em=r;const d=a.fromAttribute(e,i.type);this[r]=d??this._$Ej?.get(r)??d,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){const r=this.constructor,i=this[t];if(s??=r.getPropertyOptions(t),!((s.hasChanged??tt)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:i},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),i!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,i]of s){const{wrapped:a}=i,d=this[r];a!==!0||this._$AL.has(r)||d===void 0||this.C(r,void 0,i,d)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[E("elementProperties")]=new Map,_[E("finalized")]=new Map,vt?.({ReactiveElement:_}),(T.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,D=H.trustedTypes,G=D?D.createPolicy("lit-html",{createHTML:o=>o}):void 0,et="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+m,gt=`<${st}>`,y=document,k=()=>y.createComment(""),S=o=>o===null||typeof o!="object"&&typeof o!="function",L=Array.isArray,ft=o=>L(o)||typeof o?.[Symbol.iterator]=="function",M=`[ 	
\f\r]`,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,Y=/>/g,b=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),J=/'/g,Q=/"/g,rt=/^(?:script|style|textarea|title)$/i,mt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),c=mt(1),w=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Z=new WeakMap,x=y.createTreeWalker(y,129);function it(o,t){if(!L(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(t):t}const bt=(o,t)=>{const e=o.length-1,s=[];let r,i=t===2?"<svg>":t===3?"<math>":"",a=A;for(let d=0;d<e;d++){const n=o[d];let p,u,l=-1,g=0;for(;g<n.length&&(a.lastIndex=g,u=a.exec(n),u!==null);)g=a.lastIndex,a===A?u[1]==="!--"?a=K:u[1]!==void 0?a=Y:u[2]!==void 0?(rt.test(u[2])&&(r=RegExp("</"+u[2],"g")),a=b):u[3]!==void 0&&(a=b):a===b?u[0]===">"?(a=r??A,l=-1):u[1]===void 0?l=-2:(l=a.lastIndex-u[2].length,p=u[1],a=u[3]===void 0?b:u[3]==='"'?Q:J):a===Q||a===J?a=b:a===K||a===Y?a=A:(a=b,r=void 0);const f=a===b&&o[d+1].startsWith("/>")?" ":"";i+=a===A?n+gt:l>=0?(s.push(p),n.slice(0,l)+et+n.slice(l)+m+f):n+m+(l===-2?d:f)}return[it(o,i+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class C{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let i=0,a=0;const d=t.length-1,n=this.parts,[p,u]=bt(t,e);if(this.el=C.createElement(p,s),x.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=x.nextNode())!==null&&n.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(const l of r.getAttributeNames())if(l.endsWith(et)){const g=u[a++],f=r.getAttribute(l).split(m),z=/([.?@])?(.*)/.exec(g);n.push({type:1,index:i,name:z[2],strings:f,ctor:z[1]==="."?yt:z[1]==="?"?$t:z[1]==="@"?_t:U}),r.removeAttribute(l)}else l.startsWith(m)&&(n.push({type:6,index:i}),r.removeAttribute(l));if(rt.test(r.tagName)){const l=r.textContent.split(m),g=l.length-1;if(g>0){r.textContent=D?D.emptyScript:"";for(let f=0;f<g;f++)r.append(l[f],k()),x.nextNode(),n.push({type:2,index:++i});r.append(l[g],k())}}}else if(r.nodeType===8)if(r.data===st)n.push({type:2,index:i});else{let l=-1;for(;(l=r.data.indexOf(m,l+1))!==-1;)n.push({type:7,index:i}),l+=m.length-1}i++}}static createElement(t,e){const s=y.createElement("template");return s.innerHTML=t,s}}function j(o,t,e=o,s){if(t===w)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl;const i=S(t)?void 0:t._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(o),r._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=j(o,r._$AS(o,t.values),r,s)),t}class xt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??y).importNode(e,!0);x.currentNode=r;let i=x.nextNode(),a=0,d=0,n=s[0];for(;n!==void 0;){if(a===n.index){let p;n.type===2?p=new P(i,i.nextSibling,this,t):n.type===1?p=new n.ctor(i,n.name,n.strings,this,t):n.type===6&&(p=new wt(i,this,t)),this._$AV.push(p),n=s[++d]}a!==n?.index&&(i=x.nextNode(),a++)}return x.currentNode=y,r}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class P{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=j(this,t,e),S(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ft(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=C.createElement(it(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{const i=new xt(r,this),a=i.u(this.options);i.p(e),this.T(a),this._$AH=i}}_$AC(t){let e=Z.get(t.strings);return e===void 0&&Z.set(t.strings,e=new C(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const i of t)r===e.length?e.push(s=new P(this.O(k()),this.O(k()),this,this.options)):s=e[r],s._$AI(i),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class U{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,i){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,r){const i=this.strings;let a=!1;if(i===void 0)t=j(this,t,e,0),a=!S(t)||t!==this._$AH&&t!==w,a&&(this._$AH=t);else{const d=t;let n,p;for(t=i[0],n=0;n<i.length-1;n++)p=j(this,d[s+n],e,n),p===w&&(p=this._$AH[n]),a||=!S(p)||p!==this._$AH[n],p===h?t=h:t!==h&&(t+=(p??"")+i[n+1]),this._$AH[n]=p}a&&!r&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class yt extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}}class $t extends U{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}}class _t extends U{constructor(t,e,s,r,i){super(t,e,s,r,i),this.type=5}_$AI(t,e=this){if((t=j(this,t,e,0)??h)===w)return;const s=this._$AH,r=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==h&&(s===h||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class wt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){j(this,t)}}const jt=H.litHtmlPolyfillSupport;jt?.(C,P),(H.litHtmlVersions??=[]).push("3.3.1");const At=(o,t,e)=>{const s=e?.renderBefore??t;let r=s._$litPart$;if(r===void 0){const i=e?.renderBefore??null;s._$litPart$=r=new P(t.insertBefore(k(),i),i,void 0,e??{})}return r._$AI(o),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=globalThis;class v extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=At(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}}v._$litElement$=!0,v.finalized=!0,V.litElementHydrateSupport?.({LitElement:v});const Et=V.litElementPolyfillSupport;Et?.({LitElement:v});(V.litElementVersions??=[]).push("4.2.1");class kt extends v{static properties={currentRoute:{type:String},projectCounts:{type:Object}};static styles=$`
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
  `;constructor(){super(),this.currentRoute="/",this.projectCounts={all:0,research:0,concepts:0,production:0,qa:0}}_handleNavClick(t){window.history.pushState({},"",t),window.dispatchEvent(new PopStateEvent("popstate"))}_handleBackClick(){window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))}render(){const t=this.currentRoute.startsWith("/project/");return c`
      <div class="logo">Design Suite</div>

      ${t?c`
        <div class="back-nav" @click=${this._handleBackClick}>
          <span>←</span>
          <span>Back to Projects</span>
        </div>
      `:""}

      <nav>
        <div class="nav-section">
          <div class="nav-section-title">Workspace</div>
          <div
            class="nav-item ${this.currentRoute==="/"?"active":""}"
            @click=${()=>this._handleNavClick("/")}
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
    `}}customElements.define("sidebar-nav",kt);class St extends v{static properties={project:{type:Object}};static styles=$`
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
  `;_handleClick(){this.dispatchEvent(new CustomEvent("project-click",{detail:{projectId:this.project.id},bubbles:!0,composed:!0}))}render(){return this.project?c`
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
            <span class="meta-value">${this.project.deliverables?.length||0}</span>
          </div>
          <div class="meta-item">
            <span>Updated:</span>
            <span class="meta-value">${this._formatDate(this.project.lastUpdated)}</span>
          </div>
        </div>
      </div>
    `:c``}_formatDate(t){const e=new Date(t),r=Math.abs(new Date-e),i=Math.ceil(r/(1e3*60*60*24));return i===0?"Today":i===1?"Yesterday":i<7?`${i} days ago`:i<30?`${Math.floor(i/7)} weeks ago`:e.toLocaleDateString()}}customElements.define("project-card",St);class Ct extends v{static properties={projects:{type:Array},loading:{type:Boolean},projectCounts:{type:Object}};constructor(){super(),this.projects=[],this.loading=!0,this.projectCounts={all:0,research:0,concepts:0,production:0,qa:0},this._loadProjects()}async _loadProjects(){try{const e=await(await fetch("/src/data/projects.json")).json();this.projects=e.projects,this._calculateCounts()}catch(t){console.error("Failed to load projects:",t)}finally{this.loading=!1}}_calculateCounts(){this.projectCounts={all:this.projects.length,research:this.projects.filter(t=>t.status==="research").length,concepts:this.projects.filter(t=>t.status==="concepts").length,production:this.projects.filter(t=>t.status==="production").length,qa:this.projects.filter(t=>t.status==="qa").length}}_handleProjectClick(t){const{projectId:e}=t.detail;window.history.pushState({},"",`/project/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))}static styles=$`
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
  `;render(){return c`
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

          ${this.loading?c`
            <div class="loading">Loading projects...</div>
          `:this.projects.length===0?c`
            <div class="empty">
              <div class="empty-title">No projects yet</div>
              <p>Create your first design project to get started</p>
            </div>
          `:c`
            <div class="projects-grid">
              ${this.projects.map(t=>c`
                <project-card
                  .project=${t}
                  @project-click=${this._handleProjectClick}
                ></project-card>
              `)}
            </div>
          `}
        </main>
      </div>
    `}}customElements.define("projects-list-view",Ct);class Pt extends v{static properties={deliverable:{type:Object}};static styles=$`
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

    .view-button:focus {
      outline: 2px solid var(--color-brand-primary);
      outline-offset: 2px;
    }
  `;_renderVisual(){const{visualAssets:t,type:e}=this.deliverable;return t?.colorPalette?c`
        <div class="color-palette">
          ${t.colorPalette.map(s=>c`
            <div class="color-swatch" style="background: ${s};"></div>
          `)}
        </div>
      `:t?.preview&&typeof t.preview=="string"&&t.preview.startsWith("/")?c`<img src="${t.preview}" alt="${this.deliverable.title}" />`:c`<span class="visual-placeholder">Text Document</span>`}_handleViewFile(){this.dispatchEvent(new CustomEvent("view-file",{detail:{filePath:this.deliverable.filePath},bubbles:!0,composed:!0}))}render(){return this.deliverable?c`
      <div class="card">
        <div class="visual">
          ${this._renderVisual()}
        </div>

        <div class="content">
          <div class="header">
            <h3 class="title">${this.deliverable.title}</h3>
            <span class="skill-badge ${this.deliverable.skill}">
              ${this.deliverable.skill.replace("design-","")}
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
    `:c``}_formatDate(t){const e=new Date(t),r=Math.abs(new Date-e),i=Math.ceil(r/(1e3*60*60*24));return i===0?"today":i===1?"yesterday":i<7?`${i} days ago`:e.toLocaleDateString()}}customElements.define("deliverable-card",Pt);class zt extends v{static properties={title:{type:String},items:{type:Array},itemType:{type:String},expanded:{type:Boolean},previewCount:{type:Number}};static styles=$`
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
  `;constructor(){super(),this.title="",this.items=[],this.itemType="principles",this.expanded=!1,this.previewCount=3}_toggleExpand(){this.expanded=!this.expanded}_getDisplayItems(){return this.expanded?this.items:this.items.slice(0,this.previewCount)}_renderPrinciples(){const t=this._getDisplayItems();return c`
      <div class="principles-grid">
        ${t.map(e=>c`
          <div class="principle-card">
            <h4 class="principle-title">${e.title}</h4>
            <p class="principle-description">${e.description}</p>
          </div>
        `)}
      </div>
    `}_renderInsights(){const t=this._getDisplayItems();return c`
      <div class="insights-list">
        ${t.map((e,s)=>c`
          <div class="insight-item">
            <div class="insight-number">${s+1}</div>
            <div class="insight-text">${e}</div>
          </div>
        `)}
      </div>
    `}render(){return c`
      <div class="section">
        <div class="header">
          <h3 class="title">${this.title}</h3>
          ${this.items.length>this.previewCount?c`
            <button class="expand-button" @click=${this._toggleExpand}>
              ${this.expanded?"Show Less":`Show All (${this.items.length})`}
            </button>
          `:""}
        </div>

        <div class="content ${this.expanded?"expanded":"collapsed"}">
          ${this.itemType==="principles"?this._renderPrinciples():this._renderInsights()}
        </div>
      </div>
    `}}customElements.define("context-section",zt);class Ot extends v{static properties={project:{type:Object},projectId:{type:String},loading:{type:Boolean}};constructor(){super(),this.project=null,this.projectId="",this.loading=!0}connectedCallback(){super.connectedCallback(),this._loadProject()}async _loadProject(){try{const e=await(await fetch("/src/data/projects.json")).json();this.project=e.projects.find(s=>s.id===this.projectId),this.project||console.error("Project not found:",this.projectId)}catch(t){console.error("Failed to load project:",t)}finally{this.loading=!1}}_handleViewFile(t){const{filePath:e}=t.detail;console.log("View file:",e),alert(`Opening file: ${e}

In production, this would open an inline file viewer.`)}static styles=$`
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
  `;render(){return this.loading?c`
        <div class="layout">
          <sidebar-nav currentRoute="/project/${this.projectId}"></sidebar-nav>
          <main class="main">
            <div class="loading">Loading project...</div>
          </main>
        </div>
      `:this.project?c`
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

          ${this.project.designGoals&&this.project.designGoals.length>0?c`
            <div class="goals-section">
              <h2 class="goals-title">Design Goals</h2>
              <div class="goals-list">
                ${this.project.designGoals.map(t=>c`
                  <div class="goal-item">
                    <span class="goal-bullet">•</span>
                    <span>${t}</span>
                  </div>
                `)}
              </div>
            </div>
          `:""}

          ${this.project.designPrinciples&&this.project.designPrinciples.length>0?c`
            <context-section
              title="Design Principles"
              .items=${this.project.designPrinciples}
              itemType="principles"
            ></context-section>
          `:""}

          ${this.project.keyInsights&&this.project.keyInsights.length>0?c`
            <context-section
              title="Key Insights"
              .items=${this.project.keyInsights}
              itemType="insights"
            ></context-section>
          `:""}

          <section class="deliverables-section">
            <div class="section-header">
              <h2 class="section-title">Deliverables</h2>
              <span class="count">${this.project.deliverables?.length||0} items</span>
            </div>

            ${this.project.deliverables&&this.project.deliverables.length>0?c`
              <div class="deliverables-grid">
                ${this.project.deliverables.filter(t=>t.visible!==!1).map(t=>c`
                    <deliverable-card
                      .deliverable=${t}
                      @view-file=${this._handleViewFile}
                    ></deliverable-card>
                  `)}
              </div>
            `:c`
              <p style="color: var(--color-text-secondary)">No deliverables yet</p>
            `}
          </section>
        </main>
      </div>
    `:c`
        <div class="layout">
          <sidebar-nav currentRoute="/project/${this.projectId}"></sidebar-nav>
          <main class="main">
            <div class="error">
              <div class="error-title">Project not found</div>
              <p>The project you're looking for doesn't exist.</p>
            </div>
          </main>
        </div>
      `}}customElements.define("project-detail-view",Ot);class Dt extends v{static properties={route:{type:String}};static styles=$`
    :host {
      display: block;
      min-height: 100vh;
      background: #0a0a0a;
      color: #f3f4f6;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
  `;constructor(){super(),this.route=window.location.pathname,window.addEventListener("popstate",()=>{this.route=window.location.pathname})}_renderView(){if(this.route.startsWith("/project/")){const t=this.route.split("/").pop();return c`<project-detail-view .projectId="${t}"></project-detail-view>`}return c`<projects-list-view></projects-list-view>`}render(){return this._renderView()}}customElements.define("design-dashboard-app",Dt);document.getElementById("app").innerHTML="<design-dashboard-app></design-dashboard-app>";
