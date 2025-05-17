import { user } from "entities/user";
import $api from "../http";
import { AxiosResponse } from "axios";
import { ILanguage } from "entities/language";
import { AuthResponse } from "shared/types/responseTypes";

interface DataType {
  key: string;
  name: string;
  email: string;
  role: string;
}
export default class UserService {
  static fetchUser(): Promise<AxiosResponse<user>> {
    return $api.get<user>("auth/getOneUserByPK");
  }

   static async fetchAllUsers(): Promise<AxiosResponse<DataType[]>> {
    return await $api.get<DataType[]>("user/allUsers");
  }

  static async SendNewPassword  (email: string, password: string)  {
    return $api.post("user/newPwd", { email, password });
  }
  
}
