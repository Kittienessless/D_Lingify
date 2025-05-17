import { SUCCESSFUL_ADDING, ERROR_lANG_ADDIND } from "shared/constances";
import { LangAPI } from "shared/api";
import { FC } from "react";
import { toast } from "react-toastify";
import { HStack, VStack } from "../../../shared/lib/stack.tsx";
import { Text } from "shared/ui/text";
import styled from "styled-components";
import { CenterAbsolutely } from "shared/lib/CenterAbsolutely";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "shared/ui/button/index.tsx";
import { Modal } from "shared/ui/modal";
import { Opener } from "../../../shared/lib/Opener.tsx";
 
export const AddLanguage = () => {
  const navigate = useNavigate();
  //TODO: добавить в виде json lang?
  async function createLang() {
    try {
   
      navigate("/Language");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(ERROR_lANG_ADDIND);
      }
    } finally {
      toast.success(SUCCESSFUL_ADDING);
    }
  }
  return (
    <>
      <Button primary onClick={()=>createLang()}>Создать язык</Button>
    </>
  );
};
