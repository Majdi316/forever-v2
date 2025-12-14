import Contact from "../../models/Contact.js";

export const getUserMessages = async (req, res) => {
  try {
    const manager = req.user;
    if (!manager.isManager) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { userId } = req.params;

    const messages = await Contact.find({ userId })
      .sort({ createdAt: -1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const answerMessage = async (req, res) => {
  try {
    const manager = req.user;
    if (!manager.isManager) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { contactId } = req.params;
    const { answer } = req.body;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    contact.answer = answer;
    await contact.save();

    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};