import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.init";

// You can switch between local and render later
const LOCAL_API = "http://localhost:5000/api";
const RENDER_API = "https://your-render-api.onrender.com/api"; // <-- replace later

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔧 utility to pick base URL dynamically
  const baseURL =
    window.location.hostname === "localhost" ? LOCAL_API : RENDER_API;

  /** ------------------------
   * 🧾 Save or fetch user from backend MongoDB
   * ------------------------ */
  const syncUserWithBackend = async (firebaseUser, extra = {}) => {
    if (!firebaseUser?.email) return null;

    try {
      const res = await fetch(`${baseURL}/users/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: firebaseUser.email,
          username: firebaseUser.displayName || extra.username,
          uid: firebaseUser.uid,
          userType: extra.userType || "student",
          photoURL: firebaseUser.photoURL,
        }),
      });

      const data = await res.json();
      if (data?.userType) {
        setUserType(data.userType);
      } else {
        setUserType("student");
      }
    } catch (err) {
      console.error("Error syncing user with backend:", err);
    }
  };

  /** ------------------------
   * ✉️ Sign up using email + password
   * ------------------------ */
  const signUpUser = async (
    email,
    password,
    username,
    userType = "student"
  ) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (username) {
        await updateProfile(result.user, { displayName: username });
      }

      setUser(result.user);
      await syncUserWithBackend(result.user, { username, userType });
      return result.user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /** ------------------------
   * 🔐 Sign in with email + password
   * ------------------------ */
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      await syncUserWithBackend(result.user);
      return result.user;
    } finally {
      setLoading(false);
    }
  };

  /** ------------------------
   * 🟦 Google sign in / sign up
   * ------------------------ */
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await syncUserWithBackend(result.user, { userType: "student" });
      return result.user;
    } finally {
      setLoading(false);
    }
  };

  /** ------------------------
   * 🚪 Sign out
   * ------------------------ */
  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserType(null);
    } finally {
      setLoading(false);
    }
  };

  /** ------------------------
   * 👀 Listen for auth changes
   * ------------------------ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserWithBackend(currentUser);
      } else {
        setUserType(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /** ------------------------
   * 🌍 Context value
   * ------------------------ */
  const authInfo = {
    user,
    userType,
    loading,
    signUpUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-ring loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
