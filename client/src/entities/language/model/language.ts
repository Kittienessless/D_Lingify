export interface ILanguage {
  id: string;
  Title: string;
  Description: string;
  createdAt: string
  userID? : string
}

export interface IFeature {
  translatedText: string;
}