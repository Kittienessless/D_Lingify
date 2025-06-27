import $api from "../http";
import axios, { AxiosResponse } from "axios";

import { ILanguage } from "entities/language";
import { BASE_URL } from "shared/constances";
import { LangResponse } from "shared/types/responseTypes";
import { Option } from "../../../shared/types/Option.tsx";

export default class languageService {
  static async SaveAllChangesVocabular(
    id: string,
    arg0: any
  ): Promise<AxiosResponse> {
    return await $api.post(`${BASE_URL}/lang/SaveAllChangesVocabular/${id}`, {
      arg0,
    });
  }
  static async SaveAllChangesRules(
    id: string,
    arg0: {
      rules: {
        noun?: any;
        verb?: any;
        pronoun?: any;
        adjective?: any;
        adverb?: any;
        conjunction?: any;
      };
      DegreesofComparison?: any;
      nounGender?: any;
      articles?: any;
    }
  ): Promise<AxiosResponse> {
    return await $api.post(`${BASE_URL}/lang/SaveAllChangesRules/${id}`, {
      arg0,
    });
  }
  static async create(
    Title: string,
    Description: string
  ): Promise<AxiosResponse<ILanguage>> {
    return await $api.post(`${BASE_URL}/lang/createLang`, {
      Title,
      Description,
    });
  }

  static async changeTitle(
    id: string,
    Title: string
  ): Promise<AxiosResponse<ILanguage>> {
    return await $api.post<ILanguage>(`${BASE_URL}/lang/changeTitle/${id}`, {
      Title,
    });
  }
  static async changeDesc(
    id: string,
    Description: string
  ): Promise<AxiosResponse<ILanguage>> {
    return await $api.post<ILanguage>(`${BASE_URL}/lang/changeDesc/${id}`, {
      Description,
    });
  }

  static async createNeural(
    Prompt: string,
    Title: string,
    Description: string,
    Rules: any
  ): Promise<AxiosResponse<ILanguage>> {
    return await $api.post(`${BASE_URL}/lang/createLangNeural`, {
      Prompt,
      Title,
      Description,
      Rules,
    });
  }
  static async getLanguage(id: string): Promise<AxiosResponse<LangResponse>> {
    return await $api.get<LangResponse>(`${BASE_URL}/lang/lang/${id}`);
  }
  static async getAllLanguages(): Promise<AxiosResponse<ILanguage[]>> {
    return await $api.get<ILanguage[]>(`${BASE_URL}/user/langs`);
  }

  static async uploadLang(
    id: string,
    data: Blob | FormData | File
  ): Promise<AxiosResponse<FormData | Blob | File>> {
    return await $api.post<FormData | Blob | File>(`${BASE_URL}/lang/upload`, {
      id,
      data,
    });
  }
  static async download(id: string): Promise<AxiosResponse<FormData | Blob>> {
    return await $api.post<FormData>(`${BASE_URL}/lang/download`, { id });
  }
  static async getFileLang(id: string): Promise<AxiosResponse<any>> {
    return await $api.post<any>(`${BASE_URL}/lang/getFile`, { id });
  }
  static async delete(key: string): Promise<AxiosResponse> {
    return await $api.post(`${BASE_URL}/lang/deleteLang`, { key });
  }
  static async getAllLangsTitle(): Promise<AxiosResponse<Option[]>> {
    return await $api.get<Option[]>(`${BASE_URL}/lang/getAllLangsTitle`);
  }
}
