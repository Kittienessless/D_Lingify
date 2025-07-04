import { useEffect, useState } from "react";
import { Button } from "shared/ui/button";
import { LangAPI } from "shared/api";
import { toast } from "react-toastify";
import languageService from "shared/api/language/languageService";
import { BASE_URL } from "shared/constances";
import { useTranslation } from "react-i18next";

export interface Iid {
  id: string;
}

export const SaveLang = (id : Iid )=> {
  const [file, setFile] = useState<File | null>(null);
  const { t } = useTranslation();

  async function handleDownloadFile() {
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }
      const formData = new FormData();

      const response = await fetch(`${BASE_URL}/lang/download`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      formData.append("file", file);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      toast.error(t("SaveLang.Title1") + e);
    }
  }

  return (
    <>
      <Button onClick={() => handleDownloadFile()}>{t("SaveLang.Title2")}</Button>
    </>
  );
};
