import { SUCCESSFUL_DELETE , ERROR_LANG_DELETE } from 'shared/constances'
import { LangAPI } from 'shared/api';
import { FC } from 'react'

import { toast } from 'react-toastify'

import { Button } from 'shared/ui/button'

interface IDeleteLanguage {
  /** Book information to add to cart. */
  readonly key: string;
   /** Additional styles. */
 }

export const DeleteLanguage : FC<IDeleteLanguage> = (props) => {
  const { key  } = props

  //TODO:  добавить модальное окно, yes/no 
    async function DeleteLanguage() {
      try {
          await LangAPI.Lang.deleteLang(key)
         
        } catch (e) {
          if (e instanceof Error) {
              toast.error(ERROR_LANG_DELETE)
          } 
        } 
        finally{
          toast.success(SUCCESSFUL_DELETE)
        }
      }

    return (
        <Button primary
             onClick={DeleteLanguage}
            >
            Delete Language
        </Button>
    )
}