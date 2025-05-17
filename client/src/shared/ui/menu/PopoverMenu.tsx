import { ReferenceType } from "@floating-ui/react";
import { HStack, VStack } from "../../lib/stack";
import { ReactNode } from "react";
import styled from "styled-components";

import { CloseButton } from "../button/CloseButton";
import { SeparatedByLine } from "../../lib/SeparatedByLine";
import { Text } from "../text";

import {
  PopoverPanelProps,
  PopoverPanel,
  RenderContentParams,
} from "./PopoverPanel";

export interface RenderOpenerProps extends Record<string, unknown> {
  ref: (node: ReferenceType | null) => void;
}

export interface PopoverMenuProps
  extends Pick<PopoverPanelProps, "renderContent" | "renderOpener"> {
  title: ReactNode;
}

const Container = styled(PopoverPanel)`
  min-width: 260px;
  background-color: ${({ theme }) => theme.colors.menu};
  color: ${({ theme }) => theme.colors.font};
  border: 1px solid rgb(167, 167, 167);
`;

const Header = styled(HStack)`
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`;

export const PopoverMenu = ({
  renderContent,
  renderOpener,
  title,
}: PopoverMenuProps) => {
  return (
    <Container
      renderContent={({ onClose }: RenderContentParams) => (
        <SeparatedByLine gap={5}>
          <Header>
            <Text size={14} weight="500" color="primary" cropped>
              {title}
            </Text>
            <CloseButton onClick={onClose} />
          </Header>
          <VStack>{renderContent({ onClose })}</VStack>
        </SeparatedByLine>
      )}
      renderOpener={renderOpener}
    />
  );
};
