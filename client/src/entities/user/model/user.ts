export interface user   {
  user_id: string;
  email: string,
  password: string,
  role: number;
  isActivated : boolean;
  given_name? : string;
  familyName?: string;
 }

