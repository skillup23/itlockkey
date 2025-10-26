export const LOGIN = "/login";
export const ROOT = "/";
export const HOME = "/home";

//общественные маршруты. Все подмаршруты являются тоже общедоступными, если не прописаны в PROTECTED_SUB_ROUTES
export const PUBLIC_ROUTES = [
  "/login",
  // '/register',
  "/products",
  "/blog",
  // '/api/register',
  // '/api/auth/callback/google',
  // '/api/auth/callback/github',
  "/api/test-info",
];

export const PROTECTED_SUB_ROUTES = ["/checkout"];

export const ADMIN_ROUTES = [
  "/dashboard/users-edit", // Ваша страница управления пользователями
  "/users-test",
  // добавьте другие админские маршруты...
];
