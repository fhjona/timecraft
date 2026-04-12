"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type WorkoutSession = {
  id: string;
  title: string;
  day: string;
  duration: number;
  type: string;
  reps: number;
  notes: string;
};

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const trainingTypes = ["All", "Cardio", "Strength", "Mobility", "Recovery"];

const initialSessions: WorkoutSession[] = [
  {
    id: "1",
    title: "Morning cardio",
    day: "Monday",
    duration: 30,
    type: "Cardio",
    reps: 0,
    notes: "Jogging or cycling session with tempo intervals.",
  },
  {
    id: "2",
    title: "Lower body strength",
    day: "Wednesday",
    duration: 45,
    type: "Strength",
    reps: 12,
    notes: "Squats, lunges and hip thrusts.",
  },
  {
    id: "3",
    title: "Evening mobility",
    day: "Friday",
    duration: 20,
    type: "Mobility",
    reps: 0,
    notes: "Stretching and foam rolling for recovery.",
  },
];

export default function ExercisePlannerPage() {
  const [sessions, setSessions] = useState<WorkoutSession[]>(initialSessions);
  const [activeDay, setActiveDay] = useState<string>(weekdays[0]);
  const [filterType, setFilterType] = useState<string>(trainingTypes[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("Full body strength");
  const [day, setDay] = useState(weekdays[0]);
  const [duration, setDuration] = useState(40);
  const [type, setType] = useState(trainingTypes[1]);
  const [reps, setReps] = useState(10);
  const [notes, setNotes] = useState("Core, legs and back focus.");

  const visibleSessions = useMemo(
    () =>
      sessions.filter(
        (session) => filterType === "All" || session.type === filterType
      ),
    [sessions, filterType]
  );

  const totalDuration = useMemo(
    () => visibleSessions.reduce((sum, session) => sum + session.duration, 0),
    [visibleSessions]
  );

  const activeDaySessions = useMemo(
    () =>
      visibleSessions.filter((session) => session.day === activeDay),
    [visibleSessions, activeDay]
  );

  const topTrainingType = useMemo(() => {
    const countByType = visibleSessions.reduce<Record<string, number>>((acc, session) => {
      acc[session.type] = (acc[session.type] || 0) + session.duration;
      return acc;
    }, {});
    return Object.entries(countByType).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "No sessions";
  }, [visibleSessions]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("Full body strength");
    setDay(weekdays[0]);
    setDuration(40);
    setType(trainingTypes[1]);
    setReps(10);
    setNotes("Core, legs and back focus.");
  };

  const handleSave = () => {
    if (editingId) {
      setSessions((current) =>
        current.map((session) =>
          session.id === editingId
            ? { ...session, title, day, duration, type, reps, notes }
            : session
        )
      );
      resetForm();
      return;
    }

    setSessions((current) => [
      {
        id: `${Date.now()}`,
        title,
        day,
        duration,
        type,
        reps,
        notes,
      },
      ...current,
    ]);
    resetForm();
  };

  const handleEdit = (session: WorkoutSession) => {
    setEditingId(session.id);
    setTitle(session.title);
    setDay(session.day);
    setDuration(session.duration);
    setType(session.type);
    setReps(session.reps);
    setNotes(session.notes);
    setActiveDay(session.day);
  };

  const handleDelete = (id: string) => {
    setSessions((current) => current.filter((session) => session.id !== id));
  };

  return (
    <main className={styles.page}>
      <section className={styles.panelTop}>
        <div>
          <p className={styles.smallLabel}>Exercise Planner</p>
          <h1 className={styles.title}>Plan your workouts with clarity</h1>
          <p className={styles.description}>
            A cleaner planner interface with a day overview, progress summary and easy workout editor.
          </p>
        </div>
        <div className={styles.summaryRow}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Visible sessions</span>
            <strong>{visibleSessions.length}</strong>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total time</span>
            <strong>{totalDuration} min</strong>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Top focus</span>
            <strong>{topTrainingType}</strong>
          </div>
        </div>
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.leftPanel}>
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelTitle}>Weekly overview</p>
                <p className={styles.panelText}>Pick a day to inspect workouts, then add or edit the session in the form.</p>
              </div>
              <div className={styles.filterRow}>
                <label className={styles.filterLabel}>
                  <span>Type</span>
                  <select value={filterType} onChange={(event) => setFilterType(event.target.value)}>
                    {trainingTypes.map((trainingType) => (
                      <option key={trainingType} value={trainingType}>
                        {trainingType}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className={styles.dayTabs}>
              {weekdays.map((weekday) => (
                <button
                  key={weekday}
                  type="button"
                  className={`${styles.dayTab} ${weekday === activeDay ? styles.dayTabActive : ""}`}
                  onClick={() => setActiveDay(weekday)}
                >
                  {weekday}
                </button>
              ))}
            </div>

            <div className={styles.listSection}>
              <h2 className={styles.sectionHeading}>Sessions for {activeDay}</h2>
              {activeDaySessions.length === 0 ? (
                <p className={styles.emptyState}>No sessions planned for this day.</p>
              ) : (
                <ul className={styles.sessionList}>
                  {activeDaySessions.map((session) => (
                    <li key={session.id} className={styles.sessionItem}>
                      <div>
                        <strong>{session.title}</strong>
                        <p className={styles.sessionMeta}>{session.type} · {session.duration} min</p>
                      </div>
                      <div className={styles.sessionActions}>
                        <button type="button" className={styles.smallButton} onClick={() => handleEdit(session)}>
                          Edit
                        </button>
                        <button type="button" className={styles.smallButtonDanger} onClick={() => handleDelete(session.id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <aside className={styles.rightPanel}>
          <div className={styles.panelCard}>
            <p className={styles.panelTitle}>{editingId ? "Edit workout" : "Add workout"}</p>
            <p className={styles.panelText}>Use the form below to save a new plan or update an existing one.</p>

            <div className={styles.formGrid}>
              <label className={styles.formField}>
                <span>Session title</span>
                <input value={title} onChange={(event) => setTitle(event.target.value)} />
              </label>

              <label className={styles.formField}>
                <span>Type</span>
                <select value={type} onChange={(event) => setType(event.target.value)}>
                  {trainingTypes.slice(1).map((trainingType) => (
                    <option key={trainingType} value={trainingType}>
                      {trainingType}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.formField}>
                <span>Day</span>
                <select value={day} onChange={(event) => setDay(event.target.value)}>
                  {weekdays.map((weekday) => (
                    <option key={weekday} value={weekday}>
                      {weekday}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.formField}>
                <span>Duration (min)</span>
                <input type="number" min={10} value={duration} onChange={(event) => setDuration(Number(event.target.value))} />
              </label>

              <label className={styles.formField}>
                <span>Reps</span>
                <input type="number" min={0} value={reps} onChange={(event) => setReps(Number(event.target.value))} />
              </label>

              <label className={styles.formFieldFull}>
                <span>Notes</span>
                <textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} />
              </label>
            </div>

            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryButton} onClick={handleSave}>
                {editingId ? "Save changes" : "Add workout"}
              </button>
              {editingId && (
                <button type="button" className={styles.secondaryButton} onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className={styles.panelCard}>
            <p className={styles.panelTitle}>Current day summary</p>
            <div className={styles.metricCard}>
              <span>Sessions</span>
              <strong>{activeDaySessions.length}</strong>
            </div>
            <div className={styles.metricCard}>
              <span>Total minutes</span>
              <strong>{activeDaySessions.reduce((sum, item) => sum + item.duration, 0)} min</strong>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
