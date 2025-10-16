import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

const AdminAuthProvider = ({ children }) => {
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const cookieAuthStatus = Cookies.get("adminAuth");
    const token = Cookies.get("adminAuthToken");

    if (cookieAuthStatus === "true" && token) {
      setIsAuthenticatedAdmin(true);
      fetchAdminData(token);
    }

    setLoading(false);
  }, []);

  const fetchAdminData = async (token) => {
    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const users = await response.json();
      const adminUser = users.find(
        (user) => Cookies.get("adminEmail") === user.email
      );

      if (adminUser) {
        setAdminName(adminUser.firstName);
      } else {
        // Logout if no user found (optional)
        logout();
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  const login = async (usernameOrEmail, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameOrEmail,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setIsAuthenticatedAdmin(true);
        setAdminName(data.user.firstName);

        // Store necessary data in cookies
        Cookies.set("adminAuth", "true", { expires: 7 });
        Cookies.set("adminEmail", data.user.email);
        Cookies.set("adminAuthToken", data.token); // Store auth token for future use
        sessionStorage.setItem("isAuthenticatedAdmin", "true");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticatedAdmin(false);
    setAdminName("");
    sessionStorage.removeItem("isAuthenticatedAdmin");
    Cookies.remove("adminAuth");
    Cookies.remove("adminEmail");
    Cookies.remove("adminAuthToken");
  };

  return (
    <AdminAuthContext.Provider
      value={{ isAuthenticatedAdmin, login, logout, error, loading, adminName }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
