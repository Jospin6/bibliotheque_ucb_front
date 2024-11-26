export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  pdfUrl: string;
  category: string;
  description: string;
  publicationYear: number;
  available: boolean;
  reads: number;
  lastRead: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  email: string;
  department?: string;
}

export interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface BookFormData extends FormData {
  append(name: string, value: string | Blob, fileName?: string): void;
}