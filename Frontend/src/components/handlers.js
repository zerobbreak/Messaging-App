const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedGroup(null);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    const userName = prompt("Enter the name of the new user:");
    const userDetails = prompt("Enter the details of the new user:");
    if (userName && userDetails) {
      const newUser = { name: userName, details: userDetails };
      setUsers([...users, newUser]);

      // Initialize messages for the new user
      setMessages((prevMessages) => ({
        ...prevMessages,
        [userName]: [],
      }));
    }
  };

  const handleAddGroup = () => {
    const groupName = prompt("Enter the name of the new group:");
    if (groupName) {
      setGroups([...groups, groupName]);

      // Initialize messages for the new group
      setGroupMessages((prevGroupMessages) => ({
        ...prevGroupMessages,
        [groupName]: [],
      }));
    }
  };