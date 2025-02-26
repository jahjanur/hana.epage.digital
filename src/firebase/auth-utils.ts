import { 
  signInWithRedirect, 
  signInWithPopup, 
  getRedirectResult,
  browserLocalPersistence,
  setPersistence,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth, provider } from './config';
import { db } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Initialize auth persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

export const signInWithGoogleAuth = async (isMobile: boolean): Promise<UserCredential | null> => {
  try {
    // Configure provider
    provider.setCustomParameters({
      prompt: 'select_account',
      // Add specific mobile parameters
      ...(isMobile && {
        mobile: 'true',
        // Handle iOS Safari issues
        redirect_uri: window.location.origin + window.location.pathname,
        // Force OAuth to use system browser
        display: 'touch'
      })
    });

    if (isMobile) {
      // Use redirect for mobile
      await signInWithRedirect(auth, provider);
      return null; // Will redirect
    } else {
      // Use popup for desktop
      return await signInWithPopup(auth, provider);
    }
  } catch (error: any) {
    console.error('Sign-in error:', error);
    throw error;
  }
};

export const handleRedirectResult = async (): Promise<UserCredential | null> => {
  try {
    return await getRedirectResult(auth);
  } catch (error) {
    console.error('Redirect result error:', error);
    throw error;
  }
};

export const detectMobile = (): boolean => {
  return /iPhone|iPad|iPod|Android|Mobile|webOS/i.test(navigator.userAgent) ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);
};

export const signInOrCreateUser = async (email: string) => {
  try {
    // Sanitize email to use as ID
    const sanitizedEmail = email.replace(/\./g, ',');
    
    // Create or update user document
    const userRef = doc(db, 'users', sanitizedEmail);
    await setDoc(userRef, {
      email: email, // Store original email
      createdAt: new Date()
    }, { merge: true });

    // Store email in localStorage
    localStorage.setItem('userEmail', email);
    
    return { 
      email, 
      id: sanitizedEmail 
    };
  } catch (error) {
    console.error('Error in signInOrCreateUser:', error);
    throw error;
  }
};

export const getUserFromStorage = () => {
  const email = localStorage.getItem('userEmail');
  if (!email) return null;
  return {
    email,
    id: email.replace(/\./g, ',')
  };
};

export const signOut = () => {
  localStorage.removeItem('userEmail');
}; 