import { useEffect, useState } from "react";
import { Button } from "shared/ui/button";
import { LangAPI } from "shared/api";
import { toast } from "react-toastify";
export const SaveLang = () => {
  async function handleDownloadFile() {
    try {
    /*   const fileName = await LangAPI.langInfo.getLangInfo();
      const filename = fileName;
      const Lang = await LangAPI.Lang.downloadLang(); */

      //TODO: доделать скачивание файла
    } catch (e) {
      toast.error('Ошибка скачивания файла' + e)
    }
  }

  return (
    <>
      <Button onClick={() => handleDownloadFile()}>Скачать</Button>
    </>
  );
};
