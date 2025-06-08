import $api from "../http";
import axios, { AxiosResponse } from "axios";

import { ILanguage } from "entities/language";
import { IFeature } from "entities/language/model/language";
import { BASE_URL } from "shared/constances";
import { Option } from "shared/types/Option";
import { LangResponse } from "shared/types/responseTypes";

export default class featureService {
  static async translate(
    text: string,
    langID: string
  ): Promise<AxiosResponse> {
    return await $api.post(`${BASE_URL}/feature/translate`, {
      text,
      langID,
    });
  }

  static async generate(selectedLanguage: string): Promise<AxiosResponse> {
    return await $api.post(`${BASE_URL}/feature/text`, { selectedLanguage });
  }
}
