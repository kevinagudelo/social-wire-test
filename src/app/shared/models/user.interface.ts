export interface User {

  username: string;
  fullname?: string;
  email?: string;
  password:string;


}
export interface UserResponse {
  access_token:string;
  expires_in:string;
  message:string;
  status: boolean;
}

