import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "app/providers";
import { Text } from "shared/ui/text";

import { LogOutIcon } from "shared/assets/LogOutIcon";
import { Opener } from "shared/lib/Opener";
import { HStack, VStack } from "shared/lib/stack";
import { Button } from "shared/ui/button";
import { IconButton } from "shared/ui/button/IconButton.tsx";
import { Modal } from "shared/ui/modal";
import { toast } from "react-toastify";
import styled from "styled-components";
import { TextArea } from "shared/ui/textArea";
import { Option } from "../../shared/types/Option.tsx";
import { Select } from "shared/ui/dropdown";
import { Space } from "shared/ui/space/Space.tsx";
import { useTranslation } from "react-i18next";
import featureService from "shared/api/features/featureService.ts";

export const GenerateText = () => {
  const { store } = useContext(UserContext);
  const [text, setText] = useState("");
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState<Option | null>();

  const [langs, setLangs] = useState<Option[]>();

  const fetchTitleData = async () => {
    try {
      await store.getAllLangsTitle();
      await setLangs(store.languageTextArray);
      console.log(langs);
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
  setText("");
     try {

       const res = await featureService.generate(selectedItem!.id);
       console.log(res)
       let fileObject = JSON.parse(res.data);
       console.log(res.data);
       const parsedFile = JSON.stringify(fileObject.choices[0].message.content);
       console.log(parsedFile);
 
       setText(parsedFile);
     } catch (e) {}
   };
  function onChosenHelper(selectedItem: any) {
    setSelectedItem(selectedItem);
  }
  return (
    <Container>
      <Text weight={400} size={"16px"} height={"s"}>
        {t("profile.Generate1")}
      </Text>
      <Space height="s" />
      <Select
        placeholder={t("profile.Translate1")}
        selected={selectedItem}
        options={langs!}
        onChange={(selection: Option) => onChosenHelper(selection)}
      />
      <Space height="s" />

      <Button primary={true} onClick={OnGenerateHelper}>
        {t("profile.Generate3")}
      </Button>
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
