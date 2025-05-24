import { user } from "entities/user";
import { errorHandler } from "shared/constances";
import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { AuthResponse, StatsResponse } from "shared/types/responseTypes";
import { ILanguage } from "entities/language";

export default class AdminService {

  static async getStats(): Promise<AxiosResponse<StatsResponse[]>> {
    return $api.get<StatsResponse[]>("admin/LangStat");
  }

  static async getUsersStatistics(): Promise<AxiosResponse<user[]>> {
    return $api.get<user[]>("admin/getUserStatistics");
  }

  static async getLangsStatistics(): Promise<AxiosResponse<ILanguage[]>> {
    return $api.get<ILanguage[]>("admin/getLanguageStatistics");
  }

}
