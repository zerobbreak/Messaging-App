import Message from "../models/Message.js";
import Group from "../models/Group.js";

export const sendMessage = async (req, res) => {
    const { recipient, groupId, text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Message text is required" });
    }

    if (!recipient && !groupId) {
        return res.status(400).json({ message: "Recipient or Group ID is required" });
    }

    const messageData = {
        sender: req.user._id,
        text,
        timestamp: new Date(),
    };

    if (recipient) {
        messageData.recipient = recipient;
    } else if (groupId) {
        messageData.groupId = groupId;
    }

    try {
        const message = new Message(messageData);
        const savedMessage = await message.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
    const { recipientId, groupId } = req.query;

    if (recipientId && groupId) {
        return res.status(400).json({ message: "Specify either recipientId or groupId, not both" });
    }

    if (!recipientId && !groupId) {
        return res.status(400).json({ message: "Recipient ID or Group ID is required" });
    }

    try {
        let messages;
        if (recipientId) {
            messages = await Message.find({
                $or: [
                    { sender: req.user._id, recipient: recipientId },
                    { sender: recipientId, recipient: req.user._id }
                ]
            }).sort({ timestamp: 1 });
        } else if (groupId) {
            messages = await Message.find({ groupId }).sort({ timestamp: 1 });
        }

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
