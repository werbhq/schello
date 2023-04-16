import { useState } from "react";
import stringToHtml from "html-react-parser";

import { Card, CardContent } from "@mui/material";

type MessageData = { user: string; message: string };

const USER = {
  AI: "AI",
  HUMAN: "USER",
};

const ChatMessage = ({ message }: { message: MessageData }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded(!expanded);

  const isAi = message.user === USER.AI;

  return (
    <Card
      variant="outlined"
      onClick={handleExpand}
      style={{
        padding: "10px",
        margin: "20px",
        maxWidth: "400px",
        minHeight: "max-content",
        float: isAi ? "left" : "right",
        clear: "both",
      }}
      sx={
        isAi
          ? { backgroundColor: "#179f97", color: "white" }
          : { backgroundColor: "#cbcbcb" }
      }
    >
      <CardContent style={{ padding: "8px" }}>
        {stringToHtml(message.content.replace(/\n/g, "<br>"))}
      </CardContent>
    </Card>
  );
};

export default ChatMessage;
