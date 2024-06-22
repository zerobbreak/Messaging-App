import { useState } from "react";
import user from "../assets/office-man.png";

const SettingsPage = () => {
  // Initialize state for user settings
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send a request to update user settings to the server
    console.log("Submitting settings:", {
      username,
      email,
      password,
      notificationEnabled,
      darkModeEnabled,
    });
  };

  return (
    <div className="flex items-center justify-center mt-20 container mx-auto p-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="notificationToggle"
              checked={notificationEnabled}
              onChange={() => setNotificationEnabled((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="notificationToggle">Enable Notifications</label>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="darkModeToggle"
              checked={darkModeEnabled}
              onChange={() => setDarkModeEnabled((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="darkModeToggle">Dark Mode</label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save Settings
          </button>
        </form>
      </div>
      <div>
        <img src={user} alt="user img" className="w-44"/>
      </div>
    </div>
  );
};

export default SettingsPage;
