import Cookies from 'js-cookie';

class CookieService {
  setCookie(name: string, value: string, options?: Cookies.CookieAttributes) {
    Cookies.set(name, value, options);
  }

  getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }

  removeCookie(name: string, options?: Cookies.CookieAttributes) {
    Cookies.remove(name, options);
  }
}

const cookieService = new CookieService();

export default cookieService;
