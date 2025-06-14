import { ILanguage } from "entities/language";
import { user } from "entities/user";

export interface AuthResponse {
  refreshToken: string;
  accessToken: string;
  user: user;
 }

export interface LangResponse {
  lang: ILanguage;
 }

 export interface StatsResponse {
  id: string;
  label: string;
  value: string;
 }