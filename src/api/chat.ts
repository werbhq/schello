import { ChatCompletionRequestMessage } from "types/OpenAi";
import { baseApi } from ".";

export const sendUserChat = async (
  messages: ChatCompletionRequestMessage[]
) => {
  return (await (
    await baseApi.post("/chat", { messages })
  ).data) as { data: string; error: boolean };
};
