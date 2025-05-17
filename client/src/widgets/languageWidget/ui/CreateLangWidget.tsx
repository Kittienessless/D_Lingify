import React, { useEffect, useState, FC, useContext, useRef } from "react";
import styled from "styled-components";
import { Text } from "shared/ui/text";
import { Button } from "shared/ui/button";
import { toast } from "react-toastify";
import { Space } from "shared/ui/space";
import { Divider } from "shared/ui/divider";
import { Checkbox } from "shared/ui/checkbox";
import { Search } from "shared/ui/featuredInputs";
import { IconButton } from "shared/ui/button/IconButton";
import { FilterIcon } from "shared/assets/FilterIcon";
import { CenterAbsolutely } from "shared/lib/CenterAbsolutely";
import { SortIcon } from "shared/assets/SortIcon";
import { borderRadius } from "shared/lib/borderRadius";

import { CreateLangStepper } from "features/languageCard/ui/CreateLangStepper";
import { centerContent } from "shared/lib/centerContent";
const Container = styled.div`
  margin: 10px;
  padding: 10px;
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid rgb(221, 221, 221);
  ${borderRadius.s};
  width: 100%;
  ${centerContent};
`;

export const CreateLangWidget = () => {
  return (
    <Container>
      <CreateLangStepper></CreateLangStepper>
    </Container>
  );
};
