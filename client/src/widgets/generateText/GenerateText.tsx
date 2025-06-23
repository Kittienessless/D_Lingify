import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "app/providers";
import { Text } from "shared/ui/text";
import { Opener } from "shared/lib/Opener";
import { Button } from "shared/ui/button";
import { Modal } from "shared/ui/modal";
import { toast } from "react-toastify";
import styled from "styled-components";
import { TextArea } from "shared/ui/textArea";
import { Option } from "../../shared/types/Option.tsx";
import { Select } from "shared/ui/dropdown";
import { Space } from "shared/ui/space/Space.tsx";
import { useTranslation } from "react-i18next";
import featureService from "shared/api/features/featureService.ts";
import { Loader } from "shared/ui/loaders"; // Импортируем Loader

export const GenerateText = () => {
  const { store } = useContext(UserContext);
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const [langs, setLangs] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки

  const fetchTitleData = async () => {
    try {
      await store.getAllLangsTitle();
      setLangs(store.languageTextArray);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTitleData();
  }, []);

  const Container = styled.div`
    margin: 10px;
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.font};
  `;

  const OnGenerateHelper = async () => {
    if (!selectedItem) return; // Проверка на выбранный элемент
    setText("");
    setIsLoading(true); // Устанавливаем состояние загрузки

    try {
      const res = await featureService.generate(selectedItem.id);
      const fileObject = JSON.parse(res.data);
      const parsedFile = JSON.stringify(fileObject.choices[0].message.content);
      setText(parsedFile);
    } catch (e) {
      console.error(e);
      toast.error(t("error.generationFailed")); // Сообщение об ошибке
    } finally {
      setIsLoading(false); // Сбрасываем состояние загрузки
    }
  };

  const onChosenHelper = (selectedItem: Option) => {
    setSelectedItem(selectedItem);
  };

  return (
    <Container>
      <Text weight={400} size={"16px"} height={"s"}>
        {t("profile.Generate1")}
      </Text>
      <Space height="s" />
      <Select
        placeholder={t("profile.Translate1")}
        selected={selectedItem}
        options={langs}
        onChange={onChosenHelper}
      />
      <Space height="s" />
      <Button primary={true} onClick={OnGenerateHelper} disabled={isLoading}>
        {t("profile.Generate3")}
      </Button>
      {isLoading && <Loader />} 
      <Space height="s" />
      <TextArea
        id={1}
        readonly
        value={text}
        placeholder={t("profile.Generate2")}
        maxlength={2000}
      />
    </Container>
  );
};
