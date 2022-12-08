import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: '480587013204-a66pebulat2g54kjnht783i6hmhkblen.apps.googleusercontent.com',
      clientSecret: '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',
      checks: 'none'
    })
  ],
  callbacks: {
    async jwt({token}) {
      token.userRole = 'admin'
      return token
    }
  },
  debug: true
}
export default NextAuth(authOptions)