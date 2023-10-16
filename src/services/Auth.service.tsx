import axios, { AxiosResponse } from "axios"; 
import { Login } from "../interfaces/Login.interface";
import { User } from "../interfaces/User.interface";
import { environment } from "../environments/environment";
import CookieService from "./Cookie.service";

const options: object = { expires: 7, domain: environment.domain };

export default class AuthService {
  static async login(username: string, password: string): Promise<Login | null> {
    return axios
      .post(`${environment.ApiUri}/user/authenticate`, {
        username,
        password,
      })
      .then((response: AxiosResponse<Login>) => {
        if (response.data.code === 200 && response.data.data === true) {
          console.log("entro al if")
          CookieService.setCookie("isAuthenticated", "true", options);
          console.log("seteó las primeras cookies")
          CookieService.setCookie("user", JSON.stringify(response.data.user), options);
          console.log("seteó las segundas cookies")
          return response.data;
        } else {
          CookieService.removeCookie("isAuthenticated");
          CookieService.removeCookie("user");
          return response.data;
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        CookieService.removeCookie("isAuthenticated");
        CookieService.removeCookie("user");
        return null;
      });
  }

  static logout(): void {
    CookieService.removeCookie("isAuthenticated");
    CookieService.removeCookie("user");
  }

  static isAuthenticated(): boolean {
    return CookieService.getCookie("isAuthenticated") === "true";
  }

  static getUser(): User {
    return JSON.parse(CookieService.getCookie("user") as string);
  }
}
