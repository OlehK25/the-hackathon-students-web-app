import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import axios from "@/lib/axios";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        const res = await axios.post(`/api/auth/login`, {
          email,
          password,
        });

        return res.data ? res.data : null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }): Promise<boolean> {
      if (account?.provider === "google") {
        const res = await axios.post(`/api/auth/oauth-login`, {
          email: user.email,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        const data = res.data;

        if (data.status === "error") {
          return false;
        }

        user.id = data.user.id;
        user.accessToken = data.accessToken;
        user.expire = data.expire;

        return !!data;
      }
      return true;
    },
    async redirect({ url, baseUrl }): Promise<string> {
      return url.startsWith(baseUrl) ? baseUrl : url;
    },
    async jwt({ token, user }): Promise<JWT> {
      if (user && user.accessToken) {
        token.id = user.user?.id || user.id;
        token.email = user.user?.email || user.email;
        token.accessToken = user.accessToken;
        token.expire = user.expire;
        token.isRefreshed = false;
      }

      if (Date.now() > (token.expire as number) && !token.isRefreshed) {
        token.isRefreshed = true;

        const response = await axios.post(
          `/api/auth/refresh-token/${token.id}`,
        );

        const data = response?.data;

        token.accessToken = data.accessToken;
        token.expire = data.expire;

        return token;
      } else {
        return token;
      }
    },
    async session({ session, token }): Promise<Session> {
      session.user = token as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
