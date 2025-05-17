import { SUCCESSFUL_EDIT, ERROR_LANG_EDIT } from "shared/constances";
import { LangAPI } from "shared/api";
import { FC } from "react";

import { toast } from "react-toastify";

import { Button } from "shared/ui/button";
import { CreateWordInput } from "./CreateWordInput";

interface IRedactLanguage {
}

export const RedactLanguage: FC<IRedactLanguage> = () => {
 
  //TODO:  добавить модальное окно, yes/no
  async function RedactLanguage() {
    try {
      
    } catch (e) {
      if (e instanceof Error) {
        toast.error(ERROR_LANG_EDIT);
      }
    } finally {
      toast.success(SUCCESSFUL_EDIT);
    }
  }

  return (
    <div>
      <CreateWordInput />
      <Button primary onClick={RedactLanguage}>
        Edit Language
      </Button>
    </div>
  );
};
