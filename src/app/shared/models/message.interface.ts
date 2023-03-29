import { User } from './user.interface';

export interface Message {
  title: string;
  text: string;
}

export interface UserMessage {
  id: string;
  username: string;
  fullname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comments {}

export interface MessageCreateResponse {
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: UserMessage;
}

export interface GetAllMessageResponse extends MessageCreateResponse {
  id: string;
  comments: [];
}
