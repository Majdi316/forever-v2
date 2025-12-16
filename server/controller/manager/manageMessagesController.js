import Contact from "../../models/Contact.js";
import { User } from "../../models/User.js";

export const getAllContactsForManager = async (req, res) => {
  try {
    const manager = req.user;

    if (!manager.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Managers only.",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Contact.countDocuments();

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get user details manually
    const userIds = contacts.map((c) => c.userId);
    const users = await User.find(
      { _id: { $in: userIds } },
      "name email phone image isBlocked"
    ).lean();

    const usersMap = {};
    users.forEach((u) => {
      usersMap[u._id.toString()] = u;
    });

    const result = contacts.map((contact) => ({
      ...contact,
      user: usersMap[contact.userId.toString()] || null,
    }));

    res.json({
      success: true,
      data: result,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const answerContact = async (req, res) => {
  try {
    if (!req.user.isManager) {
      return res.status(403).json({ message: "Managers only" });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { answer },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteContact = async (req, res) => {
  try {
    if (!req.user.isManager) {
      return res.status(403).json({ message: "Managers only" });
    }

    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
