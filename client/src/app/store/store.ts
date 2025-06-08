import axios from "axios";
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

export default class Store {
  user = {} as user;
  isAuth = false;
  isLoading = false;
  isAdmin = false;

  language = {} as ILanguage;
  languageArray = Array<ILanguage>();
  languageTextArray: Option[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: user) {
    this.user = user;
  }
  setAdmin(admin: boolean) {
    this.isAdmin = admin;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setLanguage(language: ILanguage) {
    this.language = language;
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
    try {
      const response = await languageService.getAllLanguages();
      console.log(response);
      this.languageArray = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async createLang(language: ILanguage) {
    try {
      const response = await languageService.create(language);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
  async createLangNeural(prompt: string, title: string, description: string) {
    try {
      const response = await languageService.createNeural(
        prompt,
        title,
        description
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
}
