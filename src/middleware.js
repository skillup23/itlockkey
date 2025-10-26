import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

//получение публичных и дополнительно защищенных маршрутов
import {
  ADMIN_ROUTES,
  HOME,
  LOGIN,
  PROTECTED_SUB_ROUTES,
  PUBLIC_ROUTES,
  ROOT,
} from "@/lib/routes";

export async function middleware(request) {
  //при каждом поступающем запросе проверяем пройдена ли auth
  const { nextUrl } = request;
  //получем сессию пользователя
  const session = await auth();

  //если есть данные пользователя то isAuthenticated = true
  const isAuthenticated = !!session?.user;
  const userRole = session?.user?.role; // Получаем роль пользователя

  //проверяем маршрут, не зависимо от того общедоступный он или защищенный
  const isPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

  // Определяем, является ли запрос к админскому маршруту
  const isAdminRoute = ADMIN_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Если пользователь не аутентифицирован и пытается попасть на защищенный маршрут - перенаправляем на логин
  if (!isAuthenticated && !isPublicRoute)
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  // Если пользователь аутентифицирован, но у него нет роли 'admin' и он пытается попасть на админский маршрут
  if (isAuthenticated && userRole !== "admin" && isAdminRoute) {
    // Перенаправляем на главную страницу или на страницу "Доступ запрещен"
    return NextResponse.redirect(new URL(HOME, nextUrl));
  }

  return NextResponse.next();
}

// При каких условиях выполнять функцию middleware, к примеру можно указать
// matcher: '/products/:path*',
// и будет выполнена функция middleware если мы посетим страницу /products и ее подстраницы
// так же можно защитить маршруты '/api/:path*'
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
