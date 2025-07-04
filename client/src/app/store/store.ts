import axios, { AxiosResponse } from "axios";
import { user } from "entities/user/model/user.ts";
import { makeAutoObservable } from "mobx";
import AuthService from "shared/api/user/AuthService";
import UserService from "shared/api/user/UserService";
import { BASE_URL } from "shared/constances";
import { AuthResponse } from "shared/types/responseTypes";
import { ILanguage } from "entities/language/model/language";

import languageService from "shared/api/language/languageService";
import { Option } from "../../shared/types/Option.tsx";
import { element } from "prop-types";
import { LanguageGenerationSettings } from "features/languageCard/ui/NeuralLang.tsx";

export default class Store {
  user = {} as user;
  isAuth = false;
  isLoading = false;
  isAdmin = false;

  language = {} as ILanguage;
  languageArray = Array<ILanguage>() || null;
  languageTextArray: Option[] = [];
  file = {} as Blob | FormData | File;

  rules = {} as LanguageGenerationSettings;
  isNeural = false;
  promptNeuralCreation = {} as string;

  currentLang = {} as ILanguage | null;
  currentFile = {} as any;

  constructor() {
    makeAutoObservable(this);
  }
  setLanguageArray(Array: any) {
    this.languageArray = Array;
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setIsNeural(bool: boolean) {
    this.isNeural = bool;
  }
  setRules(rules: LanguageGenerationSettings) {
    this.rules = rules;
  }
  setPrompt(prompt: string) {
    this.promptNeuralCreation = prompt;
  }
  setCurrentLang(currentLang: ILanguage | null) {
    this.currentLang = currentLang;
  }
  setCurrentFile(currentFile: any) {
    this.currentFile = currentFile;
  }
  setUser(user: user) {
    this.user = user;
  }
  setFile(file: Blob | FormData | File) {
    this.file = file;
  }
  setAdmin(admin: boolean) {
    this.isAdmin = admin;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setLanguage(Title: string, description: string) {
    this.language.Title = Title;
    this.language.Description = description;
  }
  setlanguageTextArray(opt: Option[]) {
    this.languageTextArray = opt;
  }
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      this.setAuth(true);
      if (response.data.user.role === 2) {
        this.setAdmin(true);
        console.log(response.data.user.role);
      }
      if (response.data.user.role === 1) {
        this.setAdmin(false);
      }
      this.setUser(response.data.user);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", String(response?.data.user.role));
    } catch (e) {
      console.log(e);
    }
  }

  async google(response: any) {
    try {
      this.setAuth(true);
      this.setUser(response.data.user);
      if (response.data.user.role === 2) {
        this.setAdmin(true);
        console.log(response.data.user.role);
      }
      if (response.data.user.role === 1) {
        this.setAdmin(false);
      }
      window.localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", String(response?.data.user.role));
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${BASE_URL}/auth/refresh`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response?.data.accessToken);
      this.setUser(response?.data.user);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAdmin() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${BASE_URL}/auth/refresh`,
        {
          withCredentials: true,
        }
      );
      if (response.data.user.role === 2) {
        this.setAdmin(true);
        console.log(response.data.user.role);
      }
      if (response.data.user.role === 1) {
        this.setAdmin(false);
      }
      localStorage.setItem("role", String(response?.data.user.role));
      this.setUser(response?.data.user);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async register(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      this.setAuth(true);
      console.log(response);
      if (response.data.user.role === 2) {
        this.setAdmin(true);
        console.log(response.data.user.role);
      }
      if (response.data.user.role === 1) {
        this.setAdmin(false);
      }
      this.setUser(response.data.user);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", String(response?.data.user.role));
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      window.localStorage.removeItem("token");
      const response = await AuthService.logout();
      this.setAuth(false);
      this.setUser({} as user);
    } catch (e) {
      console.log(e);
    }
  }

  async Recover(email: string) {
    try {
      const response = await AuthService.recover(email);
      this.setAuth(false);
      this.setUser({} as user);
      window.localStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  }

  async delete() {
    try {
      const response = await AuthService.delete();
      this.setAuth(false);
      this.setUser({} as user);
      window.localStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  }

  async SendNewPwd(email: string, password: string) {
    try {
      const response = await UserService.SendNewPassword(email, password);
      this.setAuth(false);
      this.setUser({} as user);
      window.localStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  }

  async getLang(id: string) {
    try {
      const response = await languageService.getLanguage(id);
      console.log(response);
      this.language = response.data.lang;
    } catch (e) {
      console.log(e);
    }
  }
  async getAllLangs() {
    this.setLanguageArray(null);
    try {
      const response = await languageService.getAllLanguages();
      this.setLanguageArray(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  /*   async createLang(language: ILanguage | null) {
    try {
      const response = await languageService.create();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  } */
  async createLangNeural(
    prompt: string,
    title: string,
    description: string,
    rules: any
  ) {
    try {
      const response = await languageService.createNeural(
        prompt,
        title,
        description,
        rules
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllLangsTitle() {
    try {
      const response = await languageService.getAllLangsTitle();
      this.setlanguageTextArray(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  async changeGivenName(given_name: string) {
    try {
      const response = await UserService.changeGivenName(given_name);
      this.setUser(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }
}
