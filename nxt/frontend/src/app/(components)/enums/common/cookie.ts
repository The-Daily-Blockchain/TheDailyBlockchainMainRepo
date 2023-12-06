export enum CookieKey {
  NEXT_LOCALE = "NEXT_LOCALE",
  NEXT_I18NEXT = "next-i18next",
  ACCESS_TOKEN = "next-auth.access_token",
  REFRESH_TOKEN = "next-auth.refresh_token",
  LOGIN_NAME = "next-auth.login_name",
  SCORE = "next-auth.score",
  SCOPES = "next-auth.scopes",
  AUTH_TOKEN = "next-auth.auth_token",
  AUTH_EXPIRATION_TIME = "next-auth.expiration_time",
  AUTH_LOGIN_TIME = "next-auth.auth_login_time",
  FIRST_LOGIN = "next-auth.first_login",
}

export enum OptionCookie {
  maxAge = 60 * 60 * 24 * 30,
}
