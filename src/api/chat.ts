import { baseApi } from ".";

export const sendUserChat = async (data: { message: string }) => {
  return (await (
    await baseApi.post("/chat", data)
  ).data) as { data: string; error: boolean };
};
