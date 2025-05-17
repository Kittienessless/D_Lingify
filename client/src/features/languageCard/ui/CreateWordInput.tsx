// inputs with preferences

//

import { Modal } from "shared/ui/modal";
import { Opener } from "../../../shared/lib/Opener.tsx";
import { HStack, VStack } from "../../../shared/lib/stack.tsx";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "shared/ui/text";
import { Button } from "shared/ui/button";
import { LangAPI } from "shared/api/index.ts";
import { borderRadius } from "shared/lib/borderRadius.tsx";
import { Checkbox } from "shared/ui/checkbox/index.tsx";
import { Radio } from "shared/ui/radio/index.tsx";

const InputContainer = styled.div`
  display: block;
  width: 100%;
  background: ${({ theme }) => theme.colors.menu};
  font-weight: 600;
  margin: 15px;
  ${borderRadius.m};
  border: 1px solid ${({ theme }) => theme.colors.menu};
  padding: 10px;
`;
const StyledInput = styled.input`
  background: ${({ theme }) => theme.colors.menu};
  height: auto;

  padding: 15px;
  min-width: 40%;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.font};

  &:focus {
    outline: none;
    border: 1px solid rgb(197, 197, 197);
    border-radius: 12px;
  }
  &.desc {
    width: 100%;
    height: auto;
    padding: 15px;
    resize: vertical !important;
  }
`;

const items = [ {value: 'value' , label: "dfgdfgdf"}, {value: 'value', label: "vdfgdfb"}, {value: 'value', label: "vdfgdfb"} ];

export const CreateWordInput = () => {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [checkboxValue, setcheckboxValue] = useState(false);
  const [radioVal, setRadioVal] = useState("");

  function HandlerSaveWord() {
    // lang store сделать ?
  }

  return (
    <>
    
      <HStack gap={40}>
        <Opener
          renderOpener={({ onOpen }) => (
            <Button title="Create Word" onClick={onOpen}>
              Создать слово
            </Button>
          )}
          renderContent={({ onClose }) => (
            <Modal
              title="Введите новое слово: "
              onClose={onClose}
              width={400}
              footer={
                <div>
                  <Button primary onClick={() => HandlerSaveWord()}>
                    Добавить
                  </Button>
                </div>
              }
            >
              <VStack gap={20}>
                <Text>Слово: </Text>
                <StyledInput
                  name="Name"
                  type="text"
                  required={true}
                  onChange={() => setWord}
                  placeholder={"Слово..."}
                />
                {isEmpty && (
                  <Text size={"12px"} weight={400}>
                    поле не должно быть пустым!
                  </Text>
                )}
                <Text>Перевод: </Text>
                <StyledInput
                  name="Name"
                  type="text"
                  required={true}
                  onChange={() => setTranslate}
                  placeholder={"Перевод..."}
                />
                {isEmpty && (
                  <Text size={"12px"} weight={400}>
                    поле не должно быть пустым!
                  </Text>
                )}
               <Text>что-то отметить: </Text>

                <Checkbox
                  label={"some value"}
                  value={checkboxValue}
                  onChange={setcheckboxValue}
                ></Checkbox>
                <Text>что-то выбрать: </Text>
                <Radio items={items} value={radioVal} onChange={setRadioVal}></Radio>
              </VStack>
            </Modal>
          )}
        />
      </HStack>
    </>
  );
};
