import { UserContext } from "app/providers";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import languageService from "shared/api/language/languageService";
import { Button } from "shared/ui/button";
import { Text } from "shared/ui/text";
import styled from "styled-components";
import { Space } from "shared/ui/space/Space.tsx";
import { borderRadius } from "shared/lib/borderRadius";
import { Divider } from "shared/ui/divider";
import { useTranslation } from "react-i18next";
import { Loader } from "shared/ui/loaders";

const Wrapper = styled.div`
  margin: 0px auto;
  max-width: 40%;
  text-align: center;
`;

const Confirmation = () => {
  const { store } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [result, setResult] = useState<any>();
  const createLanguage = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let result;

      if (store.isNeural) {
        result = await languageService.createNeural(
          store.promptNeuralCreation,
          store.language.Title,
          store.language.Description,
          store.rules
        );
        setResult(result);
      } else {
        result = await languageService.create(
          store.language!.Title,
          store.language!.Description
        );
        setResult(result);
      }

      setSuccess(true);
    } catch (e) {
      setError(t("error.creationFailed")); // Замените на ваш текст ошибки
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const redactLanguage = () => {
    navigate(`/redactLanguage/${result.data.id}`);
  };

  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading && (
        <>
          <Space height="m" />
          <Text size={"16pt"} height="s">
            {t("Создать язык: ")}
          </Text>
          <Text size={"16px"} height="s">
            {store.language!.Title}
          </Text>
          <Text size={"16px"} height="s">
            {store.language!.Description}
          </Text>
          <Divider />
          <Space height="s" />
          {error && (
            <Text size={"16px"} height="s" style={{ color: "red" }}>
              {error}
            </Text>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            {!success && (
              <Button style={{ width: "fit-content" }} onClick={createLanguage}>
                {t("confirmation.createLanguageButton")}
              </Button>
            )}
          </div>
          {success && (
            <>
              <Text size={"16px"} height="s" style={{ color: "green" }}>
                {" "}
              </Text>
              <Button style={{ width: "fit-content" }} onClick={redactLanguage}>
                Редактировать язык
              </Button>{" "}
            </>
          )}{" "}
        </>
      )}
    </Wrapper>
  );
};

export default observer(Confirmation);
