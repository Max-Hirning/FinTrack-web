/* eslint-disable @typescript-eslint/no-explicit-any */

import {IResponse} from "@/types/api";
import {userAPI} from "@/modules/profile";
import {NextAuthOptions} from "next-auth";
import {authAPI} from "@/modules/authForm";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    error: "/error",
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 1296000,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {label: "email", type: "email", required: true},
        password: {label: "password", type: "password", required: true},
      },
      name: "Credentials",
      type: "credentials",
      async authorize({email, password}: any) {
        try {
          const {data} = await authAPI.signIn({email, password});
          if(!(data?.token && data?.userId)) throw Error("Sorry smth went wrong");
          const user = await userAPI.getUser(data.userId, data.token);
          if(!(user.data)) throw Error("Sorry smth went wrong");
          return ({
            jwt: data.token,
            id: data.userId,
            email: user.data.email,
            cards: user.data.cards,
            avatar: user.data.avatar,
            lastName: user.data.lastName,
            currency: user.data.currency,
            firstName: user.data.firstName,
          });
        } catch (e) {
          throw Error((e as IResponse<undefined>).message);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({token, user}: any) => {
      if(user) {
        token._id = user.id;
        token.jwt = user.jwt;
        token.email = user.email;
        token.cards = user.cards;
        token.avatar = user.avatar;
        token.lastName = user.lastName;
        token.currency = user.currency;
        token.firstName = user.firstName;
      }
      return token;
    },
    session: async ({session, token}: any) => {
      if(token) {
        session.user.id = token._id;
        session.user.jwt = token.jwt;
        session.user.email = token.email;
        session.user.cards = token.cards;
        session.user.avatar = token.avatar;
        session.user.currency = token.currency;
        session.user.lastName = token.lastName;
        session.user.firstName = token.firstName;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};