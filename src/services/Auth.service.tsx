import axios, { AxiosResponse } from "axios"; 
import { Login } from "../interfaces/Login.interface";
import { User } from "../interfaces/User.interface";
import { environment } from "../environments/environment";

export default class AuthService {
  static async login(username: string, password: string): Promise<Login | null> {
    return axios
      .post(`${environment.ApiUri}/user/authenticate`, {
        username,
        password,
      })
      .then((response: AxiosResponse<Login>) => {
        if (response.data.code === 200 && response.data.data === true) {
          sessionStorage.setItem("isAuthenticated", "true");
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          return response.data;
        } else {
          sessionStorage.removeItem("isAuthenticated");
          sessionStorage.removeItem("user");
          return response.data;
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("user");
        return null;
      });
  }

  static logout(): void {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
  }

  static isAuthenticated(): boolean {
    return sessionStorage.getItem("isAuthenticated") === "true";
  }

  static getUser(): User {
    return JSON.parse(sessionStorage.getItem("user") as string);
  }
}
