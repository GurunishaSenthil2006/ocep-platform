// Sample data for the OCEP platform

export interface Goal {
  id: string;
  title: string;
  description: string;
  duration: string;
  startDate: string;
  progress: number;
  status: "active" | "completed" | "paused";
}

export interface StudyTask {
  id: string;
  title: string;
  goalId: string;
  date: string;
  completed: boolean;
  duration: string;
  priority: "high" | "medium" | "low";
}

export interface ProgressEntry {
  id: string;
  date: string;
  problemsCompleted: number;
  timeSpent: number;
  completed: boolean;
  goalId: string;
}

export interface Reflection {
  id: string;
  text: string;
  date: string;
  analysis?: {
    difficulty: string;
    topic: string;
    sentiment: "positive" | "neutral" | "negative";
  };
}

export interface Notification {
  id: string;
  type: "missed" | "reminder" | "burnout" | "achievement";
  message: string;
  date: string;
  read: boolean;
}

export const sampleGoals: Goal[] = [
  { id: "1", title: "Master Data Structures", description: "Complete all DS topics including trees, graphs, and hash maps", duration: "3 months", startDate: "2026-01-15", progress: 65, status: "active" },
  { id: "2", title: "Learn Machine Learning", description: "Cover supervised and unsupervised learning algorithms", duration: "2 months", startDate: "2026-02-01", progress: 30, status: "active" },
  { id: "3", title: "Web Development Bootcamp", description: "Build 5 full-stack projects using React and Node.js", duration: "6 weeks", startDate: "2025-12-01", progress: 100, status: "completed" },
  { id: "4", title: "System Design Prep", description: "Study system design patterns for interviews", duration: "1 month", startDate: "2026-02-10", progress: 15, status: "active" },
];

export const sampleTasks: StudyTask[] = [
  { id: "1", title: "Binary Tree Traversals", goalId: "1", date: "2026-02-22", completed: false, duration: "1.5 hrs", priority: "high" },
  { id: "2", title: "Graph BFS & DFS", goalId: "1", date: "2026-02-22", completed: true, duration: "2 hrs", priority: "high" },
  { id: "3", title: "Linear Regression Notes", goalId: "2", date: "2026-02-22", completed: false, duration: "1 hr", priority: "medium" },
  { id: "4", title: "Neural Network Basics", goalId: "2", date: "2026-02-23", completed: false, duration: "2 hrs", priority: "medium" },
  { id: "5", title: "Hash Map Implementation", goalId: "1", date: "2026-02-23", completed: false, duration: "1 hr", priority: "low" },
  { id: "6", title: "CAP Theorem Reading", goalId: "4", date: "2026-02-22", completed: false, duration: "45 min", priority: "low" },
];

export const sampleProgress: ProgressEntry[] = [
  { id: "1", date: "2026-02-20", problemsCompleted: 5, timeSpent: 120, completed: true, goalId: "1" },
  { id: "2", date: "2026-02-19", problemsCompleted: 3, timeSpent: 90, completed: true, goalId: "1" },
  { id: "3", date: "2026-02-18", problemsCompleted: 4, timeSpent: 150, completed: true, goalId: "2" },
  { id: "4", date: "2026-02-17", problemsCompleted: 2, timeSpent: 60, completed: false, goalId: "1" },
  { id: "5", date: "2026-02-16", problemsCompleted: 6, timeSpent: 180, completed: true, goalId: "1" },
];

export const sampleReflections: Reflection[] = [
  { id: "1", text: "Today I struggled with dynamic programming problems. The concept of memoization is still unclear to me.", date: "2026-02-21", analysis: { difficulty: "Hard", topic: "Dynamic Programming", sentiment: "negative" } },
  { id: "2", text: "Graph traversals are making much more sense now. I was able to solve 3 medium-level problems without hints.", date: "2026-02-20", analysis: { difficulty: "Medium", topic: "Graphs", sentiment: "positive" } },
  { id: "3", text: "Completed the basics of linear regression. It was straightforward but I need more practice with the math.", date: "2026-02-19", analysis: { difficulty: "Easy", topic: "Machine Learning", sentiment: "neutral" } },
];

export const sampleNotifications: Notification[] = [
  { id: "1", type: "missed", message: "You missed 'Binary Tree Traversals' task yesterday", date: "2026-02-22", read: false },
  { id: "2", type: "burnout", message: "Your study hours have increased 40% this week. Consider taking a break.", date: "2026-02-21", read: false },
  { id: "3", type: "reminder", message: "Don't forget to submit your daily reflection", date: "2026-02-22", read: false },
  { id: "4", type: "achievement", message: "🎉 You completed 'Web Development Bootcamp' goal!", date: "2026-02-20", read: true },
  { id: "5", type: "reminder", message: "Study plan for tomorrow has 3 pending tasks", date: "2026-02-22", read: false },
];

export const consistencyData = [
  { date: "Feb 15", score: 72 },
  { date: "Feb 16", score: 85 },
  { date: "Feb 17", score: 60 },
  { date: "Feb 18", score: 78 },
  { date: "Feb 19", score: 82 },
  { date: "Feb 20", score: 90 },
  { date: "Feb 21", score: 75 },
  { date: "Feb 22", score: 88 },
];

export const completionData = [
  { date: "Feb 15", completed: 4, total: 5 },
  { date: "Feb 16", completed: 5, total: 5 },
  { date: "Feb 17", completed: 2, total: 4 },
  { date: "Feb 18", completed: 3, total: 4 },
  { date: "Feb 19", completed: 4, total: 5 },
  { date: "Feb 20", completed: 5, total: 6 },
  { date: "Feb 21", completed: 3, total: 5 },
  { date: "Feb 22", completed: 2, total: 4 },
];

export const difficultyDistribution = [
  { name: "Easy", value: 30 },
  { name: "Medium", value: 45 },
  { name: "Hard", value: 25 },
];

export const burnoutTrend = [
  { date: "Feb 15", risk: 20 },
  { date: "Feb 16", risk: 25 },
  { date: "Feb 17", risk: 35 },
  { date: "Feb 18", risk: 40 },
  { date: "Feb 19", risk: 38 },
  { date: "Feb 20", risk: 55 },
  { date: "Feb 21", risk: 50 },
  { date: "Feb 22", risk: 45 },
];
