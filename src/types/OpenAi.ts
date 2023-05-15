export enum ChatCompletionRoleEnum {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

export interface ChatCompletionRequestMessage {
  role: ChatCompletionRoleEnum;
  content: string;
}
