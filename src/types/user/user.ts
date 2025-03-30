import { Timestamp } from 'firebase/firestore';

export type AppUser = {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  createdAt?: Timestamp;
};
