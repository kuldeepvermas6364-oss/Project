import { NextResponse } from "next/server";

const users = new Map<string, { id: number; name: string; handle: string; email: string; password: string; avatar: string }>();

export async function POST(request: Request) {
  const body = await request.json();
  const mode = String(body.mode || "signup").toLowerCase();
  const name = String(body.name || "").trim();
  const username = String(body.username || "").trim();
  const email = String(body.email || "").trim();
  const password = String(body.password || "").trim();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  if (mode === "signin") {
    const saved = users.get(username.toLowerCase()) || users.get(email.toLowerCase());
    if (!saved || saved.password !== password) {
      return NextResponse.json({ error: "Invalid username/email or password" }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: saved.id,
        name: saved.name,
        handle: saved.handle,
        avatar: saved.avatar,
        email: saved.email,
      },
    });
  }

  if (users.has(username.toLowerCase()) || users.has(email.toLowerCase())) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const user = {
    id: Date.now(),
    name: name || username,
    handle: username.startsWith("@") ? username : `@${username}`,
    email,
    password,
    avatar: (name || username || "LO").slice(0, 2).toUpperCase(),
  };

  users.set(user.handle.toLowerCase(), user);
  if (user.email) users.set(user.email.toLowerCase(), user);

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      handle: user.handle,
      avatar: user.avatar,
      email: user.email,
    },
  });
}
