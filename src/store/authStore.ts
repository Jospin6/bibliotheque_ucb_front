import { create } from 'zustand';
import { AuthState, User } from '../types';

// Simulated user data - in a real app, this would come from a backend
const MOCK_USERS = [
  { id: '1', name: 'Admin User', role: 'admin' as const, email: 'admin@ucb.ac.cd', password: 'admin123' },
  { id: '2', name: 'Teacher User', role: 'teacher' as const, email: 'teacher@ucb.ac.cd', password: 'teacher123' },
  { id: '3', name: 'Student User', role: 'student' as const, email: 'student@ucb.ac.cd', password: 'student123' }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      set({ user: userWithoutPassword });
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    throw new Error('Identifiants invalides');
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },
}));