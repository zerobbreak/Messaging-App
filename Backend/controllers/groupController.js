import Group from "../models/Group.js";

export const createGroup = async (req, res) => {
    const { name, members } = req.body;

    try {
        const group = new Group({
            name,
            members
        });

        const savedGroup = await group.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId).populate('members');
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate("members");
        res.json(groups);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}