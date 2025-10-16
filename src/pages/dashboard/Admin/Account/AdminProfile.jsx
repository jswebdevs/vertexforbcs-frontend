import { useEffect, useState, useRef } from "react";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(null); // To handle success/failure status

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(
          "https://vertexforbcs.com/vartexforbcs/web/admin"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAdmin(data[0]);
      } catch (err) {
        setError("Error fetching admin data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Ensure new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    setPasswordError(""); // Clear any previous error

    // Log the data being sent
    console.log("Data being sent:", {
      currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    });

    try {
      const response = await fetch(
        `https://vertexforbcs.com/vartexforbcs/web/admin/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmNewPassword: confirmPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setUpdateMessage("Password updated successfully.");
        setIsUpdateSuccessful(true);
      } else {
        setUpdateMessage(result.message || "Failed to update password.");
        setIsUpdateSuccessful(false);
      }

      setShowPasswordForm(false); // Hide the password form after success
    } catch (err) {
      setPasswordError(err.message);
      setIsUpdateSuccessful(false);
    }
  };


  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowPasswordForm(false);
    }
  };

  useEffect(() => {
    if (showPasswordForm) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPasswordForm]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {admin ? (
        <div className="text-center">
          <img
            src={admin.image_base64}
            alt="Admin Profile"
            className="rounded-full w-24 h-24 mb-4 mx-auto"
          />
          <h1 className="text-xl font-bold">
            Name: {admin.firstName} {admin.lastName}
          </h1>
          <p>Username: {admin.username}</p>
          <p>Email: {admin.email}</p>

          {/* Change Password Button */}
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700"
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>

          {/* Success/Error Message Display */}
          {isUpdateSuccessful !== null && (
            <div
              className={`mt-4 ${
                isUpdateSuccessful ? "text-green-500" : "text-red-500"
              }`}
            >
              {updateMessage}
            </div>
          )}

          {/* Password Change Modal */}
          {showPasswordForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div
                ref={modalRef}
                className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md"
              >
                <button
                  className="text-white hover:text-green-700 font-bold text-xl float-right"
                  onClick={() => setShowPasswordForm(false)}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Change Password</h2>

                <form onSubmit={handlePasswordChange}>
                  {passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                  )}

                  <div className="mb-4">
                    <label className="block text-left text-white">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="border rounded w-full py-2 px-3"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-left text-white">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="border rounded w-full py-2 px-3"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-left text-white">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="border rounded w-full py-2 px-3"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 w-full"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No admin data available.</p>
      )}
    </div>
  );
};

export default AdminProfile;
