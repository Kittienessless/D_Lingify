export interface user   {
  user_id: string;
  email: string,
  password: string,
  role: string;
  isActivated : boolean;
  given_name? : string;
  familyName?: string;
 }

