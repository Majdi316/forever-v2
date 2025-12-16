//TODO Libraries
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
//TODO MUI Components
import {
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Main Component
const ManagerContacts = () => {
  //TODO Variables
  const { backendUrl, token, buttonTheme, paperTheme, titleTheme } =
    useContext(UserContext);
  //TODO States
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [answer, setAnswer] = useState("");
  //TODO Functions
  //------------ FETCH CONTACTS DATA FUNCTION ----------------
  const fetchContacts = async (pageNum = 1) => {
    const { data } = await axios.get(
      `${backendUrl}/api/manager/messages?page=${pageNum}&limit=6`,
      { headers: { "x-auth-token": token } }
    );
    setContacts(data.data);
    setTotalPages(data.totalPages);
  };
  //------------ ANSWER FUNCTION ----------------
  const handleAnswer = async () => {
    await axios.put(
      `${backendUrl}/api/manager/messages/${selected._id}/answer`,
      { answer },
      { headers: { "x-auth-token": token } }
    );
    setOpen(false);
    setAnswer("");
    fetchContacts(page);
  };
  //------------ DELETE MESSAGE FUNCTION ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await axios.delete(`${backendUrl}/api/manager/messages/${id}`, {
      headers: { "x-auth-token": token },
    });
    fetchContacts(page);
  };
  //TODO useEffects
  useEffect(() => {
    fetchContacts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  //TODO Return
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Typography
        sx={titleTheme}
        variant="h4"
        className="mb-6 font-bold text-center"
      >
        Contact Messages
      </Typography>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((c) => (
          <Card sx={paperTheme} key={c._id} className="shadow-lg rounded-2xl">
            <CardContent className="space-y-2">
              <Typography sx={titleTheme} variant="h6">
                {c.subject}
              </Typography>
              <Typography>{c.content}</Typography>
              <div className="border-t pt-2">
                <Typography sx={titleTheme} fontWeight="bold">
                  {c.user?.name?.first} {c.user?.name?.last}
                </Typography>
                <Typography variant="body2">{c.user?.email}</Typography>
                <Typography variant="body2">{c.user?.phone}</Typography>
              </div>

              {c.answer && (
                <Typography className="text-green-600">
                  Answer: {c.answer}
                </Typography>
              )}
              <div className="flex justify-between pt-3">
                <Button
                  size="small"
                  sx={buttonTheme}
                  onClick={() => {
                    setSelected(c);
                    setOpen(true);
                  }}
                >
                  Answer
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: titleTheme,
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#FF7043",
              color: "#fff",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#FF8A65",
            },
          }}
        />
      </div>

      {/* Answer Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Answer Contact</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button sx={buttonTheme} onClick={handleAnswer} variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManagerContacts;
