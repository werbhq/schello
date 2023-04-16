import { useState, useRef, useEffect } from "react";
import { sendUserChat } from "../../api/chat";
import { Stack } from "@mui/system";
import { Button, Card, InputBase, List, Typography } from "@mui/material";
import Notification from "components/Notification";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./components/ChatMessage";
import LoadingMessage from "./components/LoadingMessage";

const USER = {
  AI: "AI",
  HUMAN: "USER",
};

const BASE_MESSAGE = [
  `The following is a conversation with an AI Substance Abuse Counselor and a ${USER.HUMAN}`,
  `The ${USER.AI} is helpful, creative, clever, empathetic and very friendly`,
  `${USER.AI}'s objective is counsel the ${USER.HUMAN}`,
  `This bot is developed by Werb Cooperation`,
  `This bot's informal name is wellness bot`,
  `The bot should provide answers that are correct with respect to India`,
  `The kerala helpline numbers are Nairmalya De Addiction(Peyad, Phone:08281406000), Prateeksha I.R.C.A. Deaddiction Centre(Thiruvananthapuram, 0471 2504266),SNEHAM Deaddiction Centre & Psychiatry Hospital(Changanassery, 9633100011)`,
].join(". ");

function ChatPage() {
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });
  const [chatLog, setChatLog] = useState([
    {
      user: USER.AI,
      message:
        "Hello, I am your AI Substance Abuse Counselor. How can I help you?",
    },
  ]);
  const chatRef = useRef<HTMLOListElement>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (input === "") return;

    const messageData = [...chatLog, { user: USER.HUMAN, message: input }];

    setInput("");
    setChatLog(messageData);

    setIsLoading(true);

    try {
      const { data, error } = await sendUserChat({
        message: [
          BASE_MESSAGE,
          ...messageData.map((e) => `${e.user}:${e.message}`),
          `${USER.AI}:`,
        ].join(" "),
      });

      if (error) throw new Error(data);
      setChatLog([...messageData, { user: USER.AI, message: data }]);
    } catch (error: any) {
      setNotification({ message: error.message, show: true });
    }

    setIsLoading(false);
  }

  function handleClick() {
    setShowWelcomeMsg(false);
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
        <Stack alignItems="center" justifyContent="center" margin={3}>
          <Stack alignItems="center" marginBottom={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              Substance Abuse Counseling Bot
            </Typography>
          </Stack>
          <Typography variant="h6">
            This is a personalized health app designed specially for clarifying
            your doubts regarding your substance abuse related queries.
          </Typography>
          <Typography variant="h6" style={{ color: "red" }}>
            We respect your privacy. The chats wont be saved and you don't need
            to reveal your personal details to use this personalized app.
          </Typography>
          <Button
            variant="contained"
            style={{ minWidth: "40vw", margin: "30px" }}
            onClick={() => handleClick()}
          >
            Click here to start a conversation
          </Button>
        </Stack>
      )}

      {showChat && (
        <Stack>
          <List
            style={{
              overflow: "auto",
              padding: "0px",
              maxHeight: "75vh",
              minHeight: "20px",
            }}
            ref={chatRef}
          >
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && <LoadingMessage />}
          </List>

          <Card
            style={{
              padding: "10px",
              margin: 0,
              bottom: 0,
              minHeight: "4rem",
              position: "fixed",
              width: "100%",
              borderRadius: 0,
              backgroundColor: notification.show ? "#f04d38" : "#f1c043",
            }}
          >
            <form onSubmit={handleSubmit}>
              <InputBase
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Provide your query message here"
                fullWidth
                multiline
                style={{ padding: "10px" }}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13 && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
              />
              <Button
                sx={{
                  float: "right",
                  right: "60px",
                  bottom: "20px",
                }}
                endIcon={
                  <SendIcon
                    style={{
                      color: "white",
                      fontSize: "30px",
                    }}
                  />
                }
                onClick={handleSubmit}
                type="submit"
              />
            </form>
          </Card>
        </Stack>
      )}
      <Notification
        showMessage={notification}
        setShowMessage={setNotification}
      />
    </Stack>
  );
}

export default ChatPage;
