import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || "").trim();
  const username = String(body.username || "").trim();
  const email = String(body.email || "").trim();
  const password = String(body.password || "").trim();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: Date.now(),
      name: name || "Loop User",
      handle: username.startsWith("@") ? username : `@${username}`,
      avatar: (name || username || "LO").slice(0, 2).toUpperCase(),
      email,
    },
  });
}
