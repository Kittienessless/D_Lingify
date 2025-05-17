import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "app/providers";

import { LogOutIcon } from "shared/assets/LogOutIcon";
import { Opener } from "shared/lib/Opener";
import { HStack, VStack } from "shared/lib/stack";
import { Button } from "shared/ui/button";
import { IconButton } from "shared/ui/button/IconButton.tsx";
import { Modal } from "shared/ui/modal";
import { toast } from "react-toastify";

export const Logout = () => {
  const navigate = useNavigate();
  const { store } = useContext(UserContext);

  function handlerLogout() {
    console.log(store.isAuth);
    if (store.isAuth) {
      store.logout();
      toast.success("Успешно!");
      navigate("/");
    }
  }

  return (
    <>
      <HStack gap={40}>
        <Opener
          renderOpener={({ onOpen }) => (
            <IconButton title="Logout" icon={<LogOutIcon />} onClick={onOpen} />
          )}
          renderContent={({ onClose }) => (
            <Modal
              title="Вы уверены что хотите выйти?"
              onClose={onClose}
              width={400}
              footer={
                <div>
                  <Button onClick={() => handlerLogout()}>Выйти</Button>
                  <Button primary onClick={onClose}>
                    Отмена
                  </Button>
                </div>
              }
            ></Modal>
          )}
        />
      </HStack>
    </>
  );
};
