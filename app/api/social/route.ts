import { NextResponse } from "next/server";

const stories = [
  { id: 1, name: "Your Story", accent: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", live: true },
  { id: 2, name: "Ava", accent: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", live: false },
  { id: 3, name: "Milo", accent: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", live: false },
  { id: 4, name: "Nina", accent: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)", live: false },
  { id: 5, name: "Leo", accent: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", live: false },
];

const messages = [
  { id: 1, name: "Luna", preview: "Last night’s story was iconic 💥", active: true },
  { id: 2, name: "Theo", preview: "Can you share the mockup?", active: false },
  { id: 3, name: "Rae", preview: "I’m in. Let’s ship it.", active: false },
  { id: 4, name: "Ezra", preview: "New idea for the reels section", active: false },
];

export async function GET() {
  return NextResponse.json({ stories, messages });
}
