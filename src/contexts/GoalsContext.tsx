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

interface Goal {
  id: string;
  type: 'prayer' | 'taraweeh' | 'quran';
  value: number;
  date: string;
  userId: string;
}

interface DailyProgress {
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  taraweeh: boolean;
  quran: number;
}

interface GoalsContextType {
  isAuthenticated: boolean;
  currentUser: AppUser | null;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => void;
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  getTodayProgress: () => Promise<DailyProgress>;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

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

  const getTodayProgress = async (): Promise<DailyProgress> => {
    if (!currentUser) {
      return {
        prayers: {
          fajr: false,
          dhuhr: false,
          asr: false,
          maghrib: false,
          isha: false
        },
        taraweeh: false,
        quran: 0
      };
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.id));
      if (!userDoc.exists()) {
        throw new Error('User document not found');
      }

      const data = userDoc.data();
      return {
        prayers: {
          fajr: data.prayer_log?.fajr === true,
          dhuhr: data.prayer_log?.dhuhr === true,
          asr: data.prayer_log?.asr === true,
          maghrib: data.prayer_log?.maghrib === true,
          isha: data.prayer_log?.isha === true
        },
        taraweeh: data.taraweeh === true,
        quran: data.quran_progress || 0
      };
    } catch (error) {
      console.error('Error getting today\'s progress:', error);
      return {
        prayers: {
          fajr: false,
          dhuhr: false,
          asr: false,
          maghrib: false,
          isha: false
        },
        taraweeh: false,
        quran: 0
      };
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
        addGoal: (goal: Goal) => setGoals(prev => [...prev, goal]),
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