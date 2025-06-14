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

 
export const GenerateText = () => {
  const { store } = useContext(UserContext);
  const [text, setText] = useState("");
 
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
  function handlerGenerate() {}
  function onChosenHelper(selectedItem: any) {
    setSelectedItem(selectedItem);
  }
  return (
    <Container>
      <Text weight={400} size={"16px"} height={"s"}>
        Здесь вы можете с помощью Искусственного Интеллекта сгенерировать нужный
        текст на созданном Вами языке.{" "}
      </Text>
      <Space height="s" />
      <Select
        placeholder="Выберите язык..."
        selected={selectedItem}
        options={langs!}
        onChange={(selection: Option) => onChosenHelper(selection)}
      />
      <Space height="s" />

      <Button primary={true} onClick={handlerGenerate}>
        Сгенерировать текст
      </Button>
      <Space height="s" />

      <TextArea
        id={1}
        readonly
        value={text}
       
        placeholder="Сгенерированный текст появится здесь..."
        maxlength={1000}
      />
    </Container>
  );
};
