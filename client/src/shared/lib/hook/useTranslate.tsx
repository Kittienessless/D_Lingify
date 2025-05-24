import { useEffect, useState } from "react";
import featureService from "shared/api/features/featureService";



const useTranslate = (sourceText: string, selectedLanguage: string) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (sourceText: string) => {
      try {
        const res = await featureService.translate(sourceText, selectedLanguage);
        setTargetText(res.data);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
