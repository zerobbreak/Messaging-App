import { useEffect, useState, useContext } from "react";
import Message from "./Message";
import userImage from "../assets/office-man.png";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoVideocamOutline, IoSettingsOutline } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import { sendMessage, fetchMessages, fetchUserDetailsByIds } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Chat = ({ userInfo }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        let fetchedMessages;
        if (userInfo.members) {
          fetchedMessages = await fetchMessages({ groupId: userInfo._id });
          const memberIds = userInfo.members.map((member) => member._id);
          const membersDetails = await fetchUserDetailsByIds(memberIds);
          setMembers(membersDetails);
        } else {
          fetchedMessages = await fetchMessages({ recipientId: userInfo._id });
          console.log("Fetched messages for user:", fetchedMessages);
        }
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMessages();
  }, [userInfo]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      text: newMessage,
      sender: user.id,
    };

    if (userInfo?.members) {
      messageData.groupId = userInfo._id;
    } else {
      messageData.recipient = userInfo._id;
    }

    try {
      const sentMessage = await sendMessage(messageData);
      setMessages([...messages, sentMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message: ", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between p-10 bg-gray-50">
        <div className="flex items-center gap-10">
          <img
            src={userImage}
            alt="user"
            className="w-14 bg-black rounded-full p-2"
          />
          <div className="text-black">
            <h3 className="h3-bold">{userInfo.username}</h3>
            <p className="body-medium">{userInfo.details}</p>
            {userInfo?.members && members.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                <h3 className="h3-bold">{userInfo.name}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {members.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <p className="ml-2">{member.username}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center text-black ml-96 gap-5">
          <MdOutlineLocalPhone fontSize={22} />
          <IoVideocamOutline fontSize={22} />
          <IoSettingsOutline fontSize={22} />
          <BsExclamationCircle fontSize={22} />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 bg-gray-200">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((msg, index) => (
            <Message
              key={index}
              isSender={msg.sender === user._id}
              text={msg.text}
              timestamp={new Date(msg.timestamp).toLocaleDateString()}
              user={msg.sender.username}
            />
          ))
        )}
      </div>
      <div className="p-4 bg-white flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
