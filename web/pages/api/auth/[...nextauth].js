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
      clientId: 'Iv1.f55eacb2a7a0e634',
      clientSecret: '8a3d6064dc902167921ce692a259f2a1246fcd88',
      checks: 'none'
    })
  ],
  debug: true,
  jwt: {
    secureCookie: true,
    cookieName: 'token'
  }
}
export default NextAuth(authOptions)