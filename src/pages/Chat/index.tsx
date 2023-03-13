import "./index.css";
import { useState, useRef, useEffect } from "react";
import { sendUserChat } from "../../api/chat";
import { Stack } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  InputBase,
  List,
  Typography,
} from "@mui/material";
import stringToHtml from "html-react-parser";
type MessageData = { user: string; message: string };

const ChatMessage = ({ message }: { message: MessageData }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded(!expanded);

  return (
    <Card
      variant="outlined"
      onClick={handleExpand}
      sx={{
        p: "10px",
        m: "20px",
        minHeight: "max-content",
        float: message.user === "AI" ? "left" : "right",
        clear: "both",
      }}
      className={`centered-chatmsg ${
        message.user === "AI" ? "bg-blue" : "bg-usercolor"
      }`}
    >
      <CardContent>
        {stringToHtml(message.message.replace("\n", "<br>"))}
      </CardContent>
    </Card>
  );
};

function ChatPage() {
  const BOT_NAME = "AI";
  const USER_NAME = "USER";
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showWelcomeMsg, setshowWelcomeMsg] = useState(true);
  const chatRef = useRef<HTMLOListElement>(null);

  const BASE = `The following is a conversation with an AI Substance Abuse Counselor and a ${USER_NAME}. The ${BOT_NAME} is helpful, creative, clever, empathetic and very friendly. ${BOT_NAME}'s objective is counsel the ${USER_NAME}.`;
  const [chatLog, setChatLog] = useState([
    {
      user: BOT_NAME,
      message: `Hello, I am your AI Substance Abuse Counselor. How can I help you?`,
    },
  ]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (input === "") return;

    const messageData = [...chatLog, { user: USER_NAME, message: input }];
    setInput("");
    setChatLog(messageData);

    const { data } = await sendUserChat({
      message: [
        BASE,
        ...messageData.map((e) => `${e.user}:${e.message}`),
        `${BOT_NAME}:`,
      ].join(" "),
    });
    setChatLog([...messageData, { user: BOT_NAME, message: data }]);
  }

  function handleClick() {
    setshowWelcomeMsg(false);
    setShowChat(true);
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        behavior: "smooth",
        top: chatRef.current.scrollHeight,
      });
    }
  }, [chatLog]);

  return (
    <Stack>
      {showWelcomeMsg && (
        <Card
          className="centered-card"
          variant="outlined"
          style={{ border: "none" }}
        >
          <CardContent>
            <Typography variant="h5" style={{ margin: "20px" }}>
              Substance Abuse Counseling Bot
            </Typography>
            <Typography variant="h6">
              This is a personalised health app designed specially for
              clarifying your doubts regarding your substance abuse related
              queries.
            </Typography>
            <Typography variant="h6" style={{ color: "red" }}>
              We respect your privacy. The chats wont be saved and you dont need
              to reveal your personal details to use this personalised app.
            </Typography>
            <Button
              variant="contained"
              style={{ width: "400px", margin: "30px" }}
              onClick={() => {
                handleClick();
              }}
            >
              Click here to start a conversation
            </Button>
          </CardContent>
        </Card>
      )}
      {showChat && (
        <Stack>
          <List
            style={{
              overflow: "auto",
              padding: "0px",
              maxHeight: "70vh",
            }}
            sx={{ minHeight: "20px", maxHeight: "500px" }}
            ref={chatRef}
          >
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </List>

          <Card
            sx={{
              padding: "10px",
              maxWidth: "90rem",
              maxHeight: "20rem",
              position: "fixed",
              bottom: 0,
            }}
            className="input-chat"
          >
            <form onSubmit={handleSubmit}>
              <InputBase
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type Here"
                fullWidth
                multiline
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13 && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </form>
          </Card>
        </Stack>
      )}
    </Stack>
  );
}

export default ChatPage;
