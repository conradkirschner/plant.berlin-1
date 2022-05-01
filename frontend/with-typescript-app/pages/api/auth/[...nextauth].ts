import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook";

import axios from "axios";
import {serviceMap} from "../../../serviceConfiguration";

export default NextAuth({
    secret: "JFiDd2BUUqKnhcGMflfrqdqd3RF/bNpW9beVsDYs0kQ=",
    debug: true,
    callbacks: {
        // @ts-ignore
        async signIn({user, account, profile, email, credentials, isNew}) {
            console.log('sign in', user, account,profile,email, credentials, isNew);
            return true
        },
        async redirect({url, baseUrl}) {
            return baseUrl
        },
        async session({session, user, token}) {
            console.log('session', session, user,token);

            // when we fetch the session we attach the user id from token
            if (token) {
                session.userId = token.id;
                session.user = token.user;
            }
            return session
        },
        async jwt({token, user, account, profile, isNewUser}) {
            // when user is there, we are in the login flow
            if (user) {
                token.id = user.id;
                token.user = user;
            }

            return token
        },
    },

    // Configure one or more authentication providers
    pages: {
        signIn: '/user/SignIn',
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),

        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user: {data: {username: string, id: number} | ""} = (await axios({
                    method: 'post',
                    url: serviceMap.UserService.server + '/user/login',
                    data: { username: credentials.username, password: credentials.password },
                })).data;
                if (user.data === "") {
                    return null;
                }
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
})
