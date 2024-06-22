import { useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { fetchGroups, fetchUsers } from "../api/api";
import userImage from "../assets/office-man.png";
import { Chat, Searchbar } from "../components";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadUsersAndGroups = async () => {
      try {
        const usersData = await fetchUsers();
        const groupsData = await fetchGroups();
        setUsers(usersData);
        setGroups(groupsData);
      } catch (error) {
        console.error("Failed to fetch users or groups:", error);
      }
    };

    loadUsersAndGroups();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedGroup(null);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
  };

  const navigate = useNavigate();

  const handleCreateGroupClick = () => {
    navigate("/create-group");
  };

  const handleCreateUserClick = () => {
    navigate("/create-user");
  };

  return (
    <div className="w-full flex gap-2">
      <div>
        <div className="flex flex-col gap-5 p-8">
          <div className="flex p-4 items-center gap-10">
            <div className="flex items-center gap-4">
              <img
                src={userImage}
                alt="user"
                className="w-14 bg-white rounded-full p-2"
              />
              <p className="h3-bold">Chats</p>
            </div>
            <Link to="/settings" className="text-gray-600 hover:text-gray-800">
              <IoSettingsOutline size={20} />
            </Link>
            <FaRegEdit fontSize={20} />
          </div>

          <Searchbar />

          <div className="w-100 flex-wrap">
            <div className="flex gap-5">
              <p className="base-semibold">GROUPS</p>
              <AiOutlineUsergroupAdd
                fontSize={24}
                onClick={handleCreateGroupClick}
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-center p-5 gap-10 flex-wrap overflow-x-hidden">
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleGroupSelect(group)}
                >
                  <MdGroup fontSize={30} />
                  <p>{group.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex gap-5 mb-6">
              <p className="base-semibold">MESSAGES</p>
              <AiOutlineUserAdd
                fontSize={24}
                onClick={handleCreateUserClick}
                className="cursor-pointer"
              />
            </div>
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-start p-3 gap-3 cursor-pointer"
                onClick={() => handleUserSelect(user)}
              >
                <IoMdPerson fontSize={35} />
                <div>
                  <p className="small-medium">{user.username}</p>
                  <p className="small-regular">{user.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        {selectedUser ? (
          <Chat userInfo={selectedUser} />
        ) : selectedGroup ? (
          <Chat userInfo={selectedGroup} />
        ) : (
          <div className="p-4">
            <p className="text-gray-500">
              Select a user or group to view messages
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
