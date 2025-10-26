export const authConfig = {
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      // При первом входе добавляем роль пользователя в токен
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Передаем роль из токена в сессию
      session.user.role = token.role;
      return session;
    },
  },
};
