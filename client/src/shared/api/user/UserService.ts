import { user } from "entities/user";
import $api from "../http";
import { AxiosResponse } from "axios";
import { ILanguage } from "entities/language";
import { AuthResponse } from "shared/types/responseTypes";

interface DataType {
  user_id: string;
  name: string;
  email: string;
  role: string;
}
export default class UserService {
  static fetchUser(): Promise<AxiosResponse<user>> {
    return $api.get<user>("auth/getOneUserByPK");
  }
static async changeGivenName(given_name: string): Promise<AxiosResponse<user>> {
    return await $api.post("/user/changeGivenName", {given_name});
  }
static async changeFamilyName(familyName: string): Promise<AxiosResponse<user>> {
    return await $api.post("/user/changeFamilyName", {familyName});
  }
   static async fetchAllUsers(): Promise<AxiosResponse<DataType[]>> {
    return await $api.get<DataType[]>("user/allUsers");
  }

  static async SendNewPassword  (email: string, password: string)  {
    return $api.post("user/newPwd", { email, password });
  }
  
}
