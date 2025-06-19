import { db } from '@/lib/firebase/firebase';
import { Project } from '@/types';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

export async function getProjectsByUserId(userId: string): Promise<Project[]> {
  try {
    const q = query(collection(db, 'projects'), where('userId', '==', userId));

    const querySnapshot = await getDocs(q);

    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...(doc.data() as Omit<Project, 'id'>),
      });
    });

    return projects;
  } catch (error) {
    console.error('[getProjectsByUserId] Firestore 오류:', error);
    return [];
  }
}

export async function addProject(
  project: Omit<Project, 'id' | 'userId'> & { userId: string }
): Promise<void> {
  await addDoc(collection(db, 'projects'), {
    ...project,
    createdAt: serverTimestamp(),
  });
}
