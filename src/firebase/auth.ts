import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { app, db } from './config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add scopes for better user data access
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Set custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  try {
    console.log('Starting Google sign in...');
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('Google sign in successful:', user.uid);
    
    // Check if user document exists
    const userDocRef = doc(db, 'users', user.uid);
    console.log('Checking if user exists in Firestore...');
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.log('Creating new user document...');
      const userData = {
        email: user.email,
        prayer_log: {
          0: "Fajr",
          1: "Dhuhr",
          2: "Asr",
          3: "Maghrib",
          4: "Isha"
        },
        quran_progress: 0,
        taraweeh: false,
        lastLogin: new Date(),
        createdAt: new Date()
      };
      
      try {
        await setDoc(userDocRef, userData);
        console.log('User document created successfully');
      } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
      }
    } else {
      console.log('Updating existing user...');
      try {
        await setDoc(userDocRef, {
          lastLogin: new Date()
        }, { merge: true });
        console.log('User last login updated');
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
    
    return user;
  } catch (error: any) {
    console.error('Error in signInWithGoogle:', error.code, error.message);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};