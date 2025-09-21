"use server";

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export interface Project {
  id?: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  languageFramework: string;
  code: string;
  createdAt: Date | Timestamp;
}

export async function saveProject(project: Omit<Project, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: Timestamp.fromDate(project.createdAt instanceof Date ? project.createdAt : new Date()),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving project:", error);
    return { success: false, error: "Failed to save project." };
  }
}

export async function getProjectsForUser(userId: string): Promise<Project[]> {
    if (!userId) {
        return [];
    }

  const projectsCol = collection(db, "projects");
  const q = query(projectsCol, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  
  const projects = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Convert Firestore Timestamp to Date
      createdAt: (data.createdAt as Timestamp).toDate(),
    } as Project;
  });

  return projects;
}
