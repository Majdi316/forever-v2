//TODO Libraries
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import moment from "moment";

//TODO MUI Components
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Component
const UserMessages = ({ userId }) => {
  //TODO Variables
  const {
    backendUrl,
    token,
    paperTheme,
    titleTheme,
    paragraphTheme,
    theme,
    buttonTheme,
  } = useContext(UserContext);
//TODO States
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [sending, setSending] = useState(false);
//TODO UseEffect
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/manager/users/${userId}/messages`,
          { headers: { "x-auth-token": token } }
        );
        setMessages(data.messages);
        // eslint-disable-next-line no-unused-vars, no-empty
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  //TODO Functions
  const handleAnswer = async (contactId) => {
    if (!answer.trim()) return;
    setSending(true);
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/manager/messages/${contactId}/answer`,
        { answer },
        { headers: { "x-auth-token": token } }
      );
      //! update the state directly 
      setMessages((prev) =>
        prev.map((m) => (m._id === contactId ? data.contact : m))
      );
      //! after update the message clear the input and reset active state
      setAnswer("");
      setActiveId(null);
      // eslint-disable-next-line no-empty, no-unused-vars
    } catch (err) {
    } finally {
      setSending(false);
    }
  };
//TODO Loader
  if (loading)
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
    //TODO Return
  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <Typography style={titleTheme} variant="h5" className="mb-6">
        User Messages
      </Typography>

      <div className="grid grid-cols-1 gap-6">
        {messages.map((msg) => (
          <Card
            key={msg._id}
            style={paperTheme}
            className="rounded-2xl shadow-md"
          >
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <Typography style={titleTheme} fontWeight="bold">
                  {msg.subject}
                </Typography>
                <Typography sx={{ color: DARK_MODE.Accent }} variant="caption">
                  {moment(msg.createdAt).fromNow()}
                </Typography>
              </div>

              <Typography style={paragraphTheme}>{msg.content}</Typography>

              <Divider
                sx={{
                  bgcolor: theme === "dark" ? "white" : "",
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
              />
              {msg.answer ? (
                <div
                  style={{
                    ...paperTheme,
                    background:
                      theme === "dark"
                        ? DARK_MODE.Secondary
                        : LIGHT_MODE.Secondary,
                  }}
                  className="p-3 rounded-xl mt-3"
                >
                  <Typography sx={titleTheme} fontWeight="bold">
                    Manager Answer
                  </Typography>
                  <Typography>{msg.answer}</Typography>
                </div>
              ) : (
                <>
                  {activeId === msg._id ? (
                    <div className="space-y-3">
                      <TextField
                        sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                        fullWidth
                        multiline
                        minRows={3}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your answer..."
                      />
                      <div className=" mt-3 flex gap-2">
                        <Button
                          sx={buttonTheme}
                          onClick={() => handleAnswer(msg._id)}
                          disabled={sending}
                        >
                          {sending ? <CircularProgress size={20} /> : "Send"}
                        </Button>
                        <Button
                          sx={{
                            bgcolor: "red",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          variant="outlined"
                          onClick={() => setActiveId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      sx={buttonTheme}
                      onClick={() => setActiveId(msg._id)}
                    >
                      Answer Message
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserMessages;
