// API Service Layer for OCEP Platform
// Uses sample data as mock — replace with real Axios calls when backend is ready

import {
  sampleGoals, sampleTasks, sampleProgress, sampleReflections,
  sampleNotifications, consistencyData, completionData,
  difficultyDistribution, burnoutTrend,
  type Goal, type StudyTask, type ProgressEntry, type Reflection, type Notification
} from "@/data/sampleData";

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth endpoints
export const authApi = {
  login: async (email: string, _password: string) => {
    await delay(500);
    return { user: { id: "1", name: "Guru", email, role: "student" }, token: "mock-jwt-token" };
  },
  register: async (name: string, email: string, _password: string, role: string) => {
    await delay(500);
    return { user: { id: "2", name, email, role }, token: "mock-jwt-token" };
  },
};

// Goals endpoints
export const goalsApi = {
  getAll: async (): Promise<Goal[]> => { await delay(300); return [...sampleGoals]; },
  getById: async (id: string): Promise<Goal | undefined> => { await delay(200); return sampleGoals.find(g => g.id === id); },
  create: async (goal: Omit<Goal, "id" | "progress" | "status">): Promise<Goal> => {
    await delay(400);
    return { ...goal, id: String(Date.now()), progress: 0, status: "active" };
  },
};

// Study plans endpoints
export const studyPlanApi = {
  getTasks: async (): Promise<StudyTask[]> => { await delay(300); return [...sampleTasks]; },
  toggleTask: async (id: string): Promise<StudyTask | undefined> => {
    await delay(200);
    const task = sampleTasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    return task;
  },
};

// Progress endpoints
export const progressApi = {
  getAll: async (): Promise<ProgressEntry[]> => { await delay(300); return [...sampleProgress]; },
  create: async (entry: Omit<ProgressEntry, "id">): Promise<ProgressEntry> => {
    await delay(400);
    return { ...entry, id: String(Date.now()) };
  },
};

// Reflections endpoints
export const reflectionsApi = {
  getAll: async (): Promise<Reflection[]> => { await delay(300); return [...sampleReflections]; },
  submit: async (text: string): Promise<Reflection> => {
    await delay(800);
    // Simulated NLP analysis
    return {
      id: String(Date.now()), text, date: new Date().toISOString().split("T")[0],
      analysis: {
        difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
        topic: ["Data Structures", "Algorithms", "Machine Learning", "System Design"][Math.floor(Math.random() * 4)],
        sentiment: (["positive", "neutral", "negative"] as const)[Math.floor(Math.random() * 3)],
      },
    };
  },
};

// Analytics endpoints
export const analyticsApi = {
  getConsistency: async () => { await delay(300); return consistencyData; },
  getCompletion: async () => { await delay(300); return completionData; },
  getDifficulty: async () => { await delay(300); return difficultyDistribution; },
  getBurnout: async () => { await delay(300); return burnoutTrend; },
};

// Notifications endpoints
export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => { await delay(200); return [...sampleNotifications]; },
  markRead: async (id: string): Promise<void> => {
    await delay(100);
    const notif = sampleNotifications.find(n => n.id === id);
    if (notif) notif.read = true;
  },
};
