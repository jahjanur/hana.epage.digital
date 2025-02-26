import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  query, 
  where, 
  getDocs,
  doc,
  getDoc 
} from 'firebase/firestore';
import { signInOrCreateUser, getUserFromStorage, signOut } from '../firebase/auth-utils';

interface AppUser {
  email: string;
  id: string;
  displayName?: string;
}

interface GoalsContextType {
  isAuthenticated: boolean;
  currentUser: AppUser | null;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => void;
  goals: any[];
  addGoal: (goal: any) => void;
  getTodayProgress: () => any;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [goals, setGoals] = useState<any[]>([]);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setCurrentUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const signInWithEmail = async (email: string) => {
    try {
      const user = await signInOrCreateUser(email);
      setCurrentUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const handleSignOut = () => {
    signOut();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const getTodayProgress = async () => {
    if (!currentUser) return {};
    
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.id));
      if (!userDoc.exists()) return {};
      
      const data = userDoc.data();
      return {
        prayers: Object.values(data.prayer_log || {}).filter(Boolean).length,
        taraweeh: data.taraweeh ? 1 : 0,
        quran: data.quran_progress || 0
      };
    } catch (error) {
      console.error('Error getting today progress:', error);
      return {};
    }
  };

  return (
    <GoalsContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        signInWithEmail,
        signOut: handleSignOut,
        goals,
        addGoal: (goal: any) => setGoals(prev => [...prev, goal]),
        getTodayProgress,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
}; 