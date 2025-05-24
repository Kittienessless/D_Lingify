import $api from "../http";
import axios, { AxiosResponse } from "axios";

import { ILanguage } from "entities/language";
import { IFeature } from "entities/language/model/language";
import { BASE_URL } from "shared/constances";
import { LangResponse } from "shared/types/responseTypes";

export default class featureService {
  static async translate(sourceText: string, selectedLanguage: string): Promise<AxiosResponse> {
    return await $api.post(`${BASE_URL}/feature/translate`, {sourceText, selectedLanguage});
  }
  static async generate(
   selectedLanguage: string
  ): Promise<AxiosResponse> {
    return await $api.post(`${BASE_URL}/feature/text`, {selectedLanguage});

}
}