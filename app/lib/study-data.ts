export type View = "Overview" | "Subjects" | "Practice" | "Flashcards" | "Planner" | "Notes" | "Progress";
export type Subject = { id: string; name: string; detail: string; color: string; progress: number; };
export type Task = { id: string; title: string; subject: string; due: string; done: boolean; };
export type Card = { id: string; subject: string; front: string; back: string; };
export type Note = { id: string; title: string; subject: string; body: string; updated: string; };
export type StudyData = { subjects: Subject[]; tasks: Task[]; cards: Card[]; notes: Note[]; sessions: number; streak: number; lastQuizScore: number | null; quizzesTaken: number; };

export const initialData: StudyData = {
  subjects: [
    { id: "biology", name: "Biology", detail: "Cell structure · 8 lessons", color: "mint", progress: 68 },
    { id: "physics", name: "Physics", detail: "Motion & forces · 12 lessons", color: "blue", progress: 42 },
    { id: "chemistry", name: "Chemistry", detail: "Atomic structure · 10 lessons", color: "peach", progress: 81 },
  ],
  tasks: [
    { id: "task-1", title: "Revise cell division notes", subject: "Biology", due: "Today", done: false },
    { id: "task-2", title: "Practice motion numericals", subject: "Physics", due: "Today", done: false },
    { id: "task-3", title: "Review periodic table", subject: "Chemistry", due: "Tomorrow", done: true },
  ],
  cards: [
    { id: "card-1", subject: "Biology", front: "What is the powerhouse of the cell?", back: "The mitochondrion — it produces most of the cell’s ATP." },
    { id: "card-2", subject: "Physics", front: "What is Newton’s second law?", back: "The net force on an object equals its mass times acceleration: F = ma." },
    { id: "card-3", subject: "Chemistry", front: "What does an atomic number represent?", back: "The number of protons in an atom’s nucleus." },
  ],
  notes: [
    { id: "note-1", title: "Cell division — key ideas", subject: "Biology", body: "Mitosis produces two genetically identical daughter cells. Meiosis produces four haploid cells.", updated: "Today" },
    { id: "note-2", title: "Newton’s laws", subject: "Physics", body: "Inertia keeps an object at rest or in uniform motion unless acted on by a net external force.", updated: "Yesterday" },
  ],
  sessions: 4,
  streak: 3,
  lastQuizScore: null,
  quizzesTaken: 0,
};

export const questions = [
  { question: "Which organelle produces most of a cell’s ATP?", options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"], answer: 1, subject: "Biology" },
  { question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2, subject: "Physics" },
  { question: "How many protons does carbon have?", options: ["4", "6", "8", "12"], answer: 1, subject: "Chemistry" },
  { question: "Which process makes two identical daughter cells?", options: ["Meiosis", "Mitosis", "Fertilisation", "Diffusion"], answer: 1, subject: "Biology" },
  { question: "If a 2 kg object accelerates at 3 m/s², what is the net force?", options: ["1.5 N", "5 N", "6 N", "9 N"], answer: 2, subject: "Physics" },
];

export const navigation: { name: View; icon: string }[] = [
  { name: "Overview", icon: "⌂" },
  { name: "Subjects", icon: "▤" },
  { name: "Practice", icon: "◎" },
  { name: "Flashcards", icon: "▣" },
  { name: "Planner", icon: "▦" },
  { name: "Notes", icon: "▧" },
  { name: "Progress", icon: "↗" },
];

export const todayLabel = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

export function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function formatTime(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return minutes + ":" + seconds;
}
