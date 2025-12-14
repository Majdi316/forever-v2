import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

import moment from "moment";
import { UserContext } from "../../context/UserContext";

const UserMessages = ({ userId }) => {
  const { backendUrl, token, paperTheme, titleTheme, paragraphTheme } =
    useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/manager/users/${userId}/messages`,
          { headers: { "x-auth-token": token } }
        );
        setMessages(data.messages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  const handleAnswer = async (contactId) => {
    if (!answer.trim()) return;

    setSending(true);
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/manager/messages/${contactId}/answer`,
        { answer },
        { headers: { "x-auth-token": token } }
      );

      setMessages((prev) =>
        prev.map((m) => (m._id === contactId ? data.contact : m))
      );
      setAnswer("");
      setActiveId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <Typography style={titleTheme} variant="h5" className="mb-6">
        User Messages
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Typography variant="caption">
                  {moment(msg.createdAt).fromNow()}
                </Typography>
              </div>

              <Typography style={paragraphTheme}>{msg.content}</Typography>

              <Divider />
              {msg.answer ? (
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-xl">
                  <Typography fontWeight="bold">Manager Answer</Typography>
                  <Typography>{msg.answer}</Typography>
                </div>
              ) : (
                <>
                  {activeId === msg._id ? (
                    <div className="space-y-3">
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your answer..."
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="contained"
                          onClick={() => handleAnswer(msg._id)}
                          disabled={sending}
                        >
                          {sending ? <CircularProgress size={20} /> : "Send"}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setActiveId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outlined"
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
