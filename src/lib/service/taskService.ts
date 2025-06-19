import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { Task } from '@/types';

export async function getTasksByUserId(userId: string): Promise<Task[]> {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Task;
    const { id: _, ...rest } = data; // Firestore 내의 id 필드 제거
    return {
      id: doc.id,
      ...rest,
    };
  });
}

export async function addTask(task: Omit<Task, 'id'>): Promise<void> {
  await addDoc(collection(db, 'tasks'), {
    ...task,
    createdAt: serverTimestamp(),
  });
}

export async function updateTask(task: Task): Promise<void> {
  const { id, ...taskData } = task;
  const ref = doc(db, 'tasks', id);
  await updateDoc(ref, {
    ...taskData,
    updatedAt: serverTimestamp(),
  });
}
