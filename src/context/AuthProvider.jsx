// src/context/AuthProvider.jsx
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
import Swal from "sweetalert2";
import auth from "../firebase/firebase.init";

// Backend API URLs
const LOCAL_API = "http://localhost:5000/api";
const BASE_URLS = [
  "https://www.backend.vertexforbcs.org/api",
  "http://www.backend.vertexforbcs.org/api",
  "https://backend.vertexforbcs.org/api",
  "https://vertexfbcs.netlify.app/api",
  "http://localhost:5000/api",
];

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine baseURL dynamically
  const baseURL =
    window.location.hostname === "localhost"
      ? LOCAL_API
      : BASE_URLS.find((url) => url.includes(window.location.hostname)) ||
        BASE_URLS[0];

  // Sync Firebase user with backend
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
      setUserType(data?.userType || "student");
      return data;
    } catch (err) {
      console.error("Error syncing user with backend:", err);
      return null;
    }
  };

  // Controller login (username/password)
  const signInWithController = async (usernameOrEmail, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Check if admin
      if (data.userType !== "admin") {
        Swal.fire({
          icon: "warning",
          title: "Not an Admin",
          text: "You are not an admin. Redirecting to student login...",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/student/login";
        });
        return null;
      }

      setUser(data);
      setUserType(data.userType || "admin");
      return data;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Controller login failed",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Firebase email/password signup
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
      if (username) await updateProfile(result.user, { displayName: username });
      setUser(result.user);
      await syncUserWithBackend(result.user, { username, userType });
      return result.user;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message || "Signup failed",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Firebase email/password login
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      const data = await syncUserWithBackend(result.user);
      if (data?.userType !== "admin") {
        Swal.fire({
          icon: "warning",
          title: "Not an Admin",
          text: "You are not an admin. Redirecting to student login...",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/student/login";
        });
        return null;
      }
      setUserType(data.userType || "admin");
      return result.user;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Firebase login failed",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Google login/signup
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      const data = await syncUserWithBackend(result.user, {
        userType: "student",
      });

      if (data?.userType !== "admin") {
        Swal.fire({
          icon: "warning",
          title: "Not an Admin",
          text: "You are not an admin. Redirecting to student login...",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/student/login";
        });
        return null;
      }

      setUserType(data.userType || "admin");
      return result.user;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message || "Google login failed",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserType(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sign Out Failed",
        text: err.message || "Sign out failed",
      });
    } finally {
      setLoading(false);
    }
  };

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await syncUserWithBackend(currentUser);
        if (data?.userType !== "admin") {
          Swal.fire({
            icon: "warning",
            title: "Not an Admin",
            text: "Redirecting to student login...",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "/student/login";
          });
          return;
        }
        setUserType(data.userType || "admin");
      } else {
        setUserType(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    userType,
    loading,
    signUpUser,
    signInUser,
    signInWithGoogle,
    signInWithController,
    signOutUser,
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-green-200 dark:bg-green-900 z-50">
        <div className="loading loading-ring loading-xl text-green-700 dark:text-green-300"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
