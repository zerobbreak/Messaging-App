export const messagesData = {
    Alice: [
      { text: "Hello!", isSender: false, timestamp: "10:00 AM" },
      { text: "Hi there!", isSender: true, timestamp: "10:01 AM" },
      { text: "How are you?", isSender: false, timestamp: "10:02 AM" },
      { text: "I am good, thanks!", isSender: true, timestamp: "10:03 AM" },
    ],
    Bob: [
      { text: "Hey!", isSender: false, timestamp: "11:00 AM" },
      { text: "What's up?", isSender: true, timestamp: "11:01 AM" },
      { text: "Not much, you?", isSender: false, timestamp: "11:02 AM" },
    ],
    Charlie: [
      { text: "Good morning!", isSender: false, timestamp: "9:00 AM" },
      { text: "Morning!", isSender: true, timestamp: "9:01 AM" },
      {
        text: "Any updates on the project?",
        isSender: false,
        timestamp: "9:02 AM",
      },
    ],
  }

  export const groupMessagesData = {
    "Group 1": [
      {
        user: "Alice",
        text: "Welcome to Group 1!",
        timestamp: "12:00 PM",
        isSender: false,
      },
      { user: "Bob", text: "Thanks!", timestamp: "12:01 PM", isSender: false },
    ],
    "Group 2": [
      {
        user: "Charlie",
        text: "Group 2 rocks!",
        timestamp: "1:00 PM",
        isSender: false,
      },
      { user: "Alice", text: "Indeed!", timestamp: "1:01 PM", isSender: false },
    ],
    "Group 3": [
      {
        user: "Bob",
        text: "Group 3 for the win!",
        timestamp: "2:00 PM",
        isSender: false,
      },
      {
        user: "Charlie",
        text: "Absolutely!",
        timestamp: "2:01 PM",
        isSender: false,
      },
    ],
  }