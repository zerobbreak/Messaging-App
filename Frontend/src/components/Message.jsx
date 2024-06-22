
const Message = ({ isSender, text, timestamp, onClick, user }) => {
  return (
    <div onClick={() => onClick(user)} className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2 cursor-pointer`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg ${isSender ? 'bg-black text-white' : 'bg-white text-black'} shadow-md`}>
        {user && !isSender && <p className="font-bold">{user.name}</p>}
        <p>{text}</p>
        <p className="text-xs text-gray-400 mt-1 text-right">{timestamp}</p>
      </div>
    </div>
  );
};

export default Message;
