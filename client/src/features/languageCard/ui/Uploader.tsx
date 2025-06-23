import React, { useContext, useEffect, useState } from "react";
import { LangAPI } from "shared/api";
import styled from "styled-components";
import { transition } from "shared/lib/transition";
import languageService from "shared/api/language/languageService";
import { UserContext } from "app/providers";
import { useTranslation } from "react-i18next";
import {
  Button,
  Form,
  Input,
  message,
  Space,
  Tabs,
  Tag,
  Typography,
  Upload,
} from "antd";
import axios, { AxiosResponse } from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { BASE_URL } from "shared/constances";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

interface RuleItem {
  rule: string;
  value: string;
}

interface VocabularyItem {
  key: string;
  word: string;
  translate: string;
  stress: string;
  IPA: string;
  property: string;
}

interface FileContent {
  type: "rules" | "vocabulary";
  Title: string;
  Description: string;
  rules?: RuleItem[];
  vocabulary?: VocabularyItem[];
}
interface ILP {
  id: string | undefined;
}
export const Uploader = ({ id }: ILP) => {
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { store } = useContext(UserContext);
  const beforeUpload = (file: File) => {
    const isAllowedFormat = [
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ].includes(file.type);

    if (!isAllowedFormat) {
      message.error("You can only upload TXT, DOC, DOCX, or Excel files!");
      return false;
    }

    return true;
  };

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<AxiosResponse>(
        `${BASE_URL}/lang/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setFileContent(response.data.data);
      store.setCurrentFile(response.data);

      message.success("File processed successfully!");
    } catch (error) {
      message.error("Failed to process file");
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ margin: "0 auto" }}>
        <div>
          <Text>Supported file formats:</Text>
          <ul>
            <li>TXT, DOC, DOCX, Excel</li>
          </ul>

          <Text>Content formats:</Text>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Rules Format" key="1">
              <ul>
                <li>First line - title</li>
                <li>Second line - description</li>
                <li>
                  Following lines - rules in format: "rule [separator] value"
                </li>
              </ul>
              <Text strong>Supported separators:</Text>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginTop: "8px",
                }}
              >
                {["tab", "comma", "colon", "dash", "semicolon", "pipe"].map(
                  (delim) => (
                    <Tag key={delim}>{delim}</Tag>
                  )
                )}
              </div>
            </TabPane>
            <TabPane tab="Vocabulary Format" key="2">
              <ul>
                <li>First line - title</li>
                <li>Second line - description</li>
                <li>Following lines - tab-separated values with 6 columns:</li>
                <ol>
                  <li>Key (unique identifier)</li>
                  <li>Word (in target language)</li>
                  <li>Translation</li>
                  <li>Stress pattern</li>
                  <li>IPA transcription</li>
                  <li>Property (part of speech)</li>
                </ol>
              </ul>
            </TabPane>
          </Tabs>
        </div>
        <div style={{ marginTop: "2em" }}>
          <Upload
            accept=".txt,.doc,.docx,.xls,.xlsx"
            beforeUpload={beforeUpload}
            customRequest={({ file }) => handleUpload(file as File)}
            showUploadList={false}
          >
            <Button
              icon={<UploadOutlined />}
              loading={loading}
              type="primary"
              style={{ marginBottom: "24px" }}
            >
              Select File
            </Button>
          </Upload>
        </div>
      </div>
    </>
  );
};
