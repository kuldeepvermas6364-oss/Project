import { NextResponse } from "next/server";

export type Post = {
  id: number;
  author: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  avatar: string;
  image?: string;
  tags: string[];
  liked: boolean;
};

const posts: Post[] = [
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

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const content = String(body.content || "").trim();

  if (!content) {
    return NextResponse.json({ error: "Post content is required" }, { status: 400 });
  }

  const newPost = {
    id: Date.now(),
    author: body.author || "Guest",
    handle: body.handle || "@guest",
    time: "just now",
    content,
    likes: 0,
    comments: 0,
    shares: 0,
    avatar: body.avatar || "GU",
    tags: (content.match(/#\w+/g) || []).slice(0, 3),
    liked: false,
  };

  posts.unshift(newPost);
  return NextResponse.json(newPost, { status: 201 });
}
