import type { Subject, Task } from "../lib/study-data";

export function SubjectCard({ subject, onContinue }: { subject: Subject; onContinue: () => void }) {
  return <article className="subject-card"><div className="subject-card-top"><span className={"subject-mark " + subject.color}>{subject.name.slice(0, 1)}</span><button className="more-button" aria-label={"More " + subject.name + " options"}>···</button></div><h3>{subject.name}</h3><p>{subject.detail}</p><div className="subject-progress-label"><span>Course progress</span><strong>{subject.progress}%</strong></div><div className="progress-track"><span className={"progress-fill " + subject.color} style={{ width: subject.progress + "%" }}></span></div><button className="continue-link" onClick={onContinue}>Continue learning <span>→</span></button></article>;
}

export function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: string) => void }) {
  if (!tasks.length) return <div className="empty-inline">Nothing planned here yet. Add a task when you’re ready.</div>;
  return <div className="task-list">{tasks.map((task) => <label className={"task-row" + (task.done ? " task-done" : "")} key={task.id}><input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} /><span className="custom-check" aria-hidden="true">✓</span><span className="task-copy"><strong>{task.title}</strong><small>{task.subject}</small></span><span className="task-due">{task.due}</span></label>)}</div>;
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="empty-state"><span>⌕</span><h2>{title}</h2><p>{detail}</p></div>;
}
