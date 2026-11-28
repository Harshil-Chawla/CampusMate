/**
 * Storage Service
 * Handles persistent storage of tasks and notes using AsyncStorage.
 * Provides typed CRUD operations for the app's data models.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Data Types ───────────────────────────────────────────────

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Storage Keys ─────────────────────────────────────────────

const TASKS_KEY = "@campusmate_tasks";
const NOTES_KEY = "@campusmate_notes";

// ─── Task Operations ──────────────────────────────────────────

export async function getTasks(): Promise<Task[]> {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}

export async function addTask(title: string, dueDate: string): Promise<Task> {
  const tasks = await getTasks();
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    completed: false,
    dueDate,
    createdAt: new Date().toISOString(),
  };
  tasks.unshift(newTask);
  await saveTasks(tasks);
  return newTask;
}

export async function toggleTask(id: string): Promise<Task[]> {
  const tasks = await getTasks();
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  await saveTasks(updated);
  return updated;
}

export async function deleteTask(id: string): Promise<Task[]> {
  const tasks = await getTasks();
  const filtered = tasks.filter((task) => task.id !== id);
  await saveTasks(filtered);
  return filtered;
}

// ─── Note Operations ──────────────────────────────────────────

export async function getNotes(): Promise<Note[]> {
  try {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
}

export async function saveNotes(notes: Note[]): Promise<void> {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
}

export async function addNote(title: string, content: string): Promise<Note> {
  const notes = await getNotes();
  const now = new Date().toISOString();
  const newNote: Note = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
  notes.unshift(newNote);
  await saveNotes(notes);
  return newNote;
}

export async function updateNote(
  id: string,
  title: string,
  content: string
): Promise<Note[]> {
  const notes = await getNotes();
  const updated = notes.map((note) =>
    note.id === id
      ? { ...note, title, content, updatedAt: new Date().toISOString() }
      : note
  );
  await saveNotes(updated);
  return updated;
}

export async function deleteNote(id: string): Promise<Note[]> {
  const notes = await getNotes();
  const filtered = notes.filter((note) => note.id !== id);
  await saveNotes(filtered);
  return filtered;
}
