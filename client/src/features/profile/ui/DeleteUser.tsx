import { useContext, useState } from "react";
 import { FC } from "react";
import { Modal } from "shared/ui/modal";
import { Opener } from "../../../shared/lib/Opener.tsx";
import { HStack, VStack } from "../../../shared/lib/stack.tsx";
import { Text } from "shared/ui/text/index.tsx";
import { Button } from "shared/ui/button/index.tsx";
import { IconButton } from "shared/ui/button/IconButton";
import { TrashBinIcon } from "shared/assets/TrashBinIcon.tsx";
import { ERROR_ARTICLE_DELETE } from "shared/constances/errors.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "app/providers";
import { useTranslation } from "react-i18next";

 
export const DeleteUser = () => {
  const navigate = useNavigate();
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

  function handleDelete(){
    if (store.isAuth) {
      store.delete();
      toast.success("Успешно!");
      navigate("/");
    }
  };

  return (
    <>
      <HStack gap={40}>
        <Opener
          renderOpener={({ onOpen }) => (
            <IconButton
              icon={<TrashBinIcon />}
              title={t("DeleteUser.text1")}
              onClick={onOpen}
            >
              {t("DeleteUser.text1")}
            </IconButton>
          )}
          renderContent={({ onClose }) => (
            <Modal
              title={t("DeleteUser.text2")}
              onClose={onClose}
              width={400}
              footer={
                <div>
                  <Button onClick={handleDelete}>{t("DeleteUser.text3")}</Button>
                  <Button primary onClick={onClose}>
                   {t("DeleteUser.text4")}
                  </Button>
                </div>
              }
            >
              <VStack gap={20}>
                <Text>{t("DeleteUser.text5")}</Text>
              </VStack>
            </Modal>
          )}
        />
      </HStack>
    </>
  );
};
