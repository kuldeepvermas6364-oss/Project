"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Post = {
  id: number;
  author: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
  avatar: string;
  tags: string[];
  liked: boolean;
};

type Story = {
  id: number;
  name: string;
  accent: string;
  live: boolean;
};

type Message = {
  id: number;
  name: string;
  preview: string;
  active: boolean;
};

type Suggestion = {
  id: number;
  name: string;
  reason: string;
};

type User = {
  id: number;
  name: string;
  handle: string;
  avatar: string;
};

const seedPosts: Post[] = [
  {
    id: 1,
    author: "Nina Brooks",
    handle: "@ninab",
    time: "3 min ago",
    content:
      "Morning coffee + a fresh idea for a new creator tool. Building something simple, useful, and a little bold. #BuildInPublic #Creators",
    likes: 842,
    comments: 48,
    shares: 21,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    avatar: "NB",
    tags: ["#BuildInPublic", "#Creators"],
    liked: false,
  },
  {
    id: 2,
    author: "Milo Hart",
    handle: "@milo",
    time: "27 min ago",
    content:
      "The best product teams are shipping fast, listening hard, and turning feedback into weekly experiments.",
    likes: 1532,
    comments: 124,
    shares: 35,
    avatar: "MH",
    tags: ["#Product"],
    liked: true,
  },
  {
    id: 3,
    author: "Ava Stone",
    handle: "@avastone",
    time: "1 hr ago",
    content:
      "3AM concept: a social app that feels like a camera roll, a conversations thread, and a community feed all at once.",
    likes: 2136,
    comments: 198,
    shares: 89,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    avatar: "AS",
    tags: ["#SocialMedia", "#Ideas"],
    liked: false,
  },
];

const stories: Story[] = [
  { id: 1, name: "Your Story", accent: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", live: true },
  { id: 2, name: "Ava", accent: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", live: false },
  { id: 3, name: "Milo", accent: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", live: false },
  { id: 4, name: "Nina", accent: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)", live: false },
  { id: 5, name: "Leo", accent: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", live: false },
];

const suggestions: Suggestion[] = [
  { id: 1, name: "Maya Chen", reason: "Suggested for you" },
  { id: 2, name: "Daniel Koa", reason: "Followed by your friends" },
  { id: 3, name: "Ari Moss", reason: "Popular creator" },
];

const messages: Message[] = [
  { id: 1, name: "Luna", preview: "Last night’s story was iconic 💥", active: true },
  { id: 2, name: "Theo", preview: "Can you share the mockup?", active: false },
  { id: 3, name: "Rae", preview: "I’m in. Let’s ship it.", active: false },
  { id: 4, name: "Ezra", preview: "New idea for the reels section", active: false },
];

const trending = [
  { tag: "#Design", posts: "24.8k posts" },
  { tag: "#BuildInPublic", posts: "18.2k posts" },
  { tag: "#Creators", posts: "12.4k posts" },
  { tag: "#NoCode", posts: "9.8k posts" },
  { tag: "#AI", posts: "42.7k posts" },
];

const tabLabels = ["Home", "Explore", "Reels", "Messages"];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const [composeText, setComposeText] = useState("");
  const [authForm, setAuthForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loop-social-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetch("/api/posts")
      .then((response) => response.json())
      .then((data: Post[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      })
      .catch(() => {
        setPosts(seedPosts);
      })
      .finally(() => setIsReady(true));
  }, []);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return posts;

    return posts.filter((post) => {
      const haystack = `${post.author} ${post.handle} ${post.content} ${post.tags.join(" ")}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [posts, search]);

  const handleAuthSubmit = (event: FormEvent) => {
    event.preventDefault();

    const name = authMode === "signup" ? authForm.name || "New User" : user?.name || "Guest";
    const handle = (authForm.username || user?.handle || "@loopuser").startsWith("@")
      ? authForm.username || user?.handle || "@loopuser"
      : `@${authForm.username || user?.handle || "loopuser"}`;

    const nextUser: User = {
      id: Date.now(),
      name,
      handle,
      avatar: (name || "LO").slice(0, 2).toUpperCase(),
    };

    setUser(nextUser);
    window.localStorage.setItem("loop-social-user", JSON.stringify(nextUser));
    setAuthForm({ name: "", username: "", email: "", password: "" });
  };

  const handlePostSubmit = async () => {
    if (!composeText.trim() || !user) return;

    const payload = {
      author: user.name,
      handle: user.handle,
      content: composeText,
      avatar: user.avatar,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Unable to create post");

      const newPost = await response.json();
      setPosts((current) => [newPost, ...current]);
      setComposeText("");
    } catch (error) {
      const fallback: Post = {
        id: Date.now(),
        author: user.name,
        handle: user.handle,
        time: "just now",
        content: composeText,
        likes: 0,
        comments: 0,
        shares: 0,
        avatar: user.avatar,
        tags: composeText.match(/#\w+/g) || [],
        liked: false,
      };
      setPosts((current) => [fallback, ...current]);
      setComposeText("");
    }
  };

  const toggleLike = (postId: number) => {
    setPosts((current) =>
      current.map((post) => {
        if (post.id !== postId) return post;
        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : Math.max(0, post.likes - 1),
        };
      }),
    );
  };

  const signOut = () => {
    setUser(null);
    window.localStorage.removeItem("loop-social-user");
  };

  if (!user) {
    return (
      <main className="auth-page">
        <div className="auth-shell">
          <section className="auth-visual">
            <div className="auth-badge">Loop Social</div>
            <h1>Share moments. Start conversations. Build communities.</h1>
            <p>
              A mix of Instagram energy, Twitter voice, and Snapchat spontaneity — all in one social app.
            </p>
            <div className="auth-preview-grid">
              <div className="mini-card gradient-purple">Stories</div>
              <div className="mini-card gradient-cyan">Feed</div>
              <div className="mini-card gradient-pink">Snaps</div>
              <div className="mini-card gradient-green">Following</div>
            </div>
          </section>

          <section className="auth-card">
            <div className="auth-header-row">
              <button
                className={authMode === "signin" ? "mode-btn active" : "mode-btn"}
                onClick={() => setAuthMode("signin")}
              >
                Sign in
              </button>
              <button
                className={authMode === "signup" ? "mode-btn active" : "mode-btn"}
                onClick={() => setAuthMode("signup")}
              >
                Create account
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="auth-form">
              {authMode === "signup" && (
                <label>
                  Full name
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                  />
                </label>
              )}

              <label>
                {authMode === "signup" ? "Username" : "Username or email"}
                <input
                  type="text"
                  value={authForm.username}
                  onChange={(e) => setAuthForm((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder={authMode === "signup" ? "choose a handle" : "name or email"}
                />
              </label>

              {authMode === "signup" && (
                <label>
                  Email
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                  />
                </label>
              )}

              <label>
                Password
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                />
              </label>

              <button type="submit" className="primary-button">
                {authMode === "signin" ? "Enter Loop" : "Create my profile"}
              </button>
            </form>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <button>Google</button>
              <button>Apple</button>
            </div>
          </section>
        </div>
      </main>
    );
  }

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
          {tabLabels.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "nav-item active" : "nav-item"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="toolbar">
          <input
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people, tags, posts..."
          />
          <button className="icon-pill" aria-label="Create new post">＋</button>
          <button className="logout-button" onClick={signOut}>Logout</button>
        </div>
      </header>

      <div className="layout-grid">
        <aside className="sidebar left-panel">
          <section className="profile-card">
            <div className="profile-cover" />
            <div className="profile-body">
              <div className="avatar-lg">{user.avatar}</div>
              <h2>{user.name}</h2>
              <p>{user.handle}</p>
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
          {activeTab === "Messages" ? (
            <section className="panel messages-panel">
              <div className="panel-title-row">
                <h3>Direct messages</h3>
                <span>Live now</span>
              </div>
              <div className="message-thread">
                {messages.map((message) => (
                  <div className="chat-row" key={message.id}>
                    <div className="status-dot" />
                    <div>
                      <strong>{message.name}</strong>
                      <p>{message.preview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : activeTab === "Explore" ? (
            <section className="panel explore-panel">
              <div className="panel-title-row">
                <h3>Explore</h3>
                <span>Top tags</span>
              </div>
              <div className="tag-grid">
                {trending.map((item) => (
                  <div key={item.tag} className="tag-card">
                    <span>{item.tag}</span>
                    <small>{item.posts}</small>
                  </div>
                ))}
              </div>
            </section>
          ) : activeTab === "Reels" ? (
            <section className="panel reels-panel">
              <div className="panel-title-row">
                <h3>Short clips</h3>
                <span>Now watching</span>
              </div>
              <div className="reel-grid">
                {posts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="reel-card"
                    style={{
                      backgroundImage: `url(${post.image || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"})`,
                    }}
                  >
                    <div className="reel-overlay">
                      <strong>{post.author}</strong>
                      <span>{post.likes} likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <>
              <section className="composer card">
                <div className="composer-header">
                  <div className="mini-avatar">{user.avatar}</div>
                  <textarea
                    value={composeText}
                    onChange={(e) => setComposeText(e.target.value)}
                    placeholder="Share your vibe, a thought, or a moment..."
                    rows={3}
                  />
                </div>
                <div className="composer-actions">
                  <button type="button">📷 Photo</button>
                  <button type="button">🎥 Video</button>
                  <button type="button">😊 Story</button>
                  <button type="button" className="primary-button small-button" onClick={handlePostSubmit}>
                    Post now
                  </button>
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

              {filteredPosts.map((post) => (
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

                  <p className="post-copy">
                    {post.content}
                    {post.tags.length > 0 && (
                      <span className="tag-inline">
                        {post.tags.map((tag) => ` ${tag}`).join("")}
                      </span>
                    )}
                  </p>

                  {post.image && <img src={post.image} alt="Post content" className="post-image" />}

                  <div className="post-actions">
                    <button className={post.liked ? "like-button active" : "like-button"} onClick={() => toggleLike(post.id)}>
                      ❤️ {post.likes}
                    </button>
                    <span>💬 {post.comments}</span>
                    <span>↻ {post.shares}</span>
                  </div>
                </article>
              ))}
            </>
          )}
        </main>

        <aside className="sidebar right-panel">
          <section className="panel">
            <div className="panel-title-row">
              <h3>Suggested</h3>
              <span>For you</span>
            </div>
            <ul className="suggest-list">
              {suggestions.map((account) => (
                <li key={account.id}>
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
                <li key={message.id} className={message.active ? "active" : ""}>
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
      {!isReady && <div className="loading-bar" aria-live="polite" />}
    </main>
  );
}


