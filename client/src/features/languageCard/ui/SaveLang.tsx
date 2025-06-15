import { useEffect, useState } from "react";
import { Button } from "shared/ui/button";
import { LangAPI } from "shared/api";
import { toast } from "react-toastify";
import languageService from "shared/api/language/languageService";
import { BASE_URL } from "shared/constances";

export const SaveLang = (id: string) => {
  const [file, setFile] = useState<File | null>(null);

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
      toast.error("Ошибка скачивания файла" + e);
    }
  }

  return (
    <>
      <Button onClick={() => handleDownloadFile()}>Скачать</Button>
    </>
  );
};
