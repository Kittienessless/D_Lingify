import { BASE_URL } from "shared/constances";
import { errorHandler } from "shared/constances";
import { ILanguage } from "entities/language";
import { upload } from "@testing-library/user-event/dist/upload";
import Data from "features/languageCard/ui/Uploader";

interface IKey {
  key: string;
}

export const LangAPI = {
  langInfo: {
    editLangInfo: async (data: ILanguage) => {
      const response = await fetch(`${BASE_URL}/lang/updateLangInfo`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await errorHandler(response);
    },
    getAlllangs: async () => {
      const response = await fetch(`${BASE_URL}/lang/allLangs`, {
        method: "GET",
        credentials: "include",

      });
      await errorHandler(response);
    },
    getAllLangsInfo: async () => {
      const response = await fetch(`${BASE_URL}/user/langs`, {
        method: "GET",
        credentials: "include",
      });
      await errorHandler(response);
      return await response.json();
    },
  },

  Lang: {
    createLangNeural: async (data: ILanguage) => {
      const response = await fetch(`${BASE_URL}/lang/createLangNeural`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await errorHandler(response);
      return await response.json();
    },
    uploadLang: async (data: string) => {
      const response = await fetch(`${BASE_URL}/lang/upload`, {
        method: "POST",
        body: data,
        headers: {
          "Contetnt-Type": "multipart/form-data",
        },
      });
      await errorHandler(response);
      await response.json();
    },

    createLang: async (data: ILanguage) => {
      const response = await fetch(`${BASE_URL}/lang/createLang`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await errorHandler(response);
    },
    deleteLang: async (data: string) => {
      const response = await fetch(`${BASE_URL}/lang/deleteLang`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify(data),
      });
      await errorHandler(response);
      return await response.json();
    },
    /*  updateLang: async (data: ILanguage) => {
      const response = await fetch(`${BASE_URL}/`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await errorHandler(response);
      return await response.json();
    }, */
    getLang: async () => {
      const response = await fetch(`${BASE_URL}/lang/lang/:id`, {
        credentials: "include",
        method: "GET",
      });
      await errorHandler(response);
      return await response.json();
    },
  },
};
