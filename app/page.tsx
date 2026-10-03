const stories = [
  { id: 1, name: "Your Story", accent: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", live: true },
  { id: 2, name: "Ava", accent: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", live: false },
  { id: 3, name: "Milo", accent: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", live: false },
  { id: 4, name: "Nina", accent: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)", live: false },
  { id: 5, name: "Leo", accent: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", live: false },
];

const trending = [
  { tag: "#Design", posts: "24.8k posts" },
  { tag: "#BuildInPublic", posts: "18.2k posts" },
  { tag: "#Creators", posts: "12.4k posts" },
  { tag: "#NoCode", posts: "9.8k posts" },
  { tag: "#AI", posts: "42.7k posts" },
];

const suggestions = [
  { name: "Maya Chen", reason: "Suggested for you" },
  { name: "Daniel Koa", reason: "Followed by your friends" },
  { name: "Ari Moss", reason: "Popular creator" },
];

const posts = [
  {
    id: 1,
    author: "Nina Brooks",
    handle: "@ninab",
    time: "3 min ago",
    text: "Morning coffee + a fresh idea for a new creator tool. Building something simple, useful, and a little bold. #BuildInPublic #Creators",
    likes: 842,
    comments: 48,
    shares: 21,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    avatar: "NB",
  },
  {
    id: 2,
    author: "Milo Hart",
    handle: "@milo",
    time: "27 min ago",
    text: "The best product teams are shipping fast, listening hard, and turning feedback into weekly experiments.",
    likes: 1532,
    comments: 124,
    shares: 35,
    image: null,
    avatar: "MH",
  },
  {
    id: 3,
    author: "Ava Stone",
    handle: "@avastone",
    time: "1 hr ago",
    text: "3AM concept: a social app that feels like a camera roll, a conversations thread, and a community feed all at once.",
    likes: 2136,
    comments: 198,
    shares: 89,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    avatar: "AS",
  },
];

const messages = [
  { name: "Luna", preview: "Last night’s story was iconic 💥", active: true },
  { name: "Theo", preview: "Can you share the mockup?", active: false },
  { name: "Rae", preview: "I’m in. Let’s ship it.", active: false },
  { name: "Ezra", preview: "New idea for the reels section", active: false },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">L</div>
          <div>
            <p className="eyebrow">Community</p>
            <h1>Loop Social</h1>
          </div>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <span className="nav-item active">Home</span>
          <span className="nav-item">Explore</span>
          <span className="nav-item">Reels</span>
          <span className="nav-item">Messages</span>
        </nav>

        <div className="toolbar">
          <button className="icon-pill">⌕</button>
          <button className="icon-pill">＋</button>
          <div className="mini-avatar">KS</div>
        </div>
      </header>

      <div className="layout-grid">
        <aside className="sidebar left-panel">
          <section className="profile-card">
            <div className="profile-cover" />
            <div className="profile-body">
              <div className="avatar-lg">KS</div>
              <h2>Kuldeep Sharma</h2>
              <p>@kuldeep</p>
              <div className="stats-row">
                <div>
                  <strong>12.4k</strong>
                  <span>followers</span>
                </div>
                <div>
                  <strong>892</strong>
                  <span>following</span>
                </div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-title-row">
              <h3>Trending</h3>
              <span>Today</span>
            </div>
            <ul className="list">
              {trending.map((item) => (
                <li key={item.tag}>
                  <span>{item.tag}</span>
                  <small>{item.posts}</small>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="feed-column">
          <section className="composer card">
            <div className="composer-header">
              <div className="mini-avatar">KS</div>
              <button className="composer-toggle">Share your vibe</button>
            </div>
            <div className="composer-actions">
              <button>📷 Photo</button>
              <button>🎥 Video</button>
              <button>😊 Story</button>
            </div>
          </section>

          <section className="stories-row card">
            {stories.map((story) => (
              <div key={story.id} className="story-item">
                <div
                  className={`story-ring ${story.live ? "live" : ""}`}
                  style={{ background: story.accent }}
                >
                  <span>{story.name.slice(0, 1)}</span>
                </div>
                <p>{story.name}</p>
              </div>
            ))}
          </section>

          {posts.map((post) => (
            <article key={post.id} className="post card">
              <div className="post-header">
                <div className="avatar-sm">{post.avatar}</div>
                <div>
                  <h3>{post.author}</h3>
                  <p>
                    {post.handle} · {post.time}
                  </p>
                </div>
                <button className="more-menu">•••</button>
              </div>

              <p className="post-copy">{post.text}</p>

              {post.image && (
                <img src={post.image} alt="Post content" className="post-image" />
              )}

              <div className="post-actions">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
                <span>↻ {post.shares}</span>
              </div>
            </article>
          ))}
        </main>

        <aside className="sidebar right-panel">
          <section className="panel">
            <div className="panel-title-row">
              <h3>Suggested</h3>
              <span>For you</span>
            </div>
            <ul className="suggest-list">
              {suggestions.map((account) => (
                <li key={account.name}>
                  <div className="mini-avatar small">{account.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <strong>{account.name}</strong>
                    <small>{account.reason}</small>
                  </div>
                  <button>Follow</button>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <div className="panel-title-row">
              <h3>Messages</h3>
              <span>Online</span>
            </div>
            <ul className="message-list">
              {messages.map((message) => (
                <li key={message.name} className={message.active ? "active" : ""}>
                  <div className="dot" />
                  <div>
                    <strong>{message.name}</strong>
                    <small>{message.preview}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
