// src/context/AuthProvider.jsx

import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.init";

const BASE_URL = "http://localhost:5000/api";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // VALIDATE TOKEN ON LOAD
  // --------------------------------
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return;

    try {
      const [, payloadBase64] = savedToken.split(".");
      const payload = JSON.parse(atob(payloadBase64));

      if (payload.exp * 1000 < Date.now()) {
        console.warn("JWT expired → clearing session");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userType");
        setUser(null);
        setUserType(null);
      }
    } catch (err) {
      console.error("Malformed token → clearing storage", err);
      localStorage.clear();
      setUser(null);
      setUserType(null);
    }
  }, []);

  // --------------------------------
  // SYNC FIREBASE USER WITH BACKEND
  // --------------------------------
  const syncUserWithBackend = async (firebaseUser, extra = {}) => {
    if (!firebaseUser?.email) return null;

    try {
      const payload = {
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        username: firebaseUser.displayName || extra.username,
        firstName: extra.firstName || firebaseUser.displayName?.split(" ")[0],
        lastName:
          extra.lastName || firebaseUser.displayName?.split(" ")[1] || "",
        userType: extra.userType || "student",
        photoURL: firebaseUser.photoURL,
        loginMethod: "firebase",
      };

      const res = await fetch(`${BASE_URL}/users/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user);
        setUserType(data.user.userType || "student");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userType", data.user.userType);
        return { user: data.user, token: data.token };
      }

      throw new Error(data.message || "Failed to sync user");
    } catch (err) {
      console.error("[AuthProvider] syncUserWithBackend error:", err);
      return null;
    }
  };

  // --------------------------------
  // CONTROLLER LOGIN (Email/Username)
  // --------------------------------
  const signInWithController = async (usernameOrEmail, password) => {
    setLoading(true);
    try {
      const body = {
        usernameOrEmail: usernameOrEmail.trim().toLowerCase(),
        password,
      };

      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data?.user) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data?.message || "Invalid credentials.",
        });
        return null;
      }

      setUser(data.user);
      setUserType(data.user.userType);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userType", data.user.userType);

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Logged in as ${data.user.firstName || data.user.username}`,
        timer: 1200,
        showConfirmButton: false,
      });

      return data;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.message || "Login request failed.",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // GOOGLE LOGIN (STUDENT)
  // --------------------------------
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Sync with backend and store valid JWT
      const syncResponse = await syncUserWithBackend(firebaseUser, {
        userType: "student",
      });

      if (!syncResponse?.user) {
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: "Unable to sync Google user with backend.",
        });
        return null;
      }

      setUser(syncResponse.user);
      setUserType(syncResponse.user.userType || "student");

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text:
          syncResponse.user.firstName || firebaseUser.displayName || "Student",
        timer: 1200,
        showConfirmButton: false,
      });

      return syncResponse;
    } catch (err) {
      console.error("[AuthProvider] Google login failed:", err);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message || "Could not authenticate with Google.",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // LOGOUT
  // --------------------------------
  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.clear();
      setUser(null);
      setUserType(null);
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You’ve been logged out successfully.",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sign Out Failed",
        text: err.message || "Logout failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // FIREBASE AUTH STATE LISTENER
  // --------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setUserType(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      const syncData = await syncUserWithBackend(currentUser);
      setUserType(syncData?.user?.userType || "student");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --------------------------------
  // PROVIDER VALUE
  // --------------------------------
  const authInfo = {
    user,
    userType,
    loading,
    signInWithController,
    signInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
