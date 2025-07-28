// @/lib/utils.ts
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";



// Определение типа всех возможных ролей
export type Role =
  | "guest"
  | "architect"
  | "admin"
  | "editor"
  | "authUser"
  | "subscriber"
  | "customer"
  | "apiUser";

// Человеко-читаемые подписи для UI
export const ROLE_LABELS: Record<Role, string> = {
  guest: "Guest",
  architect: "Architect",
  admin: "Admin",
  editor: "Editor",
  authUser: "Authorized User",
  subscriber: "Subscriber",
  customer: "Customer",
  apiUser: "API User",
};

// Ключ для localStorage
export const LOCALSTORAGE_KEY = "aifa-role";

// Получение текущей роли из localStorage с валидацией
export function getStoredRole(): Role {
  if (typeof window === "undefined") return "guest";
  const stored = localStorage.getItem(LOCALSTORAGE_KEY);
  // На всякий случай проверяем что такая роль существует
  if (stored && Object.hasOwn(ROLE_LABELS, stored)) {
    return stored as Role;
  }
  return "guest";
}

// Сохранение роли в localStorage
export function setStoredRole(role: Role) {
  if (typeof window === "undefined") return;
  // Валидация роли на всякий случай
  if (Object.hasOwn(ROLE_LABELS, role)) {
    localStorage.setItem(LOCALSTORAGE_KEY, role);
  }
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}