import { user } from "entities/user";
import { BASE_URL, errorHandler } from "shared/constances";
import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { AuthResponse, StatsResponse } from "shared/types/responseTypes";
import { ILanguage } from "entities/language";

interface DataType {
  user_id: string;
  name: string;
  email: string;
  role: string;
}
export default class AdminService {
static async changeRole(id: string | React.Key): Promise<AxiosResponse<DataType>> {
    return $api.post<DataType>(`${BASE_URL}/admin/changeUserRole`, {id});
  }
 
 static async deleteUser(id: string | React.Key): Promise<AxiosResponse> {
    return $api.post(`${BASE_URL}/admin/DeleteUser`, {id});
  }
  static async getUsersStatistics(): Promise<AxiosResponse<StatsResponse>> {
    return $api.get<StatsResponse>(`${BASE_URL}/admin/userStat`);
  }

  static async getLangsStatistics(): Promise<AxiosResponse<StatsResponse>> {
    return $api.get<StatsResponse>(`${BASE_URL}/admin/LangStat`);
  }

}
