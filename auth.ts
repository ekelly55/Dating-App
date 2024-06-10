import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { prisma } from "./src/app/lib/prisma"
 
 
export const {
  auth,
  handlers: {GET, POST},
  // cant use signIn and signOut directly in login form b/c they're server sidej. so to use them we need export them from auth actions, which is a "use server" file
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})