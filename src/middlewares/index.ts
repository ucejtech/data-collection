import store from "@/store";
import { Route, NavigationGuardNext } from 'vue-router'

export function handleAuthRoute(to: Route, from: Route, next: NavigationGuardNext): void {
  if (store.getters["auth/isAuthenticated"]) {
    next('/dashboard')
  } else {
    next();
  }
}

export function isAuthenticated(to: Route, from: Route, next: NavigationGuardNext): void {
  if (store.getters["auth/isAuthenticated"]) {
    next()
  } else {
    next('/');
  }
}