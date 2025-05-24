import $api from "../http";
import axios, { AxiosResponse } from "axios";

import { ILanguage } from "entities/language";
import { BASE_URL } from "shared/constances";
import { LangResponse } from "shared/types/responseTypes";
import { Option } from "../../../shared/types/Option.tsx";

export default class languageService {
  static async create(language: ILanguage): Promise<AxiosResponse<ILanguage>> {
    return await $api.post(`${BASE_URL}/lang/createLang`, {language});
  }
  static async createNeural(
    prompt : string, title : string, description : string
  ): Promise<AxiosResponse<ILanguage>> {
    return await $api.post(`${BASE_URL}/lang/createLangNeural`, {prompt, title, description});
  }
  static async getLanguage(id: string): Promise<AxiosResponse<LangResponse>> {
    return await $api.get<LangResponse>(`${BASE_URL}/lang/lang/${id}`);
  }
  static async getAllLanguages(): Promise<AxiosResponse<ILanguage[]>> {
    return await $api.get<ILanguage[]>(`${BASE_URL}/lang/getAllLangs`);
  }

  static async uploadLang(data : FormData) : Promise<AxiosResponse<FormData>> {
    return await $api.post<FormData>(`${BASE_URL}/lang/upload`,{data} );
  }
 static async getFileLang(id: string) : Promise<AxiosResponse<FormData>> {
    return await $api.post<FormData>(`${BASE_URL}/lang/getFile`,{id} );
  }
  static async delete(key: string): Promise<AxiosResponse> {
    return await $api.post(`${BASE_URL}/lang/deleteLang`, {key});
  }
  static async getAllLangsTitle(): Promise<AxiosResponse<Option[]>> {
    return await $api.post(`${BASE_URL}/lang/getAllLangsTitle` );
  }


}
