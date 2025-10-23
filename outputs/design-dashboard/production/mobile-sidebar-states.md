# Mobile Sidebar States Specification

**Component**: Sidebar Navigation (Mobile)
**Breakpoint**: < 768px
**Added**: October 22, 2025

---

## Desktop vs Mobile Behavior

**Desktop (≥768px)**: Sidebar fixed, always visible
**Mobile (<768px)**: Sidebar hidden, hamburger menu reveals overlay

---

## All Mobile States

### 1. Closed (Default)
**Visual**:
- Hamburger menu icon visible in top-left
- Sidebar not visible
- No backdrop
- Main content full width

**Code**:
```css
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -240px; /* Off screen */
    transition: left 250ms ease;
    z-index: 1001;
  }

  .hamburger-btn {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1002;
  }
}
```

---

### 2. Opening (Transition)
**Duration**: 250ms
**Visual**:
- Backdrop fades in (0 → 0.6 opacity)
- Sidebar slides in from left (-240px → 0)
- Hamburger icon transforms to X

**Animation**:
```css
.sidebar.opening {
  left: 0;
  transition: left 250ms ease-out;
}

.backdrop {
  opacity: 0;
  animation: backdropFadeIn 250ms ease-out forwards;
}

@keyframes backdropFadeIn {
  to { opacity: 0.6; }
}

.hamburger-btn.open .icon {
  transform: rotate(90deg);
}
```

---

### 3. Open
**Visual**:
- Sidebar fully visible (left: 0)
- Backdrop visible (rgba(0, 0, 0, 0.6))
- Hamburger icon shows X
- Main content still visible but dimmed
- Body scroll locked

**Code**:
```css
.sidebar.open {
  left: 0;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
}

.backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

body.modal-open {
  overflow: hidden; /* Prevent scroll */
}
```

---

### 4. Closing (Transition)
**Duration**: 250ms
**Visual**:
- Backdrop fades out
- Sidebar slides left (0 → -240px)
- Hamburger X transforms back to menu icon

**Animation**:
```css
.sidebar.closing {
  left: -240px;
  transition: left 250ms ease-in;
}

.backdrop.closing {
  opacity: 0;
  transition: opacity 250ms ease-in;
}
```

---

### 5. Hamburger Button States

#### Closed (Menu Icon)
```html
<button class="hamburger-btn" aria-label="Open menu" aria-expanded="false">
  <svg class="icon">
    <line x1="6" y1="8" x2="18" y2="8" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="6" y1="16" x2="18" y2="16" />
  </svg>
</button>
```

#### Open (X Icon)
```html
<button class="hamburger-btn open" aria-label="Close menu" aria-expanded="true">
  <svg class="icon">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </svg>
</button>
```

**Styling**:
```css
.hamburger-btn {
  width: 44px;
  height: 44px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms;
}

.hamburger-btn:hover {
  background: #2a2a2a;
  border-color: #3a3a3a;
}

.hamburger-btn .icon {
  width: 24px;
  height: 24px;
  stroke: #f3f4f6;
  stroke-width: 2;
  transition: transform 250ms;
}

.hamburger-btn.open .icon {
  transform: rotate(90deg);
}
```

---

### 6. Close Triggers

**Ways to close sidebar**:
1. Click hamburger X button
2. Click backdrop
3. Press Escape key
4. Click any nav item (navigate and close)
5. Swipe left (optional touch gesture)

**Code**:
```javascript
// Close on backdrop click
backdrop.addEventListener('click', closeSidebar);

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    closeSidebar();
  }
});

// Close on nav item click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    closeSidebar();
    // Navigate to route
  });
});

// Close on hamburger click (toggle)
hamburgerBtn.addEventListener('click', toggleSidebar);
```

---

### 7. Accessibility States

**ARIA Attributes**:
```html
<button
  class="hamburger-btn"
  aria-label="Open navigation menu"
  aria-expanded="false"
  aria-controls="sidebar-nav"
>

<nav
  id="sidebar-nav"
  class="sidebar"
  aria-label="Main navigation"
  aria-hidden="true"
>
```

**When Open**:
```html
<button aria-expanded="true" aria-label="Close navigation menu">
<nav aria-hidden="false">
```

**Focus Management**:
```javascript
function openSidebar() {
  previousFocus = document.activeElement;
  sidebar.classList.add('open');
  sidebar.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');

  // Focus first nav item
  const firstNavItem = sidebar.querySelector('.nav-item');
  firstNavItem?.focus();
}

function closeSidebar() {
  sidebar.classList.add('closing');

  setTimeout(() => {
    sidebar.classList.remove('open', 'closing');
    sidebar.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');

    // Restore focus
    previousFocus?.focus();
  }, 250);
}
```

---

### 8. Touch Gestures (Optional Enhancement)

**Swipe to Open** (from left edge):
```javascript
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;

  // Only detect if near left edge
  if (touchStartX < 20) {
    // Track swipe
  }
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;

  // Swipe right from edge
  if (touchEndX - touchStartX > 50) {
    openSidebar();
  }
});
```

**Swipe to Close** (when sidebar open):
```javascript
sidebar.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const touchStartX = touchStart; // Stored from touchstart

  // Swipe left
  if (touchStartX - touchEndX > 50) {
    closeSidebar();
  }
});
```

---

### 9. Tablet Behavior (768px - 1024px)

**Option A**: Keep sidebar visible, make narrower
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .sidebar {
    width: 200px; /* Narrower than desktop */
    left: 0; /* Always visible */
  }

  .main {
    margin-left: 200px;
  }

  .hamburger-btn {
    display: none; /* Not needed */
  }
}
```

**Option B**: Keep hamburger pattern (recommended)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  /* Same as mobile - use hamburger */
  /* Gives more screen real estate */
}
```

---

## State Transition Diagram (Mobile)

```
[Closed]
   ↓ (hamburger click / swipe right)
[Opening Animation]
   ↓
[Open]
   ↓ (backdrop click / Esc / nav click / swipe left)
[Closing Animation]
   ↓
[Closed]
```

---

## Implementation Checklist

- [ ] Hamburger button (44x44px touch target)
- [ ] Sidebar slide-in animation (250ms)
- [ ] Backdrop with 0.6 opacity
- [ ] Close on backdrop click
- [ ] Close on Escape key
- [ ] Close on nav item click
- [ ] Hamburger icon → X transition
- [ ] Lock body scroll when open
- [ ] Focus management (trap, restore)
- [ ] ARIA attributes (expanded, hidden, controls)
- [ ] Touch gestures (optional: swipe open/close)
- [ ] Reduced motion support

---

**Mobile sidebar states now fully specified!**
