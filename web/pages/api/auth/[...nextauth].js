import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: '480587013204-a66pebulat2g54kjnht783i6hmhkblen.apps.googleusercontent.com',
      clientSecret: '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',
      checks: 'none'
    }),
    GitHubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
      checks: 'none'
    })
  ],
  debug: true,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  }
}
export default NextAuth(authOptions)