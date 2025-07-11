// Firebase Configuration for EcoPoints App
// This is a placeholder configuration - replace with your actual Firebase config

// Firebase configuration object
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "ecopoints-app.firebaseapp.com",
  projectId: "ecopoints-app",
  storageBucket: "ecopoints-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789",
  measurementId: "G-ABCDEF1234",
}

// Initialize Firebase (uncomment when you have actual config)
/*
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
*/

// Placeholder Firebase functions for demo purposes
const FirebaseService = {
  // Initialize Firebase
  init: () => {
    console.log("Firebase initialized (demo mode)")
    return Promise.resolve()
  },

  // User authentication
  auth: {
    signUp: (email, password) => {
      console.log("Sign up:", email)
      return Promise.resolve({ uid: "demo-user-" + Date.now() })
    },

    signIn: (email, password) => {
      console.log("Sign in:", email)
      return Promise.resolve({ uid: "demo-user-" + Date.now() })
    },

    signOut: () => {
      console.log("Sign out")
      return Promise.resolve()
    },

    getCurrentUser: () => ({ uid: "demo-user", email: "demo@ecopoints.com" }),
  },

  // Firestore database operations
  db: {
    // Add user data
    addUser: (userData) => {
      console.log("Adding user to Firestore:", userData)
      return Promise.resolve({ id: "user-" + Date.now() })
    },

    // Get user data
    getUser: (userId) => {
      console.log("Getting user from Firestore:", userId)
      return Promise.resolve({
        id: userId,
        name: "Demo User",
        points: 1250,
        transactions: [],
      })
    },

    // Update user points
    updateUserPoints: (userId, points) => {
      console.log("Updating user points:", userId, points)
      return Promise.resolve()
    },

    // Add transaction
    addTransaction: (userId, transaction) => {
      console.log("Adding transaction:", userId, transaction)
      return Promise.resolve({ id: "transaction-" + Date.now() })
    },

    // Get leaderboard
    getLeaderboard: (limit = 10) => {
      console.log("Getting leaderboard, limit:", limit)
      return Promise.resolve([
        { name: "Rajesh Kumar", points: 3420, city: "Delhi" },
        { name: "Priya Sharma", points: 2845, city: "Mumbai" },
        { name: "Anita Patel", points: 2156, city: "Bangalore" },
      ])
    },

    // Submit contact form
    submitContactForm: (formData) => {
      console.log("Submitting contact form:", formData)
      return Promise.resolve({ id: "contact-" + Date.now() })
    },
  },

  // Analytics
  analytics: {
    logEvent: (eventName, parameters) => {
      console.log("Analytics event:", eventName, parameters)
    },

    setUserProperties: (properties) => {
      console.log("Setting user properties:", properties)
    },
  },
}

// Real Firebase integration functions (to be implemented when Firebase is set up)
const RealFirebaseService = {
  // Initialize Firebase with real config
  init: async () => {
    try {
      // Uncomment and modify when ready to use real Firebase
      /*
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
            const { getFirestore, collection, addDoc, doc, getDoc, updateDoc, query, orderBy, limit, getDocs } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');
            const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js');
            
            const app = initializeApp(firebaseConfig);
            this.db = getFirestore(app);
            this.auth = getAuth(app);
            
            console.log('Firebase initialized successfully');
            return true;
            */
      return false
    } catch (error) {
      console.error("Firebase initialization error:", error)
      return false
    }
  },

  // Real database operations would go here
  // Example:
  /*
    addUser: async function(userData) {
        try {
            const docRef = await addDoc(collection(this.db, 'users'), userData);
            return { id: docRef.id };
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }
    */
}

// Export the service (use FirebaseService for demo, RealFirebaseService for production)
if (typeof window !== "undefined") {
  window.FirebaseService = FirebaseService
  window.RealFirebaseService = RealFirebaseService
}

// For Node.js environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = { FirebaseService, RealFirebaseService, firebaseConfig }
}

// Instructions for setting up real Firebase:
/*
1. Go to https://console.firebase.google.com/
2. Create a new project or select existing one
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Get your config from Project Settings > General > Your apps
6. Replace the firebaseConfig object above with your real config
7. Uncomment the real Firebase initialization code
8. Replace FirebaseService with RealFirebaseService in your app
9. Set up Firestore security rules
10. Deploy your app

Sample Firestore Security Rules:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null;
    }
    match /leaderboard/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
*/
