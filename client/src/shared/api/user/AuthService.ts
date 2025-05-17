import { user } from "entities/user";
import { errorHandler } from "shared/constances";
import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "shared/types/responseTypes";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("auth/login", { email, password });
  }

   
  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/registration", { email, password });
  }

  static async logout(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("auth/logout");
  }
  static async recover(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("user/resetPwdUserByPK", { email });
  }
  static async delete(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("user/DeleteUserByPK");
  }

}
