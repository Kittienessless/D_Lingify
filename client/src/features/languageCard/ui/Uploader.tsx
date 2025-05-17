import React, { useState } from "react";
import { LangAPI } from "shared/api";
import styled from "styled-components";
import { Button } from "shared/ui/button";
import { Text } from "shared/ui/text";
import { transition } from "shared/lib/transition";

interface UploaderProps  {
  title: string;
}
 
export default class Data {
  
  Title: string | null= null;
  File: FormData | null = null;

  setTitle(title: string){
    this.Title = title
  };
  setFile(File: FormData){
    this.File = File
  };
  constructor(Title: string, File: FormData) {
 
    this.Title = Title;
    this.File = File;
}

}
export const Uploader = ({title} : UploaderProps) => {
  
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail" | "wrong format" | "not a file"
  >("initial");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };


  //TODO: on abort

  //TODO: progress bar

  //TODO: проверить на пустоту файла

  //TODO: отображение файла и отмена загрузки именно этого файла, disable если файл загружен

  //TODO: drag & drop

  //TODO: улучшить отображение результатов
  const handleUpload = async () => {
    if (!file) return setStatus("not a file");

    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);

      if (
        file.type !== "text/plain"
        /*    "application/json" ||
         "application/msword" ||
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
         "application/vnd.ms-excel" ||
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" */
      ) {
        setStatus("wrong format");
      }
      try {
        const data = new Data(title, formData)
        
        await LangAPI.Lang.uploadLang(data);

        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
  `;
  const FileInput = styled.input`
    width: 100%;
     
    &::file-selector-button {
      height: 2.3rem;
      padding: 5px;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.blue};
      border-color: transparent;
      color: ${({ theme }) => theme.colors.font};
      ${transition};
    }
    &::file-selector-button:hover {
      ${transition};
      background-color: ${({ theme }) => theme.colors.container};
      cursor: pointer;
    }
  `;
  const Result = ({ status }: { status: string }) => {
    if (status === "success") {
      return <p>✅ Файл успешно загружен!</p>;
    } else if (status === "fail") {
      return <p>❌ Ошибка загрузки файла</p>;
    } else if (status === "uploading") {
      return <p>Загрузка...</p>;
    } else if (status === "wrong format") {
      return (
        <p>
          Неправильный формат файла! Требуемый формат - excel, json, doc, docx
        </p>
      );
    } else if (status === "not a file") {
      return <p>Файл не загружен</p>;
    } else {
      return null;
    }
  };

  return (
    <>
      <InputGroup>
        <FileInput id="file" type="file" onChange={handleFileChange} />
      </InputGroup>
      {file && (
        <section>
          Детали файла:
          <ul>
            <Text>Название: {file.name}</Text>
            <Text>Тип: {file.type}</Text>
            <Text>Размер: {file.size} bytes</Text>
          </ul>
        </section>
      )}

      {file && (
        <Button primary onClick={handleUpload}>
          Загрузить файл
        </Button>
      )}
      <Result status={status} />
    </>
  );
};
