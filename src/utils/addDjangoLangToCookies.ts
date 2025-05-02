export const addDjangoLangToCookies = (lang: string) =>
  document.cookie = `django_language=${lang}; path=/; Domain=.paymob.com`;