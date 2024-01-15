export interface UserDataTypes {
  _id?: string;
  name?: string;
  email: string;
  token?: string;
  password?: string;
  pic?: string;
}

export interface SendersInfoTypes {
  senderPic: string | undefined;
  senderName: string | undefined;
}

export interface ChangeAvatarData {
  url: string;
}
