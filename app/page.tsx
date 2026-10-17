"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type View = "Overview" | "Subjects" | "Practice" | "Flashcards" | "Planner" | "Notes" | "Progress";
type Subject = { id: string; name: string; detail: string; color: string; progress: number; };
type Task = { id: string; title: string; subject: string; due: string; done: boolean; };
type Card = { id: string; subject: string; front: string; back: string; };
type Note = { id: string; title: string; subject: string; body: string; updated: string; };
type StudyData = { subjects: Subject[]; tasks: Task[]; cards: Card[]; notes: Note[]; sessions: number; streak: number; };

const initialData: StudyData = {
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
};

const questions = [
  { question: "Which organelle produces most of a cell’s ATP?", options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"], answer: 1, subject: "Biology" },
  { question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2, subject: "Physics" },
  { question: "How many protons does carbon have?", options: ["4", "6", "8", "12"], answer: 1, subject: "Chemistry" },
  { question: "Which process makes two identical daughter cells?", options: ["Meiosis", "Mitosis", "Fertilisation", "Diffusion"], answer: 1, subject: "Biology" },
  { question: "If a 2 kg object accelerates at 3 m/s², what is the net force?", options: ["1.5 N", "5 N", "6 N", "9 N"], answer: 2, subject: "Physics" },
];

const navigation: { name: View; icon: string }[] = [
  { name: "Overview", icon: "⌂" },
  { name: "Subjects", icon: "▤" },
  { name: "Practice", icon: "◎" },
  { name: "Flashcards", icon: "▣" },
  { name: "Planner", icon: "▦" },
  { name: "Notes", icon: "▧" },
  { name: "Progress", icon: "↗" },
];

const todayLabel = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatTime(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return minutes + ":" + seconds;
}

export default function HomePage() {
  const [view, setView] = useState<View>("Overview");
  const [data, setData] = useState<StudyData>(initialData);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("Biology");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteSubject, setNoteSubject] = useState("Biology");
  const [noteBody, setNoteBody] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("studyspace-data");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<StudyData>;
        setData({
          ...initialData,
          ...parsed,
          subjects: Array.isArray(parsed.subjects) ? parsed.subjects : initialData.subjects,
          tasks: Array.isArray(parsed.tasks) ? parsed.tasks : initialData.tasks,
          cards: Array.isArray(parsed.cards) ? parsed.cards : initialData.cards,
          notes: Array.isArray(parsed.notes) ? parsed.notes : initialData.notes,
        });
      }
    } catch {
      window.localStorage.removeItem("studyspace-data");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("studyspace-data", JSON.stringify(data));
  }, [data, ready]);

  useEffect(() => {
    if (!timerRunning) return;
    if (timerSeconds <= 0) {
      setTimerRunning(false);
      setData((current) => ({ ...current, sessions: current.sessions + 1 }));
      setTimerSeconds(25 * 60);
      return;
    }
    const timeout = window.setTimeout(() => setTimerSeconds((current) => current - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [timerRunning, timerSeconds]);

  const completedTasks = data.tasks.filter((task) => task.done).length;
  const todayTasks = data.tasks.filter((task) => task.due === "Today" && !task.done);
  const filteredSubjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.subjects.filter((subject) => (subject.name + " " + subject.detail).toLowerCase().includes(query));
  }, [data.subjects, search]);

  const toggleTask = (taskId: string) => {
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task),
    }));
  };

  const addTask = (event: FormEvent) => {
    event.preventDefault();
    if (!taskTitle.trim()) return;
    setData((current) => ({
      ...current,
      tasks: [{ id: makeId(), title: taskTitle.trim(), subject: taskSubject, due: "Today", done: false }, ...current.tasks],
    }));
    setTaskTitle("");
  };

  const addNote = (event: FormEvent) => {
    event.preventDefault();
    if (!noteTitle.trim() || !noteBody.trim()) return;
    setData((current) => ({
      ...current,
      notes: [{ id: makeId(), title: noteTitle.trim(), subject: noteSubject, body: noteBody.trim(), updated: "Just now" }, ...current.notes],
    }));
    setNoteTitle("");
    setNoteBody("");
    setShowNoteForm(false);
  };

  const advanceQuiz = () => {
    if (quizChoice === questions[quizIndex].answer) setQuizScore((score) => score + 1);
    setQuizChecked(false);
    setQuizChoice(null);
    if (quizIndex === questions.length - 1) {
      setQuizIndex(0);
      setQuizScore(0);
      setView("Progress");
    } else {
      setQuizIndex((index) => index + 1);
    }
  };

  const currentCard = data.cards.length ? data.cards[cardIndex % data.cards.length] : null;
  const progressPercent = Math.round((data.subjects.reduce((total, subject) => total + subject.progress, 0) / Math.max(1, data.subjects.length)));
  const minutesToday = data.sessions * 25;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setView("Overview"); }}>
          <span className="brand-icon">S</span>
          <span><strong>Studyspace</strong><small>YOUR LEARNING HUB</small></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button key={item.name} className={view === item.name ? "nav-link active" : "nav-link"} onClick={() => setView(item.name)}>
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.name}
              {item.name === "Planner" && todayTasks.length > 0 && <span className="nav-count">{todayTasks.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card">
            <span className="streak-icon">✦</span>
            <div><strong>{data.streak} day streak</strong><small>Keep your momentum</small></div>
          </div>
          <div className="profile-mini"><span className="profile-avatar">S</span><span><strong>My study space</strong><small>Personal workspace</small></span><span className="profile-more">···</span></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{view}</strong></div>
          <div className="top-actions">
            <label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search subjects..." aria-label="Search subjects" /><kbd>⌘ K</kbd></label>
            <button className="avatar-button" aria-label="Study profile">S</button>
          </div>
        </header>
        <div className="content">
          {view === "Overview" && (
            <>
              <div className="page-heading">
                <div><p className="date-label">{todayLabel}</p><h1>Your next chapter starts here.</h1><p className="intro-copy">Small, focused sessions add up. Here’s your study space for today.</p></div>
                <button className="button button-primary" onClick={() => { setView("Practice"); setQuizIndex(0); setQuizScore(0); }}>＋ Start a study session</button>
              </div>
              <section className="welcome-banner">
                <div className="welcome-copy"><span className="banner-kicker">YOUR WEEKLY MOMENTUM</span><h2>One good session at a time.</h2><p>You’ve already completed {data.sessions} focus {data.sessions === 1 ? "session" : "sessions"}. Keep the rhythm going.</p><button className="button button-light" onClick={() => { setView("Practice"); setQuizIndex(0); }}>Continue learning <span>→</span></button></div>
                <div className="banner-art" aria-hidden="true"><span className="art-orbit orbit-one"></span><span className="art-orbit orbit-two"></span><span className="art-spark">✦</span><span className="art-book">✎</span></div>
              </section>
              <section className="stats-grid" aria-label="Study statistics">
                <article className="stat-card"><span className="stat-icon icon-lilac">◷</span><div><p>Focus time</p><strong>{minutesToday}<small> min</small></strong><span className="stat-note">Across {data.sessions} sessions</span></div><span className="stat-trend">This week</span></article>
                <article className="stat-card"><span className="stat-icon icon-mint">✓</span><div><p>Tasks completed</p><strong>{completedTasks}<small> / {data.tasks.length}</small></strong><span className="stat-note">You’re making progress</span></div><span className="stat-trend">All time</span></article>
                <article className="stat-card"><span className="stat-icon icon-peach">↗</span><div><p>Average progress</p><strong>{progressPercent}<small>%</small></strong><span className="stat-note">Across your subjects</span></div><span className="stat-trend">On track</span></article>
              </section>
              <div className="section-heading"><div><p className="section-eyebrow">KEEP IT MOVING</p><h2>Your subjects</h2></div><button className="text-button" onClick={() => setView("Subjects")}>View all <span>→</span></button></div>
              <section className="subject-grid">
                {filteredSubjects.slice(0, 3).map((subject) => <SubjectCard key={subject.id} subject={subject} onContinue={() => setData((current) => ({ ...current, subjects: current.subjects.map((item) => item.id === subject.id ? { ...item, progress: Math.min(100, item.progress + 3) } : item) }))} />)}
              </section>
              <div className="dashboard-lower">
                <section className="panel task-panel">
                  <div className="panel-heading"><div><p className="section-eyebrow">YOUR PRIORITIES</p><h2>Today’s plan</h2></div><button className="text-button" onClick={() => setView("Planner")}>Open planner →</button></div>
                  <TaskList tasks={data.tasks.filter((task) => task.due === "Today").slice(0, 4)} onToggle={toggleTask} />
                </section>
                <section className="panel focus-panel">
                  <div className="panel-heading"><div><p className="section-eyebrow">STAY IN THE ZONE</p><h2>Focus timer</h2></div><span className="timer-tag">25 MIN</span></div>
                  <div className="timer-face"><span>{formatTime(timerSeconds)}</span><small>{timerRunning ? "Deep focus in progress" : "Ready when you are"}</small></div>
                  <div className="timer-controls"><button className="button button-primary" onClick={() => setTimerRunning((running) => !running)}>{timerRunning ? "Pause focus" : "Start focus"}</button><button className="reset-button" onClick={() => { setTimerRunning(false); setTimerSeconds(25 * 60); }}>Reset</button></div>
                </section>
              </div>
            </>
          )}

          {view === "Subjects" && (
            <>
              <div className="page-heading"><div><p className="date-label">YOUR LEARNING LIBRARY</p><h1>Subjects</h1><p className="intro-copy">Pick up where you left off, one concept at a time.</p></div><button className="button button-primary" onClick={() => setView("Practice")}>◎ Practice now</button></div>
              <section className="subject-grid subject-grid-large">{filteredSubjects.map((subject) => <SubjectCard key={subject.id} subject={subject} onContinue={() => setData((current) => ({ ...current, subjects: current.subjects.map((item) => item.id === subject.id ? { ...item, progress: Math.min(100, item.progress + 3) } : item) }))} />)}</section>
              {filteredSubjects.length === 0 && <EmptyState title="No subjects found" detail="Try another search term." />}
              <div className="panel library-tip"><span className="tip-icon">✦</span><div><strong>Make progress visible</strong><p>Every time you continue a subject, your learning progress is saved on this device.</p></div></div>
            </>
          )}

          {view === "Practice" && (
            <>
              <div className="page-heading"><div><p className="date-label">QUICK KNOWLEDGE CHECK</p><h1>Practice makes progress.</h1><p className="intro-copy">Five quick questions across your subjects. Take your time.</p></div><span className="practice-pill">QUESTION {quizIndex + 1} OF {questions.length}</span></div>
              <div className="practice-layout"><section className="panel quiz-panel"><div className="quiz-meta"><span className="subject-pill">{questions[quizIndex].subject}</span><span>Multiple choice</span></div><h2>{questions[quizIndex].question}</h2><div className="answer-list">{questions[quizIndex].options.map((option, index) => <button key={option} className={"answer-option" + (quizChoice === index ? " selected" : "") + (quizChecked && index === questions[quizIndex].answer ? " correct" : "") + (quizChecked && quizChoice === index && index !== questions[quizIndex].answer ? " incorrect" : "")} onClick={() => !quizChecked && setQuizChoice(index)}><span className="answer-letter">{String.fromCharCode(65 + index)}</span>{option}{quizChecked && index === questions[quizIndex].answer && <span className="answer-mark">✓</span>}</button>)}</div><div className="quiz-footer"><span>{quizChecked ? (quizChoice === questions[quizIndex].answer ? "Nice work — that’s correct." : "Not quite. The correct answer is highlighted.") : "Select one answer to continue."}</span>{quizChecked ? <button className="button button-primary" onClick={advanceQuiz}>{quizIndex === questions.length - 1 ? "Finish quiz" : "Next question →"}</button> : <button className="button button-primary" disabled={quizChoice === null} onClick={() => setQuizChecked(true)}>Check answer</button>}</div></section><aside className="panel quiz-side"><span className="stat-icon icon-lilac">◎</span><h3>Learn by doing</h3><p>Short retrieval practice helps ideas stick. Review a flashcard set whenever you need a warm-up.</p><button className="text-button" onClick={() => setView("Flashcards")}>Go to flashcards →</button><div className="quiz-score"><strong>{quizScore}</strong><span>correct so far</span></div></aside></div>
            </>
          )}

          {view === "Flashcards" && (
            <>
              <div className="page-heading"><div><p className="date-label">ACTIVE RECALL</p><h1>Flashcards</h1><p className="intro-copy">Try to recall the answer before you flip the card.</p></div><span className="practice-pill">{data.cards.length ? (cardIndex % data.cards.length) + 1 : 0} / {data.cards.length} CARDS</span></div>
              {currentCard ? <section className="flashcard-wrap"><button className={"flashcard" + (cardFlipped ? " flipped" : "")} onClick={() => setCardFlipped((flipped) => !flipped)} aria-label="Flip flashcard"><span className="flashcard-top"><span className="subject-pill">{currentCard.subject}</span><span>{cardFlipped ? "ANSWER" : "QUESTION"}</span></span><strong>{cardFlipped ? currentCard.back : currentCard.front}</strong><small>Click card to {cardFlipped ? "see question" : "reveal answer"}</small></button><div className="flashcard-controls"><button className="button button-secondary" onClick={() => { setCardIndex((index) => (index + 1) % data.cards.length); setCardFlipped(false); }}>← Previous / next</button><button className="button button-primary" onClick={() => { setCardIndex((index) => (index + 1) % data.cards.length); setCardFlipped(false); }}>Got it, next card →</button></div><p className="flashcard-hint">Want to add cards? Save a concept as a note and turn it into a question for your next review.</p></section> : <EmptyState title="No cards yet" detail="Add a note to start building your review set." /> }
            </>
          )}

          {view === "Planner" && (
            <>
              <div className="page-heading"><div><p className="date-label">{todayLabel}</p><h1>Your planner</h1><p className="intro-copy">A clear plan makes it easier to begin.</p></div></div>
              <section className="panel planner-panel"><div className="panel-heading"><div><p className="section-eyebrow">ADD A PRIORITY</p><h2>Plan a study task</h2></div><span className="timer-tag">{todayTasks.length} DUE TODAY</span></div><form className="task-form" onSubmit={addTask}><input value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="What would you like to study?" aria-label="Task title" maxLength={100} /><select value={taskSubject} onChange={(event) => setTaskSubject(event.target.value)} aria-label="Task subject">{data.subjects.map((subject) => <option key={subject.id}>{subject.name}</option>)}</select><button className="button button-primary" type="submit" disabled={!taskTitle.trim()}>Add task</button></form><div className="planner-list"><div className="planner-subhead"><h3>Today</h3><span>{todayTasks.length} remaining</span></div><TaskList tasks={data.tasks.filter((task) => task.due === "Today")} onToggle={toggleTask} /><div className="planner-subhead tomorrow-heading"><h3>Coming up</h3><span>Tomorrow</span></div><TaskList tasks={data.tasks.filter((task) => task.due !== "Today")} onToggle={toggleTask} /></div></section>
            </>
          )}

          {view === "Notes" && (
            <>
              <div className="page-heading"><div><p className="date-label">YOUR STUDY KNOWLEDGE BASE</p><h1>Notes</h1><p className="intro-copy">Capture the ideas you want to remember.</p></div><button className="button button-primary" onClick={() => setShowNoteForm((show) => !show)}>{showNoteForm ? "Close" : "＋ New note"}</button></div>
              {showNoteForm && <form className="panel note-form" onSubmit={addNote}><input value={noteTitle} onChange={(event) => setNoteTitle(event.target.value)} placeholder="Note title" aria-label="Note title" maxLength={100} /><select value={noteSubject} onChange={(event) => setNoteSubject(event.target.value)} aria-label="Note subject">{data.subjects.map((subject) => <option key={subject.id}>{subject.name}</option>)}</select><textarea value={noteBody} onChange={(event) => setNoteBody(event.target.value)} placeholder="Write a key idea, formula, or reminder..." aria-label="Note contents" rows={5} maxLength={2000} /><div className="note-form-footer"><span>{noteBody.length} / 2000</span><button className="button button-primary" disabled={!noteTitle.trim() || !noteBody.trim()}>Save note</button></div></form>}
              <section className="notes-grid">{data.notes.map((note) => <article className="note-card" key={note.id}><div className="note-card-top"><span className="subject-pill">{note.subject}</span><span>{note.updated}</span></div><h2>{note.title}</h2><p>{note.body}</p><button className="text-button" onClick={() => { const card = { id: makeId(), subject: note.subject, front: note.title, back: note.body }; setData((current) => ({ ...current, cards: [...current.cards, card] })); setView("Flashcards"); }}>Make flashcard →</button></article>)}</section>
              {data.notes.length === 0 && <EmptyState title="Your notes start here" detail="Save your first idea or revision reminder." />}
            </>
          )}

          {view === "Progress" && (
            <>
              <div className="page-heading"><div><p className="date-label">YOUR EFFORT, MADE VISIBLE</p><h1>Progress</h1><p className="intro-copy">Build consistency and celebrate every step forward.</p></div></div>
              <section className="stats-grid progress-stats"><article className="stat-card"><span className="stat-icon icon-lilac">◷</span><div><p>Focus sessions</p><strong>{data.sessions}</strong><span className="stat-note">25 minutes each</span></div></article><article className="stat-card"><span className="stat-icon icon-mint">✓</span><div><p>Tasks done</p><strong>{completedTasks}</strong><span className="stat-note">Of {data.tasks.length} planned tasks</span></div></article><article className="stat-card"><span className="stat-icon icon-peach">✦</span><div><p>Current streak</p><strong>{data.streak}<small> days</small></strong><span className="stat-note">A little every day</span></div></article></section>
              <section className="panel progress-panel"><div className="panel-heading"><div><p className="section-eyebrow">SUBJECT BREAKDOWN</p><h2>Learning progress</h2></div><span className="timer-tag">{progressPercent}% AVERAGE</span></div><div className="progress-list">{data.subjects.map((subject) => <div className="progress-row" key={subject.id}><div className="progress-label"><span className={"subject-dot " + subject.color}></span><strong>{subject.name}</strong><span>{subject.progress}%</span></div><div className="progress-track"><span className={"progress-fill " + subject.color} style={{ width: subject.progress + "%" }}></span></div></div>)}</div></section>
              <section className="panel encouragement"><span className="tip-icon">✦</span><div><strong>Consistency beats cramming.</strong><p>Your progress is saved on this device. Set a small goal and come back tomorrow.</p></div><button className="button button-secondary" onClick={() => setView("Planner")}>Plan next session</button></section>
            </>
          )}
          <footer className="app-footer"><span>Studyspace</span><span>Built for focused learning</span><span>Your progress stays on this device</span></footer>
        </div>
      </main>
    </div>
  );
}

function SubjectCard({ subject, onContinue }: { subject: Subject; onContinue: () => void }) {
  return <article className="subject-card"><div className="subject-card-top"><span className={"subject-mark " + subject.color}>{subject.name.slice(0, 1)}</span><button className="more-button" aria-label={"More " + subject.name + " options"}>···</button></div><h3>{subject.name}</h3><p>{subject.detail}</p><div className="subject-progress-label"><span>Course progress</span><strong>{subject.progress}%</strong></div><div className="progress-track"><span className={"progress-fill " + subject.color} style={{ width: subject.progress + "%" }}></span></div><button className="continue-link" onClick={onContinue}>Continue learning <span>→</span></button></article>;
}

function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: string) => void }) {
  if (!tasks.length) return <div className="empty-inline">Nothing planned here yet. Add a task when you’re ready.</div>;
  return <div className="task-list">{tasks.map((task) => <label className={"task-row" + (task.done ? " task-done" : "")} key={task.id}><input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} /><span className="custom-check" aria-hidden="true">✓</span><span className="task-copy"><strong>{task.title}</strong><small>{task.subject}</small></span><span className="task-due">{task.due}</span></label>)}</div>;
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="empty-state"><span>⌕</span><h2>{title}</h2><p>{detail}</p></div>;
}
