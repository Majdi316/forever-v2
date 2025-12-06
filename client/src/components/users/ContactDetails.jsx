// TODO Libraries
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// TODO MUI
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
//TODO MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";
// TODO Context
import { UserContext } from "../../context/UserContext";
// TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Component
const ContactDetails = ({ refresh }) => {
  //TODO Variables
  const { theme, backendUrl, token, user, buttonTheme, titleTheme } =
    useContext(UserContext);
  //TODO  State
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //TODO Functions
  const fetchContacts = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/contacts/my-contacts/${user._id}?page=${pageNumber}&limit=5`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setContacts(data.contacts);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };
  //--------------------------------------------
  const handleDelete = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/contacts/${contactId}`,
        {
          headers: { "x-auth-token": token },
        }
      );

      toast.success(data.message);

      // Remove deleted contact from state instantly
      setContacts((prev) => prev.filter((c) => c._id !== contactId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete message");
    }
  };
  //TODO useEffects
  useEffect(() => {
    if (user) {
      fetchContacts(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refresh]);
  //TODO Return
  return (
    <div className="w-full flex flex-col items-center gap-6 mt-16">
      <Typography
        variant="h5"
        sx={{
          color:
            theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
          fontWeight: "bold",
        }}
      >
        My Messages
      </Typography>
      {/* Loading */}
      {loading && <CircularProgress />}

      {/* Empty State */}
      {!loading && contacts.length === 0 && (
        <Typography sx={{ opacity: 0.7 }}>
          You have not sent any messages yet.
        </Typography>
      )}

      {/* Messages */}
      {!loading &&
        contacts.map((contact) => (
          <Card
            key={contact._id}
            sx={{
              width: "100%",
              maxWidth: "100%",
              background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
              color:
                theme === "dark"
                  ? DARK_MODE.TextPrimary
                  : LIGHT_MODE.TextPrimary,
              borderRadius: "1rem",
            }}
            className="shadow-md"
          >
            <CardContent className="flex flex-col gap-3">
              <div className=" flex items-center justify-between">
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  {contact.subject}
                </Typography>
                <DeleteIcon
                  sx={{
                    color: "red",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#ff4d4f",
                      transform: "scale(1.1)",
                      transition: "all 0.2s",
                    },
                  }}
                  onClick={() => handleDelete(contact._id)}
                />
              </div>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {contact.content}
              </Typography>

              <Divider
                sx={{ my: 1, bgcolor: theme === "dark" ? "white" : "" }}
              />
              {/* Admin Answer */}
              {contact.answer ? (
                <Typography variant="body2" sx={{ color: DARK_MODE.Accent }}>
                  <strong>Support Reply:</strong> {contact.answer}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.6, fontStyle: "italic" }}
                >
                  Waiting for reply...
                </Typography>
              )}

              <Typography
                variant="caption"
                sx={{ color: DARK_MODE.Accent }}
                className=" flex flex-row-reverse"
              >
                {new Date(contact.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-4 mt-4">
          <Button
            sx={buttonTheme}
            disabled={page === 1}
            onClick={() => fetchContacts(page - 1)}
          >
            Prev
          </Button>

          <Typography sx={titleTheme}>
            Page {page} of {totalPages}
          </Typography>

          <Button
            sx={buttonTheme}
            disabled={page === totalPages}
            onClick={() => fetchContacts(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
