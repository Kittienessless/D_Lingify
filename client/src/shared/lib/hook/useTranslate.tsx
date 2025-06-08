import { useEffect, useState } from "react";
import featureService from "shared/api/features/featureService";
import { Option } from "shared/types/Option";



const useTranslate = (sourceText: string, selectedLanguage: Option) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (sourceText: string) => {
      try {
        const res = await featureService.translate(sourceText, selectedLanguage.id );
        setTargetText(res.data);
      } catch (error) {
        console.log("Error translating text:" +  error);
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
