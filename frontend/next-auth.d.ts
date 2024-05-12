import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      accessToken?: string;
    };
    expire: number;
  }

  interface User extends Session {
    id: string;
    email: string;
    expire: number;
    accessToken?: string;
  }
}
