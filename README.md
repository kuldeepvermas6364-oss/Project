:root {
  --bg: #0b1020;
  --bg-soft: #121a2c;
  --panel: rgba(17, 25, 40, 0.88);
  --panel-strong: #111827;
  --line: rgba(148, 163, 184, 0.2);
  --text: #edf2ff;
  --muted: #95a4c0;
  --primary: #8b5cf6;
  --secondary: #22d3ee;
  --success: #34d399;
  --shadow: 0 24px 60px rgba(15, 23, 42, 0.32);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  background: radial-gradient(circle at top left, rgba(139, 92, 246, 0.18), transparent 25%),
    radial-gradient(circle at bottom right, rgba(34, 211, 238, 0.12), transparent 25%),
    var(--bg);
  color: var(--text);
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

img {
  max-width: 100%;
  display: block;
}

textarea {
  resize: vertical;
}

.page-shell {
  width: min(1500px, calc(100% - 32px));
  margin: 24px auto 40px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 22px;
  border: 1px solid var(--line);
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  font-size: 1.4rem;
  font-weight: 700;
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  font-size: 0.7rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.nav-item {
  border: 0;
  padding: 10px 14px;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  transition: 0.2s ease;
}

.nav-item.active,
.nav-item:hover {
  background: rgba(139, 92, 246, 0.14);
  color: var(--text);
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-input {
  min-width: 210px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
}

.icon-pill {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(148, 163, 184, 0.06);
  color: var(--text);
}

.logout-button {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
}

.mini-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f9a8d4, #a78bfa);
  font-size: 0.74rem;
  font-weight: 700;
}

.mini-avatar.small {
  width: 36px;
  height: 36px;
  font-size: 0.68rem;
}

.layout-grid {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr) 320px;
  gap: 22px;
  margin-top: 22px;
}

.sidebar,
.feed-column {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.card,
.panel,
.profile-card {
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid var(--line);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.profile-card {
  overflow: hidden;
}

.profile-cover {
  height: 100px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(34, 211, 238, 0.7));
}

.profile-body {
  padding: 0 18px 18px;
  margin-top: -26px;
}

.avatar-lg {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 4px solid rgba(15, 23, 42, 0.9);
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #fecdd3, #a78bfa);
  font-weight: 700;
}

.profile-body h2 {
  margin: 12px 0 4px;
  font-size: 1.3rem;
}

.profile-body p {
  margin: 0;
  color: var(--muted);
}

.stats-row {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  gap: 16px;
}

.stats-row div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stats-row strong {
  font-size: 1.1rem;
}

.stats-row span {
  color: var(--muted);
  font-size: 0.74rem;
}

.panel {
  padding: 18px 16px;
}

.panel-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.panel-title-row h3 {
  margin: 0;
  font-size: 1rem;
}

.panel-title-row span {
  color: var(--muted);
  font-size: 0.72rem;
}

.list,
.suggest-list,
.message-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list li,
.suggest-list li,
.message-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.list li {
  padding: 8px 10px;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.04);
}

.list li span,
.list li small {
  display: block;
}

.list li small {
  color: var(--muted);
}

.composer {
  padding: 18px;
}

.composer-header {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.composer-header textarea {
  width: 100%;
  min-height: 80px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
  padding: 14px 16px;
}

.composer-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;
  align-items: center;
}

.composer-actions button {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 12px;
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
}

.primary-button {
  width: 100%;
  border: 0;
  border-radius: 14px;
  padding: 14px 16px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-weight: 700;
}

.small-button {
  width: auto;
  padding: 10px 18px;
}

.stories-row {
  display: flex;
  gap: 18px;
  padding: 18px 12px;
  overflow-x: auto;
}

.story-item {
  min-width: 76px;
  text-align: center;
}

.story-ring {
  width: 70px;
  height: 70px;
  margin: 0 auto 10px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  padding: 4px;
  box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.15);
}

.story-ring span {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(16, 18, 31, 0.8);
  font-weight: 700;
}

.story-ring.live {
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.7);
}

.story-item p {
  margin: 0;
  color: var(--muted);
  font-size: 0.8rem;
}

.post {
  overflow: hidden;
  padding: 18px 18px 8px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-sm {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  background: linear-gradient(135deg, #fca5a5, #b794f4);
}

.post-header h3 {
  margin: 0;
  font-size: 1rem;
}

.post-header p {
  margin: 3px 0 0;
  color: var(--muted);
  font-size: 0.75rem;
}

.more-menu {
  margin-left: auto;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 1.5rem;
}

.post-copy {
  margin: 16px 0 12px;
  line-height: 1.7;
  color: #ebf0ff;
}

.tag-inline {
  color: #7dd3fc;
}

.post-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 18px;
  border: 1px solid var(--line);
}

.post-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 2px 10px;
  color: var(--muted);
  font-size: 0.86rem;
}

.like-button {
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 0.86rem;
}

.like-button.active {
  color: #f472b6;
}

.suggest-list li {
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.04);
  padding: 8px 10px;
}

.suggest-list li > div:nth-child(2) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.suggest-list li button {
  border: 1px solid rgba(139, 92, 246, 0.7);
  background: rgba(139, 92, 246, 0.14);
  color: var(--text);
  border-radius: 999px;
  padding: 8px 10px;
}

.message-list li {
  padding: 10px 8px;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.03);
}

.message-list li.active {
  background: rgba(34, 211, 238, 0.08);
}

.message-list li .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.8);
}

.message-list li > div:last-child {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.message-list small,
.suggest-list small {
  color: var(--muted);
}

.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 18px;
}

.auth-shell {
  width: min(1100px, 100%);
  display: grid;
  gap: 28px;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
}

.auth-visual {
  padding: 28px;
  border-radius: 32px;
  background: rgba(15, 23, 42, 0.86);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.auth-badge {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(139, 92, 246, 0.15);
  color: #d8c5ff;
  font-size: 0.8rem;
  letter-spacing: 0.08rem;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.auth-visual h1 {
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.05;
  margin-bottom: 14px;
}

.auth-visual p {
  color: var(--muted);
  max-width: 620px;
  font-size: 1.08rem;
  line-height: 1.7;
}

.auth-preview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  gap: 14px;
  margin-top: 26px;
}

.mini-card {
  min-height: 110px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: white;
}

.gradient-purple {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
}

.gradient-cyan {
  background: linear-gradient(135deg, #06b6d4, #67e8f9);
}

.gradient-pink {
  background: linear-gradient(135deg, #ec4899, #f9a8d4);
}

.gradient-green {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.auth-card {
  background: rgba(15, 23, 42, 0.86);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  border-radius: 28px;
  padding: 24px;
}

.auth-header-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 18px;
}

.mode-btn {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--muted);
  border-radius: 12px;
  padding: 12px 14px;
}

.mode-btn.active {
  background: rgba(139, 92, 246, 0.12);
  color: var(--text);
  border-color: rgba(139, 92, 246, 0.5);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

.auth-form input {
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0 18px;
  color: var(--muted);
  font-size: 0.8rem;
}

.auth-divider::before,
.auth-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--line);
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.social-buttons button {
  border: 1px solid var(--line);
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
  border-radius: 12px;
  padding: 12px 16px;
}

.messages-panel,
.explore-panel,
.reels-panel {
  min-height: 300px;
}

.message-thread {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 10px;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.04);
}

.chat-row strong,
.chat-row p {
  margin: 0;
}

.chat-row p {
  margin-top: 4px;
  color: var(--muted);
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 12px rgba(52, 211, 153, 0.8);
}

.tag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.tag-card {
  padding: 18px 14px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(34, 211, 238, 0.12));
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tag-card span {
  font-weight: 700;
}

.tag-card small {
  color: var(--muted);
}

.reel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
}

.reel-card {
  position: relative;
  min-height: 220px;
  border-radius: 22px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  border: 1px solid var(--line);
}

.reel-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 18px 14px;
  background: linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.88));
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reel-overlay span {
  color: var(--muted);
}

.loading-bar {
  position: fixed;
  inset: 0 0 auto 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (max-width: 1180px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }

  .auth-shell {
    grid-template-columns: 1fr;
  }

  .left-panel,
  .right-panel {
    order: 2;
  }

  .feed-column {
    order: 1;
  }
}

@media (max-width: 700px) {
  .page-shell {
    width: min(100% - 20px, 100%);
    margin-top: 12px;
  }

  .topbar {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-links {
    justify-content: center;
  }

  .toolbar {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .search-input {
    min-width: 100%;
  }

  .layout-grid {
    gap: 16px;
  }

  .post-image {
    height: 230px;
  }

  .small-button {
    width: 100%;
  }
}
