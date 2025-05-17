import { useEffect, useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: "dfgfd",
});

const useTranslate = (sourceText: string, selectedLanguage: string) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (sourceText: string) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",

          messages: [
            {
              role: "user",
              content: `You will be provided with a sentence. This sentence: 
              ${sourceText}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}
              Do not return anything other than the translated sentence.`,
            },
          ],
        });

        const data: string =
          response?.choices[0]?.message?.content || "not found";
        setTargetText(data);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
