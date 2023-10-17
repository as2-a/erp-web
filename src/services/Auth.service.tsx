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
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          return response.data;
        } else {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user");
          return response.data;
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        return null;
      });
  }

  static logout(): void {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem("isAuthenticated") === "true";
  }

  static getUser(): User {
    return JSON.parse(localStorage.getItem("user") as string);
  }
}
