import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc,
  Timestamp, 
  serverTimestamp
} from 'firebase/firestore';
import { format } from 'date-fns';

interface Goal {
  id: string;
  userId: string;
  type: 'prayer' | 'taraweeh' | 'quran';
  date: Date;
  value: number;
}

interface GoalsContextType {
  goals: Goal[];
  loading: boolean;
  isAuthenticated: boolean;
  currentUser: User | null;
  addGoal: (type: Goal['type'], value: number) => Promise<void>;
  getTodayProgress: () => { prayers: number; taraweeh: number; quran: number; };
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const GoalsContext = createContext<GoalsContextType | null>(null);

export const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setIsAuthenticated(!!user);
      setCurrentUser(user);
      if (user) {
        fetchGoals(user.uid);
      } else {
        setGoals([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchGoals = async (userId: string) => {
    try {
      const goalsRef = collection(db, 'goals');
      const q = query(goalsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const fetchedGoals = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Goal[];
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const addGoal = async (type: Goal['type'], value: number) => {
    if (!currentUser) return;
    
    try {
      const newGoal = {
        userId: currentUser.uid,
        type,
        value,
        date: new Date(),
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'goals'), newGoal);
      const newGoalWithId = { ...newGoal, id: docRef.id };
      setGoals(prev => [...prev, newGoalWithId]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getTodayProgress = () => {
    if (!currentUser) return { prayers: 0, taraweeh: 0, quran: 0 };
    
    // Find today's activities
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayActivities = goals.filter(goal => 
      format(goal.date, 'yyyy-MM-dd') === today
    );

    return {
      prayers: todayActivities.filter(g => g.type === 'prayer').reduce((sum, g) => sum + g.value, 0),
      taraweeh: todayActivities.filter(g => g.type === 'taraweeh').reduce((sum, g) => sum + g.value, 0),
      quran: todayActivities.filter(g => g.type === 'quran').reduce((sum, g) => sum + g.value, 0)
    };
  };

  return (
    <GoalsContext.Provider value={{
      goals,
      loading,
      isAuthenticated,
      currentUser,
      addGoal,
      getTodayProgress,
      signInWithGoogle,
      signOut
    }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) throw new Error('useGoals must be used within GoalsProvider');
  return context;
}; 