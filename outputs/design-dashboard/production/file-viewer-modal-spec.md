# File Viewer Modal - Complete State Specifications

**Component**: File Viewer Modal
**Added**: October 22, 2025
**Purpose**: Inline viewing of deliverable files without leaving project context

---

## Component Overview

The file viewer modal displays deliverable content (markdown, HTML, images) in an overlay, allowing users to review files without navigation. Includes keyboard shortcuts and sequential navigation between deliverables.

---

## All States

### 1. Modal Closed (Default)
**When**: User hasn't clicked "View File" yet
**Visual**:
- Modal not rendered in DOM
- Main content at full opacity
- No backdrop

**Code**:
```javascript
.file-viewer-modal {
  display: none;
}
```

---

### 2. Modal Opening (Transition)
**When**: User clicks "View File" button
**Duration**: 200ms
**Visual**:
- Backdrop fades in (0 → 0.8 opacity)
- Backdrop blur applies (0 → 4px)
- Main content dims (1.0 → 0.3 opacity)
- Modal slides up from below (translateY(20px) → 0)
- Modal fades in (0 → 1 opacity)

**Code**:
```css
@keyframes modalBackdropIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    backdrop-filter: blur(4px);
  }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-backdrop {
  animation: modalBackdropIn 200ms ease-out;
}

.file-viewer {
  animation: modalSlideUp 200ms ease-out;
}
```

---

### 3. Modal Open - Content Loaded
**When**: Modal opened and file content loaded successfully
**Visual**:
- Backdrop: rgba(0, 0, 0, 0.8) with 4px blur
- Main content: opacity 0.3, pointer-events none
- Modal: full opacity, centered
- Content area: scrollable if needed
- Close button: visible
- Navigation buttons: enabled/disabled based on position

**Structure**:
```
┌─────────────────────────────────────┐
│ Modal Header                        │
│ - Icon, Title, Metadata             │
│ - Actions (Download, Share, Close) │
├─────────────────────────────────────┤
│ Modal Content (scrollable)          │
│ - Rendered file content             │
│ - Markdown, HTML, or image display  │
├─────────────────────────────────────┤
│ Modal Footer                        │
│ - File path                         │
│ - Previous/Next navigation          │
└─────────────────────────────────────┘
```

**Code**:
```css
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.file-viewer {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.main-content {
  opacity: 0.3;
  pointer-events: none;
}
```

---

### 4. Modal Loading State
**When**: Modal opened but file content still loading
**Visual**:
- Modal header: visible with file metadata
- Modal content area: skeleton placeholder or spinner
- Navigation buttons: disabled
- Close button: enabled

**Content Area**:
```html
<div class="modal-content">
  <div class="loading-state">
    <div class="spinner"></div>
    <p>Loading file...</p>
  </div>
</div>
```

**Spinner Animation**:
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #2a2a2a;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

### 5. Modal Error State
**When**: File failed to load or parse
**Visual**:
- Modal header: visible
- Content area: error message with retry option
- Navigation buttons: enabled (can skip to next file)
- Close button: enabled

**Content Area**:
```html
<div class="modal-content">
  <div class="error-state">
    <div class="error-icon">⚠️</div>
    <h3>Failed to load file</h3>
    <p>The file could not be loaded or displayed.</p>
    <button class="retry-button">Retry</button>
    <a href="/outputs/..." class="download-link">Download file instead</a>
  </div>
</div>
```

**Styling**:
```css
.error-state {
  text-align: center;
  padding: 60px 40px;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-state h3 {
  font-size: 20px;
  color: #ef4444;
  margin-bottom: 8px;
}

.error-state p {
  color: #9ca3af;
  margin-bottom: 24px;
}
```

---

### 6. Navigation Button States

#### Previous Button
**States**:
- **Disabled** (first deliverable): opacity 0.5, cursor not-allowed
- **Enabled**: default styling
- **Hover**: background #1d4ed8
- **Active**: background #1e40af

#### Next Button
**States**:
- **Disabled** (last deliverable): opacity 0.5, cursor not-allowed
- **Enabled**: default styling
- **Hover**: background #1d4ed8
- **Active**: background #1e40af

**Code**:
```css
.nav-btn {
  padding: 6px 12px;
  background: #2563eb;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms;
}

.nav-btn:hover:not(:disabled) {
  background: #1d4ed8;
}

.nav-btn:active:not(:disabled) {
  background: #1e40af;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

### 7. Close Button States

**States**:
- **Default**: transparent background, gray border
- **Hover**: background #2a2a2a, red border, red text
- **Focus**: 2px blue outline
- **Active**: background #3a3a3a

**Code**:
```css
.close-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #9ca3af;
  font-size: 20px;
  cursor: pointer;
  transition: all 150ms;
}

.close-btn:hover {
  background: #2a2a2a;
  border-color: #ef4444;
  color: #ef4444;
}

.close-btn:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

---

### 8. Modal Closing (Transition)
**When**: User clicks close, presses Esc, or clicks backdrop
**Duration**: 200ms
**Visual**:
- Modal slides down (translateY(0) → 20px)
- Modal fades out (1 → 0 opacity)
- Backdrop fades out (0.8 → 0 opacity)
- Backdrop blur removes
- Main content restores (0.3 → 1.0 opacity)

**Code**:
```css
@keyframes modalSlideDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.file-viewer.closing {
  animation: modalSlideDown 200ms ease-in;
}
```

---

### 9. Keyboard Navigation States

**Active Keyboard Shortcuts**:
- **Esc**: Close modal
- **Arrow Left**: Previous deliverable
- **Arrow Right**: Next deliverable
- **Tab**: Navigate through modal elements
- **Shift+Tab**: Navigate backward

**Visual Feedback**:
- Keyboard hint tooltip visible at bottom-right
- Focus outlines on all interactive elements
- Focus trapped inside modal (can't Tab to background)

**Keyboard Hint**:
```html
<div class="keyboard-hint">
  <span class="key">Esc</span> Close •
  <span class="key">←</span><span class="key">→</span> Navigate
</div>
```

**Focus Trap**:
```javascript
// When modal opens, trap focus
const modal = document.querySelector('.file-viewer');
const focusableElements = modal.querySelectorAll(
  'button, a, input, [tabindex]:not([tabindex="-1"])'
);
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});
```

---

### 10. Content Type Variants

#### Markdown Files
**Visual**:
- Rendered HTML with styled headings, lists, blockquotes
- Syntax highlighting for code blocks (optional)
- Line height: 1.6 for readability

**Example**:
```css
.file-content h1 { font-size: 32px; border-bottom: 1px solid #2a2a2a; }
.file-content h2 { font-size: 24px; color: #2563eb; }
.file-content p { line-height: 1.6; margin-bottom: 16px; }
.file-content code { background: #0a0a0a; padding: 2px 6px; border-radius: 4px; }
```

#### HTML Files (Mood Boards, Wireframes)
**Visual**:
- Full HTML rendered in iframe or div
- Responsive sizing
- Interactive elements work (hover, click)

**Code**:
```html
<div class="modal-content">
  <iframe src="/outputs/..." frameborder="0" class="html-viewer"></iframe>
</div>
```

```css
.html-viewer {
  width: 100%;
  height: 600px;
  border: none;
  background: white;
}
```

#### Images
**Visual**:
- Image centered in content area
- Max-width: 100%
- Object-fit: contain
- Zoom functionality (optional)

**Code**:
```html
<div class="modal-content">
  <img src="/outputs/..." alt="..." class="image-viewer">
</div>
```

```css
.image-viewer {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
```

---

### 11. Responsive States

#### Desktop (1024px+)
- Modal: max-width 1000px
- Content padding: 32px
- Full keyboard hint visible

#### Tablet (768px - 1024px)
- Modal: max-width 800px
- Content padding: 24px
- Keyboard hint: abbreviated

#### Mobile (< 768px)
- Modal: full width, margin 20px
- Content padding: 20px
- Navigation buttons: stacked vertically
- Keyboard hint: hidden
- Close button: larger (44x44px) for touch

**Code**:
```css
@media (max-width: 768px) {
  .modal-backdrop {
    padding: 20px;
  }

  .file-viewer {
    max-height: 100vh;
  }

  .modal-content {
    padding: 20px;
  }

  .modal-footer {
    flex-direction: column;
    gap: 12px;
  }

  .nav-buttons {
    width: 100%;
    justify-content: space-between;
  }

  .close-btn {
    width: 44px;
    height: 44px;
  }

  .keyboard-hint {
    display: none;
  }
}
```

---

### 12. Accessibility States

#### Screen Reader Announcements
**On modal open**:
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
  <h2 id="modal-title">User Personas</h2>
  <p id="modal-description">Design Research deliverable created Oct 22, 2025</p>
</div>
```

**Live region for navigation**:
```html
<div aria-live="polite" aria-atomic="true" class="sr-only">
  Viewing file 3 of 10: Design Principles
</div>
```

#### Focus Management
**On open**:
- Focus moves to modal
- Focus trapped inside modal
- Background not focusable

**On close**:
- Focus returns to "View File" button that opened modal
- Modal removed from DOM

**Code**:
```javascript
let previousFocus;

function openModal(deliverableId) {
  previousFocus = document.activeElement;
  // Show modal
  modal.querySelector('.close-btn').focus();
}

function closeModal() {
  // Hide modal
  if (previousFocus) {
    previousFocus.focus();
  }
}
```

---

## State Transition Diagram

```
[Closed]
   ↓ (click View File)
[Opening Animation] → [Loading]
   ↓                      ↓ (success)    ↓ (error)
[Open - Loaded]    [Error State]
   ↓ (next/prev)          ↓ (retry)
[Loading]                 ↓
   ↓                      ↓
[Open - Loaded]    [Loading]
   ↓ (Esc/close/backdrop)
[Closing Animation]
   ↓
[Closed]
```

---

## Missing from Current Spec - Now Added ✅

1. ✅ Modal open/close states
2. ✅ Modal opening/closing transitions
3. ✅ Loading state (skeleton/spinner)
4. ✅ Error state (failed to load file)
5. ✅ Navigation button disabled states
6. ✅ Close button hover (red) state
7. ✅ Keyboard navigation states
8. ✅ Focus trap implementation
9. ✅ Content type variants (markdown, HTML, images)
10. ✅ Responsive modal states (mobile, tablet, desktop)
11. ✅ Accessibility states (screen reader, focus management)
12. ✅ Previous focus restoration

---

## Implementation Checklist

For developers implementing the file viewer modal:

- [ ] Modal backdrop with blur effect
- [ ] Modal slide-up animation (200ms)
- [ ] Close on Esc keypress
- [ ] Close on backdrop click
- [ ] Close button with red hover state
- [ ] Previous/Next navigation buttons
- [ ] Disable nav buttons at boundaries (first/last)
- [ ] Loading state with spinner
- [ ] Error state with retry option
- [ ] Focus trap (Tab cycles within modal)
- [ ] Focus restoration on close
- [ ] Keyboard shortcuts (Esc, arrows)
- [ ] Keyboard hint tooltip
- [ ] Screen reader announcements
- [ ] Responsive sizing (mobile, tablet, desktop)
- [ ] Content type handling (markdown, HTML, images)
- [ ] Live region for navigation announcements

---

**All states now fully specified!** This covers every possible state the file viewer modal can be in.
