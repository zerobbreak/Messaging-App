// DynamicForm.js
import { useState, useEffect } from "react";
import { createContact, createGroup, fetchUsers } from "../api/api";
import { useNavigate } from "react-router-dom";

const DynamicForm = ({ type }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "group") {
      const loadUsers = async () => {
        try {
          const fetchedUsers = await fetchUsers();
          setUsers(fetchedUsers);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };
      loadUsers();
    }
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "user") {
        // const userData = {
        //   username,
        //   email,
        // };
         
        // await createContact(userData);
        alert("User created successfully");
        setUsername("");
        setEmail("");
      } else if (type === "group") {
        const groupData = {
          name: groupName,
          members: selectedMembers,
        };

        await createGroup(groupData);
        alert("Group created successfully");
        setSelectedMembers([]);

      }
      navigate("/");
    } catch (error) {
      console.error(`Failed to create ${type}:`, error);
      alert(`Failed to create ${type}`);
    }
  };

  const handleSelectChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedMembers(selectedValues);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Create {type === "user" ? "User" : "Group"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {type === "user" && (
          <>
            <div className="flex flex-col">
              <label className="shad-form_label mb-2 mr-4">Username:</label>
              <input
                className="h-12 w-80 shad-input rounded-md px-4"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="shad-form_label mb-2 mr-4">Email:</label>
              <input
                className="h-12 w-80 shad-input rounded-md px-4"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}
        {type === "group" && (
          <>
            <div>
              <label className="shad-form_label text-black mr-4">Name</label>
              <input
                className="h-12 w-80 shad-input rounded-md px-4"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-2 gap-2">
              <label className="shad-form_label mr-4">Members:</label>
              <select
                multiple
                value={selectedMembers}
                onChange={handleSelectChange}
                className="shad-textarea p-5"
              >
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <button
          className="mt-4 h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          type="submit"
        >
          Create {type}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
