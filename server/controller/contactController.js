import Contact from "../models/Contact.js";
import { validateContact } from "../validation/service/contactService.js";

/**-------------------------------------------------
 * @desc  Create New Contact
 * @route  /contacts/create
 * @method  POST
 * @access private (all users type)
 ---------------------------------------------------*/
const createNewContactController = async (req, res) => {
  const contact = req.body;
  const user = req.user;
  try {
    const contactToDb = { ...contact, userId: user._id };
    //!--------validate contact before creation-------------
    const { error } = validateContact(contactToDb);
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    const newContact = new Contact(contactToDb);
    await newContact.save();
    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error :" + error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  Get Contacts By User Id
 * @route  /contacts/my-contacts/:id
 * @method  Get
 * @access private (Only Registered User)
 ---------------------------------------------------*/
const getContactsByUserId = async (req, res) => {
  const registeredUserId = req.user._id;
  const userId = req.params.id;
  try {
    //! variables for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //! Only registered user can view his Contact massages
    if (registeredUserId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only registered user can view his Contact massages",
      });
    }

    //!Fetch contacts for this user
    const contacts = await Contact.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //! Total product count & total pages
    const totalContacts = await Contact.countDocuments({ userId });
    const totalPages = Math.ceil(totalContacts / limit);

    //! response for client
    return res.status(200).json({
      success: true,
      contacts,
      page,
      totalPages,
      count: totalContacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error :" + error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc    Delete a Contact
 * @route   /contacts/:id
 * @method  DELETE
 * @access  Private (only the user who created it)
 ---------------------------------------------------*/
export const deleteContactController = async (req, res) => {
  try {
    const userId = req.user._id;
    const contactId = req.params.id;
    //! Fetch contact message data
    const contact = await Contact.findById(contactId);
    //! check if contact message is exist
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    //! Only owner can delete
    if (contact.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own messages",
      });
    }
    //! delete contact
    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      id: contactId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//TODO Export
export { createNewContactController, getContactsByUserId };
